import { client } from "./client";
import type { VerhuurVoertuig, VerkoopVoertuig } from "./types";
import type { Locale } from "@/lib/i18n";

/**
 * Velden die met sanity-plugin-internationalized-array zijn ingevoerd, komen
 * terug als [{language: "nl", value: "..."}, {language: "fr", value: "..."}].
 * Deze helper haalt de waarde voor de actieve taal op, met terugval op
 * Nederlands (nooit een leeg veld tonen als de Franse vertaling nog
 * ontbreekt).
 *
 * Filtert op het "language"-veld, niet op _key: de v4-versie van de plugin
 * zette de taalcode nog in _key (bv. _key == "nl"), maar sinds de v5-migratie
 * (zie studio/migrations/internationalized-array-v5) staat die taalcode in
 * een apart "language"-veld en is _key een willekeurige string. Filteren op
 * _key == locale matcht sindsdien niets meer — elk internationalizedArray-
 * veld op de hele site (indeling, garantie, chassisEnCabine, woongedeelte,
 * extras, promoTekst, notitie, ...) kwam daardoor leeg terug, ook al staat
 * de data er wel degelijk.
 */
function vertaald(veld: string, locale: Locale) {
  return `"${veld}": coalesce(${veld}[language == "${locale}"][0].value, ${veld}[language == "nl"][0].value)`;
}

function verkoopVelden(locale: Locale) {
  return `{
  _id,
  titel,
  "slug": slug.current,
  "merk": merk->naam,
  groep,
  opbouwtype,
  staat,
  prijs,
  ${vertaald("promoTekst", locale)},
  promoPrijs,
  zitplaatsen,
  slaapplaatsen,
  bouwjaar,
  eersteInschrijving,
  kilometerstand,
  motor,
  brandstof,
  transmissie,
  rijbewijs,
  onderstel,
  ${vertaald("indeling", locale)},
  afmetingen,
  leeggewicht,
  mtm,
  ${vertaald("garantie", locale)},
  mindervalideGeschikt,
  mindervalideAanpassingen,
  coverFoto,
  fotos,
  dagindeling,
  nachtindeling,
  ${vertaald("chassisEnCabine", locale)},
  ${vertaald("woongedeelte", locale)},
  ${vertaald("extras", locale)}
}`;
}

function verhuurVelden(locale: Locale) {
  return `{
  _id,
  titel,
  "slug": slug.current,
  ${vertaald("promoTekst", locale)},
  "merk": merk->naam,
  opbouwtype,
  staat,
  zitplaatsen,
  slaapplaatsen,
  onderstel,
  motor,
  brandstof,
  transmissie,
  rijbewijs,
  ${vertaald("indeling", locale)},
  afmetingen,
  leeggewicht,
  mtm,
  mindervalideGeschikt,
  mindervalideAanpassingen,
  coverFoto,
  fotos,
  dagindeling,
  nachtindeling,
  ${vertaald("chassisEnCabine", locale)},
  ${vertaald("woongedeelte", locale)},
  ${vertaald("extras", locale)},
  tarieven,
  ${vertaald("notitie", locale)}
}`;
}

export async function haalVerkoopVoertuigen(locale: Locale): Promise<VerkoopVoertuig[]> {
  return client.fetch(
    `*[_type == "verkoopVoertuig" && gepubliceerd != false] | order(coalesce(volgorde, 9999) asc, titel asc) ${verkoopVelden(locale)}`,
  );
}

export async function haalVerkoopVoertuig(slug: string, locale: Locale): Promise<VerkoopVoertuig | null> {
  return client.fetch(
    `*[_type == "verkoopVoertuig" && slug.current == $slug][0] ${verkoopVelden(locale)}`,
    { slug },
  );
}

export async function haalVerhuurVoertuigen(locale: Locale): Promise<VerhuurVoertuig[]> {
  return client.fetch(
    `*[_type == "verhuurVoertuig" && gepubliceerd != false] | order(coalesce(volgorde, 9999) asc, titel asc) ${verhuurVelden(locale)}`,
  );
}

export async function haalVerhuurVoertuig(slug: string, locale: Locale): Promise<VerhuurVoertuig | null> {
  return client.fetch(
    `*[_type == "verhuurVoertuig" && slug.current == $slug][0] ${verhuurVelden(locale)}`,
    { slug },
  );
}
