"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { urlFor } from "@/sanity/image";
import type { VerkoopVoertuig } from "@/sanity/types";
import { L, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { opbouwtypeLabel, staatLabel } from "@/lib/voertuigLabels";

const GELDIGE_PRIJS_WAARDEN = ["", "tot50", "50tot65", "vanaf65"] as const;

function binnenPrijs(prijs: number, bereik: string) {
  if (bereik === "tot50") return prijs < 50000;
  if (bereik === "50tot65") return prijs >= 50000 && prijs <= 65000;
  if (bereik === "vanaf65") return prijs > 65000;
  return true;
}

export function SaleFilters({ voertuigen, locale }: { voertuigen: VerkoopVoertuig[]; locale: Locale }) {
  const dict = getDictionary(locale);
  const d = dict.voertuig;
  const searchParams = useSearchParams();
  const prijsUitUrl = searchParams.get("prijs");

  const PRIJS_BEREIKEN = [
    { value: "", label: d.filters.allePrijzen },
    { value: "tot50", label: "Tot € 50.000" },
    { value: "50tot65", label: "€ 50.000 – € 65.000" },
    { value: "vanaf65", label: "Vanaf € 65.000" },
  ] as const;

  const [type, setType] = useState("");
  const [staat, setStaat] = useState("");
  const [merk, setMerk] = useState("");
  const [zit, setZit] = useState("");
  const [slaap, setSlaap] = useState("");
  const [prijs, setPrijs] = useState(() =>
    prijsUitUrl && GELDIGE_PRIJS_WAARDEN.includes(prijsUitUrl as (typeof GELDIGE_PRIJS_WAARDEN)[number]) ? prijsUitUrl : "",
  );

  const opties = useMemo(
    () => ({
      type: Array.from(new Set(voertuigen.map((v) => v.opbouwtype))).sort(),
      merk: Array.from(new Set(voertuigen.map((v) => v.merk))).sort(),
      zit: Array.from(new Set(voertuigen.map((v) => v.zitplaatsen))).sort((a, b) => a - b),
      slaap: Array.from(new Set(voertuigen.map((v) => v.slaapplaatsen))).sort((a, b) => a - b),
    }),
    [voertuigen],
  );

  const gefilterd = voertuigen.filter((v) => {
    if (type && v.opbouwtype !== type) return false;
    if (staat && v.staat !== staat) return false;
    if (merk && v.merk !== merk) return false;
    if (zit && String(v.zitplaatsen) !== zit) return false;
    if (slaap && String(v.slaapplaatsen) !== slaap) return false;
    if (prijs && !binnenPrijs(v.prijs, prijs)) return false;
    return true;
  });

  const filtersActief = Boolean(type || staat || merk || zit || slaap || prijs);
  const wisFilters = () => {
    setType("");
    setStaat("");
    setMerk("");
    setZit("");
    setSlaap("");
    setPrijs("");
  };

  return (
    <>
      <div className="filterbalk">
        <div className="filterbalk-raster">
          <div className="veld">
            <label htmlFor="f-type">{d.filters.type}</label>
            <select id="f-type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">{d.filters.alle}</option>
              {opties.type.map((o) => <option key={o} value={o}>{opbouwtypeLabel(o, locale)}</option>)}
            </select>
          </div>
          <div className="veld">
            <label htmlFor="f-staat">{d.filters.staat}</label>
            <select id="f-staat" value={staat} onChange={(e) => setStaat(e.target.value)}>
              <option value="">{d.filters.alle}</option>
              <option value="Nieuw">{d.nieuw}</option>
              <option value="Occasie">{d.occasie}</option>
            </select>
          </div>
          <div className="veld">
            <label htmlFor="f-merk">{d.filters.merk}</label>
            <select id="f-merk" value={merk} onChange={(e) => setMerk(e.target.value)}>
              <option value="">{d.filters.alle}</option>
              {opties.merk.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="veld">
            <label htmlFor="f-zit">{d.filters.zit}</label>
            <select id="f-zit" value={zit} onChange={(e) => setZit(e.target.value)}>
              <option value="">{d.filters.alle}</option>
              {opties.zit.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="veld">
            <label htmlFor="f-slaap">{d.filters.slaap}</label>
            <select id="f-slaap" value={slaap} onChange={(e) => setSlaap(e.target.value)}>
              <option value="">{d.filters.alle}</option>
              {opties.slaap.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className="veld">
            <label htmlFor="f-prijs">{d.filters.prijs}</label>
            <select id="f-prijs" value={prijs} onChange={(e) => setPrijs(e.target.value)}>
              {PRIJS_BEREIKEN.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        {filtersActief && (
          <button type="button" className="filter-wissen" onClick={wisFilters}>{d.filters.wissen}</button>
        )}
      </div>

      <p className="telling">{d.tellingKoop(gefilterd.length, voertuigen.length)}</p>

      <div className="raster raster-3 raster-ruim" style={{ marginTop: "var(--sp-4)" }}>
        {gefilterd.map((v) => (
          <article key={v._id} className="kaart kaart-lift camper">
            <div className="media media-4x3">
              <img src={urlFor(v.coverFoto).width(600).height(450).fit("crop").url()} alt={v.coverFoto.alt ?? v.titel} loading="lazy" />
              <span className="badge badge-occasion" style={{ position: "absolute", left: "0.75rem", top: "0.75rem", zIndex: 3 }}>{staatLabel(v.staat, locale)}</span>
              {v.mindervalideGeschikt && (
                <span className="badge badge-stil" style={{ position: "absolute", left: "0.75rem", top: "2.25rem", zIndex: 3 }}>{d.mindervaliden}</span>
              )}
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
        ))}
      </div>

      {gefilterd.length === 0 && (
        <div className="notitie-leeg">
          <p>{d.geenResultaatKoop}</p>
        </div>
      )}
    </>
  );
}
