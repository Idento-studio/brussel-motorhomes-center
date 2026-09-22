"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { urlFor, urlForVolledig } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";

const MAX_DUIMEN = 6;

export function Gallery({ fotos, titel, badge, locale }: { fotos: SanityImage[]; titel: string; badge?: string; locale: Locale }) {
  const g = getDictionary(locale).voertuig.galerij;
  const [actief, setActief] = useState(0);
  const [open, setOpen] = useState(false);
  const sluitKnop = useRef<HTMLButtonElement>(null);

  const vorige = useCallback(() => {
    setActief((i) => (i - 1 + fotos.length) % fotos.length);
  }, [fotos.length]);

  const volgende = useCallback(() => {
    setActief((i) => (i + 1) % fotos.length);
  }, [fotos.length]);

  useEffect(() => {
    if (!open) return;
    sluitKnop.current?.focus();
    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowLeft") vorige();
      else if (e.key === "ArrowRight") volgende();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = vorigeOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, vorige, volgende]);

  if (fotos.length === 0) {
    return (
      <div className="galerij">
        <div className="media media-4x3 media-rond">
          {badge && <span className="badge badge-occasion">{badge}</span>}
        </div>
      </div>
    );
  }

  const hoofdfoto = fotos[actief];

  return (
    <>
      <div className="galerij">
        <button type="button" className="media media-4x3 media-rond galerij-opener" onClick={() => setOpen(true)}>
          {badge && <span className="badge badge-occasion">{badge}</span>}
          <img src={urlFor(hoofdfoto).width(1200).height(900).fit("crop").url()} alt={hoofdfoto.alt ?? titel} />
          <span className="galerij-vergroot" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3M11 8v6M8 11h6" /></svg>
            {g.bekijkFotos}
          </span>
          {fotos.length > 1 && (
            <span className="teller">{actief + 1} / {fotos.length}</span>
          )}
        </button>
        {fotos.length > 1 && (
          <div className="duimen">
            {fotos.slice(0, MAX_DUIMEN).map((foto, i) => {
              const restant = fotos.length - MAX_DUIMEN;
              const toontRestant = i === MAX_DUIMEN - 1 && restant > 0;
              return (
                <button
                  key={foto.asset._ref + i}
                  type="button"
                  className={`duim${i === actief ? " is-actief" : ""}`}
                  aria-label={toontRestant ? g.bekijkAlle(fotos.length) : g.foto(i + 1)}
                  onClick={() => {
                    setActief(i);
                    setOpen(true);
                  }}
                >
                  <img src={urlFor(foto).width(200).height(150).fit("crop").url()} alt="" loading="lazy" />
                  {toontRestant && <span className="duim-restant">+{restant}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {open && (
        <div className="lichtbak" role="dialog" aria-modal="true" aria-label={g.fotosVan(titel)} onClick={() => setOpen(false)}>
          <button ref={sluitKnop} type="button" className="lichtbak-sluit" onClick={() => setOpen(false)} aria-label={g.sluiten}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>

          {fotos.length > 1 && (
            <button
              type="button"
              className="lichtbak-nav lichtbak-vorige"
              onClick={(e) => { e.stopPropagation(); vorige(); }}
              aria-label={g.vorigeFoto}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
            </button>
          )}

          <img
            className="lichtbak-foto"
            src={urlForVolledig(hoofdfoto).width(1800).height(1350).fit("max").url()}
            alt={hoofdfoto.alt ?? titel}
            onClick={(e) => e.stopPropagation()}
          />

          {fotos.length > 1 && (
            <button
              type="button"
              className="lichtbak-nav lichtbak-volgende"
              onClick={(e) => { e.stopPropagation(); volgende(); }}
              aria-label={g.volgendeFoto}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
            </button>
          )}

          {fotos.length > 1 && (
            <span className="lichtbak-teller" onClick={(e) => e.stopPropagation()}>{actief + 1} / {fotos.length}</span>
          )}
        </div>
      )}
    </>
  );
}
