// Draait na "next build" (zie package.json). De root layout (app/layout.tsx)
// kent de actieve taal niet — enkel het geneste [locale]-segment doet dat —
// dus elk geëxporteerd HTML-bestand krijgt van Next.js hetzelfde vaste
// lang="nl-BE" mee. Dit script herschrijft dat achteraf naar het juiste,
// regio-gekwalificeerde lang-attribuut per taalmap in out/, zodat crawlers
// en curl (die geen JavaScript uitvoeren) meteen de juiste taal zien in
// plaats van pas na de client-side correctie in SetHtmlLang.tsx.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT_DIR = new URL("../out/", import.meta.url).pathname.replace(/^\/([a-zA-Z]):/, "$1:");

const REGIO_CODE = {
  nl: "nl-BE",
  fr: "fr-BE",
  en: "en-GB",
};

async function* htmlBestanden(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const pad = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* htmlBestanden(pad);
    } else if (entry.name.endsWith(".html")) {
      yield pad;
    }
  }
}

async function main() {
  let aantal = 0;
  for (const [locale, regioCode] of Object.entries(REGIO_CODE)) {
    const localeDir = join(OUT_DIR, locale);
    for await (const bestand of htmlBestanden(localeDir)) {
      const inhoud = await readFile(bestand, "utf8");
      const aangepast = inhoud.replace(/<html lang="nl-BE"/, `<html lang="${regioCode}"`);
      if (aangepast !== inhoud) {
        await writeFile(bestand, aangepast, "utf8");
        aantal += 1;
      }
    }
  }
  console.log(`fix-lang: lang-attribuut aangepast in ${aantal} bestand(en).`);
}

main().catch((err) => {
  console.error("fix-lang mislukt:", err);
  process.exit(1);
});
