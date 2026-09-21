import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

// Vertaalt automatisch de vrije-tekstvelden van een camper (indeling,
// promotekst, garantie, chassis & cabine, woongedeelte, extra's, notitie)
// van Nederlands naar Frans en Engels zodra een medewerker een nieuwe
// camper toevoegt of het Nederlandse veld wijzigt. Zie functions/vertaal-
// voertuig/index.ts voor de logica en README.md daarnaast voor de
// installatiestappen (API-key, deploy).
export default defineBlueprint({
  resources: [
    defineDocumentFunction({
      name: 'vertaal-voertuig',
      event: {
        on: ['create', 'update'],
        // Enkel campers, en enkel wanneer er minstens één veld is met een
        // Nederlandse waarde maar zonder Franse of Engelse vertaling. Zodra
        // de functie die vertaling wegschrijft, voldoet het document niet
        // meer aan dit filter — dat is meteen de bescherming tegen een
        // oneindige lus (de patch van de functie triggert zelf ook weer een
        // "update"-event, maar dan matcht dit filter niet meer).
        filter: `
          (_type == "verkoopVoertuig" || _type == "verhuurVoertuig") && (
            (count(indeling[_key == "nl"]) > 0 && (count(indeling[_key == "fr"]) == 0 || count(indeling[_key == "en"]) == 0)) ||
            (count(promoTekst[_key == "nl"]) > 0 && (count(promoTekst[_key == "fr"]) == 0 || count(promoTekst[_key == "en"]) == 0)) ||
            (count(garantie[_key == "nl"]) > 0 && (count(garantie[_key == "fr"]) == 0 || count(garantie[_key == "en"]) == 0)) ||
            (count(chassisEnCabine[_key == "nl"]) > 0 && (count(chassisEnCabine[_key == "fr"]) == 0 || count(chassisEnCabine[_key == "en"]) == 0)) ||
            (count(woongedeelte[_key == "nl"]) > 0 && (count(woongedeelte[_key == "fr"]) == 0 || count(woongedeelte[_key == "en"]) == 0)) ||
            (count(extras[_key == "nl"]) > 0 && (count(extras[_key == "fr"]) == 0 || count(extras[_key == "en"]) == 0)) ||
            (count(notitie[_key == "nl"]) > 0 && (count(notitie[_key == "fr"]) == 0 || count(notitie[_key == "en"]) == 0))
          )
        `,
        projection:
          '{_id, _type, titel, indeling, promoTekst, garantie, chassisEnCabine, woongedeelte, extras, notitie}',
      },
    }),
  ],
})
