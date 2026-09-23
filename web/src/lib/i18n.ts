export const locales = ["nl", "fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

export const SITE_URL = "https://brusselmotorhomescenter.be";

/** Bouwt een locale-voorafgegaan pad, bv. L("fr", "/verkoop/") -> "/fr/verkoop/". */
export function L(locale: Locale, pad: string): string {
  return `/${locale}${pad}`;
}

/** Vervangt het locale-segment vooraan een pathname, voor de taalwisselaar. */
export function wisselLocale(pathname: string, doel: Locale): string {
  const zonderLocale = pathname.replace(/^\/(nl|fr|en)(?=\/|$)/, "");
  return `/${doel}${zonderLocale || "/"}`;
}

/**
 * `canonical` moet naar de huidige taalversie zelf wijzen — enkel de
 * `x-default`-hreflang hoort naar de standaardtaal (nl) te verwijzen. Elke
 * pagina geeft dus haar eigen `locale` door.
 */
export function buildAlternates(pad: string, locale: Locale) {
  const urlVoor = (l: Locale) => `${SITE_URL}${pad === "/" ? `/${l}/` : `/${l}${pad}`}`;
  return {
    canonical: urlVoor(locale),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, urlVoor(l)])),
      "x-default": urlVoor(defaultLocale),
    },
  };
}

const OG_LOCALE: Record<Locale, string> = { nl: "nl_BE", fr: "fr_BE", en: "en_US" };

type OgAfbeelding = { url: string; width: number; height: number; alt: string };

const STANDAARD_OG_AFBEELDING: OgAfbeelding = {
  url: `${SITE_URL}/assets/img/social/bmc-featured.png`,
  width: 1200,
  height: 630,
  alt: "Brussel Motorhomes Center",
};

/**
 * Volledig openGraph + twitter-metadata-object voor één pagina, incl. de
 * velden die het generieke checklist-vereist (og:url, og:site_name,
 * og:locale) en die makkelijk vergeten worden. Elke pagina roept dit zelf
 * aan met haar eigen title/description/pad — Next.js vervangt het volledige
 * openGraph-object van de parent-layout zodra een pagina er zelf een
 * teruggeeft (geen veld-per-veld merge), dus zonder deze helper zou elke
 * pagina die geen eigen openGraph opgeeft stil terugvallen op de generieke
 * homepage-kaart (zie LAUNCH.md §4).
 */
export function buildOpenGraph({
  locale,
  title,
  description,
  pad,
  afbeelding,
}: {
  locale: Locale;
  title: string;
  description: string;
  pad: string;
  afbeelding?: OgAfbeelding;
}) {
  const url = `${SITE_URL}${L(locale, pad)}`;
  const image = afbeelding ?? STANDAARD_OG_AFBEELDING;
  return {
    openGraph: {
      type: "website" as const,
      siteName: "Brussel Motorhomes Center",
      locale: OG_LOCALE[locale],
      url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [image.url],
    },
  };
}
