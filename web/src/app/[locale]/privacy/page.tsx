import Link from "next/link";
import type { Metadata } from "next";
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
  const title = locale === "fr" ? "Politique de confidentialité" : locale === "en" ? "Privacy Policy" : "Privacybeleid";
  const description =
    locale === "fr"
      ? "Comment Brussel Motorhomes Center traite vos données à caractère personnel."
      : locale === "en"
      ? "How Brussel Motorhomes Center handles your personal data."
      : "Hoe Brussel Motorhomes Center omgaat met je persoonsgegevens.";
  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: buildAlternates("/privacy/"),
    ...buildOpenGraph({ locale, title, description, pad: "/privacy/" }),
  };
}

export default async function PrivacyPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const t =
    locale === "fr"
      ? {
          kruimel: "Politique de confidentialité",
          titel: "Politique de confidentialité",
          intro:
            "Quelles données nous conservons lorsque vous remplissez un formulaire, pourquoi, et pendant combien de temps.",
          h2Verantwoordelijke: "Qui est responsable de vos données ?",
          verantwoordelijkeTekst1: "Brussel Motorhomes Center (filiale de VJ Mobility, numéro d'entreprise BE0723.628.017), Rue de l'Alliance 103, 1480 Clabecq, est responsable du traitement des",
          verantwoordelijkeTekst1b: "données à caractère personnel",
          verantwoordelijkeTekst1c: "collectées via ce site web. Pour toute question concernant vos données, écrivez-nous à",
          verantwoordelijkeTekst1d: "ou appelez le",
          h2Gegevens: "Quelles données collectons-nous, et pourquoi ?",
          gegevensTekst1:
            "Lorsque vous remplissez un formulaire sur ce site (une demande de contact, une question sur un motorhome, une demande de location ou un rendez-vous pour l'entretien), nous conservons les données que vous saisissez vous-même : votre nom, votre adresse e-mail, votre numéro de téléphone et votre message. Pour une demande de location, nous conservons également la période demandée.",
          gegevensTekst2:
            "Nous utilisons ces données uniquement pour répondre à votre demande et assurer le suivi de votre dossier. Nous ne les revendons pas et ne les utilisons pas à des fins publicitaires sans votre consentement.",
          h2Bewaartermijn: "Combien de temps conservons-nous vos données ?",
          bewaartermijnTekst:
            "Les demandes qui n'aboutissent pas à un accord sont conservées pendant douze mois maximum. Les données liées à une vente, une location ou une réparation sont conservées aussi longtemps que la loi l'exige, notamment pour la comptabilité et la période de garantie.",
          h2Cookies: "Cookies et analytique",
          cookiesTekst1: "Ce site ne place lui-même aucun cookie publicitaire. Des cookies fonctionnels sont nécessaires au bon fonctionnement du site et pour mémoriser votre choix en matière de cookies. Nous ne plaçons des cookies analytiques qu'après votre acceptation ; vous pouvez toujours modifier votre choix via",
          cookiesLinkTekst: "Paramètres des cookies",
          cookiesTekst2: "en bas de chaque page.",
          h2Rechten: "Vos droits",
          rechtenTekst1:
            "Vous avez le droit de consulter vos données, de les faire rectifier ou de les faire supprimer. Vous pouvez également vous opposer au traitement ou en demander la limitation. Envoyez pour cela un e-mail à",
          rechtenTekst2: "Si notre réponse ne vous satisfait pas, vous pouvez vous adresser à l'Autorité de protection des données,",
          h2Wijzigingen: "Modifications",
          wijzigingenTekst:
            "Nous adaptons cette politique de confidentialité lorsque le fonctionnement du site ou la législation l'exige. La date ci-dessous indique quand la dernière modification a eu lieu.",
          bijgewerkt: "Dernière mise à jour en 2026. [À VÉRIFIER : faire relire cette politique avant la mise en ligne.]",
        }
      : locale === "en"
      ? {
          kruimel: "Privacy Policy",
          titel: "Privacy Policy",
          intro: "What data we keep when you fill in a form, why, and for how long.",
          h2Verantwoordelijke: "Who is responsible for your data?",
          verantwoordelijkeTekst1: "Brussel Motorhomes Center (part of VJ Mobility, company number BE0723.628.017), Rue de l'Alliance 103, 1480 Clabecq, is responsible for the processing of the",
          verantwoordelijkeTekst1b: "personal data",
          verantwoordelijkeTekst1c: "collected through this website. For any questions about your data, email us at",
          verantwoordelijkeTekst1d: "or call",
          h2Gegevens: "What data do we collect, and why?",
          gegevensTekst1:
            "When you fill in a form on this site (a contact request, a question about a motorhome, a rental request or an appointment for maintenance), we store the data you enter yourself: your name, email address, phone number and message. For a rental request, we also store the requested period.",
          gegevensTekst2:
            "We use this data only to answer your query and follow up on your file. We do not sell it on and do not use it for advertising without your consent.",
          h2Bewaartermijn: "How long do we keep your data?",
          bewaartermijnTekst:
            "Requests that do not lead to an agreement are kept for a maximum of twelve months. Data relating to a sale, rental or repair is kept for as long as required by law, including for accounting purposes and the warranty period.",
          h2Cookies: "Cookies and analytics",
          cookiesTekst1: "This site does not place any advertising cookies itself. Functional cookies are necessary for the site to work and to remember your cookie choice. We only place analytics cookies after you accept them; you can always change your choice via",
          cookiesLinkTekst: "Cookie settings",
          cookiesTekst2: "at the bottom of every page.",
          h2Rechten: "Your rights",
          rechtenTekst1:
            "You have the right to access your data, have it corrected or have it deleted. You may also object to the processing or request that it be restricted. To do so, send an email to",
          rechtenTekst2: "If you are not satisfied with our response, you can contact the Belgian Data Protection Authority,",
          h2Wijzigingen: "Changes",
          wijzigingenTekst:
            "We update this privacy policy whenever the operation of the site or legislation requires it. The date below shows when the last update took place.",
          bijgewerkt: "Last updated in 2026. [TO REVIEW: have this policy checked before it goes live.]",
        }
      : {
          kruimel: "Privacybeleid",
          titel: "Privacybeleid",
          intro: "Welke gegevens wij bijhouden wanneer je een formulier invult, waarom, en hoe lang.",
          h2Verantwoordelijke: "Wie is verantwoordelijk voor je gegevens?",
          verantwoordelijkeTekst1: "Brussel Motorhomes Center (onderdeel van VJ Mobility, ondernemingsnummer BE0723.628.017), Rue de l'Alliance 103, 1480 Clabecq, is verantwoordelijk voor de verwerking van de",
          verantwoordelijkeTekst1b: "persoonsgegevens",
          verantwoordelijkeTekst1c: "die via deze website worden verzameld. Vragen over je gegevens stuur je naar",
          verantwoordelijkeTekst1d: "of bel je door op",
          h2Gegevens: "Welke gegevens verzamelen we, en waarom?",
          gegevensTekst1:
            "Wanneer je een formulier op deze site invult (een contactaanvraag, een vraag over een motorhome, een huuraanvraag of een afspraak voor onderhoud), bewaren we de gegevens die je zelf invult: je naam, e-mailadres, telefoonnummer en je bericht. Bij een huuraanvraag bewaren we daarnaast de gevraagde periode.",
          gegevensTekst2:
            "We gebruiken die gegevens enkel om je vraag te beantwoorden en je dossier op te volgen. We verkopen ze niet door en gebruiken ze niet voor reclame zonder je toestemming.",
          h2Bewaartermijn: "Hoe lang bewaren we je gegevens?",
          bewaartermijnTekst:
            "Aanvragen die niet tot een overeenkomst leiden, bewaren we maximaal twaalf maanden. Gegevens die bij een verkoop, verhuur of herstelling horen, bewaren we zolang de wet dat verplicht, onder meer voor de boekhouding en de garantieperiode.",
          h2Cookies: "Cookies en analytics",
          cookiesTekst1: "Deze site plaatst zelf geen advertentiecookies. Functionele cookies zijn nodig om de site te laten werken en je cookiekeuze te onthouden. Analytische cookies plaatsen we enkel nadat je ze aanvaardt; je kan je keuze altijd wijzigen via",
          cookiesLinkTekst: "Cookie-instellingen",
          cookiesTekst2: "onderaan elke pagina.",
          h2Rechten: "Je rechten",
          rechtenTekst1:
            "Je hebt het recht om je gegevens in te kijken, te laten verbeteren of te laten wissen. Je kan ook bezwaar maken tegen de verwerking of vragen om ze te beperken. Stuur daarvoor een mail naar",
          rechtenTekst2: "Ben je niet tevreden met ons antwoord, dan kan je terecht bij de Gegevensbeschermingsautoriteit,",
          h2Wijzigingen: "Wijzigingen",
          wijzigingenTekst:
            "We passen dit privacybeleid aan wanneer de werking van de site of de wetgeving daarom vraagt. De datum hieronder toont wanneer de laatste wijziging gebeurde.",
          bijgewerkt: "Laatst bijgewerkt op 2026. [NA TE KIJKEN: laat dit beleid nalezen voor het live gaat.]",
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
        <div className="wrap juridisch">
          <h2>{t.h2Verantwoordelijke}</h2>
          <p>
            {t.verantwoordelijkeTekst1} {t.verantwoordelijkeTekst1b} {t.verantwoordelijkeTekst1c}{" "}
            <a href="mailto:bmcbrussel@outlook.com">bmcbrussel@outlook.com</a> {t.verantwoordelijkeTekst1d} +32 471 40 79 49.
          </p>

          <h2>{t.h2Gegevens}</h2>
          <p>
            {t.gegevensTekst1}
          </p>
          <p>
            {t.gegevensTekst2}
          </p>

          <h2>{t.h2Bewaartermijn}</h2>
          <p>
            {t.bewaartermijnTekst}
          </p>

          <h2>{t.h2Cookies}</h2>
          <p>
            {t.cookiesTekst1} <a href="#" data-cookie-settings="">{t.cookiesLinkTekst}</a> {t.cookiesTekst2}
          </p>

          <h2>{t.h2Rechten}</h2>
          <p>
            {t.rechtenTekst1}{" "}
            <a href="mailto:bmcbrussel@outlook.com">bmcbrussel@outlook.com</a>. {t.rechtenTekst2}{" "}
            <a href="https://www.gegevensbeschermingsautoriteit.be" rel="noopener">gegevensbeschermingsautoriteit.be</a>.
          </p>

          <h2>{t.h2Wijzigingen}</h2>
          <p>
            {t.wijzigingenTekst}
          </p>
          <p className="bijgewerkt">
            {t.bijgewerkt}
          </p>
        </div>
      </section>
    </main>
  );
}
