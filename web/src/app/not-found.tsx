import Link from "next/link";
import { L } from "@/lib/i18n";

// Vangnet voor paden die geen enkele locale herkennen (bv. rechtstreeks een
// oude URL zonder /nl/, /fr/ of /en/ voorvoegsel). Dit is bij een volledig
// statische export (geen server om een pad ten tijde van het bezoek te
// evalueren) de pagina die GitHub Pages/Vercel effectief als 404.html
// serveert voor élke niet-bestaande URL — dus ook voor de meeste kapotte
// links. De taalspecifieke app/[locale]/not-found.tsx wordt enkel bereikt
// via een expliciete notFound()-aanroep binnen een al gematchte route
// (komt in de praktijk zelden voor bij een statische export), niet voor
// willekeurige kapotte URL's.
export default function RootNotFound() {
  return (
    <main id="inhoud" style={{ minHeight: "60vh" }}>
      <section className="sectie" style={{ textAlign: "center" }}>
        <div className="wrap">
          <p className="label">Foutmelding 404 · Erreur 404 · 404 error</p>
          <h1 style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-h1)" }}>
            Deze pagina bestaat niet · Cette page n&rsquo;existe pas · This page does not exist
          </h1>
          <p style={{ margin: "var(--sp-4) auto 0", maxWidth: "48ch", color: "var(--text-muted)" }}>
            De pagina die u zoekt is verplaatst of bestaat niet meer. Onderstaande pagina&rsquo;s brengen u wel waar u wil zijn.
            <br />
            La page que vous recherchez a été déplacée ou n&rsquo;existe plus. Les pages ci-dessous vous mènent où vous voulez aller.
            <br />
            The page you&rsquo;re looking for has moved or no longer exists. The pages below will take you where you want to go.
          </p>

          <div
            className="knoppen"
            style={{ marginTop: "var(--sp-6)", display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}
          >
            <Link className="btn btn-goud" href={L("nl", "/")}>Nederlandstalige site</Link>
            <Link className="btn btn-blauw" href={L("fr", "/")}>Site en français</Link>
            <Link className="btn btn-stil" href={L("en", "/")}>English site</Link>
          </div>

          <div style={{ marginTop: "var(--sp-7)", display: "grid", gap: "var(--sp-4)" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-small)" }}>
              Motorhomes te koop / à vendre / for sale
            </p>
            <div className="knoppen" style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", justifyContent: "center" }}>
              <Link className="btn btn-stil btn-klein" href={L("nl", "/verkoop/")}>NL</Link>
              <Link className="btn btn-stil btn-klein" href={L("fr", "/verkoop/")}>FR</Link>
              <Link className="btn btn-stil btn-klein" href={L("en", "/verkoop/")}>EN</Link>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-small)" }}>
              Motorhomes te huur / à louer / for rent
            </p>
            <div className="knoppen" style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", justifyContent: "center" }}>
              <Link className="btn btn-stil btn-klein" href={L("nl", "/verhuur/")}>NL</Link>
              <Link className="btn btn-stil btn-klein" href={L("fr", "/verhuur/")}>FR</Link>
              <Link className="btn btn-stil btn-klein" href={L("en", "/verhuur/")}>EN</Link>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--fs-small)" }}>
              Contact / Contact / Contact
            </p>
            <div className="knoppen" style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", justifyContent: "center" }}>
              <Link className="btn btn-stil btn-klein" href={L("nl", "/contact/")}>NL</Link>
              <Link className="btn btn-stil btn-klein" href={L("fr", "/contact/")}>FR</Link>
              <Link className="btn btn-stil btn-klein" href={L("en", "/contact/")}>EN</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
