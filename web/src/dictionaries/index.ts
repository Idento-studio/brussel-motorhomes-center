import type { Locale } from "@/lib/i18n";
import { nl } from "./nl";
import { fr } from "./fr";
import { en } from "./en";

export type { Dictionary } from "./nl";

export function getDictionary(locale: Locale) {
  if (locale === "fr") return fr;
  if (locale === "en") return en;
  return nl;
}
