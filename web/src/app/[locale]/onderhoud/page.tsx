import Link from "next/link";
import type { Metadata } from "next";
import { Formulier } from "@/components/Formulier";
import { Accordeon } from "@/components/Accordeon";
import { FotoMetPlaceholder } from "@/components/FotoMetPlaceholder";
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
  const title =
    locale === "fr" ? "Entretien & réparations" : locale === "en" ? "Maintenance & repairs" : "Onderhoud & herstellingen";
  const description =
    locale === "fr"
      ? "Spécialistes certifiés pour l'entretien complet de votre camping-car. Du contrôle technique annuel aux travaux de carrosserie."
      : locale === "en"
      ? "Certified specialists for the complete maintenance of your motorhome. From annual inspection to bodywork."
      : "Gecertificeerde specialisten voor het complete onderhoud van uw motorhome. Van jaarlijkse keuring tot carrosseriewerk.";
  return {
    title,
    description,
    alternates: buildAlternates("/onderhoud/", locale),
    ...buildOpenGraph({
      locale,
      title,
      description,
      pad: "/onderhoud/",
      afbeelding: { url: `${SITE_URL}/assets/img/social/og-onderhoud.jpg`, width: 1200, height: 630, alt: title },
    }),
  };
}

export default async function OnderhoudPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          h1: "Entretien & réparations",
          intro:
            "Spécialistes certifiés pour l'entretien complet de votre camping-car. Du contrôle technique annuel aux travaux de carrosserie.",
          kiesLabel: "Deux domaines d'entretien",
          kiesTitel: "Quel entretien recherchez-vous ?",
          chassisTitel: "Entretien du châssis",
          chassisTekst: "Contrôle technique, moteur, systèmes électriques et carrosserie.",
          chassisCta: "Découvrir",
          leefruimteTitel: "Entretien de l'espace de vie",
          leefruimteTekst: "Traitement de l'humidité, réfrigérateur, accessoires et équipements intégrés.",
          leefruimteCta: "Découvrir",
          dienstenLabel: "Ce que nous faisons",
          dienstenTitel: "Nos services d'entretien",
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
          card9Titel: "Fenêtres",
          card9Tekst: "Nouveau joint, remplacement ou fixation.",
          waaromLabel: "Pourquoi BMC",
          waaromTitel: "Pourquoi choisir BMC pour l'entretien ?",
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
          faqTitel: "Questions fréquentes sur l'entretien",
          faqVragen: [
            {
              vraag: "Que dois-je faire pour préparer mon camping-car pour l'hiver ?",
              antwoord:
                "Avant les premières gelées, videz toujours tous les réservoirs d'eau : eau propre, eaux usées et surtout le chauffe-eau via la vanne de protection antigel. Débranchez la batterie habitation ou raccordez-la à un chargeur d'entretien pour éviter une décharge profonde pendant l'hivernage.",
            },
            {
              vraag: "Préparez-vous les camping-cars pour le contrôle technique belge ?",
              antwoord:
                "Oui. Nous effectuons un pré-contrôle complet, incluant la vérification des freins, des feux, de la suspension, de l'âge des pneus et du poids. Si vous le souhaitez, nous conduisons votre camping-car jusqu'au centre de contrôle technique.",
            },
            {
              vraag: "Pourquoi une mesure d'humidité annuelle est-elle nécessaire ?",
              antwoord:
                "L'humidité est le pire ennemi d'un camping-car. Un contrôle annuel d'étanchéité est indispensable pour conserver la garantie d'étanchéité du fabricant, souvent de 5 à 10 ans, et pour détecter à temps les infiltrations naissantes avant qu'elles ne causent des dommages structurels.",
            },
            {
              vraag: "Qu'implique l'entretien d'un camping-car ?",
              antwoord:
                "Moteur et châssis : entretien automobile régulier selon les spécifications du fabricant, notamment l'huile, les freins, la courroie de distribution, les pneus et les filtres. Partie habitation et carrosserie : contrôle du système de gaz, du système d'eau, de l'électronique, du réfrigérateur, du chauffage, des serrures et des joints.",
            },
          ],
        }
      : locale === "en"
      ? {
          h1: "Maintenance & repairs",
          intro:
            "Certified specialists for the complete maintenance of your motorhome. From annual inspection to bodywork.",
          kiesLabel: "Two maintenance areas",
          kiesTitel: "Which maintenance are you looking for?",
          chassisTitel: "Chassis maintenance",
          chassisTekst: "Technical inspection, engine, electrical systems and bodywork.",
          chassisCta: "Discover",
          leefruimteTitel: "Living area maintenance",
          leefruimteTekst: "Damp treatment, refrigerator, accessories and built-in appliances.",
          leefruimteCta: "Discover",
          dienstenLabel: "What we do",
          dienstenTitel: "Our maintenance services",
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
          card9Titel: "Windows",
          card9Tekst: "New seal, replacement or fixing.",
          waaromLabel: "Why BMC",
          waaromTitel: "Why choose BMC for maintenance?",
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
          faqTitel: "Frequently asked questions about maintenance",
          faqVragen: [
            {
              vraag: "What do I need to do to winterize my motorhome?",
              antwoord:
                "Before the first frost, always drain all water tanks: fresh water, waste water and especially the water heater via the frost protection valve. Disconnect the leisure battery or connect it to a trickle charger to prevent deep discharge during winter storage.",
            },
            {
              vraag: "Do you prepare motorhomes for the Belgian roadworthiness inspection?",
              antwoord:
                "Yes. We carry out a full pre-inspection, including checks of the brakes, lights, suspension, tyre age and weight. If you wish, we can drive your motorhome to the inspection centre.",
            },
            {
              vraag: "Why is an annual damp measurement necessary?",
              antwoord:
                "Damp is a motorhome's worst enemy. An annual water-tightness check is essential to preserve the manufacturer's water-tightness warranty, often 5 to 10 years, and to detect emerging leaks in time before they cause structural damage.",
            },
            {
              vraag: "What does motorhome maintenance involve?",
              antwoord:
                "Engine and chassis: regular automotive maintenance according to manufacturer specifications, including oil, brakes, timing belt, tyres and filters. Living area and bodywork: check of the gas system, water system, electronics, refrigerator, heating, locks and seals.",
            },
          ],
        }
      : {
          h1: "Onderhoud & herstellingen",
          intro:
            "Gecertificeerde specialisten voor het complete onderhoud van uw motorhome. Van jaarlijkse keuring tot carrosseriewerk.",
          kiesLabel: "Twee onderhoudsdomeinen",
          kiesTitel: "Welk onderhoud zoekt u?",
          chassisTitel: "Onderhoud chassis",
          chassisTekst: "Technische keuring, motor, elektrische systemen en carrosserie.",
          chassisCta: "Ontdek",
          leefruimteTitel: "Onderhoud leefruimte",
          leefruimteTekst: "Vochtbehandeling, koelkast, accessoires en inbouwtoestellen.",
          leefruimteCta: "Ontdek",
          dienstenLabel: "Wat wij doen",
          dienstenTitel: "Onze onderhoudsdiensten",
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
          card9Titel: "Ramen",
          card9Tekst: "Nieuwe dichting, vervanging of bevestiging.",
          waaromLabel: "Waarom BMC",
          waaromTitel: "Waarom BMC kiezen voor onderhoud?",
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
          faqTitel: "Veelgestelde vragen over onderhoud",
          faqVragen: [
            {
              vraag: "Wat moet ik doen om de motorhome winterklaar te maken?",
              antwoord:
                "Laat vóór de eerste vorst altijd alle waterreservoirs leeglopen: vers water, vuil water en vooral de boiler via het vorstbeveiligingsventiel. Koppel de leefbatterij los of sluit ze aan op een druppellader om diepontlading tijdens de winterstalling te vermijden.",
            },
            {
              vraag: "Maken jullie motorhomes klaar voor de Belgische autokeuring?",
              antwoord:
                "Ja. Wij voeren een volledige pre-keuring uit, inclusief controle van remmen, lichten, ophanging, bandenleeftijd en gewicht. Indien gewenst rijden wij met uw motorhome naar het keuringsstation.",
            },
            {
              vraag: "Waarom is een jaarlijkse vochtmeting noodzakelijk?",
              antwoord:
                "Vocht is de grootste vijand van een motorhome. Een jaarlijkse waterdichtheidscontrole is verplicht om de fabrieksgarantie op waterdichtheid, vaak 5 tot 10 jaar, te behouden en beginnende infiltraties tijdig op te sporen vóór er structurele schade ontstaat.",
            },
            {
              vraag: "Wat houdt het onderhoud van een motorhome in?",
              antwoord:
                "Motor en chassis: regulier auto-onderhoud volgens fabrieksspecificaties, waaronder olie, remmen, distributieriem, banden en filters. Woongedeelte en opbouw: controle van gassysteem, watersysteem, elektronica, koelkast, verwarming, sloten en dichtingen.",
            },
          ],
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.nav.onderhoud }])} />
          <JsonLd data={buildService(locale, t.h1, t.intro, "/onderhoud/")} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{dict.nav.onderhoud}</span>
          </nav>
          <h1>{t.h1}</h1>
          <p className="intro">{t.intro}</p>
        </div>
      </div>

      <section className="sectie sectie-vlak">
        <div className="wrap">
          <div className="sectie-kop">
            <p className="label">{t.kiesLabel}</p>
            <h2>{t.kiesTitel}</h2>
          </div>
          <div className="raster raster-2">
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/chassis-algemeen.webp" alt="" />
                </span>
                <h3>{t.chassisTitel}</h3>
              </div>
              <p>{t.chassisTekst}</p>
              <Link className="tekst-link" href={L(locale, "/onderhoud/chassis/")} style={{ marginTop: "var(--sp-4)" }}>
                {t.chassisCta}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/leefruimte-algemeen.webp" alt="" />
                </span>
                <h3>{t.leefruimteTitel}</h3>
              </div>
              <p>{t.leefruimteTekst}</p>
              <Link className="tekst-link" href={L(locale, "/onderhoud/leefruimte/")} style={{ marginTop: "var(--sp-4)" }}>
                {t.leefruimteCta}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="sectie">
        <div className="wrap">
          <div className="sectie-kop">
            <p className="label">{t.dienstenLabel}</p>
            <h2>{t.dienstenTitel}</h2>
          </div>
          <div className="raster raster-3">
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/jaarlijkse-keuring.webp" alt="" />
                </span>
                <h3>{t.card1Titel}</h3>
              </div>
              <p>{t.card1Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/olieverversing-en-filters.webp" alt="" />
                </span>
                <h3>{t.card2Titel}</h3>
              </div>
              <p>{t.card2Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/airco-en-verwarming.webp" alt="" />
                </span>
                <h3>{t.card3Titel}</h3>
              </div>
              <p>{t.card3Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/elektrische-systemen.webp" alt="" />
                </span>
                <h3>{t.card4Titel}</h3>
              </div>
              <p>{t.card4Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/vochtbehandeling.webp" alt="" />
                </span>
                <h3>{t.card5Titel}</h3>
              </div>
              <p>{t.card5Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/carrosseriewerk.webp" alt="" />
                </span>
                <h3>{t.card6Titel}</h3>
              </div>
              <p>{t.card6Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/bestek-op-maat.webp" alt="" />
                </span>
                <h3>{t.card7Titel}</h3>
              </div>
              <p>{t.card7Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/voorbereiding-technische-controle.webp" alt="" />
                </span>
                <h3>{t.card8Titel}</h3>
              </div>
              <p>{t.card8Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/onderhoud/ramen.webp" alt="" />
                </span>
                <h3>{t.card9Titel}</h3>
              </div>
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
              <label htmlFor="onderhoud-naam">{t.naam}</label>
              <input id="onderhoud-naam" name="naam" type="text" autoComplete="name" required />
            </div>
            <div className="veld">
              <label htmlFor="onderhoud-email">{t.email}</label>
              <input id="onderhoud-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="veld veld-breed">
              <label htmlFor="onderhoud-bericht">{t.bericht}</label>
              <textarea id="onderhoud-bericht" name="bericht" rows={4} required />
            </div>
          </Formulier>
        </div>
      </section>

      <section className="sectie">
        <div className="wrap">
          <div className="sectie-kop is-midden">
            <h2>{t.faqTitel}</h2>
          </div>
          <Accordeon idPrefix="onderhoud" vragen={t.faqVragen} />
        </div>
      </section>
    </main>
  );
}
