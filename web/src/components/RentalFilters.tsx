"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { VerhuurVoertuig } from "@/sanity/types";
import { L, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";

function vanafPrijs(v: VerhuurVoertuig) {
  return v.tarieven?.laagSeizoen?.weekend;
}

export function RentalFilters({ voertuigen, locale }: { voertuigen: VerhuurVoertuig[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.voertuig;
  const [merk, setMerk] = useState("");
  const [zit, setZit] = useState("");
  const [slaap, setSlaap] = useState("");

  const opties = useMemo(
    () => ({
      merk: Array.from(new Set(voertuigen.map((v) => v.merk).filter((m): m is string => Boolean(m)))).sort(),
      zit: Array.from(new Set(voertuigen.map((v) => v.zitplaatsen).filter((n): n is number => Boolean(n)))).sort((a, b) => a - b),
      slaap: Array.from(new Set(voertuigen.map((v) => v.slaapplaatsen).filter((n): n is number => Boolean(n)))).sort((a, b) => a - b),
    }),
    [voertuigen],
  );

  const gefilterd = voertuigen.filter((v) => {
    if (merk && v.merk !== merk) return false;
    if (zit && String(v.zitplaatsen) !== zit) return false;
    if (slaap && String(v.slaapplaatsen) !== slaap) return false;
    return true;
  });

  const filtersActief = Boolean(merk || zit || slaap);
  const wisFilters = () => {
    setMerk("");
    setZit("");
    setSlaap("");
  };

  const toonFilterbalk = opties.merk.length > 0 || opties.zit.length > 0 || opties.slaap.length > 0;

  return (
    <>
      {toonFilterbalk && (
        <div className="filterbalk" style={{ marginBottom: "var(--sp-6)" }}>
          <div className="filterbalk-raster">
            {opties.merk.length > 0 && (
              <div className="veld">
                <label htmlFor="f-huur-merk">{d.filters.merk}</label>
                <select id="f-huur-merk" value={merk} onChange={(e) => setMerk(e.target.value)}>
                  <option value="">{d.filters.alle}</option>
                  {opties.merk.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            )}
            {opties.zit.length > 0 && (
              <div className="veld">
                <label htmlFor="f-huur-zit">{d.filters.zit}</label>
                <select id="f-huur-zit" value={zit} onChange={(e) => setZit(e.target.value)}>
                  <option value="">{d.filters.alle}</option>
                  {opties.zit.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            )}
            {opties.slaap.length > 0 && (
              <div className="veld">
                <label htmlFor="f-huur-slaap">{d.filters.slaap}</label>
                <select id="f-huur-slaap" value={slaap} onChange={(e) => setSlaap(e.target.value)}>
                  <option value="">{d.filters.alle}</option>
                  {opties.slaap.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            )}
          </div>
          {filtersActief && (
            <button type="button" className="filter-wissen" onClick={wisFilters}>{d.filters.wissen}</button>
          )}
        </div>
      )}

      <p className="telling">{d.tellingHuur(gefilterd.length, voertuigen.length)}</p>

      <div className="raster raster-3 raster-ruim" style={{ marginTop: "var(--sp-4)" }}>
        {gefilterd.map((v) => {
          const prijs = vanafPrijs(v);
          return (
            <article key={v._id} className="kaart kaart-lift camper">
              <div className="media media-4x3">
                <img
                  src={urlFor(v.coverFoto).width(600).height(450).fit("crop").url()}
                  srcSet={`${urlFor(v.coverFoto).width(400).height(300).fit("crop").url()} 400w, ${urlFor(v.coverFoto).width(600).height(450).fit("crop").url()} 600w, ${urlFor(v.coverFoto).width(800).height(600).fit("crop").url()} 800w`}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  alt={v.coverFoto.alt ?? v.titel}
                  loading="lazy"
                />
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
        })}
      </div>

      {gefilterd.length === 0 && (
        <div className="notitie-leeg" style={{ marginTop: "var(--sp-6)" }}>
          <p>{d.geenResultaatHuur}</p>
        </div>
      )}
    </>
  );
}
