import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {nlNLLocale} from '@sanity/locale-nl-nl'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Brussel Motorhomes Center',

  projectId: 'th815q8m',
  dataset: 'production',

  // Nederlands als schermtaal (knoppen, meldingen, ...). Sanity onthoudt dit
  // niet automatisch als standaard: bij de eerste keer inloggen kies je het
  // vlaggetje/taalmenu linksonder in de Studio en zet je "Nederlands" aan —
  // dat blijft daarna bewaard in die browser.
  plugins: [
    structureTool({structure}),
    visionTool(),
    nlNLLocale(),
    // Veldniveau-vertaling voor de vrije tekstvelden van de campers (indeling,
    // promotekst, garantie, uitrustingslijsten): de website is nu ook in het
    // Frans en het Engels, en deze velden tonen dan een NL/FR/EN-tabblad i.p.v.
    // één tekstveld. Vaste keuzelijsten (opbouwtype, brandstof, ...) blijven
    // één waarde — de vertaling van de labels gebeurt in de website zelf.
    internationalizedArray({
      languages: [
        {id: 'nl', title: 'Nederlands'},
        {id: 'fr', title: 'Français'},
        {id: 'en', title: 'English'},
      ],
      defaultLanguages: ['nl'],
      fieldTypes: ['string', 'text'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
