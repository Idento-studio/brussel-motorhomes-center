"use client";

import { useEffect, useRef, type ImgHTMLAttributes } from "react";
import { metPad } from "@/lib/basePath";

/**
 * Next.js staat geen inline onError-handler toe op een <img> binnen een
 * Server Component (nodig voor metadata/async data op paginaniveau) — enkel
 * binnen een Client Component. Dit component is de kleinste mogelijke
 * client-grens om de sitebrede foto-conventie overeind te houden: ontbreekt
 * het bestand, dan verdwijnt de <img> en toont de `.media`-CSS-klasse het
 * blauwe camper-silhouet (of, in een leeg icoon-vlak, gewoon niets) in de
 * plaats van een gebroken afbeelding.
 *
 * `src` is altijd een letterlijk root-relatief pad ("/assets/img/...") —
 * anders dan next/link's href wordt dat NIET automatisch aangevuld met
 * NEXT_PUBLIC_BASE_PATH (zie src/lib/basePath.ts), dus dat gebeurt hier.
 *
 * Naast de onError-handler ook een check bij mount: bij een statische export
 * staat de <img src="..."> al in de server-gerenderde HTML, dus de browser
 * begint de aanvraag te laden zodra hij de tag parset — ruim vóór React
 * hydrateert en de onError-handler koppelt. Bij een snel mislukkende
 * aanvraag (bv. een 404 op localhost of een snelle CDN) is dat foutmoment
 * dan al voorbij tegen de tijd dat de handler er is, en img-fouten worden
 * niet opnieuw afgespeeld — zonder deze check bleef zo'n ontbrekend bestand
 * als een kapot-afbeelding-icoontje staan in plaats van netjes te verdwijnen.
 */
export function FotoMetPlaceholder({ src, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const volledigeSrc = typeof src === "string" && src.startsWith("/") ? metPad(src) : src;
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth === 0) {
      ref.current.remove();
    }
  }, []);

  // eslint-disable-next-line jsx-a11y/alt-text -- alt komt altijd van de aanroeper mee
  return <img ref={ref} src={volledigeSrc} {...props} onError={(e) => e.currentTarget.remove()} />;
}
