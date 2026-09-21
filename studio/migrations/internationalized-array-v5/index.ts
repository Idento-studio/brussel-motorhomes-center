import {migrateToLanguageField} from 'sanity-plugin-internationalized-array/migrations'

// Lost de Studio-waarschuwing op ("3 items need to be migrated to the v5
// format"): sanity-plugin-internationalized-array sloeg de taal vroeger op
// in _key, sinds v5 in een apart language-veld. Betreft de vertaalde velden
// op verkoopVoertuig/verhuurVoertuig (promoTekst, indeling, garantie,
// chassisEnCabine, woongedeelte, extras, notitie — zie vertaald() in
// web/src/sanity/queries.ts).
export default migrateToLanguageField(['verkoopVoertuig', 'verhuurVoertuig'])
