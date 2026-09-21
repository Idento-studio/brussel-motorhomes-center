"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { L, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";

export function HeroZoekbalk({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).voertuig;
  const router = useRouter();
  const [segment, setSegment] = useState<"koop" | "huur">("koop");
  const [budget, setBudget] = useState("");
  const koop = segment === "koop";

  return (
    <form
      className="zoekbalk"
      onSubmit={(e) => {
        e.preventDefault();
        if (koop) {
          router.push(`${L(locale, "/verkoop/")}${budget ? `?prijs=${encodeURIComponent(budget)}` : ""}`);
        } else {
          router.push(L(locale, "/verhuur/"));
        }
      }}
    >
      <div className="zoekbalk-raster">
        <div className="veld">
          <label htmlFor="zoek-segment">{d.zoekIk}</label>
          <select
            id="zoek-segment"
            name="segment"
            value={segment}
            onChange={(e) => {
              setSegment(e.target.value as "koop" | "huur");
              setBudget("");
            }}
          >
            <option value="koop">{d.zoekKoopOptie}</option>
            <option value="huur">{d.zoekHuurOptie}</option>
          </select>
        </div>
        <div className="veld">
          <label htmlFor="zoek-budget">{koop ? d.budget : d.periode}</label>
          <select
            id="zoek-budget"
            name="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            {koop ? (
              <optgroup label={d.filters.prijs}>
                <option value="">{d.filters.allePrijzen}</option>
                <option value="tot50">Tot € 50.000</option>
                <option value="50tot65">€ 50.000 – € 65.000</option>
                <option value="vanaf65">Vanaf € 65.000</option>
              </optgroup>
            ) : (
              <optgroup label={d.periode}>
                <option value="">{d.allePeriodes}</option>
                <option value="weekend">{d.weekend}</option>
                <option value="week">{d.weekOfLanger}</option>
              </optgroup>
            )}
          </select>
        </div>
        <div>
          <button className="btn btn-goud btn-vol" type="submit">{d.toonAanbod}</button>
        </div>
      </div>
    </form>
  );
}
