"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { L, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";

/**
 * Staat bewust niet meteen zichtbaar bij het landen op de pagina — pas
 * vanaf de eerste scrollbeweging schuift de balk tevoorschijn (en weer weg
 * bovenaan), zodat de hero/zoekbalk bij het openen niet meteen wordt
 * afgedekt. Zelfde drempel-/rAF-patroon als de "vast" header in
 * SiteHeader.tsx.
 */
export function ActionBar({ locale, dict }: { locale: Locale; dict: Dictionary["actionBar"] }) {
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    let wachtend = false;
    const meet = () => {
      wachtend = false;
      setZichtbaar(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!wachtend) {
        wachtend = true;
        window.requestAnimationFrame(meet);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`actiebalk${zichtbaar ? " is-zichtbaar" : ""}`}>
      <a href="tel:+32471407949">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
        {dict.bellen}
      </a>
      <a href="https://wa.me/32471407949">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.5 3.5a12 12 0 0 1 17 17 12 12 0 0 1-13.7 2.3l-5.8.7a.4.4 0 0 1-.5-.4l.8-5.8A12 12 0 0 1 3.5 3.5zm3.6 17 .3.2a9.9 9.9 0 0 0 11.5-1.8 9.8 9.8 0 1 0-15.6-2.4l.1.3-.5 3.9a.2.2 0 0 0 .2.2zm6.6-7-1 1.2a9.8 9.8 0 0 1-3.5-3.5l1.2-1a.8.8 0 0 0 .2-.9L9.6 7a.8.8 0 0 0-.9-.5l-2 .6a.8.8 0 0 0-.6.9 11.8 11.8 0 0 0 10 10 .8.8 0 0 0 .9-.6l.5-2a.8.8 0 0 0-.4-.9l-2.5-1.1a.8.8 0 0 0-.9.2z" /></svg>
        {dict.whatsapp}
      </a>
      <Link href={L(locale, "/verkoop/")}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 17V9a2 2 0 0 1 2-2h8l4 4h4v4" /></svg>
        {dict.aanbod}
      </Link>
    </div>
  );
}
