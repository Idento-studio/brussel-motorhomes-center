"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

const REGIO_CODE: Record<Locale, string> = {
  nl: "nl-BE",
  fr: "fr-BE",
  en: "en-GB",
};

/**
 * De root layout (verplicht de enige plek met <html>) kent de actieve taal
 * niet, want die zit in het geneste [locale]-segment. scripts/fix-lang.mjs
 * zet het juiste lang-attribuut al in de geëxporteerde HTML-bestanden zelf
 * (voor crawlers/curl, zie de toelichting in app/layout.tsx); dit component
 * herhaalt dezelfde correctie client-side na hydratatie, anders zou React
 * de waarde uit fix-lang.mjs bij hydratatie terugzetten naar de vaste
 * "nl-BE" die de root layout zelf rendert.
 */
export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = REGIO_CODE[locale];
  }, [locale]);

  return null;
}
