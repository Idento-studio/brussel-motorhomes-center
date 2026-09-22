import Link from "next/link";
import type { Metadata } from "next";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqGroepenVoor } from "@/lib/faqData";
import { L, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList, buildFAQPage } from "@/lib/structuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "fr" ? "Questions fréquentes" : locale === "en" ? "Frequently asked questions" : "Veelgestelde vragen";
  const description =
    locale === "fr"
      ? "Réponses sur l'achat, la location, l'entretien et les accessoires de camping-cars chez BMC."
      : locale === "en"
      ? "Answers about buying, renting, maintaining and accessorising motorhomes at BMC."
      : "Antwoorden over kopen, huren, onderhoud en accessoires van motorhomes bij BMC.";
  return {
    title,
    description,
    alternates: buildAlternates("/veelgestelde-vragen/", locale),
    ...buildOpenGraph({ locale, title, description, pad: "/veelgestelde-vragen/" }),
  };
}

export default async function VeelgesteldeVragenPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const faqGroepen = faqGroepenVoor(locale);

  const inhoud =
    locale === "fr"
      ? {
          titel: "Questions fréquentes",
          intro:
            "Réponses aux questions que nos clients nous posent le plus souvent, sur l'achat, la location, l'entretien et les accessoires.",
          ctaTitel: "Vous ne trouvez pas votre question ?",
          ctaTekst: "Appelez-nous ou envoyez-nous un message : nous répondons sous un jour ouvrable.",
          categorieen: "Catégories",
        }
      : locale === "en"
      ? {
          titel: "Frequently asked questions",
          intro:
            "Answers to what customers ask us most often, about buying, renting, maintenance and accessories.",
          ctaTitel: "Can't find your question?",
          ctaTekst: "Call us or send a message: we reply within one business day.",
          categorieen: "Categories",
        }
      : {
          titel: "Veelgestelde vragen",
          intro:
            "Antwoorden op wat klanten ons het vaakst vragen, over kopen, huren, onderhoud en accessoires.",
          ctaTitel: "Staat uw vraag er niet bij?",
          ctaTekst: "Bel ons of stuur een bericht: wij antwoorden binnen één werkdag.",
          categorieen: "Categorieën",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.nav.veelgesteldeVragen }])} />
          <JsonLd data={buildFAQPage(faqGroepen.flatMap((groep) => groep.vragen))} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{dict.nav.veelgesteldeVragen}</span>
          </nav>
          <h1>{inhoud.titel}</h1>
          <p className="intro">{inhoud.intro}</p>
        </div>
      </div>

      <section className="sectie sectie-vlak">
        <div className="wrap">
          <FaqAccordion groepen={faqGroepen} categorieenLabel={inhoud.categorieen} />
        </div>
      </section>

      <section className="sectie slot-cta">
        <div className="wrap">
          <h2>{inhoud.ctaTitel}</h2>
          <p>{inhoud.ctaTekst}</p>
          <div className="knoppen">
            <Link className="btn btn-goud" href={L(locale, "/contact/")}>
              {dict.nav.contact}
            </Link>
            <a className="btn btn-blauw" href="tel:+32471407949">
              {dict.voertuig.detail.bel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
