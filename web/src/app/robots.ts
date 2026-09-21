import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/i18n";
import { BASE_PATH } from "@/lib/basePath";

// Verplicht bij "output: export" — anders bouwt Next.js robots.txt niet als
// statisch bestand maar verwacht het een runtime route.
export const dynamic = "force-static";

// NEXT_PUBLIC_BASE_PATH staat enkel tijdens de GitHub Pages-previewbuild.
// Die preview mag nooit meeconcurreren met het echte domein in Google —
// dus daar alles blokkeren i.p.v. de normale, AI-crawlers-toelatende regels.
export default function robots(): MetadataRoute.Robots {
  if (BASE_PATH) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // Zichtbaarheid in AI-antwoorden (ChatGPT, Claude, Perplexity, Google
      // AI Overviews) weegt hier zwaarder dan het trainingsbezwaar.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Bytespider", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
