"use client";

import type { ImgHTMLAttributes } from "react";
import { metPad } from "@/lib/basePath";

/**
 * Next.js staat geen inline onError-handler toe op een <img> binnen een
 * Server Component (nodig voor metadata/async data op paginaniveau) — enkel
 * binnen een Client Component. Dit component is de kleinste mogelijke
 * client-grens om de sitebrede foto-conventie overeind te houden: ontbreekt
 * het bestand, dan verdwijnt de <img> en toont de `.media`-CSS-klasse het
 * blauwe camper-silhouet in de plaats van een gebroken afbeelding.
 *
 * `src` is altijd een letterlijk root-relatief pad ("/assets/img/...") —
 * anders dan next/link's href wordt dat NIET automatisch aangevuld met
 * NEXT_PUBLIC_BASE_PATH (zie src/lib/basePath.ts), dus dat gebeurt hier.
 */
export function FotoMetPlaceholder({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const volledigeSrc = typeof src === "string" && src.startsWith("/") ? metPad(src) : src;
  // eslint-disable-next-line jsx-a11y/alt-text -- alt komt altijd van de aanroeper mee
  return <img src={volledigeSrc} {...props} onError={(e) => e.currentTarget.remove()} />;
}
