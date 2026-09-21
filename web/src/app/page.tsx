import type { Metadata } from "next";
import { defaultLocale, locales, L, SITE_URL } from "@/lib/i18n";
import { metPad } from "@/lib/basePath";

// Statische export kent geen middleware/server, dus de wissel van "/" naar de
// standaardtaal gebeurt via een inline script (direct bij het laden, geen
// wachttijd) met een zichtbare noscript-link als vangnet voor bezoekers
// zonder JS. Deze pagina zelf is een technische tussenstop, geen echte
// contentpagina, en wordt daarom uit de zoekresultaten gehouden — de echte
// pagina's zijn /nl/ en /fr/.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: {
    languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${L(l, "/")}`])),
  },
};

export default function RootRedirect() {
  const doel = metPad(L(defaultLocale, "/"));
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(doel)});`,
        }}
      />
      <noscript>
        <a href={doel}>Ga naar de website / Aller au site / Go to the website</a>
      </noscript>
    </>
  );
}
