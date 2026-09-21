/**
 * Eenmalig testscript: maakt "Blucamp Laser 600" en "Benimar Cocoon 486" aan
 * als campers te koop, met data en foto's overgenomen van
 * https://bmc.idento.be/verkoop/blucamp-laser-600-laika-hymer-group/ en
 * https://bmc.idento.be/verkoop/benimar-cocoon-486/
 *
 * Draai met: npx sanity exec scripts/seed-laser-600-en-cocoon-486.ts --with-user-token
 */
import fs from 'node:fs'
import path from 'node:path'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2024-01-01'})

type FotoSpec = {map: string; bestanden: string[]}

async function vindOfMaakMerk(naam: string) {
  let doc = await client.fetch<{_id: string} | null>(`*[_type == "merk" && naam == $naam][0]{_id}`, {naam})
  if (!doc) {
    doc = await client.create({_type: 'merk', naam})
    console.log(`  -> nieuw merk "${naam}" aangemaakt:`, doc._id)
  } else {
    console.log(`  -> bestaand merk "${naam}" gevonden:`, doc._id)
  }
  return doc._id
}

async function uploadFotos(spec: FotoSpec, altTekst: string) {
  const resultaat = []
  for (const bestand of spec.bestanden) {
    const bestandspad = path.join(spec.map, bestand)
    const asset = await client.assets.upload('image', fs.createReadStream(bestandspad), {
      filename: `${path.basename(spec.map)}-${bestand}`,
    })
    console.log(`  -> ${bestand} geupload:`, asset._id)
    resultaat.push({
      _type: 'image' as const,
      _key: bestand,
      asset: {_type: 'reference' as const, _ref: asset._id},
      alt: altTekst,
    })
  }
  return resultaat
}

async function maakCamperIndienNieuw(slug: string, doc: Record<string, unknown>) {
  const bestaat = await client.fetch<{_id: string} | null>(
    `*[_type == "verkoopVoertuig" && slug.current == $slug][0]{_id}`,
    {slug},
  )
  if (bestaat) {
    console.log(`Er bestaat al een camper met slug "${slug}", overgeslagen:`, bestaat._id)
    return
  }
  const gemaakt = await client.create(doc)
  console.log('Camper aangemaakt:', gemaakt._id)
}

async function main() {
  console.log('--- Blucamp Laser 600 ---')
  const blucampId = await vindOfMaakMerk('Blucamp')
  const laserFotos = await uploadFotos(
    {map: 'C:\\Users\\jensd\\AppData\\Local\\Temp\\blucamp-laser-600', bestanden: ['01.webp', '02.webp', '03.webp', '04.webp', '05.webp', '06.webp', '07.webp']},
    'Blucamp Laser 600',
  )
  await maakCamperIndienNieuw('blucamp-laser-600', {
    _type: 'verkoopVoertuig',
    titel: 'Blucamp Laser 600',
    slug: {_type: 'slug', current: 'blucamp-laser-600'},
    merk: {_type: 'reference', _ref: blucampId},
    groep: 'LAIKA – Hymer Group',
    opbouwtype: 'Campervan',
    staat: 'Nieuw',
    prijs: 64500,
    zitplaatsen: 4,
    slaapplaatsen: 4,
    bouwjaar: 2026,
    kilometerstand: 10,
    motor: 'Diesel, 140 pk',
    brandstof: 'Diesel',
    transmissie: 'Manueel (handgeschakeld)',
    rijbewijs: 'Type B',
    onderstel: 'Fiat',
    indeling: 'Stapelbedden achteraan',
    coverFoto: laserFotos[0],
    fotos: laserFotos,
    chassisEnCabine: ['Cabine-airco', 'Cruise control', 'Draaibare comfortstoelen', 'Elektrische opstap', 'Achteruitrijcamera'].join('\n'),
    woongedeelte: ['Panoramadak', 'Truma Combi 4 verwarming', 'Koelkast 84 L', 'Watertank 100 L', 'Afvalwatertank 90 L', 'Uitneembaar bovenbed'].join('\n'),
    extras: ['Thule voortent', 'Zonnepaneel', 'Fietsendrager'].join('\n'),
    gepubliceerd: true,
  })

  console.log('--- Benimar Cocoon 486 ---')
  const benimarId = await vindOfMaakMerk('Benimar')
  const cocoonFotos = await uploadFotos(
    {map: 'C:\\Users\\jensd\\AppData\\Local\\Temp\\benimar-cocoon-486', bestanden: ['01.webp', '02.jpeg', '03.webp', '04.webp', '05.webp', '06.webp', '07.webp']},
    'Benimar Cocoon 486',
  )
  await maakCamperIndienNieuw('benimar-cocoon-486', {
    _type: 'verkoopVoertuig',
    titel: 'Benimar Cocoon 486',
    slug: {_type: 'slug', current: 'benimar-cocoon-486'},
    merk: {_type: 'reference', _ref: benimarId},
    opbouwtype: 'Integraal',
    staat: 'Occasion',
    prijs: 44950,
    zitplaatsen: 4,
    slaapplaatsen: 4,
    bouwjaar: 2017,
    eersteInschrijving: '05/2017',
    kilometerstand: 82000,
    motor: 'Diesel, 170 pk',
    brandstof: 'Diesel',
    transmissie: 'Manueel (handgeschakeld)',
    rijbewijs: 'Type B',
    onderstel: 'Ford Transit',
    indeling: 'Geen bed achteraan',
    coverFoto: cocoonFotos[0],
    fotos: cocoonFotos,
    // Geen uitrusting/accessoires vermeld op de bronpagina — bewust leeg gelaten i.p.v. verzonnen.
    gepubliceerd: true,
  })

  console.log('Klaar!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
