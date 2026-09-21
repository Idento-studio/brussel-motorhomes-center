import {documentEventHandler} from '@sanity/functions'
import {createClient} from '@sanity/client'

type VeldWaarde = {_key: string; _type: string; value: string}

type VoertuigData = {
  _id: string
  _type: 'verkoopVoertuig' | 'verhuurVoertuig'
  titel?: string
  indeling?: VeldWaarde[]
  promoTekst?: VeldWaarde[]
  garantie?: VeldWaarde[]
  chassisEnCabine?: VeldWaarde[]
  woongedeelte?: VeldWaarde[]
  extras?: VeldWaarde[]
  notitie?: VeldWaarde[]
}

// string-velden gebruiken internationalizedArrayStringValue, text-velden
// (meerdere regels) internationalizedArrayTextValue — moet overeenkomen met
// de types in de schema's (studio/schemaTypes/verkoopVoertuig.ts en
// verhuurVoertuig.ts), anders weigert Sanity de patch.
const VELD_TYPE: Record<string, 'internationalizedArrayStringValue' | 'internationalizedArrayTextValue'> = {
  indeling: 'internationalizedArrayStringValue',
  promoTekst: 'internationalizedArrayStringValue',
  garantie: 'internationalizedArrayTextValue',
  chassisEnCabine: 'internationalizedArrayTextValue',
  woongedeelte: 'internationalizedArrayTextValue',
  extras: 'internationalizedArrayTextValue',
  notitie: 'internationalizedArrayTextValue',
}

const VELDNAMEN = Object.keys(VELD_TYPE) as (keyof typeof VELD_TYPE)[]

function haalWaarde(veld: VeldWaarde[] | undefined, taal: string): string | undefined {
  return veld?.find((entry) => entry._key === taal)?.value
}

type VertaalOpdracht = {veld: string; nl: string; wantFr: boolean; wantEn: boolean}

async function vertaalMetClaude(opdrachten: VertaalOpdracht[], apiKey: string): Promise<Record<string, {fr?: string; en?: string}>> {
  const bron = Object.fromEntries(opdrachten.map((o) => [o.veld, o.nl]))

  const prompt = `Je bent een professionele vertaler voor Brussel Motorhomes Center, een Belgische motorhome-verdeler. Vertaal onderstaande Nederlandse teksten (JSON, veldnaam -> tekst) naar het Frans en het Engels. Dit zijn korte technische/commerciele beschrijvingen van een motorhome (indeling, uitrusting, garantie, ...) — vertaal natuurlijk en bondig, in dezelfde stijl en met behoud van cijfers, merknamen en regeleinden (\\n). Gebruik "motorhome" als productwoord (niet "camper" of "mobilhome") in zowel de Franse als de Engelse tekst. Antwoord UITSLUITEND met geldige JSON in dit formaat, zonder extra tekst:
{"veldnaam": {"fr": "...", "en": "..."}, ...}

Nederlandse teksten:
${JSON.stringify(bron, null, 2)}`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: 2048,
      messages: [{role: 'user', content: prompt}],
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API-fout (${response.status}): ${await response.text()}`)
  }

  const data = (await response.json()) as {content: {type: string; text?: string}[]}
  const tekst = data.content.find((block) => block.type === 'text')?.text
  if (!tekst) throw new Error('Geen tekstantwoord van Claude ontvangen.')

  // Claude antwoordt normaal gezien met pure JSON, maar knip voor de
  // zekerheid eventuele ```json ... ``` code-fences of omliggende tekst weg.
  const jsonMatch = tekst.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error(`Kon geen JSON vinden in het antwoord van Claude: ${tekst}`)

  return JSON.parse(jsonMatch[0])
}

export const handler = documentEventHandler<VoertuigData>(async ({context, event}) => {
  const {data} = event

  const opdrachten: VertaalOpdracht[] = []
  for (const veld of VELDNAMEN) {
    const waarden = data[veld]
    const nl = haalWaarde(waarden, 'nl')
    if (!nl) continue
    const wantFr = !haalWaarde(waarden, 'fr')
    const wantEn = !haalWaarde(waarden, 'en')
    if (wantFr || wantEn) opdrachten.push({veld, nl, wantFr, wantEn})
  }

  if (opdrachten.length === 0) {
    console.log(`Niets te vertalen voor ${data._id}.`)
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY ontbreekt — stel deze in met: npx sanity functions env add vertaal-voertuig ANTHROPIC_API_KEY <key>')
    return
  }

  console.log(`Vertaal ${opdrachten.length} veld(en) voor ${data.titel ?? data._id} (${data._id})…`)

  let vertalingen: Record<string, {fr?: string; en?: string}>
  try {
    vertalingen = await vertaalMetClaude(opdrachten, apiKey)
  } catch (error) {
    console.error('Vertalen via Claude is mislukt:', error)
    return
  }

  const patch: Record<string, VeldWaarde[]> = {}
  for (const opdracht of opdrachten) {
    const vertaling = vertalingen[opdracht.veld]
    if (!vertaling) {
      console.error(`Geen vertaling ontvangen voor veld "${opdracht.veld}".`)
      continue
    }
    const type = VELD_TYPE[opdracht.veld]
    const bestaand = data[opdracht.veld as keyof VoertuigData] as VeldWaarde[] | undefined
    const nieuw: VeldWaarde[] = [...(bestaand ?? []).filter((e) => e._key !== 'fr' && e._key !== 'en')]
    const fr = opdracht.wantFr ? vertaling.fr : haalWaarde(bestaand, 'fr')
    const en = opdracht.wantEn ? vertaling.en : haalWaarde(bestaand, 'en')
    if (fr) nieuw.push({_key: 'fr', _type: type, value: fr})
    if (en) nieuw.push({_key: 'en', _type: type, value: en})
    patch[opdracht.veld] = nieuw
  }

  if (Object.keys(patch).length === 0) {
    console.log('Geen bruikbare vertalingen ontvangen, geen patch geschreven.')
    return
  }

  const client = createClient({...context.clientOptions, apiVersion: '2025-05-08'})

  try {
    await client.patch(data._id).set(patch).commit({dryRun: context.local})
    console.log(`Vertaling weggeschreven voor ${data._id}: ${Object.keys(patch).join(', ')}`)
  } catch (error) {
    console.error('Wegschrijven van de vertaling is mislukt:', error)
  }
})
