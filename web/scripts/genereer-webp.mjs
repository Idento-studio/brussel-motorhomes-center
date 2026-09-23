// Eenmalig script: genereert een .webp-versie naast elke .jpg/.jpeg/.png in
// public/assets/img/{home,over-ons,merken} (de statische, lokale foto's die
// niet via Sanity's CDN lopen en dus geen automatische formaatonderhandeling
// krijgen). Lighthouse op de homepage wees dit aan als het grootste
// besparingspotentieel (LAUNCH.md §10). Origineel blijft gewoon staan —
// enkel de <img src>-verwijzingen in de code wijzen voortaan naar .webp.
// Los uitvoeren met: node scripts/genereer-webp.mjs
//
// hero.jpg zit hier bewust niet meer bij: die staat full-bleed op elke
// viewportbreedte (position:absolute; inset:0 in .hero-media), dus één vaste
// maat is er te klein op desktop of nodeloos groot op mobiel. Die krijgt een
// eigen responsive srcset via genereer-hero-srcset.mjs.
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, basename } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
// 75 i.p.v. 80: PageSpeed wees expliciet op extra compressiewinst op de
// homepage-foto's; visueel gecontroleerd (volledige-resolutie crop van de
// hero-foto) en geen zichtbaar kwaliteitsverlies bij deze waarde.
const KWALITEIT = 75;

// Elke maxBreedte hier is de brongrootte gedeeld door de werkelijke
// CSS-weergavebreedte × ~2 (marge voor 2x-retina) — PageSpeed op de
// homepage (mobiel) wees deze bestanden expliciet aan als groter dan hun
// weergavegrootte:
//  - dienst-*.jpg / maatwerk.jpg: kaartje in .media-kaart (raster-3), tot
//    ~480px breed op desktop -> 960px volstaat ruim.
//  - andersvaliden-poster.jpg: smalle, staande videoposter, tot ~372px op
//    mobiel weergegeven -> 720px volstaat.
//  - merken-logo's: nergens breder dan ~126px getoond (.merken-balk img in
//    components.css) -> 260px i.p.v. de vorige (te ruime) 420px.
const MAPPEN = [
  { pad: "../public/assets/img/home", maxBreedte: 960, negeer: ["hero.jpg"] },
  { pad: "../public/assets/img/over-ons", maxBreedte: null },
  { pad: "../public/assets/img/merken", maxBreedte: 260 },
];

async function verwerkMap(pad, maxBreedte, negeer = []) {
  for (const bestand of readdirSync(pad)) {
    if (negeer.includes(bestand)) continue;
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

for (const { pad, maxBreedte, negeer } of MAPPEN) {
  await verwerkMap(join(__dirname, pad), maxBreedte, negeer);
}
