export const locales = ["nl", "fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

export const SITE_URL = "https://brusselmotorhomes.be";

/** Bouwt een locale-voorafgegaan pad, bv. L("fr", "/verkoop/") -> "/fr/verkoop/". */
export function L(locale: Locale, pad: string): string {
  return `/${locale}${pad}`;
}

/** Vervangt het locale-segment vooraan een pathname, voor de taalwisselaar. */
export function wisselLocale(pathname: string, doel: Locale): string {
  const zonderLocale = pathname.replace(/^\/(nl|fr|en)(?=\/|$)/, "");
  return `/${doel}${zonderLocale || "/"}`;
}

export function buildAlternates(pad: string) {
  const urlVoor = (locale: Locale) => `${SITE_URL}${pad === "/" ? `/${locale}/` : `/${locale}${pad}`}`;
  return {
    canonical: urlVoor(defaultLocale),
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, urlVoor(locale)])),
      "x-default": urlVoor(defaultLocale),
    },
  };
}
