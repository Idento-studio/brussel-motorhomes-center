import Link from "next/link";
import type { Metadata } from "next";
import { Formulier } from "@/components/Formulier";
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
    locale === "fr" ? "Entretien de l'espace de vie" : locale === "en" ? "Living area maintenance" : "Onderhoud leefruimte";
  const description =
    locale === "fr"
      ? "Spécialistes certifiés pour l'entretien de l'espace de vie de votre camping-car : traitement de l'humidité, réfrigérateur, porte-vélos, auvent et plus encore."
      : locale === "en"
      ? "Certified specialists for your motorhome's living area maintenance: damp treatment, refrigerator, bike rack, awning and more."
      : "Gecertificeerde specialisten voor het onderhoud van de leefruimte van uw motorhome: vochtbehandeling, koelkast, fietsenrek, luifel en meer.";
  return {
    title,
    description,
    alternates: buildAlternates("/onderhoud/leefruimte/", locale),
    ...buildOpenGraph({
      locale,
      title,
      description,
      pad: "/onderhoud/leefruimte/",
      afbeelding: { url: `${SITE_URL}/assets/img/social/og-onderhoud.jpg`, width: 1200, height: 630, alt: title },
    }),
  };
}

export default async function OnderhoudLeefruimtePagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          h1: "Entretien de l'espace de vie",
          intro:
            "Spécialistes certifiés pour l'entretien de l'espace de vie de votre camping-car — du traitement de l'humidité aux accessoires et équipements intégrés.",
          dienstenLabel: "Ce que nous faisons",
          dienstenTitel: "Nos services d'entretien de l'espace de vie",
          card1Titel: "Traitement de l'humidité",
          card1Tekst: "Prévention et réparation professionnelle des dégâts d'humidité.",
          card2Titel: "Porte-vélos",
          card2Tekst: "Pour camping-cars et fourgons aménagés, pour 2, 3 ou 4 vélos, classiques ou électriques. Levage électrique ou manuel. Marques : Fiamma, Thule, BR-System.",
          card3Titel: "Climatisation & chauffage",
          card3Tekst: "Contrôle climatique, entretien et réparation de vos systèmes.",
          card4Titel: "Réfrigérateur",
          card4Tekst: "Montage neuf, entretien et réparations. Thetford, Dometic, …",
          card5Titel: "Auvent",
          card5Tekst: "Pour camping-cars et fourgons aménagés. Selon les dimensions du véhicule. Électrique ou manuel. Marques : Fiamma, Thule, …",
          card6Titel: "Serrures de sécurité",
          card6Tekst: "Thule, Fiamma, Heosafe, IMC.",
          card7Titel: "Batteries",
          card7Tekst: "Plomb, AGM, Li-Ion. Marques : Yuasa, Victron, Ultimatron, SuperB.",
          card8Titel: "TV, support TV & antenne",
          card8Tekst: "Montage.",
          card9Titel: "Fenêtres",
          card9Tekst: "Nouveau joint, remplacement ou fixation.",
          waaromLabel: "Pourquoi BMC",
          waaromTitel: "Pourquoi choisir BMC pour l'entretien de votre espace de vie ?",
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
          h1: "Living area maintenance",
          intro:
            "Certified specialists for the maintenance of your motorhome's living area — from damp treatment to accessories and built-in appliances.",
          dienstenLabel: "What we do",
          dienstenTitel: "Our living area maintenance services",
          card1Titel: "Damp treatment",
          card1Tekst: "Prevention and professional repair of damp damage.",
          card2Titel: "Bike rack",
          card2Tekst: "For motorhomes and campervans, for 2, 3 or 4 bikes, regular or electric. Electric lift or manual. Brands: Fiamma, Thule, BR-System.",
          card3Titel: "Air conditioning & heating",
          card3Tekst: "Climate control, maintenance and repair of your systems.",
          card4Titel: "Refrigerator",
          card4Tekst: "New installation, maintenance and repairs. Thetford, Dometic, …",
          card5Titel: "Awning",
          card5Tekst: "For motorhomes and campervans. According to vehicle dimensions. Electric or manual. Brands: Fiamma, Thule, …",
          card6Titel: "Security locks",
          card6Tekst: "Thule, Fiamma, Heosafe, IMC.",
          card7Titel: "Batteries",
          card7Tekst: "Lead, AGM, Li-Ion. Brands: Yuasa, Victron, Ultimatron, SuperB.",
          card8Titel: "TV, TV mount & antenna",
          card8Tekst: "Installation.",
          card9Titel: "Windows",
          card9Tekst: "New seal, replacement or fixing.",
          waaromLabel: "Why BMC",
          waaromTitel: "Why choose BMC for your living area maintenance?",
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
          h1: "Onderhoud leefruimte",
          intro:
            "Gecertificeerde specialisten voor het onderhoud van de leefruimte van uw motorhome — van vochtbehandeling tot accessoires en inbouwtoestellen.",
          dienstenLabel: "Wat wij doen",
          dienstenTitel: "Onze diensten voor onderhoud leefruimte",
          card1Titel: "Vochtbehandeling",
          card1Tekst: "Preventie en professioneel herstel van vochtschade.",
          card2Titel: "Fietsenrek",
          card2Tekst: "Voor motorhomes en campervans, voor 2, 3 of 4 fietsen, gewone of elektrische fietsen. Elektrisch heffen of manueel. Merken: Fiamma, Thule, BR-System.",
          card3Titel: "Airco & verwarming",
          card3Tekst: "Klimaatcontrole, onderhoud en reparatie van uw systemen.",
          card4Titel: "Koelkast",
          card4Tekst: "Montage nieuw, onderhoud en herstellingen. Thetford, Dometic, …",
          card5Titel: "Luifel",
          card5Tekst: "Voor motorhomes en campervans. Volgens afmetingen van het voertuig. Elektrisch of manueel. Merken: Fiamma, Thule, …",
          card6Titel: "Veiligheidssloten",
          card6Tekst: "Thule, Fiamma, Heosafe, IMC.",
          card7Titel: "Batterijen",
          card7Tekst: "Lood, AGM, Li-Ion. Merken: Yuasa, Victron, Ultimatron, SuperB.",
          card8Titel: "TV, TV-steun & antenne",
          card8Tekst: "Montage.",
          card9Titel: "Ramen",
          card9Tekst: "Nieuwe dichting, vervanging van ramen of vervanging van bevestiging.",
          waaromLabel: "Waarom BMC",
          waaromTitel: "Waarom BMC kiezen voor onderhoud van uw leefruimte?",
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
          <JsonLd data={buildService(locale, t.h1, t.intro, "/onderhoud/leefruimte/")} />
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
                <FotoMetPlaceholder src="/assets/img/onderhoud/vochtbehandeling.webp" alt="" />
              </span>
              <h3>{t.card1Titel}</h3>
              <p>{t.card1Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/onderhoud/fietsenrek.webp" alt="" />
              </span>
              <h3>{t.card2Titel}</h3>
              <p>{t.card2Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/onderhoud/airco-en-verwarming.webp" alt="" />
              </span>
              <h3>{t.card3Titel}</h3>
              <p>{t.card3Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/onderhoud/koelkast.webp" alt="" />
              </span>
              <h3>{t.card4Titel}</h3>
              <p>{t.card4Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/onderhoud/luifel.webp" alt="" />
              </span>
              <h3>{t.card5Titel}</h3>
              <p>{t.card5Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/onderhoud/veiligheidssloten.webp" alt="" />
              </span>
              <h3>{t.card6Titel}</h3>
              <p>{t.card6Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/onderhoud/batterijen.webp" alt="" />
              </span>
              <h3>{t.card7Titel}</h3>
              <p>{t.card7Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/onderhoud/tv-tv-steun-en-antenne.webp" alt="" />
              </span>
              <h3>{t.card8Titel}</h3>
              <p>{t.card8Tekst}</p>
            </article>
            <article className="kaart icoon-kaart">
              <span className="icoon-vlak">
                <FotoMetPlaceholder src="/assets/img/onderhoud/ramen.webp" alt="" />
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
              <label htmlFor="onderhoud-leefruimte-naam">{t.naam}</label>
              <input id="onderhoud-leefruimte-naam" name="naam" type="text" autoComplete="name" required />
            </div>
            <div className="veld">
              <label htmlFor="onderhoud-leefruimte-email">{t.email}</label>
              <input id="onderhoud-leefruimte-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="veld veld-breed">
              <label htmlFor="onderhoud-leefruimte-bericht">{t.bericht}</label>
              <textarea id="onderhoud-leefruimte-bericht" name="bericht" rows={4} required />
            </div>
          </Formulier>
        </div>
      </section>
    </main>
  );
}
