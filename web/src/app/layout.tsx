import type { Metadata, Viewport } from "next";
import { Newsreader, Instrument_Sans } from "next/font/google";
import "@/styles/brand.css";
import "@/styles/layout.css";
import "@/styles/components.css";
import "@/styles/aanbod.css";
import "@/styles/home.css";
import "@/styles/info.css";
import "@/styles/contact.css";
import "@/styles/privacy.css";
import "@/styles/configurator.css";
import "./globals.css";
import { SITE_URL } from "@/lib/i18n";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-newsreader",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Brussel Motorhomes Center",
    template: "%s | Brussel Motorhomes Center",
  },
  description: "Motorhomes te koop en te huur bij Brussel Motorhomes Center.",
  // favicon.ico, apple-icon.png en manifest.ts worden automatisch opgepikt
  // via de Next.js-bestandsconventie in deze map (src/app/) — geen
  // metadata-veld nodig.
};

export const viewport: Viewport = {
  themeColor: "#1A4B77",
};

/**
 * Basis-CSP als <meta http-equiv>, omdat dit vandaag nog als volledig
 * statische export op GitHub Pages draait — die laat geen eigen HTTP-headers
 * toe, enkel een meta-tag kan dus overal (ook op de preview) afdwingen wat
 * er mag laden. Zodra de site op Vercel draait, komt daar via vercel.json
 * headers[] een sterkere versie bovenop (die kan wél frame-ancestors zetten,
 * wat een meta-tag niet kan). 'unsafe-inline' is nodig voor de twee inline
 * redirectscripts (/ en /studio) en voor de React inline style-attributen
 * die overal in de site gebruikt worden — een striktere nonce-gebaseerde CSP
 * kan niet zonder server die per request een nonce genereert.
 * googletagmanager.com/google-analytics.com staan er alvast bij zodat GA4
 * (LAUNCH.md §7, nog niet geactiveerd) meteen werkt zonder deze policy dan
 * nog eens te moeten aanpassen.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.sanity.io https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://formspree.io https://*.sanity.io https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com",
  "frame-src 'self' https://www.google.com",
  "form-action 'self' https://formspree.io",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const GA_MEASUREMENT_ID = "G-0MDYKGHD3R";

/**
 * Consent Mode v2, vóór gtag.js zelf geladen wordt: alle opslag standaard
 * "denied", en enkel bijgewerkt naar "granted" als de bezoeker al eerder
 * "analytics" koos in de cookiebanner (CookieConsent.tsx, opgeslagen onder
 * localStorage-sleutel "bmc-cookiekeuze" — moet in sync blijven met die
 * OPSLAGSLEUTEL/CookieKeuze-waarde als die ooit wijzigt). dataLayer.push()
 * queuet gewoon door terwijl het externe script (hieronder, async) nog laadt
 * — de volgorde van dít inline script vóór dat <script async>-tag is dus
 * voldoende, ze hoeven niet op elkaar te wachten.
 * kies("analytics") in CookieConsent.tsx roept nadien zelf ook nog
 * gtag('consent','update', ...) aan, voor directe activatie zonder herlaad.
 */
const GA_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied'
});
try {
  if (localStorage.getItem('bmc-cookiekeuze') === 'analytics') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`;

// De echte html/body-shell staat enkel hier (verplicht: de root layout is de
// enige plek die <html>/<body> mag renderen), dus deze layout kent de actieve
// taal niet — enkel het geneste [locale]-segment weet of het nl/fr/en is.
// Twee dingen zorgen ervoor dat elke pagina toch met het juiste, regio-
// gekwalificeerde lang-attribuut (nl-BE/fr-BE/en-GB) bij bezoekers EN
// crawlers terechtkomt, zonder op JavaScript te moeten steunen:
//  1. scripts/fix-lang.mjs herschrijft na "next build" elk bestand in
//     out/{nl,fr,en}/**/*.html naar het juiste lang-attribuut — dat is wat
//     er letterlijk in de HTML staat die een crawler/curl te zien krijgt.
//  2. SetHtmlLang.tsx corrigeert het client-side na hydratatie (React zou
//     de door fix-lang.mjs aangepaste waarde anders bij hydratatie
//     terugzetten naar wat deze component hier rendert).
// "nl-BE" hier is enkel de fallback voor de korte /-redirectpagina zelf,
// die geen locale-segment heeft.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl-BE" className={`${newsreader.variable} ${instrumentSans.variable}`}>
      <head>
        <meta httpEquiv="Content-Security-Policy" content={CSP} />
        <script dangerouslySetInnerHTML={{ __html: GA_BOOTSTRAP }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      </head>
      <body>{children}</body>
    </html>
  );
}
