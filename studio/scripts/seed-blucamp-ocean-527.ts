/**
 * Eenmalig testscript: maakt de "Blucamp Ocean 527" aan als camper te koop,
 * met data en foto's overgenomen van
 * https://bmc.idento.be/verkoop/blucamp-ocean-527-laika-hymer-group/
 * Dient om te controleren of het schema en alle velden werken.
 *
 * Draai met: npx sanity exec scripts/seed-blucamp-ocean-527.ts --with-user-token
 */
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

const FOTO_MAP = 'C:\\Users\\jensd\\AppData\\Local\\Temp\\blucamp-ocean-527'
const FOTO_BESTANDEN = ['01.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.jpeg', '07.webp']

async function main() {
  console.log('Merk "Blucamp" opzoeken of aanmaken...')
  let merkDoc = await client.fetch<{_id: string} | null>(`*[_type == "merk" && naam == "Blucamp"][0]{_id}`)
  if (!merkDoc) {
    merkDoc = await client.create({_type: 'merk', naam: 'Blucamp'})
    console.log('  -> nieuw merk aangemaakt:', merkDoc._id)
  } else {
    console.log('  -> bestaand merk gevonden:', merkDoc._id)
  }

  console.log("Foto's uploaden...")
  const geuploadeFotos = []
  for (const bestand of FOTO_BESTANDEN) {
    const bestandspad = path.join(FOTO_MAP, bestand)
    const asset = await client.assets.upload('image', fs.createReadStream(bestandspad), {
      filename: `blucamp-ocean-527-${bestand}`,
    })
    console.log(`  -> ${bestand} geupload:`, asset._id)
    geuploadeFotos.push({
      _type: 'image' as const,
      _key: bestand,
      asset: {_type: 'reference' as const, _ref: asset._id},
      alt: 'Blucamp Ocean 527',
    })
  }

  const slug = 'blucamp-ocean-527'
  const bestaandeCamper = await client.fetch<{_id: string} | null>(
    `*[_type == "verkoopVoertuig" && slug.current == $slug][0]{_id}`,
    {slug},
  )
  if (bestaandeCamper) {
    console.log('Er bestaat al een camper met deze slug, script stopt:', bestaandeCamper._id)
    return
  }

  console.log('Camper aanmaken...')
  const camper = await client.create({
    _type: 'verkoopVoertuig',
    titel: 'Blucamp Ocean 527',
    slug: {_type: 'slug', current: slug},
    merk: {_type: 'reference', _ref: merkDoc._id},
    groep: 'LAIKA – Hymer Group',
    opbouwtype: 'Halfintegraal',
    staat: 'Occasion',
    prijs: 62000,
    zitplaatsen: 5,
    slaapplaatsen: 5,
    bouwjaar: 2024,
    eersteInschrijving: '04/2024',
    kilometerstand: 70000,
    motor: 'Diesel, 155 pk',
    brandstof: 'Diesel',
    transmissie: 'Manueel (handgeschakeld)',
    rijbewijs: 'Type B',
    onderstel: 'Ford Transit (verbreed spoor)',
    indeling: 'Vast bed + handbediend hefbed',
    coverFoto: geuploadeFotos[0],
    fotos: geuploadeFotos,
    notitie:
      'Cabine-airco, cruise control, koelkast 160 l, Truma verwarming, lithiumbatterij, panoramadak, Thule voortent, zonnepaneel en Fiamma fietsenrek voor 4 fietsen. Ford-fabrieksgarantie tot 5 jaar/100.000 km (vanaf 09/2026).',
    gepubliceerd: true,
  })

  console.log('Klaar! Document aangemaakt:', camper._id)
  console.log('Bekijk op: http://localhost:3000/verkoop/blucamp-ocean-527/')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
