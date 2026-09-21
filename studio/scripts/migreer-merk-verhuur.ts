/**
 * Eenmalig migratiescript: koppelt de bestaande huurmodellen (Blucamp 527,
 * Blucamp Sky Free) aan het merk "Blucamp", nu het schema een merkveld heeft
 * voor verhuurVoertuig.
 *
 * Draai met: npx sanity exec scripts/migreer-merk-verhuur.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function main() {
  const merkDoc = await client.fetch<{_id: string} | null>(`*[_type == "merk" && naam == "Blucamp"][0]{_id}`)
  if (!merkDoc) {
    console.log('Merk "Blucamp" niet gevonden, script stopt.')
    return
  }

  const docs = await client.fetch<{_id: string; titel: string}[]>(
    `*[_type == "verhuurVoertuig" && !defined(merk)]{_id, titel}`,
  )
  for (const doc of docs) {
    await client.patch(doc._id).set({merk: {_type: 'reference', _ref: merkDoc._id}}).commit()
    console.log(`Bijgewerkt: ${doc.titel} (${doc._id})`)
  }
  console.log(`${docs.length} document(en) bijgewerkt.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
