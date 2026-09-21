import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/**
 * auto("format") laat Sanity's CDN op basis van de Accept-header van de
 * browser zelf WebP/AVIF serveren i.p.v. het brongeüploade formaat (meestal
 * JPEG) — geen aparte varianten of <picture>-fallback nodig, en werkt voor
 * elke afroep van urlFor() in de site. quality(80) is een gangbare, visueel
 * quasi-onzichtbare compromiswaarde die het bestand flink verkleint.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").quality(80);
}
