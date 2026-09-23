import type { Metadata } from "next";
import { defaultLocale, locales, L, SITE_URL, buildOpenGraph } from "@/lib/i18n";
import { metPad } from "@/lib/basePath";

// Statische export kent geen middleware/server, dus de wissel van "/" naar de
// standaardtaal gebeurt via een inline script (direct bij het laden, geen
// wachttijd) met een zichtbare noscript-link als vangnet voor bezoekers
// zonder JS. Deze pagina zelf is een technische tussenstop, geen echte
// contentpagina, en wordt daarom uit de zoekresultaten gehouden — de echte
// pagina's zijn /nl/ en /fr/.
//
// Linkpreview-crawlers (WhatsApp, Facebook, ...) voeren geen JavaScript uit
// en volgen deze redirect dus niet — ze zien enkel de kale HTML van déze
// pagina. Zonder eigen og:title/og:image viel dat terug op de generieke
// title/description uit de root layout, zonder afbeelding: precies wat de
// klant zag bij het delen van https://brusselmotorhomescenter.be/ (de meest
// voor de hand liggende, kale URL) in WhatsApp. Titel/beschrijving hieronder
// zijn bewust identiek aan de NL-homepage (/nl/), zodat de preview klopt nog
// vóór de browser de JS-redirect uitvoert.
const title = "Motorhomes kopen, huren en onderhouden";
const description =
  "Motorhomes kopen, huren of onderhouden in België, vlakbij Brussel. Ruim aanbod, eigen werkplaats en begeleiding tot Belgische homologatie.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: true },
  alternates: {
    languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}${L(l, "/")}`])),
  },
  ...buildOpenGraph({ locale: defaultLocale, title, description, pad: "/" }),
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
