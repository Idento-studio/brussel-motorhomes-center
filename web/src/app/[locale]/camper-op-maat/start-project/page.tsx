import Link from "next/link";
import type { Metadata } from "next";
import { CamperConfigurator } from "@/components/CamperConfigurator";
import { L, buildAlternates, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "fr") {
    return {
      title: "Configurez votre motorhome idéal",
      description:
        "Répondez à quelques questions sur l'usage, le budget et les équipements souhaités, et nous vous proposons le motorhome qui vous correspond.",
      alternates: buildAlternates("/camper-op-maat/start-project/"),
    };
  }
  if (locale === "en") {
    return {
      title: "Configure your ideal motorhome",
      description:
        "Answer a few questions about how you'll use it, your budget and the equipment you want, and we'll propose the motorhome that fits you.",
      alternates: buildAlternates("/camper-op-maat/start-project/"),
    };
  }
  return {
    title: "Stel uw ideale motorhome samen",
    description:
      "Beantwoord enkele vragen over gebruik, budget en gewenste uitrusting, en wij stellen de motorhome voor die bij u past.",
    alternates: buildAlternates("/camper-op-maat/start-project/"),
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
          h1: "Configurez votre motorhome idéal.",
          intro:
            "Cinq courtes questions sur votre usage, votre budget et les équipements souhaités. Nous analysons vos réponses et revenons vers vous avec une proposition sur mesure, ou des motorhomes d'occasion qui correspondent déjà.",
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
