"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";

type Stap = 1 | 2 | 3 | 4 | 5;

function vertaling(locale: Locale) {
  if (locale === "fr") {
    return {
      stap: (n: number, totaal: number) => `Étape ${n} sur ${totaal}`,
      vorige: "Précédent",
      volgende: "Suivant",
      versturen: "Envoyer ma demande",
      bezig: "Envoi en cours…",
      fout: "L'envoi a échoué. Réessayez ou appelez-nous au +32 471 40 79 49.",
      bedanktTitel: "Merci, votre demande a été envoyée",
      bedanktTekst: "Nous analysons vos réponses et vous recontactons avec une proposition sur mesure, ou des motorhomes d'occasion qui correspondent déjà à vos souhaits.",
      stap1Titel: "Comment allez-vous utiliser votre motorhome ?",
      stap1Intro: "Cela nous aide à cerner le type de motorhome le plus adapté.",
      gebruikOpties: [
        { waarde: "weekend", label: "Escapades le week-end" },
        { waarde: "lange-reizen", label: "Longs voyages" },
        { waarde: "vast-wonen", label: "Habitat à temps plein" },
        { waarde: "gezin", label: "Vacances en famille" },
        { waarde: "onbekend", label: "Je ne sais pas encore" },
      ],
      stap2Titel: "Type et agencement",
      opbouwtype: "Type de carrosserie",
      opbouwtypeOpties: [
        { waarde: "", label: "Pas de préférence" },
        { waarde: "Alkoof", label: "Capucine" },
        { waarde: "Campervan", label: "Fourgon aménagé" },
        { waarde: "Halfintegraal", label: "Profilé" },
        { waarde: "Integraal", label: "Intégral" },
      ],
      zitplaatsen: "Places assises souhaitées",
      slaapplaatsen: "Places de couchage souhaitées",
      plaatsenOpties: ["2", "3", "4", "5", "6+"],
      stap3Titel: "Budget et état",
      staat: "État",
      staatOpties: [
        { waarde: "", label: "Pas de préférence" },
        { waarde: "Nieuw", label: "Neuf" },
        { waarde: "Occasie", label: "Occasion" },
      ],
      budget: "Budget",
      budgetOpties: [
        { waarde: "", label: "Pas de préférence" },
        { waarde: "tot40", label: "Jusqu'à 40 000 €" },
        { waarde: "40tot60", label: "40 000 – 60 000 €" },
        { waarde: "60tot80", label: "60 000 – 80 000 €" },
        { waarde: "80tot100", label: "80 000 – 100 000 €" },
        { waarde: "vanaf100", label: "Plus de 100 000 €" },
      ],
      stap4Titel: "Uitrusting en merk",
      extrasLabel: "Gewenste opties",
      extrasOpties: [
        { waarde: "airco", label: "Climatisation" },
        { waarde: "zonnepaneel", label: "Panneau solaire" },
        { waarde: "fietsendrager", label: "Porte-vélos" },
        { waarde: "camera", label: "Caméra de recul" },
        { waarde: "automaat", label: "Boîte automatique" },
        { waarde: "mindervaliden", label: "Adapté PMR" },
        { waarde: "ander", label: "Autre" },
      ],
      anders: "Autre chose ? Précisez ici (facultatif)",
      andersPlaceholder: "Décrivez ce que vous recherchez encore…",
      merk: "Marque de préférence (facultatif)",
      merkPlaceholder: "p. ex. Blucamp, Hymer, Adria…",
      stap5Titel: "Vos coordonnées",
      naam: "Nom",
      email: "Adresse e-mail",
      telefoon: "Numéro de téléphone",
      timing: "Quand souhaitez-vous démarrer ?",
      timingOpties: [
        { waarde: "asap", label: "Le plus vite possible" },
        { waarde: "3maanden", label: "Dans les 3 mois" },
        { waarde: "verkennen", label: "Je m'informe encore" },
      ],
      opmerkingen: "Remarques supplémentaires (facultatif)",
    };
  }
  if (locale === "en") {
    return {
      stap: (n: number, totaal: number) => `Step ${n} of ${totaal}`,
      vorige: "Back",
      volgende: "Next",
      versturen: "Send my request",
      bezig: "Sending…",
      fout: "Sending failed. Please try again or call us on +32 471 40 79 49.",
      bedanktTitel: "Thank you, your request has been sent",
      bedanktTekst: "We'll review your answers and get back to you with a tailored proposal, or used motorhomes that already match what you're looking for.",
      stap1Titel: "How will you use your motorhome?",
      stap1Intro: "This helps us narrow down the type of motorhome that suits you best.",
      gebruikOpties: [
        { waarde: "weekend", label: "Weekend trips" },
        { waarde: "lange-reizen", label: "Long trips" },
        { waarde: "vast-wonen", label: "Full-time living" },
        { waarde: "gezin", label: "Family holidays" },
        { waarde: "onbekend", label: "Not sure yet" },
      ],
      stap2Titel: "Type & layout",
      opbouwtype: "Body type",
      opbouwtypeOpties: [
        { waarde: "", label: "No preference" },
        { waarde: "Alkoof", label: "Coachbuilt (overcab)" },
        { waarde: "Campervan", label: "Campervan" },
        { waarde: "Halfintegraal", label: "Semi-integrated" },
        { waarde: "Integraal", label: "Fully integrated" },
      ],
      zitplaatsen: "Desired seats",
      slaapplaatsen: "Desired sleeping places",
      plaatsenOpties: ["2", "3", "4", "5", "6+"],
      stap3Titel: "Budget & condition",
      staat: "Condition",
      staatOpties: [
        { waarde: "", label: "No preference" },
        { waarde: "Nieuw", label: "New" },
        { waarde: "Occasie", label: "Used" },
      ],
      budget: "Budget",
      budgetOpties: [
        { waarde: "", label: "No preference" },
        { waarde: "tot40", label: "Up to €40,000" },
        { waarde: "40tot60", label: "€40,000 – €60,000" },
        { waarde: "60tot80", label: "€60,000 – €80,000" },
        { waarde: "80tot100", label: "€80,000 – €100,000" },
        { waarde: "vanaf100", label: "More than €100,000" },
      ],
      stap4Titel: "Equipment & brand",
      extrasLabel: "Desired options",
      extrasOpties: [
        { waarde: "airco", label: "Air conditioning" },
        { waarde: "zonnepaneel", label: "Solar panel" },
        { waarde: "fietsendrager", label: "Bike rack" },
        { waarde: "camera", label: "Reversing camera" },
        { waarde: "automaat", label: "Automatic transmission" },
        { waarde: "mindervaliden", label: "Wheelchair accessible" },
        { waarde: "ander", label: "Other" },
      ],
      anders: "Anything else? Tell us here (optional)",
      andersPlaceholder: "Describe what else you're looking for…",
      merk: "Preferred brand (optional)",
      merkPlaceholder: "e.g. Blucamp, Hymer, Adria…",
      stap5Titel: "Your details",
      naam: "Name",
      email: "Email address",
      telefoon: "Phone number",
      timing: "When would you like to get started?",
      timingOpties: [
        { waarde: "asap", label: "As soon as possible" },
        { waarde: "3maanden", label: "Within 3 months" },
        { waarde: "verkennen", label: "Still exploring" },
      ],
      opmerkingen: "Additional remarks (optional)",
    };
  }
  return {
    stap: (n: number, totaal: number) => `Stap ${n} van ${totaal}`,
    vorige: "Vorige",
    volgende: "Volgende",
    versturen: "Verstuur mijn aanvraag",
    bezig: "Bezig…",
    fout: "Het versturen lukte niet. Probeer opnieuw of bel ons op +32 471 40 79 49.",
    bedanktTitel: "Bedankt, uw aanvraag is verstuurd",
    bedanktTekst: "Wij bekijken uw antwoorden en nemen contact op met een voorstel op maat, of met tweedehands motorhomes die nu al aansluiten bij uw wensen.",
    stap1Titel: "Hoe gaat u uw motorhome gebruiken?",
    stap1Intro: "Dit helpt ons om het juiste type motorhome te bepalen.",
    gebruikOpties: [
      { waarde: "weekend", label: "Weekendjes weg" },
      { waarde: "lange-reizen", label: "Lange reizen" },
      { waarde: "vast-wonen", label: "Vast wonen" },
      { waarde: "gezin", label: "Gezinsvakanties" },
      { waarde: "onbekend", label: "Ik weet het nog niet" },
    ],
    stap2Titel: "Type & indeling",
    opbouwtype: "Opbouwtype",
    opbouwtypeOpties: [
      { waarde: "", label: "Geen voorkeur" },
      { waarde: "Alkoof", label: "Alkoof" },
      { waarde: "Campervan", label: "Campervan" },
      { waarde: "Halfintegraal", label: "Halfintegraal" },
      { waarde: "Integraal", label: "Integraal" },
    ],
    zitplaatsen: "Gewenste zitplaatsen",
    slaapplaatsen: "Gewenste slaapplaatsen",
    plaatsenOpties: ["2", "3", "4", "5", "6+"],
    stap3Titel: "Budget & staat",
    staat: "Staat",
    staatOpties: [
      { waarde: "", label: "Geen voorkeur" },
      { waarde: "Nieuw", label: "Nieuw" },
      { waarde: "Occasie", label: "Occasie" },
    ],
    budget: "Budget",
    budgetOpties: [
      { waarde: "", label: "Geen voorkeur" },
      { waarde: "tot40", label: "Tot € 40.000" },
      { waarde: "40tot60", label: "€ 40.000 – € 60.000" },
      { waarde: "60tot80", label: "€ 60.000 – € 80.000" },
      { waarde: "80tot100", label: "€ 80.000 – € 100.000" },
      { waarde: "vanaf100", label: "Meer dan € 100.000" },
    ],
    stap4Titel: "Uitrusting & merk",
    extrasLabel: "Gewenste opties",
    extrasOpties: [
      { waarde: "airco", label: "Airco" },
      { waarde: "zonnepaneel", label: "Zonnepaneel" },
      { waarde: "fietsendrager", label: "Fietsendrager" },
      { waarde: "camera", label: "Achteruitrijcamera" },
      { waarde: "automaat", label: "Automaat" },
      { waarde: "mindervaliden", label: "Aangepast voor mindervaliden" },
      { waarde: "ander", label: "Ander" },
    ],
    anders: "Nog iets anders? Vermeld het hier (optioneel)",
    andersPlaceholder: "Beschrijf wat u nog zoekt…",
    merk: "Merk voorkeur (optioneel)",
    merkPlaceholder: "bv. Blucamp, Hymer, Adria…",
    stap5Titel: "Uw gegevens",
    naam: "Naam",
    email: "E-mailadres",
    telefoon: "Telefoonnummer",
    timing: "Wanneer wilt u van start gaan?",
    timingOpties: [
      { waarde: "asap", label: "Zo snel mogelijk" },
      { waarde: "3maanden", label: "Binnen 3 maanden" },
      { waarde: "verkennen", label: "Ik verken nog" },
    ],
    opmerkingen: "Extra opmerkingen (optioneel)",
  };
}

const TOTAAL_STAPPEN = 5;

export function CamperConfigurator({ locale }: { locale: Locale }) {
  const t = vertaling(locale);
  const [stap, setStap] = useState<Stap>(1);
  const [gebruik, setGebruik] = useState("");
  const [status, setStatus] = useState<"idle" | "bezig" | "verzonden" | "fout">("idle");

  function volgende() {
    setStap((s) => (s < TOTAAL_STAPPEN ? ((s + 1) as Stap) : s));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function vorige() {
    setStap((s) => (s > 1 ? ((s - 1) as Stap) : s));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const honeypot = form.elements.namedItem("website") as HTMLInputElement | null;
    if (honeypot && honeypot.value.trim() !== "") {
      setStatus("verzonden");
      return;
    }

    if (!form.reportValidity()) return;

    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
    if (!endpoint) {
      setStatus("verzonden");
      return;
    }

    setStatus("bezig");
    const formData = new FormData(form);
    formData.append("pagina", window.location.pathname);
    formData.append("type", "configurator-ideale-motorhome");
    formData.append("taal", locale);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!res.ok) throw new Error("verzenden mislukt");
      setStatus("verzonden");
    } catch {
      setStatus("fout");
    }
  }

  if (status === "verzonden") {
    return (
      <div className="configurator is-verhoogd">
        <div className="formulier-bedankt" tabIndex={-1}>
          <span className="vink">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          </span>
          <h3>{t.bedanktTitel}</h3>
          <p>{t.bedanktTekst}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="configurator is-verhoogd" onSubmit={handleSubmit} noValidate>
      <div className="configurator-voortgang">
        <p className="configurator-stap-label">{t.stap(stap, TOTAAL_STAPPEN)}</p>
        <div className="configurator-balk">
          <div className="configurator-balk-vulling" style={{ width: `${(stap / TOTAAL_STAPPEN) * 100}%` }} />
        </div>
      </div>

      {/* Alle stappen blijven in de DOM (enkel display:none op inactieve
          stappen) zodat FormData bij het versturen altijd alle ingevulde
          velden meeneemt, ook die van eerdere stappen. */}
      <div className="configurator-stap" style={{ display: stap === 1 ? "block" : "none" }}>
        <h2>{t.stap1Titel}</h2>
        <p className="intro">{t.stap1Intro}</p>
        <div className="keuze-opties" style={{ marginTop: "var(--sp-5)" }}>
          {t.gebruikOpties.map((optie) => (
            <button
              key={optie.waarde}
              type="button"
              className="keuze-optie"
              aria-selected={gebruik === optie.waarde}
              onClick={() => setGebruik(optie.waarde)}
            >
              {optie.label}
            </button>
          ))}
        </div>
        <input type="hidden" name="gebruik" value={gebruik} />
      </div>

      <div className="configurator-stap" style={{ display: stap === 2 ? "block" : "none" }}>
        <h2>{t.stap2Titel}</h2>
        <div className="velden">
          <div className="veld veld-breed">
            <label htmlFor="conf-opbouwtype">{t.opbouwtype}</label>
            <select id="conf-opbouwtype" name="opbouwtype">
              {t.opbouwtypeOpties.map((o) => <option key={o.label} value={o.waarde}>{o.label}</option>)}
            </select>
          </div>
          <div className="veld">
            <label htmlFor="conf-zitplaatsen">{t.zitplaatsen}</label>
            <select id="conf-zitplaatsen" name="zitplaatsen" defaultValue="">
              <option value="" disabled></option>
              {t.plaatsenOpties.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="veld">
            <label htmlFor="conf-slaapplaatsen">{t.slaapplaatsen}</label>
            <select id="conf-slaapplaatsen" name="slaapplaatsen" defaultValue="">
              <option value="" disabled></option>
              {t.plaatsenOpties.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="configurator-stap" style={{ display: stap === 3 ? "block" : "none" }}>
        <h2>{t.stap3Titel}</h2>
        <div className="velden">
          <div className="veld">
            <label htmlFor="conf-staat">{t.staat}</label>
            <select id="conf-staat" name="staat">
              {t.staatOpties.map((o) => <option key={o.label} value={o.waarde}>{o.label}</option>)}
            </select>
          </div>
          <div className="veld">
            <label htmlFor="conf-budget">{t.budget}</label>
            <select id="conf-budget" name="budget">
              {t.budgetOpties.map((o) => <option key={o.label} value={o.waarde}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="configurator-stap" style={{ display: stap === 4 ? "block" : "none" }}>
        <h2>{t.stap4Titel}</h2>
        <div className="veld veld-breed">
          <label>{t.extrasLabel}</label>
          <div className="configurator-vinkjes">
            {t.extrasOpties.map((optie) => (
              <label key={optie.waarde} className="configurator-vinkje">
                <input type="checkbox" name="extras" value={optie.waarde} />
                {optie.label}
              </label>
            ))}
          </div>
        </div>
        <div className="veld veld-breed" style={{ marginTop: "var(--sp-4)" }}>
          <label htmlFor="conf-anders">{t.anders}</label>
          <input id="conf-anders" name="extras_anders" type="text" placeholder={t.andersPlaceholder} />
        </div>
        <div className="veld veld-breed" style={{ marginTop: "var(--sp-4)" }}>
          <label htmlFor="conf-merk">{t.merk}</label>
          <input id="conf-merk" name="merk" type="text" placeholder={t.merkPlaceholder} />
        </div>
      </div>

      <div className="configurator-stap" style={{ display: stap === 5 ? "block" : "none" }}>
        <h2>{t.stap5Titel}</h2>
        <div className="velden">
          <div className="veld">
            <label htmlFor="conf-naam">{t.naam}</label>
            <input id="conf-naam" name="naam" type="text" required={stap === 5} />
          </div>
          <div className="veld">
            <label htmlFor="conf-email">{t.email}</label>
            <input id="conf-email" name="email" type="email" required={stap === 5} />
          </div>
          <div className="veld">
            <label htmlFor="conf-telefoon">{t.telefoon}</label>
            <input id="conf-telefoon" name="telefoon" type="tel" />
          </div>
          <div className="veld">
            <label htmlFor="conf-timing">{t.timing}</label>
            <select id="conf-timing" name="timing">
              {t.timingOpties.map((o) => <option key={o.waarde} value={o.waarde}>{o.label}</option>)}
            </select>
          </div>
          <div className="veld veld-breed">
            <label htmlFor="conf-opmerkingen">{t.opmerkingen}</label>
            <textarea id="conf-opmerkingen" name="opmerkingen" rows={3} />
          </div>
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="conf-website">Laat dit veld leeg</label>
          <input id="conf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status === "fout" && <p className="notitie notitie-goud">{t.fout}</p>}

      <div className="configurator-nav">
        {stap > 1 && (
          <button type="button" className="btn btn-stil" onClick={vorige}>
            {t.vorige}
          </button>
        )}
        {stap < TOTAAL_STAPPEN ? (
          <button type="button" className="btn btn-goud" onClick={volgende}>
            {t.volgende}
          </button>
        ) : (
          <button type="submit" className="btn btn-goud" disabled={status === "bezig"}>
            {status === "bezig" ? t.bezig : t.versturen}
          </button>
        )}
      </div>
    </form>
  );
}
