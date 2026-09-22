import type { MetadataRoute } from "next";
import { locales, defaultLocale, L, SITE_URL, type Locale } from "@/lib/i18n";
import { haalVerkoopVoertuigen, haalVerhuurVoertuigen } from "@/sanity/queries";

// Verplicht bij "output: export" — anders bouwt Next.js sitemap.xml niet
// als statisch bestand maar verwacht het een runtime route.
export const dynamic = "force-static";

// Statische paden (geen dynamische [slug]-detailpagina's) die op elke taal
// bestaan. Moet in sync blijven met de daadwerkelijke pagina's onder
// src/app/[locale]/ — er is geen automatische route-scan bij een statische
// export, dus een nieuwe pagina moet hier manueel bijkomen.
const STATISCHE_PADEN = [
  "/",
  "/verkoop/",
  "/verhuur/",
  "/onderhoud/",
  "/onderhoud/chassis/",
  "/onderhoud/leefruimte/",
  "/accessoires-en-opties/",
  "/camper-op-maat/",
  "/camper-op-maat/start-project/",
  "/andersvaliden/",
  "/verkoop-je-camper/",
  "/contact/",
  "/over-ons/",
  "/privacy/",
  "/veelgestelde-vragen/",
];

function talenVoor(pad: string) {
  const urlVoor = (locale: Locale) => `${SITE_URL}${L(locale, pad)}`;
  return {
    languages: {
      ...Object.fromEntries(locales.map((locale) => [locale, urlVoor(locale)])),
      "x-default": urlVoor(defaultLocale),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items: MetadataRoute.Sitemap = [];

  for (const pad of STATISCHE_PADEN) {
    for (const locale of locales) {
      items.push({
        url: `${SITE_URL}${L(locale, pad)}`,
        alternates: talenVoor(pad),
        priority: pad === "/" ? 1 : 0.7,
      });
    }
  }

  // Voertuigdetailpagina's per taal opgehaald zodat een verkocht/offline
  // gezet voertuig (gepubliceerd != false in de Sanity-query) vanzelf uit
  // de sitemap verdwijnt bij de volgende build.
  for (const locale of locales) {
    const [koop, huur] = await Promise.all([
      haalVerkoopVoertuigen(locale),
      haalVerhuurVoertuigen(locale),
    ]);
    for (const v of koop) {
      items.push({
        url: `${SITE_URL}${L(locale, `/verkoop/${v.slug}/`)}`,
        alternates: talenVoor(`/verkoop/${v.slug}/`),
        priority: 0.8,
      });
    }
    for (const v of huur) {
      items.push({
        url: `${SITE_URL}${L(locale, `/verhuur/${v.slug}/`)}`,
        alternates: talenVoor(`/verhuur/${v.slug}/`),
        priority: 0.8,
      });
    }
  }

  return items;
}
