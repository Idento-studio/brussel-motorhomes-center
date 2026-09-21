/**
 * Eenmalig migratiescript: verdeelt de vrije notitie-tekst van de eerder
 * geseede "Blucamp Ocean 527" over de nieuwe gestructureerde
 * uitrustingsvelden (chassisEnCabine / woongedeelte / extras) en verwijdert
 * het oude notitie-veld, dat niet meer bestaat in het schema.
 *
 * Draai met: npx sanity exec scripts/migreer-uitrusting-blucamp-ocean-527.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function main() {
  const doc = await client.fetch<{_id: string} | null>(
    `*[_type == "verkoopVoertuig" && slug.current == "blucamp-ocean-527"][0]{_id}`,
  )
  if (!doc) {
    console.log('Geen document gevonden met slug blucamp-ocean-527.')
    return
  }

  await client
    .patch(doc._id)
    .set({
      chassisEnCabine: ['Cabine-airco', 'Cruise control', 'Ford-fabrieksgarantie tot 5 jaar / 100.000 km (vanaf 09/2026)'].join('\n'),
      woongedeelte: ['Koelkast 160 L', 'Truma verwarming', 'Lithiumbatterij', 'Panoramadak'].join('\n'),
      extras: ['Thule voortent', 'Zonnepaneel', 'Fiamma fietsenrek voor 4 fietsen'].join('\n'),
    })
    .unset(['notitie'])
    .commit()

  console.log('Document bijgewerkt:', doc._id)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
