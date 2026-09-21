import {useEffect, useRef} from 'react'
import {set, useClient, type ObjectInputProps} from 'sanity'

/**
 * De klant moet nooit zelf een slug (URL-stukje) intypen. Dit component hangt
 * aan de hele documentvorm (niet aan het "titel"-veld zelf) omdat een
 * `hidden`-veld in Sanity helemaal niet gemonteerd wordt — een custom input
 * op het slug-veld zelf zou dus nooit draaien. Op documentniveau lezen we de
 * titel, maken er automatisch een slug van, en controleren via het datastore
 * of die al bestaat bij een andere camper (bv. twee keer "Blucamp 527")
 * zodat er nooit twee campers dezelfde URL krijgen.
 */
function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

export function createAutoSlugDocumentInput(opts: {bronVeld: string; documentType: string}) {
  return function AutoSlugDocumentInput(props: ObjectInputProps) {
    const client = useClient({apiVersion: '2024-01-01'})
    const laatsteBron = useRef<string | undefined>(undefined)
    const bezig = useRef(false)

    const waarde = props.value as Record<string, unknown> | undefined
    const bronWaarde = waarde?.[opts.bronVeld] as string | undefined
    const huidigeSlug = (waarde?.slug as {current?: string} | undefined)?.current
    const docId = (waarde?._id as string | undefined)?.replace(/^drafts\./, '')

    useEffect(() => {
      if (!bronWaarde || bronWaarde === laatsteBron.current || bezig.current) return
      const basis = slugify(bronWaarde)
      if (!basis) return
      laatsteBron.current = bronWaarde
      bezig.current = true

      const bepaalUniekeSlug = async () => {
        let kandidaat = basis
        let teller = 2
        while (
          await client.fetch<number>(
            `count(*[_type == $type && slug.current == $slug && !(_id in [$id, "drafts." + $id])])`,
            {type: opts.documentType, slug: kandidaat, id: docId ?? ''},
          )
        ) {
          kandidaat = `${basis}-${teller}`
          teller += 1
        }
        if (kandidaat !== huidigeSlug) {
          props.onChange(set({_type: 'slug', current: kandidaat}, ['slug']))
        }
        bezig.current = false
      }

      bepaalUniekeSlug()
    }, [bronWaarde, huidigeSlug, docId, client, props])

    return props.renderDefault(props)
  }
}
