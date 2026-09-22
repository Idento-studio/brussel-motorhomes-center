import Link from "next/link";
import type { Metadata } from "next";
import { haalVerhuurVoertuigen } from "@/sanity/queries";
import { RentalFilters } from "@/components/RentalFilters";
import { L, SITE_URL, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList } from "@/lib/structuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "fr" ? "Camping-cars à louer" : locale === "en" ? "Motorhomes for rent" : "Motorhomes te huur";
  const description =
    locale === "fr"
      ? "Des modèles de location jeunes et parfaitement entretenus. Assurance omnium, assistance dépannage européenne 24/7 et bouteille de gaz pleine incluses."
      : locale === "en"
      ? "Young, perfectly maintained rental models. Includes comprehensive insurance, 24/7 European breakdown assistance and a full gas bottle."
      : "Jonge, perfect onderhouden huurmodellen. Inclusief omniumverzekering, 24/7 Europese pechverhelping en een volle gasfles.";
  return {
    title,
    description,
    alternates: buildAlternates("/verhuur/", locale),
    ...buildOpenGraph({
      locale,
      title,
      description,
      pad: "/verhuur/",
      afbeelding: { url: `${SITE_URL}/assets/img/social/og-verhuur.jpg`, width: 1200, height: 630, alt: title },
    }),
  };
}

export default async function VerhuurPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const d = dict.voertuig.detail;
  const voertuigen = await haalVerhuurVoertuigen(locale);

  const inhoud =
    locale === "fr"
      ? {
          titel: "Camping-cars à louer",
          intro:
            "Des modèles de location jeunes et parfaitement entretenus. Assurance omnium, assistance dépannage européenne 24/7 et bouteille de gaz pleine incluses.",
          leeg: "Il n'y a actuellement aucun modèle de location en ligne. Contactez-nous pour la flotte actuelle.",
          inbegrepenTitel: "Inclus dans le prix de location",
          goedOmWeten: "Bon à savoir",
          ctaTitel: "Des questions sur la location ?",
          ctaTekst: "Nous vous aidons volontiers à choisir le bon modèle et la bonne période.",
        }
      : locale === "en"
      ? {
          titel: "Motorhomes for rent",
          intro:
            "Young, perfectly maintained rental models. Includes comprehensive insurance, 24/7 European breakdown assistance and a full gas bottle.",
          leeg: "There are currently no rental models online. Contact us for the current fleet.",
          inbegrepenTitel: "Included in the rental price",
          goedOmWeten: "Good to know",
          ctaTitel: "Questions about renting?",
          ctaTekst: "We're happy to help you choose the right model and the right period.",
        }
      : {
          titel: "Motorhomes te huur",
          intro:
            "Jonge, perfect onderhouden huurmodellen. Inclusief omniumverzekering, 24/7 Europese pechverhelping en een volle gasfles.",
          leeg: "Er zijn momenteel geen huurmodellen online. Neem contact op voor de actuele vloot.",
          inbegrepenTitel: "Inbegrepen in de huurprijs",
          goedOmWeten: "Goed om te weten",
          ctaTitel: "Vragen over huren?",
          ctaTekst: "Wij helpen u graag bij het kiezen van het juiste model en de juiste periode.",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.voertuig.kruimelTeHuur }])} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{dict.voertuig.kruimelTeHuur}</span>
          </nav>
          <h1>{inhoud.titel}</h1>
          <p className="intro">{inhoud.intro}</p>
        </div>
      </div>

      <section className="sectie sectie-vlak">
        <div className="wrap">
          {voertuigen.length > 0 ? (
            <RentalFilters voertuigen={voertuigen} locale={locale} />
          ) : (
            <div className="notitie-leeg">
              <p>{inhoud.leeg}</p>
            </div>
          )}

          <div className="raster raster-2 raster-ruim" style={{ marginTop: "var(--sp-7)" }}>
            <div className="kaart kaart-ruim">
              <h2 style={{ fontSize: "1.25rem" }}>{inhoud.inbegrepenTitel}</h2>
              <div style={{ marginTop: "var(--sp-4)" }}>
                <ul className="vinklijst">
                  <li><VinkIcoon />{d.inbegrepenOmnium}</li>
                  <li><VinkIcoon />{d.inbegrepenPech}</li>
                  <li><VinkIcoon />{d.inbegrepenGas}</li>
                  <li><VinkIcoon />{d.inbegrepenInstructie}</li>
                </ul>
              </div>
            </div>
            <div className="kaart kaart-ruim">
              <h2 style={{ fontSize: "1.25rem" }}>{inhoud.goedOmWeten}</h2>
              <dl className="spec-raster" style={{ gridTemplateColumns: "1fr" }}>
                <div><dt>{d.waarborg}</dt><dd>{d.waarborgWaarde}</dd></div>
                <div><dt>{d.kilometers}</dt><dd>{d.kilometersWaarde}</dd></div>
                <div><dt>{d.bestuurder}</dt><dd>{d.bestuurderWaarde}</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="sectie slot-cta">
        <div className="wrap">
          <h2>{inhoud.ctaTitel}</h2>
          <p>{inhoud.ctaTekst}</p>
          <div className="knoppen">
            <Link className="btn btn-goud" href={L(locale, "/contact/")}>{dict.nav.contact}</Link>
            <a className="btn btn-blauw" href="tel:+32471407949">{d.bel}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function VinkIcoon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
  );
}
