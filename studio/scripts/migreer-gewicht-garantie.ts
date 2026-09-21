/**
 * Eenmalig migratiescript: vult gewicht/garantie in voor de campers waarvoor
 * die data al eerder werd opgehaald van bmc.idento.be (niet verzonnen).
 *
 * Draai met: npx sanity exec scripts/migreer-gewicht-garantie.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function patch(slug: string, data: Record<string, unknown>) {
  const doc = await client.fetch<{_id: string} | null>(
    `*[_type == "verkoopVoertuig" && slug.current == $slug][0]{_id}`,
    {slug},
  )
  if (!doc) {
    console.log(`Geen document gevonden met slug "${slug}".`)
    return
  }
  await client.patch(doc._id).set(data).commit()
  console.log(`Bijgewerkt: ${slug}`)
}

async function main() {
  await patch('blucamp-ocean-527', {
    leeggewicht: 2850,
    mtm: 3500,
    garantie: 'Ford-fabrieksgarantie tot 5 jaar / 100.000 km (beschikbaar vanaf 09/2026)',
  })
  await patch('blucamp-laser-600', {
    mtm: 3500,
  })
  console.log('Klaar!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
