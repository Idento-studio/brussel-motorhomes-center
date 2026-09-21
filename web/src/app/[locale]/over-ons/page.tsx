import Link from "next/link";
import type { Metadata } from "next";
import { FotoMetPlaceholder } from "@/components/FotoMetPlaceholder";
import { L, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList } from "@/lib/structuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "fr" ? "À propos" : locale === "en" ? "About us" : "Over ons";
  const description =
    locale === "fr"
      ? "Depuis plus de 15 ans, votre partenaire de confiance pour les motorhomes à Bruxelles et ses environs."
      : locale === "en"
      ? "For over 15 years, your trusted partner for motorhomes in Brussels and the surrounding area."
      : "Al meer dan 15 jaar uw vertrouwde partner voor motorhomes in Brussel en omstreken.";
  return {
    title,
    description,
    alternates: buildAlternates("/over-ons/"),
    ...buildOpenGraph({ locale, title, description, pad: "/over-ons/" }),
  };
}

export default async function OverOnsPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          kruimel: "À propos",
          titel: "À propos de Brussel Motorhomes Center",
          intro: "Depuis plus de 15 ans, votre partenaire de confiance pour les motorhomes à Bruxelles et ses environs.",
          missieLabel: "Notre mission",
          missieTitel: "La passion de la route ouverte, un service au plus haut niveau",
          missieTekst1:
            "Chez Brussel Motorhomes Center, nous croyons que voyager est bien plus que se rendre d'un point A à un point B. C'est un mode de vie. La liberté de s'arrêter où l'on veut, de dormir sous les étoiles et de vivre une nouvelle aventure chaque jour.",
          missieTekst2:
            "Fondée par deux passionnés de motorhome, notre entreprise est devenue la référence pour la vente, la location, l'entretien et les aménagements sur mesure de motorhomes dans la région bruxelloise.",
          waaromLabel: "Pourquoi BMC",
          waaromTitel: "Nos valeurs et nos engagements",
          waaromIntro: "Ce qui nous distingue des autres revendeurs de motorhomes en Belgique.",
          kwaliteitTitel: "Garantie de qualité",
          kwaliteitTekst: "Chaque véhicule est minutieusement inspecté et certifié avant la vente ou la location.",
          persoonlijkTitel: "Service personnalisé",
          persoonlijkTekst: "Notre équipe passionnée vous accompagne depuis la première question jusque bien après l'achat.",
          werkplaatsTitel: "Atelier propre",
          werkplaatsTekst: "Atelier entièrement équipé pour l'entretien, les réparations et les aménagements sur mesure.",
          expertiseTitel: "15 ans d'expertise",
          expertiseTekst: "Une connaissance approfondie de toutes les grandes marques et de tous les modèles du marché européen.",
          teamLabel: "L'équipe",
          teamTitel: "Les personnes derrière BMC",
          jimmyRol: "Gérant & fondateur",
          jimmyTekst:
            "15 ans d'expérience comme garagiste et mécanicien dans le secteur du motorhome, et expert de terrain reconnu.",
          didierRol: "Vente & conseil",
          didierTekst:
            "Expert dans l'art de trouver le motorhome parfait pour chaque client. Un conseil personnalisé et professionnel.",
          maximeRol: "Responsable du service technique",
          maximeTekst:
            "Technicien certifié, expert de toutes les grandes marques de motorhome et des systèmes électriques.",
          philipRol: "Conseiller & expert motorhomes",
          philipTekst: "15 ans d'expérience dans le secteur du motorhome. Animé par sa passion pour le voyage et la technologie.",
          slotTitel: "Vous ne trouvez pas ce que vous cherchez ?",
          slotTekst: "Contactez notre équipe. Nous vous aidons volontiers à trouver le motorhome parfait.",
        }
      : locale === "en"
      ? {
          kruimel: "About us",
          titel: "About Brussel Motorhomes Center",
          intro: "For over 15 years, your trusted partner for motorhomes in Brussels and the surrounding area.",
          missieLabel: "Our mission",
          missieTitel: "A passion for the open road, service at the highest level",
          missieTekst1:
            "At Brussel Motorhomes Center, we believe travel is about more than getting from A to B. It's a way of life. The freedom to stop wherever you want, sleep under the stars and experience a new adventure every day.",
          missieTekst2:
            "Founded by two motorhome enthusiasts, we have grown into the go-to name for the sale, rental, maintenance and custom conversion of motorhomes in the Brussels region.",
          waaromLabel: "Why BMC",
          waaromTitel: "Our values and our promises",
          waaromIntro: "What sets us apart from other motorhome resellers in Belgium.",
          kwaliteitTitel: "Quality guarantee",
          kwaliteitTekst: "Every vehicle is thoroughly inspected and certified before sale or rental.",
          persoonlijkTitel: "Personal service",
          persoonlijkTekst: "Our passionate team is with you from your very first question to long after your purchase.",
          werkplaatsTitel: "In-house workshop",
          werkplaatsTekst: "Fully equipped workshop for maintenance, repairs and custom conversions.",
          expertiseTitel: "15 years of expertise",
          expertiseTekst: "In-depth knowledge of all the major brands and models on the European market.",
          teamLabel: "The team",
          teamTitel: "The people behind BMC",
          jimmyRol: "Managing Director & Founder",
          jimmyTekst:
            "15 years of experience as a garage owner and mechanic in the motorhome industry, and a recognised expert in the field.",
          didierRol: "Sales & Advice",
          didierTekst:
            "An expert at matching customers with the perfect motorhome. Personal and professional advice.",
          maximeRol: "Head of Technical Service",
          maximeTekst:
            "Certified technician with expertise in all major motorhome brands and electrical systems.",
          philipRol: "Advisor & Motorhome Expert",
          philipTekst: "15 years of experience in the motorhome industry. Driven by his passion for travel and technology.",
          slotTitel: "Can't find what you're looking for?",
          slotTekst: "Contact our team. We're happy to help you find the perfect motorhome.",
        }
      : {
          kruimel: "Over ons",
          titel: "Over Brussel Motorhomes Center",
          intro: "Al meer dan 15 jaar uw vertrouwde partner voor motorhomes in Brussel en omstreken.",
          missieLabel: "Onze missie",
          missieTitel: "Passie voor de open weg, service van het hoogste niveau",
          missieTekst1:
            "Bij Brussel Motorhomes Center geloven we dat reizen meer is dan van A naar B gaan. Het is een manier van leven. De vrijheid om te stoppen waar je wilt, te slapen onder de sterren en elke dag een nieuw avontuur te beleven.",
          missieTekst2:
            "Opgericht door twee motorhome-enthousiastelingen, zijn we uitgegroeid tot dé referentie voor verkoop, verhuur, onderhoud en maatwerk van motorhomes in de Brusselse regio.",
          waaromLabel: "Waarom BMC",
          waaromTitel: "Onze waarden en beloften",
          waaromIntro: "Wat ons onderscheidt van andere motorhome-verdelers in België.",
          kwaliteitTitel: "Kwaliteitsgarantie",
          kwaliteitTekst: "Elk voertuig wordt grondig geïnspecteerd en gecertificeerd voor verkoop of verhuur.",
          persoonlijkTitel: "Persoonlijke service",
          persoonlijkTekst: "Ons gepassioneerd team staat u bij van de eerste vraag tot lang na de aankoop.",
          werkplaatsTitel: "Eigen werkplaats",
          werkplaatsTekst: "Volledig uitgeruste werkplaats voor onderhoud, herstellingen en aanpassingen op maat.",
          expertiseTitel: "15 jaar expertise",
          expertiseTekst: "Diepgaande kennis van alle grote merken en modellen op de Europese markt.",
          teamLabel: "Het team",
          teamTitel: "De mensen achter BMC",
          jimmyRol: "Zaakvoerder & oprichter",
          jimmyTekst:
            "15 jaar ervaring als garagist en mechanieker in de motorhome-industrie, en ervaringsdeskundige ter plaatse.",
          didierRol: "Verkoop & advies",
          didierTekst: "Expert in het matchen van klanten met de perfecte motorhome. Persoonlijk en deskundig advies.",
          maximeRol: "Hoofd technische dienst",
          maximeTekst: "Gecertificeerd technicus met expertise in alle grote motorhome-merken en elektrische systemen.",
          philipRol: "Adviseur & expert motorhomes",
          philipTekst: "15 jaar ervaring in de motorhome-industrie. Gedreven door zijn passie voor reizen en technologie.",
          slotTitel: "Niet gevonden wat u zoekt?",
          slotTekst: "Neem contact op met ons team. Wij helpen u graag bij het vinden van de perfecte motorhome.",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: t.kruimel }])} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t.kruimel}</span>
          </nav>
          <h1>{t.titel}</h1>
          <p className="intro">
            {t.intro}
          </p>
        </div>
      </div>

      <section className="sectie">
        <div className="wrap missie">
          <div>
            <p className="label">{t.missieLabel}</p>
            <h2 style={{ marginTop: "var(--sp-3)", fontSize: "var(--fs-h2)" }}>
              {t.missieTitel}
            </h2>
          </div>
          <div className="tekst">
            <p>
              {t.missieTekst1}
            </p>
            <p>
              {t.missieTekst2}
            </p>
          </div>
        </div>
      </section>

      <section className="sectie sectie-vlak">
        <div className="wrap">
          <div className="sectie-kop">
            <p className="label">{t.waaromLabel}</p>
            <h2>{t.waaromTitel}</h2>
            <p className="intro">{t.waaromIntro}</p>
          </div>
          <div className="raster raster-4">
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l8 3v6c0 5-3.4 8.3-8 9.5C7.4 20.3 4 17 4 12V6z" /></svg>
              </span>
              <h3>{t.kwaliteitTitel}</h3>
              <p>{t.kwaliteitTekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" /></svg>
              </span>
              <h3>{t.persoonlijkTitel}</h3>
              <p>{t.persoonlijkTekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.5 3.5a5 5 0 0 0-6.6 6.6L3 15v6h6l4.9-4.9a5 5 0 0 0 6.6-6.6l-3.2 3.2-2.8-2.8z" /></svg>
              </span>
              <h3>{t.werkplaatsTitel}</h3>
              <p>{t.werkplaatsTekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4h6v3H9zM7 5H5v15h14V5h-2M9 13l2 2 4-4" /></svg>
              </span>
              <h3>{t.expertiseTitel}</h3>
              <p>{t.expertiseTekst}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="sectie">
        <div className="wrap">
          <div className="sectie-kop">
            <p className="label">{t.teamLabel}</p>
            <h2>{t.teamTitel}</h2>
          </div>
          <div className="raster raster-4">
            <article className="kaart teamlid">
              <div className="media media-4x5">
                <FotoMetPlaceholder
                  src="/assets/img/over-ons/jimmy-verstraete.jpg"
                  alt="Jimmy Verstraete"
                  loading="lazy"
                />
              </div>
              <div className="kaart-body">
                <h3>Jimmy Verstraete</h3>
                <p className="label rol">{t.jimmyRol}</p>
                <p>
                  {t.jimmyTekst}
                </p>
              </div>
            </article>
            <article className="kaart teamlid">
              <div className="media media-4x5">
                <FotoMetPlaceholder
                  src="/assets/img/over-ons/didier-de-paepe.jpg"
                  alt="Didier De Paepe"
                  loading="lazy"
                />
              </div>
              <div className="kaart-body">
                <h3>Didier De Paepe</h3>
                <p className="label rol">{t.didierRol}</p>
                <p>
                  {t.didierTekst}
                </p>
              </div>
            </article>
            <article className="kaart teamlid">
              <div className="media media-4x5">
                <FotoMetPlaceholder
                  src="/assets/img/over-ons/maxime-catry.jpg"
                  alt="Maxime Catry"
                  loading="lazy"
                />
              </div>
              <div className="kaart-body">
                <h3>Maxime Catry</h3>
                <p className="label rol">{t.maximeRol}</p>
                <p>
                  {t.maximeTekst}
                </p>
              </div>
            </article>
            <article className="kaart teamlid">
              <div className="media media-4x5">
                <FotoMetPlaceholder
                  src="/assets/img/over-ons/philip-thijs.jpg"
                  alt="Philip Thijs"
                  loading="lazy"
                />
              </div>
              <div className="kaart-body">
                <h3>Philip Thijs</h3>
                <p className="label rol">{t.philipRol}</p>
                <p>{t.philipTekst}</p>
              </div>
            </article>
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
