// Eenmalig script: genereert responsive breedtevarianten van de homepage-
// hero (hero-640.webp t/m hero-1920.webp) uit het originele hero.jpg.
// De hero staat full-bleed (position:absolute; inset:0 in .hero-media) en
// wordt dus op elke viewportbreedte anders groot weergegeven — één vaste
// maat is te klein op desktop of nodeloos groot (en traag als LCP-element)
// op mobiel. PageSpeed op mobiel wees dit expliciet aan: 205 KiB bij een
// weergavegrootte van amper enkele honderden pixels breed.
// Los uitvoeren met: node scripts/genereer-hero-srcset.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRON = join(__dirname, "../public/assets/img/home/hero.jpg");
const DOEL_MAP = join(__dirname, "../public/assets/img/home");
const KWALITEIT = 75;

// Dekt mobiel (tot ~2,5x retina op een 375-430px viewport) tot volledige
// desktopbreedte. 1600 is de volledige brongrootte van hero.jpg — een
// grotere variant zou toch enkel diezelfde 1600px teruggeven.
const BREEDTES = [640, 960, 1280, 1600];

for (const breedte of BREEDTES) {
  const doel = join(DOEL_MAP, `hero-${breedte}.webp`);
  await sharp(BRON)
    .resize({ width: breedte, withoutEnlargement: true })
    .webp({ quality: KWALITEIT })
    .toFile(doel);
  console.log(`hero.jpg -> hero-${breedte}.webp`);
}
