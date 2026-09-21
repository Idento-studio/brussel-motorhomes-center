import { L, SITE_URL, type Locale } from "./i18n";

/**
 * JSON-LD-bouwstenen (schema.org), één keer opgebouwd op basis van échte,
 * al elders in de site gebruikte bedrijfsgegevens — geen enkel veld hier is
 * verzonnen. Bewust weggelaten:
 *  - `geo` (lat/long): geen geverifieerde exacte coördinaat beschikbaar.
 *    Google Maps geeft die exact als je er een pin zet op het adres — laat
 *    het weten en ik vul dit aan.
 *  - `sameAs` (social/Google Business Profile): bestaan nog niet, zie
 *    memory bmc-brand-and-seo-facts — voegt zichzelf toe zodra die er zijn.
 */

const BEDRIJF = {
  naam: "Brussel Motorhomes Center",
  telefoon: "+32471407949",
  email: "bmcbrussel@outlook.com",
  straat: "Rue de l'Alliance 103",
  postcode: "1480",
  plaats: "Clabecq",
  land: "BE",
};

function absoluut(locale: Locale, pad: string) {
  return `${SITE_URL}${L(locale, pad)}`;
}

export function buildLocalBusiness(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    name: BEDRIJF.naam,
    url: absoluut(locale, "/"),
    telephone: BEDRIJF.telefoon,
    email: BEDRIJF.email,
    image: `${SITE_URL}/assets/img/og/bmc-featured.png`,
    priceRange: "€€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: BEDRIJF.straat,
      postalCode: BEDRIJF.postcode,
      addressLocality: BEDRIJF.plaats,
      addressCountry: BEDRIJF.land,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };
}

export function buildOrganizationAndWebSite(locale: Locale) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: BEDRIJF.naam,
      url: absoluut(locale, "/"),
      logo: `${SITE_URL}/assets/img/logo/bmc-logo.svg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BEDRIJF.naam,
      url: absoluut(locale, "/"),
      inLanguage: locale,
    },
  ];
}

export function buildBreadcrumbList(locale: Locale, items: { label: string; pad?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.pad ? { item: absoluut(locale, item.pad) } : {}),
    })),
  };
}

export function buildFAQPage(vragen: { vraag: string; antwoord: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: vragen.map((v) => ({
      "@type": "Question",
      name: v.vraag,
      acceptedAnswer: {
        "@type": "Answer",
        text: v.antwoord,
      },
    })),
  };
}

export function buildRentalProduct(
  locale: Locale,
  voertuig: { titel: string; slug: string; vanafPrijs?: number; afbeelding: string; beschrijving?: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: voertuig.titel,
    image: voertuig.afbeelding,
    url: absoluut(locale, `/verhuur/${voertuig.slug}/`),
    ...(voertuig.beschrijving ? { description: voertuig.beschrijving } : {}),
    ...(voertuig.vanafPrijs
      ? {
          offers: {
            "@type": "Offer",
            businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
            priceCurrency: "EUR",
            price: voertuig.vanafPrijs,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function buildService(locale: Locale, naam: string, beschrijving: string, pad: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: naam,
    description: beschrijving,
    url: absoluut(locale, pad),
    provider: {
      "@type": "AutomotiveBusiness",
      name: BEDRIJF.naam,
    },
    areaServed: "BE",
  };
}
