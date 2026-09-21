/**
 * Leest de huidige (Nederlandse) waarden van de velden die net omgezet zijn
 * naar internationalized-array, zodat we ze correct naar het Frans kunnen
 * vertalen voordat we de nieuwe array-vorm wegschrijven.
 *
 * Draai met: npx sanity exec scripts/inspecteer-vertaalvelden.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function main() {
  const verkoop = await client.fetch(
    `*[_type == "verkoopVoertuig"]{_id, titel, "slug": slug.current, promoTekst, indeling, garantie, chassisEnCabine, woongedeelte, extras}`,
  )
  const verhuur = await client.fetch(
    `*[_type == "verhuurVoertuig"]{_id, titel, "slug": slug.current, promoTekst, indeling, chassisEnCabine, woongedeelte, extras, notitie}`,
  )
  console.log('=== VERKOOP ===')
  console.log(JSON.stringify(verkoop, null, 2))
  console.log('=== VERHUUR ===')
  console.log(JSON.stringify(verhuur, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
