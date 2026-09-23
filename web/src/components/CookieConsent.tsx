"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { L, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";

export type CookieKeuze = "noodzakelijk" | "analytics";
const OPSLAGSLEUTEL = "bmc-cookiekeuze";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function haalCookieKeuze(): CookieKeuze | null {
  try {
    const waarde = localStorage.getItem(OPSLAGSLEUTEL);
    return waarde === "noodzakelijk" || waarde === "analytics" ? waarde : null;
  } catch {
    return null;
  }
}

/**
 * Bewust géén derde "voorkeuren"-categorie: de site plaatst zelf enkel
 * functionele (altijd aan) en analytische cookies (zie privacy-pagina,
 * §Cookies en analytics). GA4 (layout.tsx, Consent Mode v2) start met
 * analytics_storage op "denied" en leest zelf haalCookieKeuze() bij het
 * laden voor een reeds eerder gemaakte keuze; deze banner werkt bij
 * aanvaarden ook meteen gtag('consent','update', ...) bij voor directe
 * activatie in dezelfde sessie, zonder herlaad.
 *
 * De "Enkel noodzakelijke" en "Analytics aanvaarden" knoppen hebben bewust
 * gelijke visuele nadruk (zelfde stijl/grootte), zoals de Belgische
 * Gegevensbeschermingsautoriteit vereist — geen vooraf aangevinkte of
 * visueel bevoordeelde "aanvaarden"-knop.
 */
export function CookieConsent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    if (!haalCookieKeuze()) setZichtbaar(true);

    const openBanner = (e: Event) => {
      if ((e.target as HTMLElement | null)?.closest("[data-cookie-settings]")) {
        e.preventDefault();
        setZichtbaar(true);
      }
    };
    document.addEventListener("click", openBanner);
    return () => document.removeEventListener("click", openBanner);
  }, []);

  useEffect(() => {
    document.body.dataset.cookiebanner = zichtbaar ? "open" : "";
  }, [zichtbaar]);

  if (!zichtbaar) return null;

  const kies = (keuze: CookieKeuze) => {
    try {
      localStorage.setItem(OPSLAGSLEUTEL, keuze);
    } catch {
      // Privémodus/geblokkeerde opslag: keuze geldt enkel voor dit bezoek.
    }
    // Directe activatie zonder herlaad — het GA4-bootstrapscript in
    // layout.tsx zet analytics_storage standaard op "denied"; bij aanvaarden
    // hier meteen bijwerken i.p.v. te wachten tot de volgende paginalaad.
    if (keuze === "analytics" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
    setZichtbaar(false);
  };

  return (
    <div className="cookie-banner" role="dialog" aria-label={dict.cookieBanner.linkTekst}>
      <div className="wrap cookie-banner-inhoud">
        <p>
          {dict.cookieBanner.tekst}{" "}
          <Link href={L(locale, "/privacy/")}>{dict.cookieBanner.linkTekst}</Link>.
        </p>
        <div className="cookie-banner-knoppen">
          <button type="button" className="btn btn-stil" onClick={() => kies("noodzakelijk")}>
            {dict.cookieBanner.weigeren}
          </button>
          <button type="button" className="btn btn-goud" onClick={() => kies("analytics")}>
            {dict.cookieBanner.aanvaarden}
          </button>
        </div>
      </div>
    </div>
  );
}
