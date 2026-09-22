// Eenmalig script: genereert een 1200x630 (og:image-standaardformaat) crop
// van bestaande dienstfoto's, voor pagina's die tot nu toe allemaal dezelfde
// generieke og:image deelden (LAUNCH.md §4). Gebruikt de foto's die al voor
// de "Ons aanbod"-tegels op de homepage bestaan — geen nieuwe fotografie,
// enkel een bijgesneden versie specifiek voor social sharing. cover-fit zodat
// ook de liggende bronfoto's (dienst-te-koop.jpg e.a.) netjes vullen zonder
// vervorming. maatwerk.jpg is staand (1200x1600) en met position:"top"
// toonde enkel het laadruimteplafond — visueel gecontroleerd en op "centre"
// gezet, dat toont ook de bestuurdersstoel/het dashboard.
// andersvaliden-poster.jpg is een posterframe van een verticale video mét
// ingebrande tekst ("iedereen!") — niet bruikbaar als los beeld, dus die
// pagina behoudt bewust de generieke og:image (STANDAARD_OG_AFBEELDING).
// Los uitvoeren met: node scripts/genereer-og-afbeeldingen.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRON = join(__dirname, "../public/assets/img/home");
const DOEL = join(__dirname, "../public/assets/img/social");

const AFBEELDINGEN = [
  { bron: "dienst-te-koop.jpg", doel: "og-verkoop.jpg", positie: "centre" },
  { bron: "dienst-te-huur.jpg", doel: "og-verhuur.jpg", positie: "centre" },
  { bron: "dienst-onderhoud.jpg", doel: "og-onderhoud.jpg", positie: "centre" },
  { bron: "dienst-accessoires.jpg", doel: "og-accessoires.jpg", positie: "centre" },
  { bron: "dienst-verkoop-je-camper.jpg", doel: "og-verkoop-je-camper.jpg", positie: "centre" },
  { bron: "maatwerk.jpg", doel: "og-camper-op-maat.jpg", positie: "centre" },
];

for (const { bron, doel, positie } of AFBEELDINGEN) {
  await sharp(join(BRON, bron))
    .resize({ width: 1200, height: 630, fit: "cover", position: positie })
    .jpeg({ quality: 80 })
    .toFile(join(DOEL, doel));
  console.log(`${bron} -> social/${doel} (1200x630)`);
}
