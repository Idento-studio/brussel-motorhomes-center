import Link from "next/link";
import type { Metadata } from "next";
import { VerkoopStappenKeuze } from "@/components/VerkoopStappenKeuze";
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
      title: "Vendez votre motorhome",
      description:
        "Vendez votre motorhome à BMC ou laissez BMC le vendre pour vous. Inspection gratuite et un prix de marché honnête.",
      alternates: buildAlternates("/verkoop-je-camper/"),
    };
  }
  if (locale === "en") {
    return {
      title: "Sell your motorhome",
      description:
        "Sell your motorhome to BMC or let BMC sell it for you. Free inspection and a fair market price.",
      alternates: buildAlternates("/verkoop-je-camper/"),
    };
  }
  return {
    title: "Verkoop je motorhome",
    description:
      "Verkoop uw motorhome aan BMC of laat BMC hem voor u verkopen. Gratis inspectie en een eerlijke marktprijs.",
    alternates: buildAlternates("/verkoop-je-camper/"),
  };
}

export default async function VerkoopJeCamperPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          kruimel: "Vendez votre motorhome",
          h1: "Vendez votre motorhome, à votre façon.",
          intro:
            "Chez BMC, vous avez deux options : nous achetons votre motorhome directement, ou nous le vendons pour vous.",
          kiesLabel: "Choisissez votre formule",
          kiesTitel: "Deux façons de vendre votre motorhome",
          formule1Label: "Vente rapide",
          formule1Titel: "Nous achetons votre motorhome",
          formule1Intro:
            "Vous vendez votre motorhome directement à BMC. Nous proposons un prix de marché honnête après inspection.",
          formule1Punt1: "Inspection gratuite sur place",
          formule1Punt2: "Prix de marché honnête, accord rapide",
          formule1Punt3: "Paiement immédiat, sans attente",
          formule1Punt4: "Aucun tracas avec des acheteurs privés ou des annonces",
          formule2Label: "Entièrement pris en charge",
          formule2Titel: "BMC vend pour vous",
          formule2Intro:
            "BMC prend en charge la vente complète de votre motorhome. Nous le préparons techniquement et déterminons le prix ensemble.",
          formule2Punt1: "Préparation technique & contrôle inclus",
          formule2Punt2: "Prix et frais de vente convenus ensemble, en toute transparence",
          formule2Punt3: "BMC gère les annonces et les acheteurs potentiels",
          formule2Punt4: "Vous recevez votre argent dès que le motorhome est vendu",
        }
      : locale === "en"
      ? {
          kruimel: "Sell your motorhome",
          h1: "Sell your motorhome, your way.",
          intro:
            "At BMC you have two options: we buy your motorhome directly, or we sell it for you.",
          kiesLabel: "Choose your option",
          kiesTitel: "Two ways to sell your motorhome",
          formule1Label: "Quick sale",
          formule1Titel: "We buy your motorhome",
          formule1Intro:
            "You sell your motorhome directly to BMC. We offer a fair market price after inspection.",
          formule1Punt1: "Free on-site inspection",
          formule1Punt2: "Fair market price, quick agreement",
          formule1Punt3: "Immediate payment, no waiting",
          formule1Punt4: "No hassle with private buyers or listings",
          formule2Label: "Fully managed",
          formule2Titel: "BMC sells for you",
          formule2Intro:
            "BMC takes care of the complete sale of your motorhome. We prepare it technically and agree the price together.",
          formule2Punt1: "Technical preparation & inspection included",
          formule2Punt2: "Price and selling fee agreed together, transparently",
          formule2Punt3: "BMC handles listings and prospective buyers",
          formule2Punt4: "You receive your money as soon as the motorhome is sold",
        }
      : {
          kruimel: "Verkoop je motorhome",
          h1: "Verkoop uw motorhome, op uw manier.",
          intro:
            "Bij BMC heeft u twee opties: wij kopen uw motorhome direct aan, of wij verkopen hem voor u.",
          kiesLabel: "Kies uw formule",
          kiesTitel: "Twee manieren om uw motorhome te verkopen",
          formule1Label: "Snelle verkoop",
          formule1Titel: "Wij kopen uw motorhome",
          formule1Intro:
            "U verkoopt uw motorhome rechtstreeks aan BMC. Wij bieden een eerlijke marktprijs na inspectie.",
          formule1Punt1: "Gratis inspectie op locatie",
          formule1Punt2: "Eerlijke marktprijs, snel akkoord",
          formule1Punt3: "Directe uitbetaling, geen wachttijd",
          formule1Punt4: "Geen gedoe met privékopers of advertenties",
          formule2Label: "Volledig ontzorgd",
          formule2Titel: "BMC verkoopt voor u",
          formule2Intro:
            "BMC zorgt voor de volledige verkoop van uw motorhome. Wij maken hem technisch klaar en bepalen samen de prijs.",
          formule2Punt1: "Technische voorbereiding & keuring inbegrepen",
          formule2Punt2: "Samen prijs én verkoopfee transparant afspreken",
          formule2Punt3: "BMC regelt advertenties en kandidaat-kopers",
          formule2Punt4: "U ontvangt uw geld zodra de motorhome verkocht is",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t.kruimel}</span>
          </nav>
          <h1>{t.h1}</h1>
          <p className="intro">{t.intro}</p>
        </div>
      </div>

      <section className="sectie">
        <div className="wrap">
          <div className="sectie-kop">
            <p className="label">{t.kiesLabel}</p>
            <h2>{t.kiesTitel}</h2>
          </div>
          <div className="formules">
            <article className="kaart formule">
              <p className="label">{t.formule1Label}</p>
              <h3>{t.formule1Titel}</h3>
              <p className="intro">{t.formule1Intro}</p>
              <ul className="vinklijst">
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.formule1Punt1}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.formule1Punt2}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.formule1Punt3}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.formule1Punt4}
                </li>
              </ul>
            </article>
            <article className="kaart formule">
              <p className="label">{t.formule2Label}</p>
              <h3>{t.formule2Titel}</h3>
              <p className="intro">{t.formule2Intro}</p>
              <ul className="vinklijst">
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.formule2Punt1}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.formule2Punt2}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.formule2Punt3}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.formule2Punt4}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <VerkoopStappenKeuze locale={locale} />
    </main>
  );
}
