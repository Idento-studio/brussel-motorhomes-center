/**
 * Eenmalig testscript: maakt "Blucamp 527" en "Blucamp Sky Free" aan als
 * huurmodellen, met data en foto's overgenomen van
 * https://bmc.idento.be/verhuur/blucamp-527/ en
 * https://bmc.idento.be/verhuur/test/ (weergegeven als "Blucamp Sky Free").
 *
 * Draai met: npx sanity exec scripts/seed-huurmodellen.ts --with-user-token
 */
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function uploadFotos(map: string, bestanden: string[], altTekst: string) {
  const resultaat = []
  for (const bestand of bestanden) {
    const bestandspad = path.join(map, bestand)
    const asset = await client.assets.upload('image', fs.createReadStream(bestandspad), {
      filename: `${path.basename(map)}-${bestand}`,
    })
    console.log(`  -> ${bestand} geupload:`, asset._id)
    resultaat.push({
      _type: 'image' as const,
      _key: bestand,
      asset: {_type: 'reference' as const, _ref: asset._id},
      alt: altTekst,
    })
  }
  return resultaat
}

async function maakHuurmodelIndienNieuw(slug: string, doc: Record<string, unknown>) {
  const bestaat = await client.fetch<{_id: string} | null>(
    `*[_type == "verhuurVoertuig" && slug.current == $slug][0]{_id}`,
    {slug},
  )
  if (bestaat) {
    console.log(`Er bestaat al een huurmodel met slug "${slug}", overgeslagen:`, bestaat._id)
    return
  }
  const gemaakt = await client.create(doc)
  console.log('Huurmodel aangemaakt:', gemaakt._id)
}

const STANDAARD_TARIEVEN = {
  laagSeizoen: {weekend: 500, eenWeek: 900, tweeWeken: 1620, drieWeken: 2250, vierWeken: 2800, extraDag: 125},
  middenSeizoen: {weekend: 580, eenWeek: 980, tweeWeken: 1800, drieWeken: 2520, vierWeken: 3240, extraDag: 140},
  hoogSeizoen: {eenWeek: 1500, tweeWeken: 2700, drieWeken: 3800, vierWeken: 4800},
}

async function main() {
  console.log('--- Blucamp 527 ---')
  const fotos527 = await uploadFotos(
    'C:\\Users\\jensd\\AppData\\Local\\Temp\\blucamp-527-real',
    ['01.webp', '02.webp', '03.webp'],
    'Blucamp 527',
  )
  await maakHuurmodelIndienNieuw('blucamp-527', {
    _type: 'verhuurVoertuig',
    titel: 'Blucamp 527',
    slug: {_type: 'slug', current: 'blucamp-527'},
    slaapplaatsen: 5,
    rijbewijs: 'Rijbewijs B',
    indeling: 'Tweelingbedden achteraan (2+1) · paviljoenbed vooraan (2)',
    afmetingen: {lengte: 7, breedte: 2.35, hoogte: 2.98},
    coverFoto: fotos527[0],
    fotos: fotos527,
    tarieven: STANDAARD_TARIEVEN,
    gepubliceerd: true,
  })

  console.log('--- Blucamp Sky Free ---')
  const fotosSkyFree = await uploadFotos(
    'C:\\Users\\jensd\\AppData\\Local\\Temp\\blucamp-sky-free-real',
    ['01.webp', '02.webp', '03.png'],
    'Blucamp Sky Free',
  )
  await maakHuurmodelIndienNieuw('blucamp-sky-free', {
    _type: 'verhuurVoertuig',
    titel: 'Blucamp Sky Free',
    slug: {_type: 'slug', current: 'blucamp-sky-free'},
    slaapplaatsen: 4,
    rijbewijs: 'Rijbewijs B',
    indeling: 'Tweelingbedden achteraan (2+1) · paviljoenbed vooraan (2)',
    afmetingen: {lengte: 7, breedte: 2.35},
    coverFoto: fotosSkyFree[0],
    fotos: fotosSkyFree,
    tarieven: STANDAARD_TARIEVEN,
    gepubliceerd: true,
  })

  console.log('Klaar!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
