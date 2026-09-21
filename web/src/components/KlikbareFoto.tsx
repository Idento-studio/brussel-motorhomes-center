"use client";

import { useEffect, useRef, useState } from "react";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";

/**
 * Eén losse foto (bv. dag-/nachtindeling) die bij klikken vergroot opent in
 * dezelfde lichtbak-stijl als de hoofdgalerij (zie Gallery.tsx + de
 * .lichtbak-klassen in aanbod.css) — hier zonder vorige/volgende omdat het
 * conceptueel één op zichzelf staande foto is, geen doorbladerbare reeks.
 * Neemt `locale` i.p.v. `dict` (zie Formulier.tsx voor waarom).
 */
export function KlikbareFoto({ src, groteSrc, alt, locale }: { src: string; groteSrc: string; alt: string; locale: Locale }) {
  const g = getDictionary(locale).voertuig.galerij;
  const [open, setOpen] = useState(false);
  const sluitKnop = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    sluitKnop.current?.focus();
    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = vorigeOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" className="media media-4x3 media-rond galerij-opener" onClick={() => setOpen(true)}>
        <img src={src} alt={alt} />
        <span className="galerij-vergroot" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M11 8v6M8 11h6" /></svg>
          {g.bekijkFoto}
        </span>
      </button>

      {open && (
        <div className="lichtbak" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
          <button ref={sluitKnop} type="button" className="lichtbak-sluit" onClick={() => setOpen(false)} aria-label={g.sluiten}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
          <img className="lichtbak-foto" src={groteSrc} alt={alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
