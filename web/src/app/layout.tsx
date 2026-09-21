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
import { metPad } from "@/lib/basePath";

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
  // favicon.ico en apple-icon.png worden automatisch opgepikt via de
  // Next.js-bestandsconventie in deze map (src/app/) — geen metadata nodig.
  // Het manifest (public/site.webmanifest) wordt niet automatisch gelinkt
  // omdat het geen app/manifest.ts is, dus dat moet wel hier.
  manifest: metPad("/site.webmanifest"),
};

export const viewport: Viewport = {
  themeColor: "#1A4B77",
};

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
      <body>{children}</body>
    </html>
  );
}
