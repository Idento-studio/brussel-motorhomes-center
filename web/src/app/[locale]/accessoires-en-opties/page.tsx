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
    locale === "fr" ? "Accessoires & options" : locale === "en" ? "Accessories & options" : "Accessoires & opties";
  const description =
    locale === "fr"
      ? "Panneaux solaires, porte-vélos, navigation et auvents, montés avec soin par les techniciens propres de BMC."
      : locale === "en"
      ? "Solar panels, bike racks, navigation and awnings, expertly installed by BMC's own technicians."
      : "Zonnepanelen, fietsendragers, navigatie en luifels, vakkundig gemonteerd door de eigen technici van BMC.";
  return {
    title,
    description,
    alternates: buildAlternates("/accessoires-en-opties/", locale),
    ...buildOpenGraph({
      locale,
      title,
      description,
      pad: "/accessoires-en-opties/",
      afbeelding: { url: `${SITE_URL}/assets/img/social/og-accessoires.jpg`, width: 1200, height: 630, alt: title },
    }),
  };
}

export default async function AccessoiresEnOptiesPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          h1: "Accessoires & options",
          intro:
            "Personnalisez votre camping-car avec des accessoires de qualité supérieure, montés avec soin par nos propres techniciens.",
          aanbodLabel: "Notre offre",
          aanbodTitel: "Accessoires & montage",
          card1Titel: "Panneaux solaires & batteries",
          card1Tekst: "Augmentez votre autonomie avec des panneaux solaires puissants et des batteries lithium.",
          card2Titel: "Porte-vélos & racks",
          card2Tekst: "Porte-vélos robustes pour 2 à 4 vélos, également adaptés aux vélos électriques.",
          card3Titel: "Navigation & multimédia",
          card3Tekst: "GPS, Apple CarPlay, Android Auto et caméras de recul.",
          card4Titel: "Lanterneaux & ventilation",
          card4Tekst: "Lanterneaux Heki et Dometic avec moustiquaire.",
          card5Titel: "Sécurité & protection",
          card5Tekst: "Traceurs GPS, systèmes d'alarme et coffres-forts.",
          card6Titel: "Confort & rangement",
          card6Tekst: "Solutions de rangement, housses de siège et rideaux thermiques.",
          card7Titel: "Auvent",
          card7Tekst: "Électrique ou manuel, de marque Fiamma ou Thule.",
          card8Titel: "TV, antenne & attelage",
          card8Tekst: "Montage professionnel inclus.",
          hoeWerktLabel: "Comment ça marche",
          hoeWerktTitel: "De la demande au montage",
          stap1Titel: "Contactez-nous",
          stap1Tekst: "Vous nous expliquez ce que vous recherchez et l'usage que vous faites de votre camping-car.",
          stap2Titel: "Nous cherchons la meilleure offre",
          stap2Tekst: "BMC compare les marques et modèles qui conviennent à votre camping-car.",
          stap3Titel: "Devis incluant le montage",
          stap3Tekst: "Un seul prix pour les pièces et la pose, sans surprises.",
          stap4Titel: "Montage dans notre atelier",
          stap4Tekst: "Montage professionnel par nos propres techniciens.",
          montageLabel: "Montage professionnel",
          montageTitel: "Monté par nos propres techniciens",
          montageTekst: "Nos techniciens travaillent exclusivement avec des marques de qualité comme Thule, Dometic, Victron et Garmin.",
          montageVink1: "Atelier de montage officiellement agréé",
          montageVink2: "Garantie sur les pièces et l'installation",
          montageVink3: "Livraison rapide & planning flexible",
          formTitel: "Demandez un devis",
          formIntro: "Dites-nous quels accessoires vous recherchez.",
          telefoon: "Numéro de téléphone",
          faqTitel: "Questions fréquentes sur les accessoires",
          faqVragen: [
            {
              vraag: "BMC tient-elle compte de la charge utile et du PTAC de 3.500 kg ?",
              antwoord:
                "Oui. Nous calculons avec vous le poids des accessoires souhaités, afin que votre camping-car reste dans les limites de poids légales.",
            },
            {
              vraag: "Un porte-vélos peut-il supporter des vélos électriques lourds ?",
              antwoord:
                "Les porte-vélos standards montés sur la paroi arrière ont souvent une capacité maximale de 40 à 50 kg. Pour les e-bikes lourds, nous montons des porte-vélos spéciaux sur le châssis ou des porte-vélos basculants à plus grande capacité.",
            },
            {
              vraag: "Quel est l'avantage d'une batterie lithium par rapport à l'AGM ou au gel ?",
              antwoord:
                "Les batteries lithium (LiFePO4) pèsent jusqu'à 60 % de moins, offrent jusqu'à 90 % de capacité utilisable et ont une durée de vie de 3.000 à 5.000 cycles.",
            },
            {
              vraag: "Quels accessoires BMC peut-elle monter ?",
              antwoord:
                "Panneaux solaires, batteries lithium et convertisseurs ; climatiseurs de toit, ventilateurs et auvents ; attelages, porte-vélos et porte-vélos électriques ; caméras de recul, systèmes d'alarme et routeurs wifi ; et bouteilles de GPL avec Truma Crash Sensor.",
            },
          ],
        }
      : locale === "en"
      ? {
          h1: "Accessories & options",
          intro:
            "Personalise your motorhome with top-quality accessories, expertly installed by our own technicians.",
          aanbodLabel: "Our range",
          aanbodTitel: "Accessories & installation",
          card1Titel: "Solar panels & batteries",
          card1Tekst: "Increase your autonomy with powerful solar panels and lithium battery packs.",
          card2Titel: "Bike racks & carriers",
          card2Tekst: "Sturdy carriers for 2 to 4 bikes, also suitable for e-bikes.",
          card3Titel: "Navigation & multimedia",
          card3Tekst: "GPS, Apple CarPlay, Android Auto and reversing cameras.",
          card4Titel: "Roof windows & ventilation",
          card4Tekst: "Heki and Dometic roof windows with insect screen.",
          card5Titel: "Safety & security",
          card5Tekst: "GPS trackers, alarm systems and safes.",
          card6Titel: "Comfort & storage",
          card6Tekst: "Storage solutions, seat covers and thermal window covers.",
          card7Titel: "Awning",
          card7Tekst: "Electric or manual, from Fiamma or Thule.",
          card8Titel: "TV, antenna & tow bar",
          card8Tekst: "Including professional installation.",
          hoeWerktLabel: "How it works",
          hoeWerktTitel: "From request to installed",
          stap1Titel: "Get in touch",
          stap1Tekst: "You tell us what you're looking for and what you use your motorhome for.",
          stap2Titel: "We find the best option",
          stap2Tekst: "BMC compares brands and models that suit your motorhome.",
          stap3Titel: "Quote including installation",
          stap3Tekst: "One price for parts and fitting, no surprises.",
          stap4Titel: "Installation in our workshop",
          stap4Tekst: "Expertly installed by our own technicians.",
          montageLabel: "Expert installation",
          montageTitel: "Installed by our own technicians",
          montageTekst: "Our technicians work exclusively with quality brands such as Thule, Dometic, Victron and Garmin.",
          montageVink1: "Officially approved installation workshop",
          montageVink2: "Warranty on parts and installation",
          montageVink3: "Fast delivery & flexible scheduling",
          formTitel: "Request a quote",
          formIntro: "Tell us which accessories you're looking for.",
          telefoon: "Phone number",
          faqTitel: "Frequently asked questions about accessories",
          faqVragen: [
            {
              vraag: "Does BMC take the payload and the 3,500 kg MAM into account?",
              antwoord:
                "Yes. We calculate the weight of the desired accessories together with you, so that your motorhome stays within the legal weight limits.",
            },
            {
              vraag: "Can a bike rack carry heavy electric bikes?",
              antwoord:
                "Standard rear-wall bike racks often have a maximum load capacity of 40 to 50 kg. For heavy e-bikes, we fit special chassis-mounted racks or tilting lift racks with a higher capacity.",
            },
            {
              vraag: "What is the advantage of a lithium battery over AGM or gel?",
              antwoord:
                "Lithium batteries (LiFePO4) weigh up to 60% less, deliver up to 90% usable capacity and have a lifespan of 3,000 to 5,000 cycles.",
            },
            {
              vraag: "Which accessories can BMC install?",
              antwoord:
                "Solar panels, lithium batteries and converters; roof air conditioners, fans and awnings; tow bars, bike racks and e-bike lifts; reversing cameras, alarm systems and wifi routers; and LPG cylinders with Truma Crash Sensor.",
            },
          ],
        }
      : {
          h1: "Accessoires & opties",
          intro:
            "Personaliseer uw motorhome met topkwaliteit accessoires, vakkundig gemonteerd door onze eigen technici.",
          aanbodLabel: "Ons aanbod",
          aanbodTitel: "Accessoires & montage",
          card1Titel: "Zonnepanelen & accu's",
          card1Tekst: "Vergroot uw autonomie met krachtige zonnepanelen en lithium-accupakketten.",
          card2Titel: "Fietsendragers & racks",
          card2Tekst: "Robuuste dragers voor 2 tot 4 fietsen, ook voor e-bikes.",
          card3Titel: "Navigatie & multimedia",
          card3Tekst: "GPS, Apple CarPlay, Android Auto en achteruitrijcamera's.",
          card4Titel: "Dakramen & ventilatie",
          card4Tekst: "Heki- en Dometic-dakramen met vliegengaas.",
          card5Titel: "Veiligheid & beveiliging",
          card5Tekst: "GPS-trackers, alarmsystemen en kluizen.",
          card6Titel: "Comfort & opberging",
          card6Tekst: "Opbergoplossingen, stoelhoezen en thermische raamdekken.",
          card7Titel: "Luifel",
          card7Tekst: "Elektrisch of manueel, van Fiamma of Thule.",
          card8Titel: "TV, antenne & trekhaak",
          card8Tekst: "Inclusief vakkundige montage.",
          hoeWerktLabel: "Hoe werkt het",
          hoeWerktTitel: "Van vraag tot gemonteerd",
          stap1Titel: "Neem contact op",
          stap1Tekst: "U vertelt ons wat u zoekt en waarvoor u de motorhome gebruikt.",
          stap2Titel: "Wij zoeken het beste aanbod",
          stap2Tekst: "BMC vergelijkt merken en modellen die bij uw motorhome passen.",
          stap3Titel: "Offerte inclusief montage",
          stap3Tekst: "Eén prijs voor onderdelen én plaatsing, zonder verrassingen.",
          stap4Titel: "Montage in ons atelier",
          stap4Tekst: "Vakkundig gemonteerd door onze eigen technici.",
          montageLabel: "Vakkundige montage",
          montageTitel: "Gemonteerd door onze eigen technici",
          montageTekst: "Onze technici werken uitsluitend met kwaliteitsmerken zoals Thule, Dometic, Victron en Garmin.",
          montageVink1: "Officieel erkend montage-atelier",
          montageVink2: "Garantie op onderdelen én installatie",
          montageVink3: "Snelle levering & flexibele planning",
          formTitel: "Vraag een offerte",
          formIntro: "Vertel ons welke accessoires u zoekt.",
          telefoon: "Telefoonnummer",
          faqTitel: "Veelgestelde vragen over accessoires",
          faqVragen: [
            {
              vraag: "Houdt BMC rekening met het laadvermogen en de MTM van 3.500 kg?",
              antwoord:
                "Ja. Wij berekenen samen met u het gewicht van de gewenste accessoires, zodat uw motorhome binnen de wettelijke gewichtsgrenzen blijft.",
            },
            {
              vraag: "Kan een fietsendrager zware elektrische fietsen dragen?",
              antwoord:
                "Standaard fietsendragers op de achterwand hebben vaak een maximale draagkracht van 40 tot 50 kg. Voor zware e-bikes monteren wij speciale dragers op het chassis of neerlaatbare liftdragers met een hogere capaciteit.",
            },
            {
              vraag: "Wat is het voordeel van een lithium-batterij tegenover AGM of gel?",
              antwoord:
                "Lithium-batterijen (LiFePO4) wegen tot 60 % minder, leveren tot 90 % bruikbare capaciteit en hebben een levensduur van 3.000 tot 5.000 cycli.",
            },
            {
              vraag: "Welke accessoires kan BMC monteren?",
              antwoord:
                "Zonnepanelen, lithium-batterijen en omvormers; dakairco's, ventilatoren en luifels; trekhaken, fietsendragers en e-bike-liften; achteruitrijcamera's, alarmsystemen en wifi-routers; en LPG-flessen met Truma Crash Sensor.",
            },
          ],
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.nav.accessoires }])} />
          <JsonLd data={buildService(locale, t.h1, t.intro, "/accessoires-en-opties/")} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{dict.nav.accessoires}</span>
          </nav>
          <h1>{t.h1}</h1>
          <p className="intro">{t.intro}</p>
        </div>
      </div>

      <section className="sectie">
        <div className="wrap">
          <div className="sectie-kop">
            <p className="label">{t.aanbodLabel}</p>
            <h2>{t.aanbodTitel}</h2>
          </div>
          <div className="raster raster-4">
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/accessoires/zonnepanelen-en-accus.webp" alt="" />
                </span>
                <h3>{t.card1Titel}</h3>
              </div>
              <p>{t.card1Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/accessoires/fietsendragers-en-racks.webp" alt="" />
                </span>
                <h3>{t.card2Titel}</h3>
              </div>
              <p>{t.card2Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/accessoires/navigatie-en-multimedia.webp" alt="" />
                </span>
                <h3>{t.card3Titel}</h3>
              </div>
              <p>{t.card3Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/accessoires/dakramen-en-ventilatie.webp" alt="" />
                </span>
                <h3>{t.card4Titel}</h3>
              </div>
              <p>{t.card4Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/accessoires/veiligheid-en-beveiliging.webp" alt="" />
                </span>
                <h3>{t.card5Titel}</h3>
              </div>
              <p>{t.card5Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/accessoires/comfort-en-opberging.webp" alt="" />
                </span>
                <h3>{t.card6Titel}</h3>
              </div>
              <p>{t.card6Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/accessoires/luifel.webp" alt="" />
                </span>
                <h3>{t.card7Titel}</h3>
              </div>
              <p>{t.card7Tekst}</p>
            </article>
            <article className="kaart kaart-lift foto-kaart">
              <div className="foto-kaart-boven">
                <span className="media foto-kaart-beeld">
                  <FotoMetPlaceholder src="/assets/img/accessoires/tv-antenne-en-trekhaak.webp" alt="" />
                </span>
                <h3>{t.card8Titel}</h3>
              </div>
              <p>{t.card8Tekst}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="sectie sectie-vlak">
        <div className="wrap">
          <div className="traject">
            <div className="traject-intro">
              <p className="label">{t.hoeWerktLabel}</p>
              <h2>{t.hoeWerktTitel}</h2>
            </div>
            <ol className="traject-lijst">
              <li>
                <span className="traject-stip">1</span>
                <h3>{t.stap1Titel}</h3>
                <p>{t.stap1Tekst}</p>
              </li>
              <li>
                <span className="traject-stip">2</span>
                <h3>{t.stap2Titel}</h3>
                <p>{t.stap2Tekst}</p>
              </li>
              <li>
                <span className="traject-stip">3</span>
                <h3>{t.stap3Titel}</h3>
                <p>{t.stap3Tekst}</p>
              </li>
              <li>
                <span className="traject-stip">4</span>
                <h3>{t.stap4Titel}</h3>
                <p>{t.stap4Tekst}</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="sectie">
        <div className="wrap contact-raster">
          <div>
            <p className="label">{t.montageLabel}</p>
            <h2 style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-h2)" }}>{t.montageTitel}</h2>
            <p style={{ marginTop: "var(--sp-4)", color: "var(--text-muted)", lineHeight: 1.7 }}>
              {t.montageTekst}
            </p>
            <div style={{ marginTop: "var(--sp-5)" }}>
              <ul className="vinklijst">
                <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.montageVink1}</li>
                <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.montageVink2}</li>
                <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.montageVink3}</li>
              </ul>
            </div>
          </div>
          <Formulier titel={t.formTitel} intro={t.formIntro} locale={locale}>
            <div className="veld">
              <label htmlFor="acc-voornaam">{dict.voertuig.detail.voornaam}</label>
              <input id="acc-voornaam" name="voornaam" type="text" autoComplete="given-name" required />
            </div>
            <div className="veld">
              <label htmlFor="acc-achternaam">{dict.voertuig.detail.achternaam}</label>
              <input id="acc-achternaam" name="achternaam" type="text" autoComplete="family-name" required />
            </div>
            <div className="veld">
              <label htmlFor="acc-email">{dict.voertuig.detail.email}</label>
              <input id="acc-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="veld">
              <label htmlFor="acc-telefoon">{t.telefoon}</label>
              <input id="acc-telefoon" name="telefoon" type="tel" autoComplete="tel" />
            </div>
            <div className="veld veld-breed">
              <label htmlFor="acc-bericht">{dict.voertuig.detail.bericht}</label>
              <textarea id="acc-bericht" name="bericht" rows={4} />
            </div>
          </Formulier>
        </div>
      </section>

      <section className="sectie sectie-vlak">
        <div className="wrap">
          <div className="sectie-kop is-midden">
            <h2>{t.faqTitel}</h2>
          </div>
          <Accordeon idPrefix="acc" vragen={t.faqVragen} />
        </div>
      </section>
    </main>
  );
}
