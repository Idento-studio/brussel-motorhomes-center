"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";

/**
 * Poort van assets/js/contact-form.js: zolang er geen endpoint is ingesteld
 * (NEXT_PUBLIC_FORM_ENDPOINT), toont het formulier enkel de bevestiging —
 * handig om het gedrag te tonen zonder dat er iets verstuurd wordt. Zet die
 * env var op een Formspree-URL (https://formspree.io/f/xxxxxxxx) om echt te
 * versturen.
 *
 * Neemt `locale` i.p.v. `dict` als prop en berekent het woordenboek zelf:
 * Server Components mogen geen functies (zoals de dict.voertuig-helpers)
 * doorgeven aan Client Components — dat breekt de statische export. Een
 * locale-string is wel gewoon serialiseerbaar.
 */
export function Formulier({
  titel,
  intro,
  submitLabel,
  locale,
  children,
}: {
  titel: string;
  intro?: string;
  submitLabel?: string;
  locale: Locale;
  children: ReactNode;
}) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<"idle" | "bezig" | "verzonden" | "fout">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const honeypot = form.elements.namedItem("website") as HTMLInputElement | null;
    if (honeypot && honeypot.value.trim() !== "") {
      setStatus("verzonden");
      return;
    }

    if (!form.reportValidity()) return;

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) {
      setStatus("verzonden");
      return;
    }

    setStatus("bezig");
    // FormData rechtstreeks versturen (multipart/form-data) i.p.v. JSON-ifyen:
    // JSON kan geen bestanden (foto-uploads) dragen, FormData wel. De browser
    // zet zelf de juiste Content-Type met boundary — niet manueel instellen.
    const formData = new FormData(form);
    formData.append("pagina", window.location.pathname);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!res.ok) throw new Error("verzenden mislukt");
      setStatus("verzonden");
    } catch {
      setStatus("fout");
    }
  }

  if (status === "verzonden") {
    return (
      <div className="formulier is-verhoogd">
        <div className="formulier-bedankt" tabIndex={-1}>
          <span className="vink">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          </span>
          <h3>{dict.form.bedanktTitel}</h3>
          <p>{dict.form.bedanktTekst}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="formulier is-verhoogd" onSubmit={handleSubmit} noValidate>
      <h2>{titel}</h2>
      {intro && <p className="intro">{intro}</p>}
      <div className="velden">
        {children}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="formulier-website">{dict.form.honeypotLabel}</label>
          <input id="formulier-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="akkoord" htmlFor="formulier-privacy">
          <input id="formulier-privacy" name="privacy" type="checkbox" required />
          {dict.form.privacyLabel}
        </label>
      </div>
      {status === "fout" && (
        <p className="notitie notitie-goud">{dict.form.foutBericht}</p>
      )}
      <button className="btn btn-goud" type="submit" disabled={status === "bezig"}>
        {status === "bezig" ? dict.form.bezig : (submitLabel ?? dict.form.verstuur)}
      </button>
    </form>
  );
}
