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
const MAPPEN = ["../public/assets/img/home", "../public/assets/img/over-ons", "../public/assets/img/merken"];
const KWALITEIT = 80;

async function verwerkMap(pad) {
  for (const bestand of readdirSync(pad)) {
    const volledig = join(pad, bestand);
    if (statSync(volledig).isDirectory()) continue;
    const ext = extname(bestand).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
    const doel = join(pad, `${basename(bestand, ext)}.webp`);
    await sharp(volledig).webp({ quality: KWALITEIT }).toFile(doel);
    console.log(`${bestand} -> ${basename(doel)}`);
  }
}

for (const map of MAPPEN) {
  await verwerkMap(join(__dirname, map));
}
