import Link from "next/link";
import type { Metadata } from "next";
import { VideoMetGeluidsknop } from "@/components/VideoMetGeluidsknop";
import { FotoMetPlaceholder } from "@/components/FotoMetPlaceholder";
import { L, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
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
    locale === "fr"
      ? "Camping-cars pour personnes à mobilité réduite"
      : locale === "en"
      ? "Motorhomes for people with reduced mobility"
      : "Motorhomes voor andersvaliden";
  const description =
    locale === "fr"
      ? "Camping-cars adaptés en collaboration avec VJ Mobility : rampes d'accès, portes élargies et commandes adaptées."
      : locale === "en"
      ? "Adapted motorhomes in partnership with VJ Mobility: access ramps, widened doors and adapted controls."
      : "Aangepaste motorhomes in samenwerking met VJ Mobility: oprijplaten, verbrede deuren en aangepaste besturing.";
  return {
    title,
    description,
    alternates: buildAlternates("/andersvaliden/", locale),
    ...buildOpenGraph({ locale, title, description, pad: "/andersvaliden/" }),
  };
}

export default async function AndersvalidenPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          h1: "Camping-cars adaptés pour personnes à mobilité réduite",
          intro:
            "Nous transformons des camping-cars afin que chacun, même avec un handicap physique, puisse voyager en toute sérénité.",
          partnerLabel: "Partenaire recommandé",
          partnerTitel: "VJ Mobility",
          videoAria: "Camping-car adapté de VJ Mobility",
          partnerIntro: "Des camping-cars adaptés pour une autonomie maximale",
          partnerP1:
            "VJ Mobility, basé à Halle, a été fondé par Jimmy, ancien garagiste et lui-même utilisateur d'un fauteuil roulant. L'entreprise combine expertise technique et expérience pratique pour des solutions de mobilité sur mesure.",
          partnerP2:
            "En tant que client BMC, VJ Mobility sait exactement ce dont votre camping-car a besoin : intérieurs sans obstacles, cuisines surbaissées, systèmes de levage au plafond intégrés et espaces douche de plain-pied.",
          vink1: "Adaptations automobiles et camping-car certifiées CARA",
          vink2: "Agencements de camping-car sans obstacles avec système de levage au plafond",
          vink3:
            "Accompagnement pour les dossiers auprès du VAPH (l'agence flamande pour une vie autonome) et les remboursements",
          partnerCta: "Visiter VJ Mobility",
          aanpassingenLabel: "Nos adaptations",
          aanpassingenTitel: "De la petite intervention à la transformation complète",
          card1Titel: "Rampes d'accès & élévateurs",
          card1Tekst: "Rampes d'accès électriques ou manuelles et élévateurs pour fauteuil roulant pour un accès aisé.",
          card2Titel: "Portes élargies",
          card2Tekst: "Élargissement des portes pour que les fauteuils roulants puissent entrer et sortir sans effort.",
          card3Titel: "Intérieur adapté",
          card3Tekst: "Couchages adaptés, plans de travail abaissés et une salle de bain accessible.",
          card4Titel: "Adaptations de conduite",
          card4Tekst: "Adaptations de la pédale d'accélérateur, du frein et de la direction pour une conduite sûre.",
          card5Titel: "Siège pivotant & transferts",
          card5Tekst: "Sièges pivotants pour faciliter le transfert depuis le fauteuil roulant.",
          card6Titel: "Conseil personnalisé",
          card6Tekst: "Chaque projet commence par un entretien : analyse de la situation et un plan sur mesure.",
          blauwTitel: "La liberté de la route, pour tous",
          blauwTekst:
            "Un handicap physique ne doit pas être un obstacle à l'aventure. Chez BMC, chacun a droit à la liberté de la route ouverte.",
          trajectLabel: "Notre parcours",
          trajectTitel: "Comment travaillons-nous ?",
          stap1Titel: "Entretien préalable",
          stap1Tekst: "Nous discutons de votre situation spécifique, de vos souhaits et de votre budget.",
          stap2Titel: "Plan sur mesure",
          stap2Tekst: "Nos ingénieurs élaborent un plan de transformation détaillé, avec un devis transparent.",
          stap3Titel: "Transformation professionnelle",
          stap3Tekst: "Des techniciens certifiés réalisent la transformation dans un atelier spécialisé.",
          stap4Titel: "Livraison & test",
          stap4Tekst: "Test approfondi du camping-car adapté avant la livraison.",
          ctaTitel: "Curieux de savoir ce que nous pouvons faire pour vous ?",
          ctaTekst: "Chaque projet est unique. Contactez-nous pour un entretien sans engagement.",
        }
      : locale === "en"
      ? {
          h1: "Motorhomes adapted for people with reduced mobility",
          intro:
            "We convert motorhomes so that everyone, including people with a physical disability, can travel worry-free.",
          partnerLabel: "Recommended partner",
          partnerTitel: "VJ Mobility",
          videoAria: "Adapted motorhome from VJ Mobility",
          partnerIntro: "Adapted motorhomes for maximum independence",
          partnerP1:
            "VJ Mobility, based in Halle, was founded by Jimmy, a former garage owner and a wheelchair user himself. The company combines technical expertise with hands-on experience to deliver tailored mobility solutions.",
          partnerP2:
            "As a BMC customer, VJ Mobility knows exactly what your motorhome needs: obstacle-free interiors, under-counter kitchens, integrated ceiling hoist systems and level-access shower areas.",
          vink1: "CARA-certified car and motorhome adaptations",
          vink2: "Obstacle-free motorhome layouts with ceiling hoist system",
          vink3:
            "Support with VAPH applications (the Flemish agency for independent living) and reimbursements",
          partnerCta: "Visit VJ Mobility",
          aanpassingenLabel: "Our adaptations",
          aanpassingenTitel: "From small adjustments to a complete conversion",
          card1Titel: "Access ramps & lifts",
          card1Tekst: "Electric or manual access ramps and wheelchair lifts for easy access.",
          card2Titel: "Widened doors",
          card2Tekst: "Widened door openings so wheelchairs can get in and out without effort.",
          card3Titel: "Adapted interior",
          card3Tekst: "Adapted sleeping areas, lowered worktops and an accessible bathroom.",
          card4Titel: "Driving control adaptations",
          card4Tekst: "Adaptations to the accelerator, brake pedal and steering for safe driving.",
          card5Titel: "Swivel seat & transfers",
          card5Tekst: "Swivel seats to make transferring from a wheelchair easier.",
          card6Titel: "Personal advice",
          card6Tekst: "Every project starts with a conversation: an analysis of your situation and a tailored plan.",
          blauwTitel: "Freedom of the road, for everyone",
          blauwTekst:
            "A physical disability should never stand in the way of adventure. At BMC, everyone has the right to the freedom of the open road.",
          trajectLabel: "Our process",
          trajectTitel: "How do we work?",
          stap1Titel: "Initial consultation",
          stap1Tekst: "We discuss your specific situation, wishes and budget.",
          stap2Titel: "Tailored plan",
          stap2Tekst: "Our engineers draw up a detailed conversion plan, with a transparent quote.",
          stap3Titel: "Professional conversion",
          stap3Tekst: "Certified technicians carry out the conversion in a specialised workshop.",
          stap4Titel: "Handover & test",
          stap4Tekst: "Thorough testing of the adapted motorhome before handover.",
          ctaTitel: "Curious what we can do for you?",
          ctaTekst: "Every project is unique. Contact us for a no-obligation conversation.",
        }
      : {
          h1: "Motorhomes aangepast voor andersvaliden",
          intro:
            "Wij verbouwen motorhomes zodat iedereen, ook met een fysieke beperking, zorgeloos op reis kan.",
          partnerLabel: "Aanbevolen partner",
          partnerTitel: "VJ Mobility",
          videoAria: "Aangepaste motorhome van VJ Mobility",
          partnerIntro: "Aangepaste motorhomes voor maximale zelfstandigheid",
          partnerP1:
            "VJ Mobility uit Halle werd opgericht door Jimmy, voormalig garagist en zelf rolstoelgebruiker. Het bedrijf combineert technische expertise met praktijkervaring voor mobiliteitsoplossingen op maat.",
          partnerP2:
            "Als BMC-klant weet VJ Mobility wat uw motorhome nodig heeft: obstakelvrije interieurs, onderrijdbare keukens, geïntegreerde plafond-liftsystemen en vlakke doucheruimtes.",
          vink1: "CARA-gecertificeerde auto- en motorhome-aanpassingen",
          vink2: "Obstakelvrije motorhome-lay-outs met plafond-liftsysteem",
          vink3: "Begeleiding bij VAPH-dossiers en terugbetalingen",
          partnerCta: "Bezoek VJ Mobility",
          aanpassingenLabel: "Onze aanpassingen",
          aanpassingenTitel: "Van kleine ingreep tot volledige ombouw",
          card1Titel: "Oprijplaten & liften",
          card1Tekst: "Elektrische of handmatige oprijplaten en rolstoelliften voor vlotte toegang.",
          card2Titel: "Verbrede deuren",
          card2Tekst: "Verbreding van deuropeningen zodat rolstoelen moeiteloos in en uit kunnen.",
          card3Titel: "Aangepast interieur",
          card3Tekst: "Aangepaste slaapplaatsen, verlaagde werkbladen en een toegankelijke badkamer.",
          card4Titel: "Besturingsaanpassingen",
          card4Tekst: "Aanpassingen van gaspedaal, rempedaal en stuurinrichting voor veilig rijden.",
          card5Titel: "Draaistoel & transfers",
          card5Tekst: "Draaibare stoelen voor een makkelijke transfer vanuit de rolstoel.",
          card6Titel: "Persoonlijk advies",
          card6Tekst: "Elk project begint met een gesprek: analyse van de situatie en een plan op maat.",
          blauwTitel: "Vrijheid op de weg, voor iedereen",
          blauwTekst:
            "Een fysieke beperking mag geen obstakel zijn voor het avontuur. Bij BMC heeft iedereen recht op de vrijheid van de open weg.",
          trajectLabel: "Ons traject",
          trajectTitel: "Hoe gaan wij te werk?",
          stap1Titel: "Intakegesprek",
          stap1Tekst: "We bespreken uw specifieke situatie, wensen en budget.",
          stap2Titel: "Plan op maat",
          stap2Tekst: "Onze ingenieurs werken een gedetailleerd verbouwingsplan uit, met transparante offerte.",
          stap3Titel: "Vakkundige verbouwing",
          stap3Tekst: "Gecertificeerde technici voeren de verbouwing uit in een gespecialiseerd atelier.",
          stap4Titel: "Oplevering & test",
          stap4Tekst: "Uitgebreide test van de aangepaste motorhome vóór de oplevering.",
          ctaTitel: "Benieuwd wat wij voor u kunnen betekenen?",
          ctaTekst: "Elk project is uniek. Neem contact op voor een vrijblijvend gesprek.",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.nav.andersvaliden }])} />
          <JsonLd data={buildService(locale, t.h1, t.intro, "/andersvaliden/")} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{dict.nav.andersvaliden}</span>
          </nav>
          <h1>{t.h1}</h1>
          <p className="intro">{t.intro}</p>
        </div>
      </div>

      <section className="sectie">
        <div className="wrap">
          <div className="split">
            <VideoMetGeluidsknop
              src="/assets/video/home/andersvaliden.mp4"
              poster="/assets/img/home/andersvaliden-poster.webp"
              ariaLabel={t.videoAria}
            />
            <div className="partner">
              <p className="label">{t.partnerLabel}</p>
              <h2 style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-h2)" }}>{t.partnerTitel}</h2>
              <h3>{t.partnerIntro}</h3>
              <p>{t.partnerP1}</p>
              <p>{t.partnerP2}</p>
              <ul className="vinklijst">
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.vink1}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.vink2}
                </li>
                <li>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t.vink3}
                </li>
              </ul>
              <a
                className="btn btn-blauw"
                href="https://vjmobility.be/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: "var(--sp-5)" }}
              >
                {t.partnerCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sectie sectie-vlak">
        <div className="wrap">
          <div className="sectie-kop">
            <p className="label">{t.aanpassingenLabel}</p>
            <h2>{t.aanpassingenTitel}</h2>
          </div>
          <div className="raster raster-3">
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/andersvaliden/oprijplaten-en-liften.webp" alt="" />
              </span>
              <h3>{t.card1Titel}</h3>
              <p>{t.card1Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/andersvaliden/verbrede-deuren.webp" alt="" />
              </span>
              <h3>{t.card2Titel}</h3>
              <p>{t.card2Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/andersvaliden/aangepast-interieur.webp" alt="" />
              </span>
              <h3>{t.card3Titel}</h3>
              <p>{t.card3Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/andersvaliden/besturingsaanpassingen.webp" alt="" />
              </span>
              <h3>{t.card4Titel}</h3>
              <p>{t.card4Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/andersvaliden/draaistoel-en-transfers.webp" alt="" />
              </span>
              <h3>{t.card5Titel}</h3>
              <p>{t.card5Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/andersvaliden/persoonlijk-advies.webp" alt="" />
              </span>
              <h3>{t.card6Titel}</h3>
              <p>{t.card6Tekst}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="sectie sectie-blauw" style={{ textAlign: "center" }}>
        <div className="wrap">
          <h2 style={{ maxWidth: "18ch", marginInline: "auto", fontSize: "var(--fs-h2)" }}>
            {t.blauwTitel}
          </h2>
          <p style={{ maxWidth: "52ch", margin: "var(--sp-4) auto 0", lineHeight: 1.7 }}>
            {t.blauwTekst}
          </p>
        </div>
      </section>

      <section className="sectie">
        <div className="wrap">
          <div className="traject">
            <div className="traject-intro">
              <p className="label">{t.trajectLabel}</p>
              <h2>{t.trajectTitel}</h2>
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

      <section className="sectie slot-cta">
        <div className="wrap">
          <h2>{t.ctaTitel}</h2>
          <p>{t.ctaTekst}</p>
          <div className="knoppen">
            <Link className="btn btn-goud" href={L(locale, "/contact/")}>{dict.nav.contact}</Link>
            <a className="btn btn-blauw" href="tel:+32471407949">{dict.voertuig.detail.bel}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
