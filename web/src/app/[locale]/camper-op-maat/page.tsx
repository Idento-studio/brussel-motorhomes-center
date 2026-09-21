import Link from "next/link";
import type { Metadata } from "next";
import { Formulier } from "@/components/Formulier";
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
    locale === "fr" ? "Camping-car sur mesure" : locale === "en" ? "Custom-built motorhome" : "Motorhome op maat";
  const description =
    locale === "fr"
      ? "BMC construit des camping-cars entièrement sur mesure, d'un châssis nu à un véhicule prêt à rouler et homologué."
      : locale === "en"
      ? "BMC builds fully custom motorhomes, from a bare chassis to a ready-to-drive, homologated vehicle."
      : "BMC bouwt motorhomes volledig op maat, van leeg chassis tot rijklaar en gehomologeerd voertuig.";
  return {
    title,
    description,
    alternates: buildAlternates("/camper-op-maat/"),
    ...buildOpenGraph({ locale, title, description, pad: "/camper-op-maat/" }),
  };
}

export default async function CamperOpMaatPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          h1: "Votre camping-car depuis la planche à dessin",
          intro:
            "Conçu et construit dans notre propre atelier, d'un châssis nu à un véhicule prêt à rouler et homologué.",
          startProjectCta: "Configurez votre camping-car idéal",
          trajectLabel: "Le parcours",
          trajectTitel: "Du premier entretien à la remise des clés",
          stap1Titel: "Entretien initial",
          stap1Tekst: "Nous cernons vos souhaits, vos habitudes de voyage et votre budget.",
          stap2Titel: "Conception sur mesure",
          stap2Tekst: "Nos ingénieurs élaborent en détail l'agencement, les matériaux et les systèmes.",
          stap3Titel: "Choix du châssis",
          stap3Tekst: "Ensemble, nous choisissons le véhicule de base idéal chez l'un des grands constructeurs.",
          stap4Titel: "Construction & assemblage",
          stap4Tekst: "Construit dans notre propre atelier, avec transparence sur l'avancement.",
          stap5Titel: "Inspection & essais",
          stap5Tekst: "Contrôles techniques et contrôle qualité avant la livraison.",
          stap6Titel: "Homologation & livraison",
          stap6Tekst: "Nous nous occupons de l'homologation belge et européenne.",
          krijgtLabel: "Ce que vous obtenez",
          krijgtTitel: "Un seul interlocuteur, du début à la fin",
          krijgtTekst:
            "Un seul coordinateur de projet suit votre dossier depuis le premier entretien jusqu'à la livraison. Vous apportez l'idée, nous construisons la réalité.",
          vink1: "Conception et ingénierie entièrement sur mesure",
          vink2: "Choix de châssis, agencement et finitions",
          vink3: "Construction dans notre propre atelier par des techniciens certifiés",
          vink4: "Accompagnement jusqu'à l'homologation belge & européenne",
          formTitel: "Démarrez votre projet",
          formIntro: "Décrivez-nous brièvement votre projet.",
          formSubmit: "Envoyer la demande",
          projectLabel: "Votre projet",
          slotTitel: "Prêt à construire ?",
          slotTekst: "Appelez-nous ou laissez vos coordonnées pour un premier entretien sans engagement.",
        }
      : locale === "en"
      ? {
          h1: "Your motorhome from the drawing board",
          intro:
            "Designed and built in our own workshop, from a bare chassis to a ready-to-drive, homologated vehicle.",
          startProjectCta: "Configure your ideal motorhome",
          trajectLabel: "The process",
          trajectTitel: "From first conversation to handover",
          stap1Titel: "Initial consultation",
          stap1Tekst: "We map out your wishes, travel habits and budget.",
          stap2Titel: "Custom design",
          stap2Tekst: "Our engineers work out the layout, materials and systems in detail.",
          stap3Titel: "Choice of chassis",
          stap3Tekst: "Together we choose the ideal base vehicle from one of the major manufacturers.",
          stap4Titel: "Construction & assembly",
          stap4Tekst: "Built in our own workshop, with transparency about progress.",
          stap5Titel: "Inspection & testing",
          stap5Tekst: "Technical checks and quality control before delivery.",
          stap6Titel: "Homologation & delivery",
          stap6Tekst: "We take care of the Belgian and European type approval.",
          krijgtLabel: "What you get",
          krijgtTitel: "One point of contact, from start to finish",
          krijgtTekst:
            "A single project coordinator follows your file from the first conversation through to delivery. You bring the idea, we build the reality.",
          vink1: "Fully custom design & engineering",
          vink2: "Choice of chassis, layout & finish",
          vink3: "Built in our own workshop by certified technicians",
          vink4: "Guidance through to Belgian & European homologation",
          formTitel: "Start your project",
          formIntro: "Tell us briefly what you have in mind.",
          formSubmit: "Send request",
          projectLabel: "Your project",
          slotTitel: "Ready to build?",
          slotTekst: "Call us or leave your details for a no-obligation initial consultation.",
        }
      : {
          h1: "Uw motorhome vanaf de tekentafel",
          intro:
            "Ontworpen en gebouwd in ons eigen atelier, van een leeg chassis tot een rijklaar en gehomologeerd voertuig.",
          startProjectCta: "Stel uw ideale motorhome samen",
          trajectLabel: "Het traject",
          trajectTitel: "Van eerste gesprek tot sleutel op de deur",
          stap1Titel: "Intakegesprek",
          stap1Tekst: "Wij brengen uw wensen, reisgewoonten en budget in kaart.",
          stap2Titel: "Ontwerp op maat",
          stap2Tekst: "Onze ingenieurs werken indeling, materialen en systemen in detail uit.",
          stap3Titel: "Keuze van het chassis",
          stap3Tekst: "Samen kiezen we het ideale basisvoertuig bij een van de grote constructeurs.",
          stap4Titel: "Bouw & assemblage",
          stap4Tekst: "Gebouwd in eigen atelier, met transparantie over de voortgang.",
          stap5Titel: "Inspectie & testen",
          stap5Tekst: "Technische controles en kwaliteitscontrole vóór oplevering.",
          stap6Titel: "Homologatie & levering",
          stap6Tekst: "Wij regelen de Belgische en Europese typegoedkeuring.",
          krijgtLabel: "Wat u krijgt",
          krijgtTitel: "Eén aanspreekpunt, van begin tot einde",
          krijgtTekst:
            "Eén projectcoördinator volgt uw dossier op van het eerste gesprek tot de levering. U brengt het idee, wij bouwen de realiteit.",
          vink1: "Volledig maatwerk ontwerp & engineering",
          vink2: "Keuze uit elk chassis, indeling & afwerking",
          vink3: "Bouw in eigen werkplaats door gecertificeerde technici",
          vink4: "Begeleiding tot Belgische & Europese homologatie",
          formTitel: "Start uw project",
          formIntro: "Vertel ons kort wat u voor ogen heeft.",
          formSubmit: "Verstuur aanvraag",
          projectLabel: "Uw project",
          slotTitel: "Klaar om te bouwen?",
          slotTekst: "Bel ons of laat uw gegevens achter voor een vrijblijvend intakegesprek.",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.nav.camperOpMaat }])} />
          <JsonLd data={buildService(locale, t.h1, t.intro, "/camper-op-maat/")} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{dict.nav.camperOpMaat}</span>
          </nav>
          <h1>{t.h1}</h1>
          <p className="intro">{t.intro}</p>
          <div className="knoppen" style={{ marginTop: "var(--sp-5)" }}>
            <Link className="btn btn-goud" href={L(locale, "/camper-op-maat/start-project/")}>{t.startProjectCta}</Link>
          </div>
        </div>
      </div>

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
              <li>
                <span className="traject-stip">5</span>
                <h3>{t.stap5Titel}</h3>
                <p>{t.stap5Tekst}</p>
              </li>
              <li>
                <span className="traject-stip">6</span>
                <h3>{t.stap6Titel}</h3>
                <p>{t.stap6Tekst}</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="sectie sectie-vlak">
        <div className="wrap contact-raster">
          <div>
            <p className="label">{t.krijgtLabel}</p>
            <h2 style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-h2)" }}>{t.krijgtTitel}</h2>
            <p style={{ marginTop: "var(--sp-4)", color: "var(--text-muted)", lineHeight: 1.7 }}>
              {t.krijgtTekst}
            </p>
            <div style={{ marginTop: "var(--sp-5)" }}>
              <ul className="vinklijst">
                <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.vink1}</li>
                <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.vink2}</li>
                <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.vink3}</li>
                <li><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>{t.vink4}</li>
              </ul>
            </div>
          </div>
          <Formulier titel={t.formTitel} intro={t.formIntro} submitLabel={t.formSubmit} locale={locale}>
            <div className="veld">
              <label htmlFor="maatwerk-voornaam">{dict.voertuig.detail.voornaam}</label>
              <input id="maatwerk-voornaam" name="voornaam" type="text" required />
            </div>
            <div className="veld">
              <label htmlFor="maatwerk-achternaam">{dict.voertuig.detail.achternaam}</label>
              <input id="maatwerk-achternaam" name="achternaam" type="text" required />
            </div>
            <div className="veld">
              <label htmlFor="maatwerk-email">{dict.voertuig.detail.email}</label>
              <input id="maatwerk-email" name="email" type="email" required />
            </div>
            <div className="veld">
              <label htmlFor="maatwerk-telefoon">{dict.voertuig.detail.telefoon}</label>
              <input id="maatwerk-telefoon" name="telefoon" type="tel" />
            </div>
            <div className="veld veld-breed">
              <label htmlFor="maatwerk-bericht">{t.projectLabel}</label>
              <textarea id="maatwerk-bericht" name="bericht" rows={5} />
            </div>
          </Formulier>
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
