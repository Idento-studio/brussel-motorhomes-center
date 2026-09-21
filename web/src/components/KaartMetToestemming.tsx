"use client";

import { useState } from "react";
import { haalCookieKeuze } from "./CookieConsent";

/**
 * Laadt de Google Maps-iframe pas na een expliciete klik (in plaats van
 * automatisch bij het laden van de pagina), zodat Google's cookies niet
 * zonder toestemming al meteen geplaatst worden. Onafhankelijk van de
 * cookiebanner-keuze (die gaat enkel over de eigen analytische cookies van
 * de site) — wie eerder al "Analytics aanvaarden" koos, ziet de kaart wel
 * meteen, als signaal dat ze cookies van derden aanvaarden.
 */
export function KaartMetToestemming({ src, titel, knopTekst, uitlegTekst }: {
  src: string;
  titel: string;
  knopTekst: string;
  uitlegTekst: string;
}) {
  const [geladen, setGeladen] = useState(() => haalCookieKeuze() === "analytics");

  if (!geladen) {
    return (
      <button type="button" className="kaart-placeholder" onClick={() => setGeladen(true)}>
        <span>{uitlegTekst}</span>
        <span className="btn btn-stil btn-klein">{knopTekst}</span>
      </button>
    );
  }

  return <iframe src={src} title={titel} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />;
}
