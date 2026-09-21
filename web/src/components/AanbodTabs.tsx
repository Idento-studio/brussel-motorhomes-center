"use client";

import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { VerkoopVoertuig, VerhuurVoertuig } from "@/sanity/types";
import { L, type Locale } from "@/lib/i18n";
import { getDictionary, type Dictionary } from "@/dictionaries";
import { opbouwtypeLabel, staatLabel } from "@/lib/voertuigLabels";

export function AanbodTabs({
  verkoopVoertuigen,
  verhuurVoertuigen,
  locale,
}: {
  verkoopVoertuigen: VerkoopVoertuig[];
  verhuurVoertuigen: VerhuurVoertuig[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const d = dict.voertuig;
  const [actief, setActief] = useState<"koop" | "huur">("koop");
  const isKoop = actief === "koop";

  const uitgelichtKoop = verkoopVoertuigen.slice(0, 3);
  const uitgelichtHuur = verhuurVoertuigen.slice(0, 3);
  const heeftAanbod = isKoop ? uitgelichtKoop.length > 0 : uitgelichtHuur.length > 0;

  return (
    <>
      <div className="aanbod-kop">
        <div>
          <p className="label">{d.aanbodKop}</p>
          <h2>{isKoop ? d.aanbodTitelKoop : d.aanbodTitelHuur}</h2>
        </div>
        <div className="tabs">
          <button type="button" className="tab" aria-selected={isKoop} onClick={() => setActief("koop")}>
            {d.tabTeKoop} <span className="aantal">({verkoopVoertuigen.length})</span>
          </button>
          <button type="button" className="tab" aria-selected={!isKoop} onClick={() => setActief("huur")}>
            {d.tabTeHuur} <span className="aantal">({verhuurVoertuigen.length})</span>
          </button>
        </div>
      </div>

      {heeftAanbod ? (
        <>
          <div className="raster raster-3 raster-ruim" style={{ marginTop: "var(--sp-6)" }}>
            {isKoop
              ? uitgelichtKoop.map((v) => <VerkoopKaart key={v._id} v={v} locale={locale} dict={dict} />)
              : uitgelichtHuur.map((v) => <VerhuurKaart key={v._id} v={v} locale={locale} dict={dict} />)}
          </div>
          <div style={{ marginTop: "var(--sp-7)", display: "flex", justifyContent: "center" }}>
            <Link className="btn btn-blauw" href={L(locale, isKoop ? "/verkoop/" : "/verhuur/")}>{d.bekijkVolledigAanbod}</Link>
          </div>
        </>
      ) : (
        <div className="notitie-leeg" style={{ marginTop: "var(--sp-6)" }}>
          <p>{isKoop ? d.geenAanbodKoop : d.geenAanbodHuur}</p>
        </div>
      )}
    </>
  );
}

function VerkoopKaart({ v, locale, dict }: { v: VerkoopVoertuig; locale: Locale; dict: Dictionary }) {
  const d = dict.voertuig;
  return (
    <article className="kaart kaart-lift camper">
      <div className="media media-4x3">
        <img src={urlFor(v.coverFoto).width(600).height(450).fit("crop").url()} alt={v.coverFoto.alt ?? v.titel} loading="lazy" />
        <span className="badge badge-occasion" style={{ position: "absolute", left: "0.75rem", top: "0.75rem", zIndex: 3 }}>{staatLabel(v.staat, locale)}</span>
        {v.promoTekst && (
          <span className="badge badge-nieuw" style={{ position: "absolute", left: "auto", right: "0.75rem", top: "0.75rem", zIndex: 3, whiteSpace: "nowrap" }}>{d.promo}: {v.promoTekst}</span>
        )}
        <span className="prijs-pil">
          {v.promoPrijs ? (
            <>
              <span style={{ textDecoration: "line-through", opacity: 0.65, marginRight: "0.375rem" }}>€ {v.prijs.toLocaleString("nl-BE")}</span>
              € {v.promoPrijs.toLocaleString("nl-BE")}
            </>
          ) : (
            <>€ {v.prijs.toLocaleString("nl-BE")}</>
          )}
        </span>
      </div>
      <div className="kaart-body">
        <h3>{v.titel}</h3>
        <p className="onder">{v.groep ? `${v.groep} · ${opbouwtypeLabel(v.opbouwtype, locale)}` : opbouwtypeLabel(v.opbouwtype, locale)}</p>
        <dl className="speclijst">
          <div><dt>{d.bouwjaar}</dt><dd>{v.bouwjaar}</dd></div>
          <div><dt>{d.kilometerstand}</dt><dd>{v.kilometerstand.toLocaleString("nl-BE")} km</dd></div>
          {v.motor && <div><dt>{d.motor}</dt><dd>{v.motor}</dd></div>}
          <div><dt>{d.zitSlaap}</dt><dd>{v.zitplaatsen} / {v.slaapplaatsen}</dd></div>
        </dl>
        <div className="acties">
          <Link className="btn btn-goud btn-klein" href={L(locale, `/verkoop/${v.slug}/`)}>{d.bekijkDetails}</Link>
          <a
            className="wa-knop"
            href={`https://wa.me/32471407949?text=${encodeURIComponent(d.interesseBericht(v.titel))}`}
            aria-label={d.vraagWhatsapp(v.titel)}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.5 3.5a12 12 0 0 1 17 17 12 12 0 0 1-13.7 2.3l-5.8.7a.4.4 0 0 1-.5-.4l.8-5.8A12 12 0 0 1 3.5 3.5zm3.6 17 .3.2a9.9 9.9 0 0 0 11.5-1.8 9.8 9.8 0 1 0-15.6-2.4l.1.3-.5 3.9a.2.2 0 0 0 .2.2zm6.6-7-1 1.2a9.8 9.8 0 0 1-3.5-3.5l1.2-1a.8.8 0 0 0 .2-.9L9.6 7a.8.8 0 0 0-.9-.5l-2 .6a.8.8 0 0 0-.6.9 11.8 11.8 0 0 0 10 10 .8.8 0 0 0 .9-.6l.5-2a.8.8 0 0 0-.4-.9l-2.5-1.1a.8.8 0 0 0-.9.2z" /></svg>
          </a>
        </div>
      </div>
    </article>
  );
}

function VerhuurKaart({ v, locale, dict }: { v: VerhuurVoertuig; locale: Locale; dict: Dictionary }) {
  const d = dict.voertuig;
  const prijs = v.tarieven?.laagSeizoen?.weekend;
  return (
    <article className="kaart kaart-lift camper">
      <div className="media media-4x3">
        <img src={urlFor(v.coverFoto).width(600).height(450).fit("crop").url()} alt={v.coverFoto.alt ?? v.titel} loading="lazy" />
        {v.promoTekst && (
          <span className="badge badge-nieuw" style={{ position: "absolute", left: "auto", right: "0.75rem", top: "0.75rem", zIndex: 3, whiteSpace: "nowrap" }}>{d.promo}: {v.promoTekst}</span>
        )}
        <span className="prijs-pil">
          {prijs ? <>{d.vanafKlein} € {prijs.toLocaleString("nl-BE")} <span className="klein">/ {d.vanafPerWeekend}</span></> : d.prijsOpAanvraag}
        </span>
      </div>
      <div className="kaart-body">
        <h3>{v.titel}</h3>
        <ul className="pil-rij">
          <li className="pil">{v.slaapplaatsen ? d.slaapplaatsen(v.slaapplaatsen) : d.slaapplaatsenOpAanvraag}</li>
          <li className="pil">{v.rijbewijs ?? d.rijbewijsBStandaard}</li>
          {v.mindervalideGeschikt && <li className="pil">{d.mindervaliden}</li>}
        </ul>
        <p className="indeling">{v.indeling ?? d.indelingOpAanvraag}</p>
        <p className="afmeting">
          {v.afmetingen?.lengte
            ? `${v.afmetingen.lengte.toFixed(2)} × ${v.afmetingen.breedte?.toFixed(2)} × ${v.afmetingen.hoogte?.toFixed(2)} m`
            : d.afmetingenOpAanvraag}
        </p>
        <div className="acties">
          <Link className="btn btn-goud btn-klein" href={L(locale, `/verhuur/${v.slug}/`)}>{d.bekijkTarieven}</Link>
          <a
            className="wa-knop"
            href={`https://wa.me/32471407949?text=${encodeURIComponent(d.huurBericht(v.titel))}`}
            aria-label={d.vraagWhatsapp(v.titel)}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.5 3.5a12 12 0 0 1 17 17 12 12 0 0 1-13.7 2.3l-5.8.7a.4.4 0 0 1-.5-.4l.8-5.8A12 12 0 0 1 3.5 3.5zm3.6 17 .3.2a9.9 9.9 0 0 0 11.5-1.8 9.8 9.8 0 1 0-15.6-2.4l.1.3-.5 3.9a.2.2 0 0 0 .2.2zm6.6-7-1 1.2a9.8 9.8 0 0 1-3.5-3.5l1.2-1a.8.8 0 0 0 .2-.9L9.6 7a.8.8 0 0 0-.9-.5l-2 .6a.8.8 0 0 0-.6.9 11.8 11.8 0 0 0 10 10 .8.8 0 0 0 .9-.6l.5-2a.8.8 0 0 0-.4-.9l-2.5-1.1a.8.8 0 0 0-.9.2z" /></svg>
          </a>
        </div>
      </div>
    </article>
  );
}
