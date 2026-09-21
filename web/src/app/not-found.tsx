import Link from "next/link";
import { L } from "@/lib/i18n";

// Vangnet voor paden die geen enkele locale herkennen (bv. rechtstreeks een
// oude URL zonder /nl/, /fr/ of /en/ voorvoegsel). De echte, taalspecifieke
// 404-pagina staat in app/[locale]/not-found.tsx.
export default function RootNotFound() {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "1rem", fontFamily: "system-ui, sans-serif", textAlign: "center" }}>
      <p>Deze pagina bestaat niet. / Cette page n&rsquo;existe pas. / This page does not exist.</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href={L("nl", "/")}>Nederlands</Link>
        <Link href={L("fr", "/")}>Français</Link>
        <Link href={L("en", "/")}>English</Link>
      </div>
    </main>
  );
}
