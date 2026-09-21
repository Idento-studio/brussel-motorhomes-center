/**
 * Wanneer de site op een subpad draait (bv. een GitHub Pages-projectpagina
 * op https://idento-studio.github.io/brussel-motorhomes-center/ i.p.v. op
 * het hoofddomein), zet next.config.ts NEXT_PUBLIC_BASE_PATH op dat subpad
 * en herschrijft Next.js automatisch alle <Link>-navigatie. Losse <img>/
 * <video>-bronnen die met een letterlijke "/"-string beginnen (bv.
 * "/assets/img/...") worden dat NIET automatisch — die lopen via
 * `metPad()` hieronder. Op het uiteindelijke hoofddomein (brusselmotor-
 * homescenter.be) blijft deze variabele leeg en verandert er niets.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function metPad(pad: string): string {
  return `${BASE_PATH}${pad}`;
}
