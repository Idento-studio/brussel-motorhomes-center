"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * De root layout (verplicht de enige plek met <html>) kent de actieve taal
 * niet, want die zit in het geneste [locale]-segment. Dit component zet het
 * lang-attribuut client-side na mount; hreflang-tags in de metadata dragen
 * het gewicht voor SEO, dit is enkel voor a11y/browserchrome.
 */
export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
