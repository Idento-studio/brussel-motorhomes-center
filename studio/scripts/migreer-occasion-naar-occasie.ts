/**
 * Eenmalig migratiescript: het schema-veld "staat" gebruikte de waarde
 * "Occasion", die nu overal "Occasie" is geworden. Dit werkt bestaande
 * documenten bij — de schema-optielijst alleen aanpassen verandert de
 * al opgeslagen waarden niet met terugwerkende kracht.
 *
 * Draai met: npx sanity exec scripts/migreer-occasion-naar-occasie.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

async function main() {
  const docs = await client.fetch<{_id: string; titel: string}[]>(
    `*[_type == "verkoopVoertuig" && staat == "Occasion"]{_id, titel}`,
  )
  if (docs.length === 0) {
    console.log('Geen documenten met staat "Occasion" gevonden.')
    return
  }

  for (const doc of docs) {
    await client.patch(doc._id).set({staat: 'Occasie'}).commit()
    console.log(`Bijgewerkt: ${doc.titel} (${doc._id})`)
  }
  console.log(`${docs.length} document(en) bijgewerkt.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
