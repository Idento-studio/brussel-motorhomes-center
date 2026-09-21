import Link from "next/link";
import type { Metadata } from "next";
import { HeroZoekbalk } from "@/components/HeroZoekbalk";
import { VideoMetGeluidsknop } from "@/components/VideoMetGeluidsknop";
import { FotoMetPlaceholder } from "@/components/FotoMetPlaceholder";
import { AanbodTabs } from "@/components/AanbodTabs";
import { haalVerkoopVoertuigen, haalVerhuurVoertuigen } from "@/sanity/queries";
import { L, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { JsonLd } from "@/components/JsonLd";
import { buildOrganizationAndWebSite } from "@/lib/structuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "fr"
      ? "Acheter, louer et entretenir un camping-car"
      : locale === "en"
      ? "Buy, rent and service a motorhome"
      : "Motorhomes kopen, huren en onderhouden";
  const description =
    locale === "fr"
      ? "Camping-cars à acheter, louer ou entretenir en Belgique, près de Bruxelles. Large offre, atelier propre et accompagnement jusqu'à l'homologation belge."
      : locale === "en"
      ? "Motorhomes to buy, rent or service in Belgium, near Brussels. Wide range, our own workshop and guidance through Belgian homologation."
      : "Motorhomes kopen, huren of onderhouden in België, vlakbij Brussel. Ruim aanbod, eigen werkplaats en begeleiding tot Belgische homologatie.";
  return {
    title,
    description,
    alternates: buildAlternates("/"),
    ...buildOpenGraph({ locale, title, description, pad: "/" }),
  };
}

const MERKEN = [
  { naam: "Adria", bestand: "adria.webp" },
  { naam: "Blucamp", bestand: "blucamp.webp" },
  { naam: "Bürstner", bestand: "burstner.webp" },
  { naam: "Dethleffs", bestand: "dethleffs.webp" },
  { naam: "Hymer", bestand: "hymer.webp" },
  { naam: "Ilusion", bestand: "ilusion.webp" },
  { naam: "Knaus", bestand: "knaus.webp" },
  { naam: "Westfalia", bestand: "westfalia.webp" },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const [verkoopVoertuigen, verhuurVoertuigen] = await Promise.all([
    haalVerkoopVoertuigen(locale),
    haalVerhuurVoertuigen(locale),
  ]);

  const t =
    locale === "fr"
      ? {
          h1: "Votre partenaire pour une liberté sans limites.",
          lead: "Camping-cars à acheter, louer ou entretenir en Belgique. Découvrez notre large offre de camping-cars et profitez d'un entretien sans souci par des spécialistes.",
          troefWerkplaats: "Atelier propre",
          troefHomologatie: "Homologation belge",
          troefDiensten: "Vente · location · entretien",
          merkenAria: "Marques que nous distribuons",
          dienstenLabel: "Ce que nous faisons",
          dienstenTitel: "Nos services",
          onderhoudTitel: "Entretien",
          onderhoudTekst: "Confiez votre camping-car en toute tranquillité. Entretien sans souci par nos spécialistes qualifiés.",
          onderhoudCta: "Prendre rendez-vous",
          accessoiresTitel: "Accessoires & options",
          accessoiresTekst: "Personnalisez votre camping-car avec des accessoires de qualité : des panneaux solaires et porte-vélos jusqu'à la navigation avancée, montés avec soin par notre équipe.",
          accessoiresCta: "Voir les options",
          verkoopTitel: "Vendez votre camping-car",
          verkoopTekst: "Vendez votre camping-car directement à BMC ou laissez-nous organiser la vente complète pour vous.",
          verkoopCta: "Découvrir les options",
          maatwerkLabel: "Sur mesure de A à Z",
          maatwerkTitel: "Du châssis nu au contrôle technique belge",
          maatwerkTekst: "BMC construit des camping-cars entièrement sur mesure, d'un châssis nu à un véhicule prêt à rouler et homologué, parfaitement adapté à vos souhaits. Notre atelier et nos techniciens certifiés vous accompagnent depuis le premier concept jusqu'à l'homologation belge et européenne définitive. Vous apportez l'idée, nous construisons la réalité.",
          stap1Titel: "Conception",
          stap1Tekst: "Agencement, châssis et finitions définis ensemble.",
          stap2Titel: "Construction",
          stap2Tekst: "Construit dans notre propre atelier par des techniciens certifiés.",
          stap3Titel: "Contrôle technique",
          stap3Tekst: "Accompagnement jusqu'à l'homologation belge et européenne.",
          maatwerkVink1: "Conception et ingénierie entièrement sur mesure",
          maatwerkVink2: "Choix de châssis, agencement et finitions",
          maatwerkVink3: "Atelier propre avec techniciens certifiés",
          maatwerkCta: "Démarrer votre projet",
          andersvalidenLabel: "Camping-cars adaptés",
          andersvalidenTitel: "La liberté pour tous, même avec un handicap",
          andersvalidenTekst: "En collaboration avec VJ Mobility, nous transformons des camping-cars pour que les personnes à mobilité réduite puissent également voyager sans souci. Des rampes d'accès et portes élargies jusqu'à une direction entièrement adaptée. Nous rendons cela possible.",
          andersvalidenVink1: "Rampes d'accès & solutions d'accessibilité",
          andersvalidenVink2: "Portes élargies & intérieur adapté",
          andersvalidenVink3: "Direction adaptée (pédales & volant)",
          andersvalidenVink4: "Conseil personnalisé & sur mesure",
          andersvalidenCta: "En savoir plus",
          slotTitel: "Vous ne trouvez pas ce que vous cherchez ?",
          slotTekst: "Contactez notre équipe. Nous vous aidons volontiers à trouver le camping-car parfait.",
        }
      : locale === "en"
      ? {
          h1: "Your partner for boundless freedom.",
          lead: "Motorhomes to buy, rent or service in Belgium. Discover our wide range of motorhomes and enjoy worry-free maintenance by specialists.",
          troefWerkplaats: "Our own workshop",
          troefHomologatie: "Belgian homologation",
          troefDiensten: "Sales · rental · maintenance",
          merkenAria: "Brands we distribute",
          dienstenLabel: "What we do",
          dienstenTitel: "Our services",
          onderhoudTitel: "Maintenance",
          onderhoudTekst: "Leave your motorhome in safe hands. Worry-free maintenance by our skilled specialists.",
          onderhoudCta: "Book an appointment",
          accessoiresTitel: "Accessories & options",
          accessoiresTekst: "Personalise your motorhome with quality accessories: from solar panels and bike racks to advanced navigation, expertly fitted by our team.",
          accessoiresCta: "View options",
          verkoopTitel: "Sell your motorhome",
          verkoopTekst: "Sell your motorhome directly to BMC or let us arrange the full sale for you.",
          verkoopCta: "Discover the options",
          maatwerkLabel: "Custom-built from A to Z",
          maatwerkTitel: "From bare chassis to Belgian roadworthiness inspection",
          maatwerkTekst: "BMC builds fully custom motorhomes, from a bare chassis to a road-ready, homologated vehicle that perfectly matches your wishes. Our workshop and certified technicians guide you from the first design to final Belgian and European type approval. You bring the idea, we build the reality.",
          stap1Titel: "Design",
          stap1Tekst: "Layout, chassis and finish defined together.",
          stap2Titel: "Build",
          stap2Tekst: "Built in our own workshop by certified technicians.",
          stap3Titel: "Inspection",
          stap3Tekst: "Guided through to Belgian and European type approval.",
          maatwerkVink1: "Fully custom design & engineering",
          maatwerkVink2: "Choice of any chassis, layout & finish",
          maatwerkVink3: "Our own workshop with certified technicians",
          maatwerkCta: "Start your project",
          andersvalidenLabel: "Adapted motorhomes",
          andersvalidenTitel: "Freedom for everyone, even with a disability",
          andersvalidenTekst: "In collaboration with VJ Mobility, we convert motorhomes so that people with a physical disability can also travel worry-free. From access ramps and widened doors to fully adapted controls. We make it possible.",
          andersvalidenVink1: "Access ramps & accessibility solutions",
          andersvalidenVink2: "Widened doors & adapted interior",
          andersvalidenVink3: "Adapted controls (pedals & steering)",
          andersvalidenVink4: "Personal advice & custom solutions",
          andersvalidenCta: "More information",
          slotTitel: "Can't find what you're looking for?",
          slotTekst: "Get in touch with our team. We're happy to help you find the perfect motorhome.",
        }
      : {
          h1: "Uw partner voor grenzeloze vrijheid.",
          lead: "Motorhomes kopen, huren of onderhouden in België. Ontdek ons ruim aanbod motorhomes en geniet van zorgeloos onderhoud door specialisten.",
          troefWerkplaats: "Eigen werkplaats",
          troefHomologatie: "Belgische homologatie",
          troefDiensten: "Verkoop · verhuur · onderhoud",
          merkenAria: "Merken die wij verdelen",
          dienstenLabel: "Wat wij doen",
          dienstenTitel: "Onze diensten",
          onderhoudTitel: "Onderhoud",
          onderhoudTekst: "Laat uw motorhome met een gerust hart achter. Zorgeloos onderhoud door onze vakkundige specialisten.",
          onderhoudCta: "Maak een afspraak",
          accessoiresTitel: "Accessoires & opties",
          accessoiresTekst: "Personaliseer uw motorhome met kwalitatieve accessoires: van zonnepanelen en fietsendragers tot geavanceerde navigatie, vakkundig gemonteerd door ons team.",
          accessoiresCta: "Bekijk opties",
          verkoopTitel: "Verkoop je motorhome",
          verkoopTekst: "Verkoop uw motorhome rechtstreeks aan BMC of laat ons de volledige verkoop voor u regelen.",
          verkoopCta: "Ontdek de opties",
          maatwerkLabel: "Maatwerk van A tot Z",
          maatwerkTitel: "Van leeg chassis tot Belgische keuring",
          maatwerkTekst: "BMC bouwt motorhomes volledig op maat, van een leeg chassis tot een rijklaar, gehomologeerd voertuig dat perfect aansluit bij uw wensen. Ons atelier en gecertificeerde technici begeleiden u van het eerste ontwerp tot de definitieve Belgische en Europese typegoedkeuring. U brengt het idee, wij bouwen de realiteit.",
          stap1Titel: "Ontwerp",
          stap1Tekst: "Indeling, chassis en afwerking samen vastleggen.",
          stap2Titel: "Opbouw",
          stap2Tekst: "Gebouwd in eigen atelier door gecertificeerde technici.",
          stap3Titel: "Keuring",
          stap3Tekst: "Begeleid tot Belgische en Europese typegoedkeuring.",
          maatwerkVink1: "Volledig maatwerk ontwerp & engineering",
          maatwerkVink2: "Keuze uit elk chassis, indeling & afwerking",
          maatwerkVink3: "Eigen werkplaats met gecertificeerde technici",
          maatwerkCta: "Start uw project",
          andersvalidenLabel: "Aangepaste motorhomes",
          andersvalidenTitel: "Vrijheid voor iedereen, ook met een beperking",
          andersvalidenTekst: "In samenwerking met VJ Mobility verbouwen wij motorhomes zodat ook mensen met een fysieke beperking zorgeloos op reis kunnen. Van oprijplaten en verbrede deuren tot volledig aangepaste besturing. Wij maken het mogelijk.",
          andersvalidenVink1: "Oprijplaten & toegangsoplossingen",
          andersvalidenVink2: "Verbrede deuren & aangepast interieur",
          andersvalidenVink3: "Aangepaste besturing (pedalen & stuur)",
          andersvalidenVink4: "Persoonlijk advies & maatwerk",
          andersvalidenCta: "Meer informatie",
          slotTitel: "Niet gevonden wat u zoekt?",
          slotTekst: "Neem contact op met ons team. Wij helpen u graag bij het vinden van de perfecte motorhome.",
        };

  return (
    <main id="inhoud">
      <JsonLd data={buildOrganizationAndWebSite(locale)} />
      <section className="hero">
        <div className="media hero-media">
          <FotoMetPlaceholder
            src="/assets/img/home/hero.webp"
            alt={
              locale === "fr"
                ? "Camping-cars devant le hangar de Brussel Motorhomes Center"
                : locale === "en"
                ? "Motorhomes in front of the Brussel Motorhomes Center warehouse"
                : "Motorhomes voor de loods van Brussel Motorhomes Center"
            }
            fetchPriority="high"
          />
        </div>
        <div className="wrap">
          <div className="hero-tekst">
            <h1>{t.h1}</h1>
            <p className="lead">{t.lead}</p>
            <ul className="hero-troeven">
              <li>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                {t.troefWerkplaats}
              </li>
              <li>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                {t.troefHomologatie}
              </li>
              <li>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                {t.troefDiensten}
              </li>
            </ul>
          </div>

          <HeroZoekbalk locale={locale} />
        </div>
      </section>

      <section className="merkenbalk" aria-label={t.merkenAria}>
        <div className="merken-spoor">
          {[...MERKEN, ...MERKEN].map((merk, i) => (
            <span className="merk-logo" key={`${merk.bestand}-${i}`}>
              <FotoMetPlaceholder
                src={`/assets/img/merken/${merk.bestand}`}
                alt={merk.naam}
                loading="lazy"
              />
              <span>{merk.naam}</span>
            </span>
          ))}
        </div>
      </section>

      <section className="sectie sectie-vlak" id="aanbod">
        <div className="wrap">
          <AanbodTabs verkoopVoertuigen={verkoopVoertuigen} verhuurVoertuigen={verhuurVoertuigen} locale={locale} />
        </div>
      </section>

      <section className="sectie">
        <div className="wrap">
          <div className="sectie-kop is-midden">
            <p className="label">{t.dienstenLabel}</p>
            <h2>{t.dienstenTitel}</h2>
          </div>
          <div className="raster raster-3">
            <article className="kaart kaart-lift dienst">
              <div className="media media-kaart">
                <FotoMetPlaceholder
                  src="/assets/img/home/dienst-onderhoud.webp"
                  alt={t.onderhoudTitel}
                  loading="lazy"
                />
                <span className="media-scrim"></span>
                <h3>{t.onderhoudTitel}</h3>
              </div>
              <div className="kaart-body">
                <p>{t.onderhoudTekst}</p>
                <Link className="tekst-link" href={L(locale, "/onderhoud/")}>
                  {t.onderhoudCta}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </article>
            <article className="kaart kaart-lift dienst">
              <div className="media media-kaart">
                <FotoMetPlaceholder
                  src="/assets/img/home/dienst-accessoires.webp"
                  alt={t.accessoiresTitel}
                  loading="lazy"
                />
                <span className="media-scrim"></span>
                <h3>{t.accessoiresTitel}</h3>
              </div>
              <div className="kaart-body">
                <p>{t.accessoiresTekst}</p>
                <Link className="tekst-link" href={L(locale, "/accessoires-en-opties/")}>
                  {t.accessoiresCta}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </article>
            <article className="kaart kaart-lift dienst">
              <div className="media media-kaart">
                <FotoMetPlaceholder
                  src="/assets/img/home/dienst-verkoop-je-camper.webp"
                  alt={t.verkoopTitel}
                  loading="lazy"
                />
                <span className="media-scrim"></span>
                <h3>{t.verkoopTitel}</h3>
              </div>
              <div className="kaart-body">
                <p>{t.verkoopTekst}</p>
                <Link className="tekst-link" href={L(locale, "/verkoop-je-camper/")}>
                  {t.verkoopCta}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="sectie sectie-vlak">
        <div className="wrap split">
          <div>
            <p className="label">{t.maatwerkLabel}</p>
            <h2 style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-h2)" }}>{t.maatwerkTitel}</h2>
            <p style={{ marginTop: "var(--sp-4)", color: "var(--text-muted)", lineHeight: 1.7 }}>{t.maatwerkTekst}</p>
            <div style={{ marginTop: "var(--sp-6)" }}>
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
              </ol>
            </div>
            <div style={{ marginTop: "var(--sp-6)" }}>
              <ul className="vinklijst">
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.maatwerkVink1}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.maatwerkVink2}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.maatwerkVink3}
                </li>
              </ul>
            </div>
            <Link className="btn btn-goud" style={{ marginTop: "var(--sp-6)" }} href={L(locale, "/camper-op-maat/")}>{t.maatwerkCta}</Link>
          </div>
          <div className="media media-4x3 media-rond">
            <FotoMetPlaceholder
              src="/assets/img/home/maatwerk.webp"
              alt={
                locale === "fr"
                  ? "Camping-car en construction dans l'atelier de BMC"
                  : locale === "en"
                  ? "Motorhome under construction in BMC's workshop"
                  : "Motorhome in opbouw in het atelier van BMC"
              }
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="sectie sectie-blauw">
        <div className="wrap split">
          <VideoMetGeluidsknop
            src="/assets/video/home/andersvaliden.mp4"
            poster="/assets/img/home/andersvaliden-poster.webp"
            ariaLabel={
              locale === "fr"
                ? "Camping-car adapté avec rampe d'accès"
                : locale === "en"
                ? "Adapted motorhome with access ramp"
                : "Aangepaste motorhome met oprijplaat"
            }
          />
          <div>
            <p className="label label-licht">{t.andersvalidenLabel}</p>
            <h2 style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-h2)" }}>{t.andersvalidenTitel}</h2>
            <p style={{ marginTop: "var(--sp-4)", lineHeight: 1.7 }}>{t.andersvalidenTekst}</p>
            <div style={{ marginTop: "var(--sp-5)" }}>
              <ul className="vinklijst">
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.andersvalidenVink1}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.andersvalidenVink2}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.andersvalidenVink3}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.andersvalidenVink4}
                </li>
              </ul>
            </div>
            <Link className="btn btn-goud" style={{ marginTop: "var(--sp-6)" }} href={L(locale, "/andersvaliden/")}>{t.andersvalidenCta}</Link>
          </div>
        </div>
      </section>

      <section className="sectie slot-cta">
        <div className="wrap">
          <h2>{t.slotTitel}</h2>
          <p>{t.slotTekst}</p>
          <div className="knoppen">
            <Link className="btn btn-goud" href={L(locale, "/contact/")}>{dict.nav.contact}</Link>
            <a className="btn btn-blauw" href="tel:+32471407949">{dict.voertuig.detail.bel}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
