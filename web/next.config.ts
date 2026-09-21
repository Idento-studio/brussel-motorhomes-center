import type { NextConfig } from "next";

// Enkel gezet tijdens een GitHub Pages-projectpagina-build (zie
// .github/workflows/deploy-pages.yml) — op het uiteindelijke hoofddomein
// (brusselmotorhomescenter.be) blijft dit leeg. Zie ook src/lib/basePath.ts
// voor de <img>/<video>-bronnen die dit pad zelf moeten meenemen.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // De site wordt volledig statisch geëxporteerd en enkel op build-time
  // herbouwd via een Sanity-webhook — zie de toelichting in src/sanity/client.ts.
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    // Sanity's eigen CDN doet al het resizen (zie src/sanity/image.ts),
    // en next/image's optimizer werkt sowieso niet met output: 'export'.
    unoptimized: true,
  },
};

export default nextConfig;
