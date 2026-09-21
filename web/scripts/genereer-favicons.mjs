// Eenmalig script: genereert favicon.ico, apple-icon.png en de PWA-iconen
// (192/512) uit het bestaande src/app/icon.svg, via sharp. Niet in de
// build-pipeline gehangen (draait maar opnieuw als het bronlogo wijzigt) —
// gewoon los uitvoeren met: node scripts/genereer-favicons.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const bron = join(__dirname, "../src/app/icon.svg");
const svg = readFileSync(bron);

const MERK_BLAUW = "#1A4B77";

async function pngBuffer(width, height, { achtergrond } = {}) {
  let img = sharp(svg, { density: 384 }).resize(width, height, { fit: "contain", background: achtergrond ?? { r: 0, g: 0, b: 0, alpha: 0 } });
  if (achtergrond) img = img.flatten({ background: achtergrond });
  return img.png().toBuffer();
}

// Minimale, geldige .ico-container met één PNG-gecomprimeerde afbeelding
// (ICO ondersteunt dit sinds Vista — geen aparte bitmap-encoding nodig).
function bouwIco(pngBuf, grootte) {
  const iconDir = Buffer.alloc(6);
  iconDir.writeUInt16LE(0, 0); // reserved
  iconDir.writeUInt16LE(1, 2); // type: 1 = icon
  iconDir.writeUInt16LE(1, 4); // aantal afbeeldingen

  const entry = Buffer.alloc(16);
  entry.writeUInt8(grootte >= 256 ? 0 : grootte, 0); // breedte (0 = 256)
  entry.writeUInt8(grootte >= 256 ? 0 : grootte, 1); // hoogte
  entry.writeUInt8(0, 2); // kleuren in palet (0 = geen palet)
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // kleurvlakken
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuf.length, 8); // grootte van de PNG-data
  entry.writeUInt32LE(22, 12); // offset van de PNG-data (6 + 16)

  return Buffer.concat([iconDir, entry, pngBuf]);
}

async function main() {
  const png32 = await pngBuffer(32, 32);
  writeFileSync(join(__dirname, "../src/app/favicon.ico"), bouwIco(png32, 32));
  console.log("favicon.ico geschreven (32×32, via src/app/ — Next.js-conventie)");

  const appleIcon = await pngBuffer(180, 180, { achtergrond: MERK_BLAUW });
  writeFileSync(join(__dirname, "../src/app/apple-icon.png"), appleIcon);
  console.log("apple-icon.png geschreven (180×180, met blauwe achtergrond — Next.js-conventie)");

  const iconDir = join(__dirname, "../public/assets/img/icon");
  mkdirSync(iconDir, { recursive: true });
  for (const grootte of [192, 512]) {
    const buf = await pngBuffer(grootte, grootte);
    writeFileSync(join(iconDir, `icon-${grootte}.png`), buf);
    console.log(`icon-${grootte}.png geschreven (public/assets/img/icon/)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
