import Link from "next/link";
import { L } from "@/lib/i18n";

// not-found.tsx krijgt in App Router geen betrouwbare toegang tot het
// [locale]-segment, dus deze pagina toont bewust alle drie talen naast
// elkaar i.p.v. te gokken welke taal actief was.
export default function NotFound() {
  return (
    <main id="inhoud">
      <section className="sectie" style={{ textAlign: "center" }}>
        <div className="wrap">
          <p className="label">Foutmelding 404 · Erreur 404 · 404 error</p>
          <h1 style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-h1)" }}>
            Deze pagina bestaat niet · Cette page n&rsquo;existe pas · This page does not exist
          </h1>
          <p style={{ margin: "var(--sp-4) auto 0", maxWidth: "48ch", color: "var(--text-muted)" }}>
            De pagina die u zoekt is verplaatst of bestaat niet meer.
            <br />
            La page que vous recherchez a été déplacée ou n&rsquo;existe plus.
            <br />
            The page you&rsquo;re looking for has moved or no longer exists.
          </p>
          <div
            className="knoppen"
            style={{ marginTop: "var(--sp-6)", display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}
          >
            <Link className="btn btn-goud" href={L("nl", "/")}>Nederlandstalige site</Link>
            <Link className="btn btn-blauw" href={L("fr", "/")}>Site en français</Link>
            <Link className="btn btn-stil" href={L("en", "/")}>English site</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
