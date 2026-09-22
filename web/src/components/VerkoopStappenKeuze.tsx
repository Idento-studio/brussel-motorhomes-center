"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Formulier } from "@/components/Formulier";
import type { Locale } from "@/lib/i18n";

type Keuze = "bmc-koopt" | "bmc-verkoopt";

function getHoeVerkopenWaarde(locale: Locale): Record<Keuze, string> {
  if (locale === "fr") {
    return {
      "bmc-koopt": "Vendre à BMC",
      "bmc-verkoopt": "BMC vend pour moi",
    };
  }
  if (locale === "en") {
    return {
      "bmc-koopt": "Sell to BMC",
      "bmc-verkoopt": "BMC sells for me",
    };
  }
  return {
    "bmc-koopt": "Verkopen aan BMC",
    "bmc-verkoopt": "BMC verkoopt voor mij",
  };
}

function getOpties(locale: Locale): { keuze: Keuze; label: string; stappen: { titel: string; tekst: string }[] }[] {
  return locale === "fr"
    ? [
        {
          keuze: "bmc-koopt",
          label: "Je veux vendre mon camping-car à BMC",
          stappen: [
            { titel: "Prenez contact", tekst: "Appelez-nous ou envoyez-nous un e-mail pour un rendez-vous." },
            { titel: "Inspection & estimation gratuites", tekst: "Notre expert examine le camping-car sur place." },
            { titel: "Offre & accord", tekst: "Une offre sans engagement, fixée par écrit." },
            { titel: "Paiement immédiat", tekst: "Votre argent est versé dès la signature." },
          ],
        },
        {
          keuze: "bmc-verkoopt",
          label: "Je veux que BMC vende le camping-car pour moi",
          stappen: [
            { titel: "Entretien préalable", tekst: "Nous discutons du prix de vente et des frais." },
            { titel: "Préparation technique", tekst: "Réparations, nettoyage et contrôle complet." },
            { titel: "Annonce & promotion", tekst: "Publication sur les canaux pertinents." },
            { titel: "Gestion des acheteurs", tekst: "Nous gérons les questions, visites et essais routiers." },
            { titel: "Vente & transfert", tekst: "Papiers réglés, argent versé." },
          ],
        },
      ]
    : locale === "en"
    ? [
        {
          keuze: "bmc-koopt",
          label: "I want to sell my motorhome to BMC",
          stappen: [
            { titel: "Get in touch", tekst: "Call or email us to book an appointment." },
            { titel: "Free inspection & valuation", tekst: "Our expert examines the motorhome on site." },
            { titel: "Offer & agreement", tekst: "A no-obligation offer, put in writing." },
            { titel: "Immediate payment", tekst: "Your money is paid out as soon as you sign." },
          ],
        },
        {
          keuze: "bmc-verkoopt",
          label: "I want BMC to sell the motorhome for me",
          stappen: [
            { titel: "Intake meeting", tekst: "We discuss the sale price and the fee." },
            { titel: "Technical preparation", tekst: "Repairs, cleaning and a full check." },
            { titel: "Listing & promotion", tekst: "Placement on the relevant channels." },
            { titel: "Buyer management", tekst: "We handle questions, viewings and test drives." },
            { titel: "Sale & transfer", tekst: "Paperwork arranged, money paid out." },
          ],
        },
      ]
    : [
        {
          keuze: "bmc-koopt",
          label: "Ik wil mijn motorhome verkopen aan BMC",
          stappen: [
            { titel: "Neem contact op", tekst: "Bel of mail ons voor een afspraak." },
            { titel: "Gratis inspectie & taxatie", tekst: "Onze expert bekijkt de motorhome ter plaatse." },
            { titel: "Bod & akkoord", tekst: "Een vrijblijvend bod, schriftelijk vastgelegd." },
            { titel: "Directe uitbetaling", tekst: "Uw geld staat er meteen na ondertekening." },
          ],
        },
        {
          keuze: "bmc-verkoopt",
          label: "Ik wil dat BMC de motorhome voor mij verkoopt",
          stappen: [
            { titel: "Intakegesprek", tekst: "We bespreken de verkoopprijs en de fee." },
            { titel: "Technische voorbereiding", tekst: "Herstellingen, reiniging en volledige check." },
            { titel: "Advertentie & promotie", tekst: "Plaatsing op de relevante kanalen." },
            { titel: "Kopers beheren", tekst: "Wij handelen vragen, bezoeken en testritten af." },
            { titel: "Verkoop & overdracht", tekst: "Papieren geregeld, geld uitbetaald." },
          ],
        },
      ];
}

export function VerkoopStappenKeuze({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const keuzeUitUrl = searchParams.get("keuze");
  const [keuze, setKeuze] = useState<Keuze>(keuzeUitUrl === "bmc-verkoopt" ? "bmc-verkoopt" : "bmc-koopt");
  const opties = getOpties(locale);
  const hoeVerkopenWaarde = getHoeVerkopenWaarde(locale);
  const actieveOptie = opties.find((optie) => optie.keuze === keuze)!;

  const t =
    locale === "fr"
      ? {
          hoeWerktLabel: "Comment ça fonctionne",
          hoeWerktTitel: "Comment souhaitez-vous vendre ?",
          formTitel: "Prêt à vendre votre camping-car ?",
          submitLabel: "Envoyer la demande",
          naam: "Nom",
          email: "E-mail",
          telefoon: "Numéro de téléphone",
          merkModel: "Marque & modèle du camping-car",
          fotos: "Photos de votre camping-car (facultatif)",
          hoe: "Comment vendre ?",
          maakKeuze: "Faites un choix",
          toelichting: "Remarques supplémentaires (facultatif)",
        }
      : locale === "en"
      ? {
          hoeWerktLabel: "How it works",
          hoeWerktTitel: "How would you like to sell?",
          formTitel: "Ready to sell your motorhome?",
          submitLabel: "Send request",
          naam: "Name",
          email: "Email",
          telefoon: "Phone number",
          merkModel: "Motorhome make & model",
          fotos: "Photos of your motorhome (optional)",
          hoe: "How to sell?",
          maakKeuze: "Make a choice",
          toelichting: "Additional remarks (optional)",
        }
      : {
          hoeWerktLabel: "Hoe werkt het",
          hoeWerktTitel: "Hoe wilt u verkopen?",
          formTitel: "Klaar om uw motorhome te verkopen?",
          submitLabel: "Aanvraag versturen",
          naam: "Naam",
          email: "E-mail",
          telefoon: "Telefoonnummer",
          merkModel: "Merk & model motorhome",
          fotos: "Foto's van uw motorhome (optioneel)",
          hoe: "Hoe verkopen?",
          maakKeuze: "Maak een keuze",
          toelichting: "Extra toelichting (optioneel)",
        };

  return (
    <>
      <section className="sectie sectie-vlak">
        <div className="wrap">
          <div className="sectie-kop">
            <p className="label">{t.hoeWerktLabel}</p>
            <h2>{t.hoeWerktTitel}</h2>
          </div>

          <div className="keuze-raster">
            <div className="keuze-opties">
              {opties.map((optie) => (
                <button
                  key={optie.keuze}
                  type="button"
                  className="keuze-optie"
                  aria-selected={keuze === optie.keuze}
                  onClick={() => setKeuze(optie.keuze)}
                >
                  {optie.label}
                </button>
              ))}
            </div>

            <ol className="traject-lijst">
              {actieveOptie.stappen.map((stap, i) => (
                <li key={stap.titel}>
                  <span className="traject-stip">{i + 1}</span>
                  <h3>{stap.titel}</h3>
                  <p>{stap.tekst}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="sectie">
        <div className="wrap" style={{ maxWidth: "760px" }}>
          <Formulier titel={t.formTitel} submitLabel={t.submitLabel} locale={locale}>
            <div className="veld">
              <label htmlFor="verkopen-naam">{t.naam}</label>
              <input id="verkopen-naam" name="naam" type="text" autoComplete="name" required />
            </div>
            <div className="veld">
              <label htmlFor="verkopen-email">{t.email}</label>
              <input id="verkopen-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="veld">
              <label htmlFor="verkopen-telefoon">{t.telefoon}</label>
              <input id="verkopen-telefoon" name="telefoon" type="tel" autoComplete="tel" />
            </div>
            <div className="veld">
              <label htmlFor="verkopen-camper">{t.merkModel}</label>
              <input id="verkopen-camper" name="camper" type="text" required />
            </div>
            <div className="veld veld-breed">
              <label htmlFor="verkopen-fotos">{t.fotos}</label>
              <input id="verkopen-fotos" name="fotos" type="file" accept="image/*" multiple />
            </div>
            <div className="veld veld-breed">
              <label htmlFor="verkopen-hoe">{t.hoe}</label>
              {/* key={keuze} dwingt een remount af zodat defaultValue telkens
                  opnieuw de keuze hierboven overneemt, maar de klant kan de
                  select hierna nog altijd gewoon zelf aanpassen. */}
              <select key={keuze} id="verkopen-hoe" name="hoe" required defaultValue={hoeVerkopenWaarde[keuze]}>
                <option value="" disabled>{t.maakKeuze}</option>
                <option value={hoeVerkopenWaarde["bmc-koopt"]}>{hoeVerkopenWaarde["bmc-koopt"]}</option>
                <option value={hoeVerkopenWaarde["bmc-verkoopt"]}>{hoeVerkopenWaarde["bmc-verkoopt"]}</option>
              </select>
            </div>
            <div className="veld veld-breed">
              <label htmlFor="verkopen-toelichting">{t.toelichting}</label>
              <textarea id="verkopen-toelichting" name="toelichting" rows={4} />
            </div>
          </Formulier>
        </div>
      </section>
    </>
  );
}
