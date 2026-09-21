import type { Locale } from "./i18n";

/**
 * Vaste keuzelijst-waarden (opbouwtype, brandstof, transmissie) worden in
 * Sanity in het Nederlands opgeslagen — één canonieke waarde, geen taal-
 * tabblad nodig zoals bij vrije tekstvelden. Deze vertaalt enkel het label
 * dat op de website getoond wordt.
 */
const OPBOUWTYPE: Record<"fr" | "en", Record<string, string>> = {
  fr: {
    Alkoof: "Capucine",
    Campervan: "Fourgon aménagé",
    Halfintegraal: "Profilé",
    Integraal: "Intégral",
  },
  en: {
    Alkoof: "Coachbuilt (overcab)",
    Campervan: "Campervan",
    Halfintegraal: "Semi-integrated",
    Integraal: "Fully integrated",
  },
};

const BRANDSTOF: Record<"fr" | "en", Record<string, string>> = {
  fr: {
    Diesel: "Diesel",
    Benzine: "Essence",
    Elektrisch: "Électrique",
    Hybride: "Hybride",
  },
  en: {
    Diesel: "Diesel",
    Benzine: "Petrol",
    Elektrisch: "Electric",
    Hybride: "Hybrid",
  },
};

const TRANSMISSIE: Record<"fr" | "en", Record<string, string>> = {
  fr: {
    "Manueel (handgeschakeld)": "Manuelle",
    Automaat: "Automatique",
  },
  en: {
    "Manueel (handgeschakeld)": "Manual",
    Automaat: "Automatic",
  },
};

function vertaal(waarde: string | undefined, tabel: Record<"fr" | "en", Record<string, string>>, locale: Locale) {
  if (!waarde) return waarde;
  if (locale === "nl") return waarde;
  return tabel[locale][waarde] ?? waarde;
}

export function opbouwtypeLabel(waarde: string | undefined, locale: Locale) {
  return vertaal(waarde, OPBOUWTYPE, locale);
}

export function brandstofLabel(waarde: string | undefined, locale: Locale) {
  return vertaal(waarde, BRANDSTOF, locale);
}

export function transmissieLabel(waarde: string | undefined, locale: Locale) {
  return vertaal(waarde, TRANSMISSIE, locale);
}

export function staatLabel(waarde: "Nieuw" | "Occasie", locale: Locale) {
  if (locale === "fr") return waarde === "Nieuw" ? "Neuf" : "Occasion";
  if (locale === "en") return waarde === "Nieuw" ? "New" : "Used";
  return waarde;
}

export function rijbewijsLabel(waarde: string | undefined, locale: Locale) {
  if (!waarde) return waarde;
  if (locale === "nl") return waarde;
  // "Type B" / "Rijbewijs B" -> "Permis B" / "Licence B"
  const match = waarde.match(/\b([A-Z]{1,3})\b\s*$/);
  if (!match) return waarde;
  return locale === "fr" ? `Permis ${match[1]}` : `Licence ${match[1]}`;
}
