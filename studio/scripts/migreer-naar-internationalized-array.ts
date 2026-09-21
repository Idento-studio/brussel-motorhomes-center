/**
 * Eenmalig migratiescript: de velden promoTekst, indeling, garantie,
 * chassisEnCabine, woongedeelte, extras (en notitie bij verhuur) zijn net
 * omgezet naar internationalized-array (NL/FR-tabblad i.p.v. één tekstveld).
 * De bestaande documenten bevatten nog de oude platte string — dit script
 * herschrijft elk ingevuld veld naar [{_key:"nl", value:<bestaande tekst>},
 * {_key:"fr", value:<vertaling>}]. Vertalingen zijn manueel gemaakt op basis
 * van de bestaande Nederlandse inhoud (niet verzonnen).
 *
 * Draai met: npx sanity exec scripts/migreer-naar-internationalized-array.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

function veldString(nl: string, fr: string) {
  return [
    {_key: 'nl', _type: 'internationalizedArrayStringValue', value: nl},
    {_key: 'fr', _type: 'internationalizedArrayStringValue', value: fr},
  ]
}

function veldText(nl: string, fr: string) {
  return [
    {_key: 'nl', _type: 'internationalizedArrayTextValue', value: nl},
    {_key: 'fr', _type: 'internationalizedArrayTextValue', value: fr},
  ]
}

async function patchByType(type: 'verkoopVoertuig' | 'verhuurVoertuig', slug: string, data: Record<string, unknown>) {
  const doc = await client.fetch<{_id: string} | null>(
    `*[_type == $type && slug.current == $slug][0]{_id}`,
    {type, slug},
  )
  if (!doc) {
    console.log(`Geen document gevonden met slug "${slug}" (${type}).`)
    return
  }
  await client.patch(doc._id).set(data).commit()
  console.log(`Bijgewerkt: ${slug}`)
}

async function main() {
  // --- Verkoop ---
  await patchByType('verkoopVoertuig', 'blucamp-ocean-527', {
    chassisEnCabine: veldText(
      'Cabine-airco\nCruise control\nFord-fabrieksgarantie tot 5 jaar / 100.000 km (vanaf 09/2026)',
      "Climatisation de cabine\nRégulateur de vitesse\nGarantie constructeur Ford jusqu'à 5 ans / 100.000 km (à partir de 09/2026)",
    ),
    extras: veldText(
      'Thule voortent\nZonnepaneel\nFiamma fietsenrek voor 4 fietsen',
      'Auvent Thule\nPanneau solaire\nPorte-vélos Fiamma pour 4 vélos',
    ),
    garantie: veldText(
      'Ford-fabrieksgarantie tot 5 jaar / 100.000 km (beschikbaar vanaf 09/2026)',
      "Garantie constructeur Ford jusqu'à 5 ans / 100.000 km (disponible à partir de 09/2026)",
    ),
    indeling: veldString('Vast bed + handbediend hefbed', 'Lit fixe + lit relevable manuel'),
    woongedeelte: veldText(
      'Koelkast 160 L\nTruma verwarming\nLithiumbatterij\nPanoramadak',
      "Réfrigérateur 160 L\nChauffage Truma\nBatterie lithium\nToit panoramique",
    ),
  })

  await patchByType('verkoopVoertuig', 'blucamp-laser-600', {
    chassisEnCabine: veldText(
      'Cabine-airco\nCruise control\nDraaibare comfortstoelen\nElektrische opstap\nAchteruitrijcamera',
      'Climatisation de cabine\nRégulateur de vitesse\nSièges confort pivotants\nMarchepied électrique\nCaméra de recul',
    ),
    extras: veldText('Thule voortent\nZonnepaneel\nFietsendrager', 'Auvent Thule\nPanneau solaire\nPorte-vélos'),
    indeling: veldString('Stapelbedden achteraan', "Lits superposés à l'arrière"),
    woongedeelte: veldText(
      'Panoramadak\nTruma Combi 4 verwarming\nKoelkast 84 L\nWatertank 100 L\nAfvalwatertank 90 L\nUitneembaar bovenbed',
      "Toit panoramique\nChauffage Truma Combi 4\nRéfrigérateur 84 L\nRéservoir d'eau propre 100 L\nRéservoir d'eaux usées 90 L\nLit du haut amovible",
    ),
  })

  await patchByType('verkoopVoertuig', 'benimar-cocoon-486', {
    indeling: veldString('Geen bed achteraan', "Pas de lit à l'arrière"),
  })

  // --- Verhuur ---
  await patchByType('verhuurVoertuig', 'blucamp-sky-free', {
    indeling: veldString(
      'Tweelingbedden achteraan (2+1) · paviljoenbed vooraan (2)',
      "Lits jumeaux à l'arrière (2+1) · lit pavillon à l'avant (2)",
    ),
  })

  await patchByType('verhuurVoertuig', 'blucamp-527', {
    indeling: veldString(
      'Tweelingbedden achteraan (2+1) · paviljoenbed vooraan (2)',
      "Lits jumeaux à l'arrière (2+1) · lit pavillon à l'avant (2)",
    ),
  })

  console.log('Klaar!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
