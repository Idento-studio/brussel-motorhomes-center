// Eenmalig script: genereert een .webp-versie naast elke .jpg/.jpeg/.png in
// public/assets/img/{home,over-ons,merken} (de statische, lokale foto's die
// niet via Sanity's CDN lopen en dus geen automatische formaatonderhandeling
// krijgen). Lighthouse op de homepage wees dit aan als het grootste
// besparingspotentieel (LAUNCH.md §10). Origineel blijft gewoon staan —
// enkel de <img src>-verwijzingen in de code wijzen voortaan naar .webp.
// Los uitvoeren met: node scripts/genereer-webp.mjs
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
// 75 i.p.v. 80: PageSpeed wees expliciet op extra compressiewinst op de
// homepage-foto's; visueel gecontroleerd (volledige-resolutie crop van de
// hero-foto) en geen zichtbaar kwaliteitsverlies bij deze waarde.
const KWALITEIT = 75;

// merken-logo's worden nergens breder dan ~126px getoond (zie .merken-balk
// img in components.css) — zelfs met ruime marge voor 3x-schermen volstaat
// 420px breed. Zonder deze cap bleven de brongeüploade PNG's (680x340) tot
// 1,8x groter dan ooit zichtbaar, wat PageSpeed terecht als verspilling
// aanwees. Andere mappen behouden hun brongrootte (geen vaste, voorspelbare
// weergavebreedte zoals bij deze logo-balk).
const MAPPEN = [
  { pad: "../public/assets/img/home", maxBreedte: null },
  { pad: "../public/assets/img/over-ons", maxBreedte: null },
  { pad: "../public/assets/img/merken", maxBreedte: 420 },
];

async function verwerkMap(pad, maxBreedte) {
  for (const bestand of readdirSync(pad)) {
    const volledig = join(pad, bestand);
    if (statSync(volledig).isDirectory()) continue;
    const ext = extname(bestand).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
    const doel = join(pad, `${basename(bestand, ext)}.webp`);
    let img = sharp(volledig);
    if (maxBreedte) img = img.resize({ width: maxBreedte, withoutEnlargement: true });
    await img.webp({ quality: KWALITEIT }).toFile(doel);
    console.log(`${bestand} -> ${basename(doel)}`);
  }
}

for (const { pad, maxBreedte } of MAPPEN) {
  await verwerkMap(join(__dirname, pad), maxBreedte);
}
