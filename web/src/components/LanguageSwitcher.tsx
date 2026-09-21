"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, wisselLocale, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/dictionaries";

export function LanguageSwitcher({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();

  return (
    <div className="taal-wissel" role="group" aria-label={dict.taal.aria}>
      {locales.map((doel) => (
        <Link
          key={doel}
          href={wisselLocale(pathname ?? `/${locale}/`, doel)}
          aria-current={doel === locale ? "true" : undefined}
          className={doel === locale ? "is-actief" : undefined}
        >
          {dict.taal[doel]}
        </Link>
      ))}
    </div>
  );
}
