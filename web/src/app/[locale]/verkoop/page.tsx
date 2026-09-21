import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { haalVerkoopVoertuigen } from "@/sanity/queries";
import { SaleFilters } from "@/components/SaleFilters";
import { L, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
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
    locale === "fr" ? "Motorhomes à vendre" : locale === "en" ? "Motorhomes for sale" : "Motorhomes te koop";
  const description =
    locale === "fr"
      ? "Notre offre de motorhomes neufs et d'occasion, avec contrôle technique complet, mesure d'humidité, Car-Pass et contrôle technique avant la vente."
      : locale === "en"
      ? "Our range of new and used motorhomes, each with a full technical check-up, damp measurement, Car-Pass and pre-sale inspection."
      : "Ons aanbod nieuwe en tweedehands motorhomes, met technische check-up, vochtmeting, Car-Pass en keuring voor verkoop.";
  return {
    title,
    description,
    alternates: buildAlternates("/verkoop/"),
    ...buildOpenGraph({ locale, title, description, pad: "/verkoop/" }),
  };
}

export default async function VerkoopPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const voertuigen = await haalVerkoopVoertuigen(locale);

  const inhoud =
    locale === "fr"
      ? {
          titel: "Motorhomes à vendre",
          intro:
            "Motorhomes neufs et d'occasion, chacun avec un contrôle technique complet, une mesure d'humidité, un Car-Pass et un contrôle avant la vente.",
          leeg: "Il n'y a actuellement aucune offre en ligne. Contactez-nous pour le stock actuel.",
          laden: "Chargement de l'offre…",
          ctaTitel: "Vous ne trouvez pas ce que vous cherchez ?",
          ctaTekst: "Contactez notre équipe. Nous vous aidons volontiers à trouver le motorhome parfait.",
        }
      : locale === "en"
      ? {
          titel: "Motorhomes for sale",
          intro:
            "New and used motorhomes, each with a full technical check-up, damp measurement, Car-Pass and pre-sale inspection.",
          leeg: "There is currently no stock online. Contact us for the current inventory.",
          laden: "Loading stock…",
          ctaTitel: "Can't find what you're looking for?",
          ctaTekst: "Get in touch with our team. We're happy to help you find the perfect motorhome.",
        }
      : {
          titel: "Motorhomes te koop",
          intro:
            "Nieuwe en tweedehands motorhomes, elk met een volledige technische check-up, vochtmeting, Car-Pass en keuring voor verkoop.",
          leeg: "Er is momenteel geen aanbod online. Neem contact op voor de actuele voorraad.",
          laden: "Aanbod laden…",
          ctaTitel: "Niet gevonden wat u zoekt?",
          ctaTekst: "Neem contact op met ons team. Wij helpen u graag bij het vinden van de perfecte motorhome.",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.voertuig.kruimelTeKoop }])} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{dict.voertuig.kruimelTeKoop}</span>
          </nav>
          <h1>{inhoud.titel}</h1>
          <p className="intro">{inhoud.intro}</p>
        </div>
      </div>

      <section className="sectie sectie-vlak">
        <div className="wrap">
          {voertuigen.length > 0 ? (
            <Suspense fallback={<p className="telling">{inhoud.laden}</p>}>
              <SaleFilters voertuigen={voertuigen} locale={locale} />
            </Suspense>
          ) : (
            <div className="notitie-leeg">
              <p>{inhoud.leeg}</p>
            </div>
          )}
        </div>
      </section>

      <section className="sectie slot-cta">
        <div className="wrap">
          <h2>{inhoud.ctaTitel}</h2>
          <p>{inhoud.ctaTekst}</p>
          <div className="knoppen">
            <Link className="btn btn-goud" href={L(locale, "/contact/")}>{dict.nav.contact}</Link>
            <a className="btn btn-blauw" href="tel:+32471407949">{dict.voertuig.detail.bel}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
