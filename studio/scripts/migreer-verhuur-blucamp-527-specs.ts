/**
 * Eenmalig migratiescript: de huurcamper "Blucamp 527" is exact dezelfde
 * fysieke camper als de verkoopcamper "Blucamp Ocean 527"
 * (verkoopVoertuig U1wyMypRJV2VhTVMGpnN44). Dit script neemt alle
 * specificaties en foto's van die verkooppagina over naar de huurpagina
 * (verhuurVoertuig d6p41rq3iGoZkXLQxPwwC8), zodat beide vermeldingen
 * dezelfde technische gegevens en beeldmateriaal tonen.
 *
 * Niet overgenomen: velden die niet in het verhuurVoertuig-schema bestaan
 * (garantie, bouwjaar, kilometerstand, prijs, eersteInschrijving, groep) en
 * velden die in de verkooppagina leeg stonden (promoTekst, mindervaliden-
 * gegevens).
 *
 * Draai met: npx sanity exec scripts/migreer-verhuur-blucamp-527-specs.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const RENTAL_ID = 'd6p41rq3iGoZkXLQxPwwC8' // Blucamp 527, /verhuur/blucamp-527/

function key() {
  return Math.random().toString(36).slice(2, 14)
}

const indeling = [
  {_key: key(), _type: 'internationalizedArrayStringValue', language: 'nl', value: 'Vast bed + handbediend hefbed'},
  {_key: key(), _type: 'internationalizedArrayStringValue', language: 'fr', value: 'Lit fixe + lit relevable manuel'},
  {_key: key(), _type: 'internationalizedArrayStringValue', language: 'en', value: 'Fixed bed + manual drop-down bed'},
]

const chassisEnCabine = [
  {_key: key(), _type: 'internationalizedArrayTextValue', language: 'nl', value: 'Cabine-airco\nCruise control\n'},
  {_key: key(), _type: 'internationalizedArrayTextValue', language: 'fr', value: 'Climatisation de cabine\nRégulateur de vitesse\n'},
  {_key: key(), _type: 'internationalizedArrayTextValue', language: 'en', value: 'Cab air conditioning\nCruise control\n'},
]

const woongedeelte = [
  {_key: key(), _type: 'internationalizedArrayTextValue', language: 'nl', value: 'Koelkast 160 L\nTruma verwarming\nLithiumbatterij\nPanoramadak'},
  {_key: key(), _type: 'internationalizedArrayTextValue', language: 'fr', value: 'Réfrigérateur 160 L\nChauffage Truma\nBatterie lithium\nToit panoramique'},
  {_key: key(), _type: 'internationalizedArrayTextValue', language: 'en', value: '160 L fridge\nTruma heating\nLithium battery\nPanoramic roof'},
]

const extras = [
  {_key: key(), _type: 'internationalizedArrayTextValue', language: 'nl', value: 'Thule voortent\nZonnepaneel\nFiamma fietsenrek voor 4 fietsen'},
  {_key: key(), _type: 'internationalizedArrayTextValue', language: 'fr', value: 'Auvent Thule\nPanneau solaire\nPorte-vélos Fiamma pour 4 vélos'},
  {_key: key(), _type: 'internationalizedArrayTextValue', language: 'en', value: 'Thule awning\nSolar panel\nFiamma bike rack for 4 bikes'},
]

const coverFoto = {
  _type: 'image',
  alt: 'Blucamp Ocean 527',
  asset: {_type: 'reference', _ref: 'image-54f59ede40ddbf01d74c0ae837c8add006a334f2-768x576-webp'},
}

const dagindeling = {
  _type: 'image',
  asset: {_type: 'reference', _ref: 'image-bf728ca0d98db57c740b120ec13ebfd9c32fccdf-1122x508-webp'},
}

const nachtindeling = {
  _type: 'image',
  asset: {_type: 'reference', _ref: 'image-e6d6c1c4af6207f0bde4646f35d6511e33e5fcc5-1122x508-webp'},
}

const fotoAssetRefs = [
  'image-c5e557e1501eb4fad39ebafc37edb823e68a39d9-768x576-webp',
  'image-2fb42b5d125bf03d2b2f080172e023c7507db6a2-768x576-webp',
  'image-0267758cc0c44d658f76481fa5beba2eddc3d0e9-768x1024-webp',
  'image-1fcc2854deeb66499769d010c91298cd7fb4b901-768x576-webp',
  'image-6de84ff57d0b729d5ed5d71acee528f9b95f6cb0-768x576-webp',
  'image-597915da803375ad08271efed2a89d7fcb62089e-768x576-jpg',
  'image-b79a864da09c8759b5ad69aa557ef2a663cd44ad-768x576-webp',
  'image-a6dfc481efad62da409c02278f34880ed0cb68a9-1200x1600-jpg',
  'image-fa1d36c625556eae1996f34daf599a5143bed026-1200x1600-jpg',
  'image-f1f769f8381c194a77f4b90b298d1106df55571e-1200x1600-jpg',
  'image-524e1aac18ffc7beea745471563ac272c8a09b96-1200x1600-jpg',
  'image-a3aa0cc90a5cc55cd50bf629ced19a55038f9a02-1600x1200-jpg',
  'image-4b43504b14288a55ef34e92a0fd81872baf7bb30-1200x1600-jpg',
  'image-8fb6d67aa480b1a13aad0fc5dffdfe72c31bf131-1200x1600-jpg',
]

const fotos = fotoAssetRefs.map((ref) => ({
  _key: key(),
  _type: 'image',
  alt: 'Blucamp Ocean 527',
  asset: {_type: 'reference', _ref: ref},
}))

async function main() {
  const result = await client
    .patch(RENTAL_ID)
    .set({
      opbouwtype: 'Halfintegraal',
      staat: 'Occasie',
      zitplaatsen: 5,
      slaapplaatsen: 5,
      onderstel: 'Ford Transit (verbreed spoor)',
      motor: 'Diesel, 155 pk',
      brandstof: 'Diesel',
      transmissie: 'Manueel (handgeschakeld)',
      rijbewijs: 'Type B',
      indeling,
      afmetingen: {lengte: 6.99, breedte: 2.23, hoogte: 2.87},
      leeggewicht: 2850,
      mtm: 3500,
      coverFoto,
      fotos,
      dagindeling,
      nachtindeling,
      chassisEnCabine,
      woongedeelte,
      extras,
    })
    .commit()

  console.log(`Bijgewerkt: ${result.titel} (${result._id})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
