import Link from "next/link";
import type { Metadata } from "next";
import { CamperConfigurator } from "@/components/CamperConfigurator";
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
    locale === "fr"
      ? "Configurez votre camping-car idéal"
      : locale === "en"
      ? "Configure your ideal motorhome"
      : "Stel uw ideale motorhome samen";
  const description =
    locale === "fr"
      ? "Répondez à quelques questions sur l'usage, le budget et les équipements souhaités, et nous vous proposons le camping-car qui vous correspond."
      : locale === "en"
      ? "Answer a few questions about how you'll use it, your budget and the equipment you want, and we'll propose the motorhome that fits you."
      : "Beantwoord enkele vragen over gebruik, budget en gewenste uitrusting, en wij stellen de motorhome voor die bij u past.";
  return {
    title,
    description,
    alternates: buildAlternates("/camper-op-maat/start-project/", locale),
    ...buildOpenGraph({
      locale,
      title,
      description,
      pad: "/camper-op-maat/start-project/",
      afbeelding: { url: `${SITE_URL}/assets/img/social/og-camper-op-maat.jpg`, width: 1200, height: 630, alt: title },
    }),
  };
}

export default async function StartProjectPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          kruimel: "Configurateur",
          h1: "Configurez votre camping-car idéal.",
          intro:
            "Cinq courtes questions sur votre usage, votre budget et les équipements souhaités. Nous analysons vos réponses et revenons vers vous avec une proposition sur mesure, ou des camping-cars d'occasion qui correspondent déjà.",
        }
      : locale === "en"
      ? {
          kruimel: "Configurator",
          h1: "Configure your ideal motorhome.",
          intro:
            "Five short questions about how you'll use it, your budget and the equipment you want. We'll review your answers and get back to you with a tailored proposal, or used motorhomes that already match.",
        }
      : {
          kruimel: "Configurator",
          h1: "Stel uw ideale motorhome samen.",
          intro:
            "Vijf korte vragen over gebruik, budget en gewenste uitrusting. Wij bekijken uw antwoorden en komen terug met een voorstel op maat, of tweedehands motorhomes die nu al aansluiten.",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.nav.camperOpMaat, pad: "/camper-op-maat/" }, { label: t.kruimel }])} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <Link href={L(locale, "/camper-op-maat/")}>{dict.nav.camperOpMaat}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t.kruimel}</span>
          </nav>
          <h1>{t.h1}</h1>
          <p className="intro">{t.intro}</p>
        </div>
      </div>

      <section className="sectie">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <CamperConfigurator locale={locale} />
        </div>
      </section>
    </main>
  );
}
