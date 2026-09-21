import type { MetadataRoute } from "next";
import { metPad } from "@/lib/basePath";

// Verplicht bij "output: export" — anders bouwt Next.js het manifest niet
// als statisch bestand maar verwacht het een runtime route.
export const dynamic = "force-static";

// Vervangt het vroegere public/site.webmanifest: als app/manifest.ts wordt
// dit automatisch gelinkt (geen metadata.manifest-veld meer nodig in
// layout.tsx) én lopen de iconpaden via metPad(), zodat ze ook op de
// GitHub Pages-preview (met basePath) naar een bestaand bestand wijzen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Brussel Motorhomes Center",
    short_name: "BMC",
    description: "Motorhomes kopen, huren en onderhouden in België.",
    start_url: metPad("/"),
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1A4B77",
    lang: "nl-BE",
    icons: [
      { src: metPad("/assets/img/icon/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: metPad("/assets/img/icon/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}
