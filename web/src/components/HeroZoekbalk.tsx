"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { L, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";

type Segment = "koop" | "huur" | "onderhoud" | "verkopen";
type OnderhoudKeuze = "leefruimte" | "chassis" | "beide";
type VerkopenKeuze = "bmc-koopt" | "bmc-verkoopt";

export function HeroZoekbalk({ locale }: { locale: Locale }) {
  const d = getDictionary(locale).voertuig;
  const router = useRouter();
  const [segment, setSegment] = useState<Segment>("koop");
  const [budget, setBudget] = useState("");
  const [onderhoud, setOnderhoud] = useState<OnderhoudKeuze>("leefruimte");
  const [verkopen, setVerkopen] = useState<VerkopenKeuze>("bmc-koopt");

  return (
    <form
      className="zoekbalk"
      onSubmit={(e) => {
        e.preventDefault();
        if (segment === "koop") {
          router.push(`${L(locale, "/verkoop/")}${budget ? `?prijs=${encodeURIComponent(budget)}` : ""}`);
        } else if (segment === "huur") {
          router.push(L(locale, "/verhuur/"));
        } else if (segment === "onderhoud") {
          if (onderhoud === "leefruimte") router.push(L(locale, "/onderhoud/leefruimte/"));
          else if (onderhoud === "chassis") router.push(L(locale, "/onderhoud/chassis/"));
          else router.push(L(locale, "/onderhoud/"));
        } else {
          router.push(`${L(locale, "/verkoop-je-camper/")}?keuze=${verkopen}`);
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
              setSegment(e.target.value as Segment);
              setBudget("");
            }}
          >
            <option value="koop">{d.zoekKoopOptie}</option>
            <option value="huur">{d.zoekHuurOptie}</option>
            <option value="onderhoud">{d.zoekOnderhoudOptie}</option>
            <option value="verkopen">{d.zoekVerkopenOptie}</option>
          </select>
        </div>
        <div className="veld">
          <label htmlFor="zoek-tweede">
            {segment === "koop"
              ? d.budget
              : segment === "huur"
              ? d.periode
              : segment === "onderhoud"
              ? d.onderhoudVraag
              : d.verkopenVraag}
          </label>
          {segment === "koop" && (
            <select id="zoek-tweede" name="budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <optgroup label={d.filters.prijs}>
                <option value="">{d.filters.allePrijzen}</option>
                <option value="tot50">Tot € 50.000</option>
                <option value="50tot65">€ 50.000 – € 65.000</option>
                <option value="vanaf65">Vanaf € 65.000</option>
              </optgroup>
            </select>
          )}
          {segment === "huur" && (
            <select id="zoek-tweede" name="periode" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <optgroup label={d.periode}>
                <option value="">{d.allePeriodes}</option>
                <option value="weekend">{d.weekend}</option>
                <option value="week">{d.weekOfLanger}</option>
              </optgroup>
            </select>
          )}
          {segment === "onderhoud" && (
            <select
              id="zoek-tweede"
              name="onderhoud"
              value={onderhoud}
              onChange={(e) => setOnderhoud(e.target.value as OnderhoudKeuze)}
            >
              <option value="leefruimte">{d.onderhoudLeefruimte}</option>
              <option value="chassis">{d.onderhoudChassis}</option>
              <option value="beide">{d.onderhoudBeide}</option>
            </select>
          )}
          {segment === "verkopen" && (
            <select
              id="zoek-tweede"
              name="verkopen"
              value={verkopen}
              onChange={(e) => setVerkopen(e.target.value as VerkopenKeuze)}
            >
              <option value="bmc-koopt">{d.verkopenAanBmc}</option>
              <option value="bmc-verkoopt">{d.verkopenDoorverkopen}</option>
            </select>
          )}
        </div>
        <div>
          <button className="btn btn-goud btn-vol" type="submit">
            {segment === "koop" || segment === "huur" ? d.toonAanbod : d.gaVerder}
          </button>
        </div>
      </div>
    </form>
  );
}
