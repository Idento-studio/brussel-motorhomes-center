import Link from "next/link";
import type { Metadata } from "next";
import { Formulier } from "@/components/Formulier";
import { L, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList } from "@/lib/structuredData";
import { KaartMetToestemming } from "@/components/KaartMetToestemming";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = "Contact";
  const description =
    locale === "fr"
      ? "Contactez Brussel Motorhomes Center. Rue de l'Alliance 103, 1480 Clabecq. Joignable par téléphone du lundi au vendredi."
      : locale === "en"
      ? "Contact Brussel Motorhomes Center. Rue de l'Alliance 103, 1480 Clabecq. Reachable by phone Monday to Friday."
      : "Contacteer Brussel Motorhomes Center. Rue de l'Alliance 103, 1480 Clabecq. Telefonisch bereikbaar van maandag tot vrijdag.";
  return {
    title,
    description,
    alternates: buildAlternates("/contact/", locale),
    ...buildOpenGraph({ locale, title, description, pad: "/contact/" }),
  };
}

export default async function ContactPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          kruimel: "Contact",
          titel: "Contactez-nous",
          intro:
            "Une question sur un camping-car, un rendez-vous pour l'entretien ou simplement un conseil ? Nous sommes là pour vous aider.",
          rechtstreeksContact: "Contact direct",
          adres: "Adresse",
          telefoon: "Téléphone",
          email: "E-mail",
          openingsuren: "Heures d'ouverture",
          openingsurenTekst: "Joignable par téléphone du lundi au vendredi de 9h00 à 18h00.",
          openingsurenTekst2: "Visites uniquement sur rendez-vous.",
          belOns: "Appelez-nous",
          kaartTitel: "Emplacement de BMC à Clabecq",
          formTitel: "Envoyez-nous un message",
          formIntro: "Nous répondons sous un jour ouvrable.",
          formSubmit: "Envoyer",
          voornaam: "Prénom",
          achternaam: "Nom",
          emailLabel: "Adresse e-mail",
          telefoonLabel: "Numéro de téléphone",
          onderwerp: "Sujet",
          maakKeuze: "Faites un choix",
          onderwerpAankoop: "Achat d'un camping-car",
          onderwerpVerkoop: "Vente d'un camping-car",
          onderwerpVerhuur: "Location d'un camping-car",
          onderwerpOpMaat: "Camping-car sur mesure",
          onderwerpMindervaliden: "Camping-car pour personnes à mobilité réduite",
          bericht: "Message",
        }
      : locale === "en"
      ? {
          kruimel: "Contact",
          titel: "Contact us",
          intro:
            "A question about a motorhome, an appointment for maintenance, or simply some advice? We're happy to help.",
          rechtstreeksContact: "Direct contact",
          adres: "Address",
          telefoon: "Phone",
          email: "Email",
          openingsuren: "Opening hours",
          openingsurenTekst: "Reachable by phone Monday to Friday from 9:00 am to 6:00 pm.",
          openingsurenTekst2: "Visits by appointment only.",
          belOns: "Call us",
          kaartTitel: "Location of BMC in Clabecq",
          formTitel: "Send us a message",
          formIntro: "We reply within one business day.",
          formSubmit: "Send",
          voornaam: "First name",
          achternaam: "Last name",
          emailLabel: "Email address",
          telefoonLabel: "Phone number",
          onderwerp: "Subject",
          maakKeuze: "Make a choice",
          onderwerpAankoop: "Buying a motorhome",
          onderwerpVerkoop: "Selling a motorhome",
          onderwerpVerhuur: "Renting a motorhome",
          onderwerpOpMaat: "Custom motorhome",
          onderwerpMindervaliden: "Motorhome for people with reduced mobility",
          bericht: "Message",
        }
      : {
          kruimel: "Contact",
          titel: "Contacteer ons",
          intro:
            "Een vraag over een motorhome, een afspraak voor onderhoud of gewoon advies? Wij helpen u graag verder.",
          rechtstreeksContact: "Rechtstreeks contact",
          adres: "Adres",
          telefoon: "Telefoon",
          email: "E-mail",
          openingsuren: "Openingsuren",
          openingsurenTekst: "Telefonisch bereikbaar van maandag tot vrijdag van 9:00 tot 18:00.",
          openingsurenTekst2: "Enkel bezoek op afspraak.",
          belOns: "Bel ons",
          kaartTitel: "Ligging van BMC in Clabecq",
          formTitel: "Stuur ons een bericht",
          formIntro: "Wij antwoorden binnen één werkdag.",
          formSubmit: "Verstuur",
          voornaam: "Voornaam",
          achternaam: "Achternaam",
          emailLabel: "E-mailadres",
          telefoonLabel: "Telefoonnummer",
          onderwerp: "Onderwerp",
          maakKeuze: "Maak een keuze",
          onderwerpAankoop: "Aankoop motorhome",
          onderwerpVerkoop: "Verkoop motorhome",
          onderwerpVerhuur: "Verhuur motorhome",
          onderwerpOpMaat: "Motorhome op maat",
          onderwerpMindervaliden: "Motorhome voor mindervaliden",
          bericht: "Bericht",
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

      <section className="sectie sectie-vlak">
        <div className="wrap contact-raster">
          <div className="contact-kolom">
            <div className="kaart contact-gegevens">
              <h2>{t.rechtstreeksContact}</h2>
              <dl>
                <div>
                  <span className="icoon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11zM12 8.6a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8z" /></svg>
                  </span>
                  <div>
                    <dt>{t.adres}</dt>
                    <dd>Rue de l&rsquo;Alliance 103<br />1480 Clabecq</dd>
                  </div>
                </div>
                <div>
                  <span className="icoon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
                  </span>
                  <div>
                    <dt>{t.telefoon}</dt>
                    <dd>
                      <a href="tel:+32471407949">+32 471 40 79 49</a>
                    </dd>
                  </div>
                </div>
                <div>
                  <span className="icoon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H7v18h11V7zM14 3v4h4M9.5 13h6M9.5 17h4" /></svg>
                  </span>
                  <div>
                    <dt>{t.email}</dt>
                    <dd><a href="mailto:bmcbrussel@outlook.com">bmcbrussel@outlook.com</a></dd>
                  </div>
                </div>
                <div>
                  <span className="icoon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16v15H4zM4 10h16M8 3v4M16 3v4M9.5 15l1.7 1.7L15 13" /></svg>
                  </span>
                  <div>
                    <dt>{t.openingsuren}</dt>
                    <dd className="uren">
                      {t.openingsurenTekst}
                      <br />
                      {t.openingsurenTekst2}
                    </dd>
                  </div>
                </div>
              </dl>
              <div className="contact-knoppen">
                <a className="btn btn-goud btn-klein" href="tel:+32471407949">{t.belOns}</a>
                <a className="btn btn-stil btn-klein" href="https://wa.me/32471407949">WhatsApp</a>
              </div>
            </div>
            <div className="kaart contact-kaartje">
              <div className="media media-16x10">
                <KaartMetToestemming
                  src="https://www.google.com/maps?q=Rue+de+l%27Alliance+103%2C+1480+Clabecq%2C+Belgi%C3%AB&output=embed"
                  titel={t.kaartTitel}
                  knopTekst={dict.kaart.knop}
                  uitlegTekst={dict.kaart.tekst}
                />
              </div>
            </div>
          </div>

          <Formulier titel={t.formTitel} intro={t.formIntro} submitLabel={t.formSubmit} locale={locale}>
            <div className="veld">
              <label htmlFor="contact-voornaam">{t.voornaam}</label>
              <input id="contact-voornaam" name="voornaam" type="text" autoComplete="given-name" required />
            </div>
            <div className="veld">
              <label htmlFor="contact-achternaam">{t.achternaam}</label>
              <input id="contact-achternaam" name="achternaam" type="text" autoComplete="family-name" required />
            </div>
            <div className="veld">
              <label htmlFor="contact-email">{t.emailLabel}</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="veld">
              <label htmlFor="contact-telefoon">{t.telefoonLabel}</label>
              <input id="contact-telefoon" name="telefoon" type="tel" autoComplete="tel" />
            </div>
            <div className="veld veld-breed">
              <label htmlFor="contact-onderwerp">{t.onderwerp}</label>
              <select id="contact-onderwerp" name="onderwerp" required defaultValue="">
                <option value="" disabled>{t.maakKeuze}</option>
                <option value={t.onderwerpAankoop}>{t.onderwerpAankoop}</option>
                <option value={t.onderwerpVerkoop}>{t.onderwerpVerkoop}</option>
                <option value={t.onderwerpVerhuur}>{t.onderwerpVerhuur}</option>
                <option value={t.onderwerpOpMaat}>{t.onderwerpOpMaat}</option>
                <option value={t.onderwerpMindervaliden}>{t.onderwerpMindervaliden}</option>
              </select>
            </div>
            <div className="veld veld-breed">
              <label htmlFor="contact-bericht">{t.bericht}</label>
              <textarea id="contact-bericht" name="bericht" rows={6} required />
            </div>
          </Formulier>
        </div>
      </section>
    </main>
  );
}
