import Link from "next/link";
import type { Metadata } from "next";
import { Formulier } from "@/components/Formulier";
import { L, SITE_URL, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList, buildService } from "@/lib/structuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "fr" ? "Entretien du châssis" : locale === "en" ? "Chassis maintenance" : "Onderhoud chassis";
  const description =
    locale === "fr"
      ? "Spécialistes certifiés pour l'entretien du châssis de votre camping-car : contrôle technique annuel, vidange, systèmes électriques et carrosserie."
      : locale === "en"
      ? "Certified specialists for your motorhome's chassis maintenance: annual inspection, oil changes, electrical systems and bodywork."
      : "Gecertificeerde specialisten voor het onderhoud van het chassis van uw motorhome: jaarlijkse keuring, olieverversing, elektrische systemen en carrosseriewerk.";
  return {
    title,
    description,
    alternates: buildAlternates("/onderhoud/chassis/", locale),
    ...buildOpenGraph({
      locale,
      title,
      description,
      pad: "/onderhoud/chassis/",
      afbeelding: { url: `${SITE_URL}/assets/img/social/og-onderhoud.jpg`, width: 1200, height: 630, alt: title },
    }),
  };
}

export default async function OnderhoudChassisPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          h1: "Entretien du châssis",
          intro:
            "Spécialistes certifiés pour l'entretien du châssis et des composants techniques de votre camping-car — du contrôle technique annuel à la carrosserie.",
          dienstenLabel: "Ce que nous faisons",
          dienstenTitel: "Nos services d'entretien du châssis",
          card1Titel: "Contrôle technique annuel",
          card1Tekst: "Contrôle technique complet et inspection de votre camping-car.",
          card2Titel: "Vidange d'huile & filtres",
          card2Tekst: "Entretien du moteur et de la transmission pour une plus longue durée de vie.",
          card3Titel: "Climatisation & chauffage",
          card3Tekst: "Contrôle climatique, entretien et réparation de vos systèmes.",
          card4Titel: "Systèmes électriques",
          card4Tekst: "Batterie, câblage et panneaux solaires : tout est contrôlé. Livraison d'ampoules spécifiques pour camping-cars.",
          card5Titel: "Traitement de l'humidité",
          card5Tekst: "Prévention et réparation professionnelle des dégâts d'humidité.",
          card6Titel: "Travaux de carrosserie",
          card6Tekst: "Réparation des dommages, des bosses et peinture professionnelle.",
          card7Titel: "Devis sur mesure",
          card7Tekst: "Devis détaillé pour vos projets ou pour les compagnies d'assurance.",
          card8Titel: "Préparation au contrôle technique",
          card8Tekst: "Planification et accompagnement tout au long du processus de contrôle.",
          card9Titel: "Attelage ou système de mise à niveau",
          card9Tekst: "Pour camping-car et fourgon aménagé.",
          waaromLabel: "Pourquoi BMC",
          waaromTitel: "Pourquoi choisir BMC pour l'entretien de votre châssis ?",
          waaromTekst:
            "Nos mécaniciens sont certifiés et travaillent exclusivement avec des pièces d'origine. Prix transparents, communication claire et délai d'exécution rapide.",
          vink1: "Mécaniciens certifiés",
          vink2: "Pièces d'origine",
          vink3: "Prix transparents",
          vink4: "Rapide et fiable",
          afspraakLabel: "Rendez-vous",
          afspraakTitel: "Prenez rendez-vous",
          afspraakIntro:
            "Contactez-nous par téléphone au +32 471 40 79 49 ou laissez-nous vos coordonnées. Nous vous recontactons dans les plus brefs délais pour un rendez-vous.",
          formTitel: "Prenez rendez-vous",
          naam: "Nom",
          email: "E-mail",
          bericht: "Message",
        }
      : locale === "en"
      ? {
          h1: "Chassis maintenance",
          intro:
            "Certified specialists for the maintenance of your motorhome's chassis and technical components — from annual inspection to bodywork.",
          dienstenLabel: "What we do",
          dienstenTitel: "Our chassis maintenance services",
          card1Titel: "Annual inspection",
          card1Tekst: "Full technical inspection and check-up of your motorhome.",
          card2Titel: "Oil change & filters",
          card2Tekst: "Engine and transmission maintenance for a longer lifespan.",
          card3Titel: "Air conditioning & heating",
          card3Tekst: "Climate control, maintenance and repair of your systems.",
          card4Titel: "Electrical systems",
          card4Tekst: "Battery, wiring and solar panels: everything is checked. Supply of specific bulbs for motorhomes.",
          card5Titel: "Damp treatment",
          card5Tekst: "Prevention and professional repair of damp damage.",
          card6Titel: "Bodywork",
          card6Tekst: "Repair of damage, dents and professional paintwork.",
          card7Titel: "Custom quotes",
          card7Tekst: "Detailed quote for your projects or for insurance companies.",
          card8Titel: "Inspection preparation",
          card8Tekst: "Planning and guidance throughout the inspection process.",
          card9Titel: "Tow bar or levelling system",
          card9Tekst: "For motorhomes and campervans.",
          waaromLabel: "Why BMC",
          waaromTitel: "Why choose BMC for your chassis maintenance?",
          waaromTekst:
            "Our mechanics are certified and work exclusively with original parts. Transparent prices, clear communication and a fast turnaround.",
          vink1: "Certified mechanics",
          vink2: "Original parts",
          vink3: "Transparent prices",
          vink4: "Fast and reliable",
          afspraakLabel: "Appointment",
          afspraakTitel: "Make an appointment",
          afspraakIntro:
            "Reach us by phone at +32 471 40 79 49 or leave your details. We will get back to you as soon as possible to schedule an appointment.",
          formTitel: "Make an appointment",
          naam: "Name",
          email: "Email",
          bericht: "Message",
        }
      : {
          h1: "Onderhoud chassis",
          intro:
            "Gecertificeerde specialisten voor het onderhoud van het chassis en de technische onderdelen van uw motorhome — van jaarlijkse keuring tot carrosseriewerk.",
          dienstenLabel: "Wat wij doen",
          dienstenTitel: "Onze diensten voor onderhoud chassis",
          card1Titel: "Jaarlijkse keuring",
          card1Tekst: "Volledige technische controle en inspectie van uw motorhome.",
          card2Titel: "Olieverversing & filters",
          card2Tekst: "Motor- en transmissieonderhoud voor een langere levensduur.",
          card3Titel: "Airco & verwarming",
          card3Tekst: "Klimaatcontrole, onderhoud en reparatie van uw systemen.",
          card4Titel: "Elektrische systemen",
          card4Tekst: "Accu, bedrading en zonnepanelen: alles wordt gecontroleerd. Levering van specifieke lampen voor motorhomes.",
          card5Titel: "Vochtbehandeling",
          card5Tekst: "Preventie en professioneel herstel van vochtschade.",
          card6Titel: "Carrosseriewerk",
          card6Tekst: "Herstelling van schade, deuken en professioneel lakwerk.",
          card7Titel: "Bestek op maat",
          card7Tekst: "Gedetailleerd bestek voor projecten of verzekeringsmaatschappijen.",
          card8Titel: "Voorbereiding technische controle",
          card8Tekst: "Planning en begeleiding doorheen het keuringsproces.",
          card9Titel: "Trekhaak of levelingsysteem",
          card9Tekst: "Voor motorhome en campervan.",
          waaromLabel: "Waarom BMC",
          waaromTitel: "Waarom BMC kiezen voor onderhoud van uw chassis?",
          waaromTekst:
            "Onze monteurs zijn gecertificeerd en werken uitsluitend met originele onderdelen. Transparante prijzen, duidelijke communicatie en een snelle doorlooptijd.",
          vink1: "Gecertificeerde monteurs",
          vink2: "Originele onderdelen",
          vink3: "Transparante prijzen",
          vink4: "Snel en betrouwbaar",
          afspraakLabel: "Afspraak",
          afspraakTitel: "Maak een afspraak",
          afspraakIntro:
            "Bereik ons telefonisch op +32 471 40 79 49 of laat uw gegevens achter. Wij nemen zo snel mogelijk contact met u op voor een afspraak.",
          formTitel: "Maak een afspraak",
          naam: "Naam",
          email: "E-mail",
          bericht: "Bericht",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd
            data={buildBreadcrumbList(locale, [
              { label: dict.breadcrumbHome, pad: "/" },
              { label: dict.nav.onderhoud, pad: "/onderhoud/" },
              { label: t.h1 },
            ])}
          />
          <JsonLd data={buildService(locale, t.h1, t.intro, "/onderhoud/chassis/")} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <Link href={L(locale, "/onderhoud/")}>{dict.nav.onderhoud}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t.h1}</span>
          </nav>
          <h1>{t.h1}</h1>
          <p className="intro">{t.intro}</p>
        </div>
      </div>

      <section className="sectie">
        <div className="wrap">
          <div className="sectie-kop">
            <p className="label">{t.dienstenLabel}</p>
            <h2>{t.dienstenTitel}</h2>
          </div>
          <div className="raster raster-3">
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4h6v3H9zM7 5H5v15h14V5h-2M9 13l2 2 4-4" /></svg>
              </span>
              <h3>{t.card1Titel}</h3>
              <p>{t.card1Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3s6 6.4 6 10a6 6 0 0 1-12 0c0-3.6 6-10 6-10z" /></svg>
              </span>
              <h3>{t.card2Titel}</h3>
              <p>{t.card2Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 8h11a3 3 0 1 0-3-3M3 14h14a3 3 0 1 1-3 3M3 11h9" /></svg>
              </span>
              <h3>{t.card3Titel}</h3>
              <p>{t.card3Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
              </span>
              <h3>{t.card4Titel}</h3>
              <p>{t.card4Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.4 8.3-8 9.5C7.4 20.3 4 17 4 12V6z" /></svg>
              </span>
              <h3>{t.card5Titel}</h3>
              <p>{t.card5Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.5 3.5a5 5 0 0 0-6.6 6.6L3 15v6h6l4.9-4.9a5 5 0 0 0 6.6-6.6l-3.2 3.2-2.8-2.8z" /></svg>
              </span>
              <h3>{t.card6Titel}</h3>
              <p>{t.card6Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H7v18h11V7zM14 3v4h4M9.5 13h6M9.5 17h4" /></svg>
              </span>
              <h3>{t.card7Titel}</h3>
              <p>{t.card7Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16v15H4zM4 10h16M8 3v4M16 3v4M9.5 15l1.7 1.7L15 13" /></svg>
              </span>
              <h3>{t.card8Titel}</h3>
              <p>{t.card8Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="6" r="2.5" /><path d="M12 8.5v6M7 20h10M9 20l3-5.5 3 5.5" /></svg>
              </span>
              <h3>{t.card9Titel}</h3>
              <p>{t.card9Tekst}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="sectie sectie-blauw">
        <div className="wrap split">
          <div>
            <p className="label label-licht">{t.waaromLabel}</p>
            <h2 style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-h2)" }}>{t.waaromTitel}</h2>
            <p style={{ marginTop: "var(--sp-4)", lineHeight: 1.7 }}>{t.waaromTekst}</p>
          </div>
          <ul className="vinklijst">
            <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.vink1}</li>
            <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.vink2}</li>
            <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.vink3}</li>
            <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.vink4}</li>
          </ul>
        </div>
      </section>

      <section className="sectie sectie-vlak">
        <div className="wrap contact-raster">
          <div>
            <div className="sectie-kop">
              <p className="label">{t.afspraakLabel}</p>
              <h2>{t.afspraakTitel}</h2>
              <p className="intro">{t.afspraakIntro}</p>
            </div>
            <a className="btn btn-blauw" href="tel:+32471407949">{dict.voertuig.detail.bel}</a>
          </div>
          <Formulier titel={t.formTitel} locale={locale}>
            <div className="veld">
              <label htmlFor="onderhoud-chassis-naam">{t.naam}</label>
              <input id="onderhoud-chassis-naam" name="naam" type="text" autoComplete="name" required />
            </div>
            <div className="veld">
              <label htmlFor="onderhoud-chassis-email">{t.email}</label>
              <input id="onderhoud-chassis-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="veld veld-breed">
              <label htmlFor="onderhoud-chassis-bericht">{t.bericht}</label>
              <textarea id="onderhoud-chassis-bericht" name="bericht" rows={4} required />
            </div>
          </Formulier>
        </div>
      </section>
    </main>
  );
}
