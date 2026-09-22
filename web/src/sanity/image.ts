import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/**
 * auto("format") laat Sanity's CDN op basis van de Accept-header van de
 * browser zelf WebP/AVIF serveren i.p.v. het brongeüploade formaat (meestal
 * JPEG) — geen aparte varianten of <picture>-fallback nodig, en werkt voor
 * elke afroep van urlFor() in de site. quality(75) is een gangbare, visueel
 * quasi-onzichtbare compromiswaarde die het bestand flink verkleint.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").quality(75);
}

/**
 * Voor "toon de volledige, ongecropte brontfoto"-plekken (de lichtbak): een
 * foto met een hotspot/crop die in Sanity Studio is ingesteld (bv. om de
 * kaartfoto/thumbnail mooi bij te snijden) krijgt die rect automatisch
 * meegegeven op ELKE urlFor()-aanroep voor diezelfde foto — ook als je een
 * andere breedte/hoogte/fit opvraagt. fit("max") alleen volstaat dus niet om
 * de volledige foto terug te krijgen zolang er een crop op de asset staat.
 * ignoreImageParams() is de door @sanity/image-url zelf voorziene manier om
 * die opgeslagen crop/hotspot te negeren (een eerdere poging om enkel de
 * asset-referentie door te geven zonder crop/hotspot-velden loste dit niet
 * op — de builder vult ontbrekende crop/hotspot alsnog aan met een default).
 */
export function urlForVolledig(source: SanityImageSource) {
  return builder.image(source).ignoreImageParams().auto("format").quality(75);
}
