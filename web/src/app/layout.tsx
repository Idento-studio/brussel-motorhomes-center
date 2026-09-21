import type { Metadata } from "next";
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
};

// De echte html/body-shell staat enkel hier (verplicht: de root layout is de
// enige plek die <html>/<body> mag renderen). De taal (lang-attribuut) wordt
// hieronder in app/[locale]/layout.tsx dynamisch gezet, want deze root-layout
// kent de actieve taal niet — zie SetHtmlLang.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${newsreader.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
