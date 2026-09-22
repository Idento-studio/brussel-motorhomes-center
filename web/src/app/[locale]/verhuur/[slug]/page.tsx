import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { haalVerhuurVoertuig, haalVerhuurVoertuigen } from "@/sanity/queries";
import { Gallery } from "@/components/Gallery";
import { Uitrusting } from "@/components/Uitrusting";
import { Formulier } from "@/components/Formulier";
import { KlikbareFoto } from "@/components/KlikbareFoto";
import { urlFor, urlForVolledig } from "@/sanity/image";
import type { TariefPeriode } from "@/sanity/types";
import { L, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { opbouwtypeLabel, staatLabel, brandstofLabel, transmissieLabel, rijbewijsLabel } from "@/lib/voertuigLabels";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList, buildRentalProduct } from "@/lib/structuredData";

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const voertuigen = await haalVerhuurVoertuigen(params.locale as Locale);
  return voertuigen.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const voertuig = await haalVerhuurVoertuig(slug, locale);
  if (!voertuig) return {};
  const title =
    locale === "fr" ? `Louer un ${voertuig.titel}` : locale === "en" ? `Rent a ${voertuig.titel}` : `${voertuig.titel} huren`;
  const description =
    locale === "fr"
      ? `Louez le ${voertuig.titel} chez BMC. Tarifs par saison et disponibilité.`
      : locale === "en"
      ? `Rent the ${voertuig.titel} from BMC. Rates per season and availability.`
      : `Huur de ${voertuig.titel} bij BMC. Tarieven per seizoen en beschikbaarheid.`;
  const kaartfoto = urlFor(voertuig.coverFoto).width(1200).height(630).fit("crop").url();
  return {
    title,
    description,
    alternates: buildAlternates(`/verhuur/${slug}/`),
    ...buildOpenGraph({
      locale,
      title,
      description,
      pad: `/verhuur/${slug}/`,
      afbeelding: { url: kaartfoto, width: 1200, height: 630, alt: voertuig.coverFoto.alt ?? voertuig.titel },
    }),
  };
}

function bedrag(waarde: number | undefined, localeCode: string) {
  return waarde ? `${waarde.toLocaleString(localeCode)} €` : "n/a";
}

export default async function VerhuurDetailPagina({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const dict = getDictionary(locale);
  const d = dict.voertuig.detail;
  const localeCode = locale === "fr" ? "fr-BE" : locale === "en" ? "en-GB" : "nl-BE";
  const v = await haalVerhuurVoertuig(slug, locale);
  if (!v) notFound();

  const RIJEN: { key: keyof TariefPeriode; label: string }[] = [
    { key: "weekend", label: dict.voertuig.weekend },
    { key: "eenWeek", label: locale === "fr" ? "1 semaine" : locale === "en" ? "1 week" : "1 week" },
    { key: "tweeWeken", label: locale === "fr" ? "2 semaines" : locale === "en" ? "2 weeks" : "2 weken" },
    { key: "drieWeken", label: locale === "fr" ? "3 semaines" : locale === "en" ? "3 weeks" : "3 weken" },
    { key: "vierWeken", label: locale === "fr" ? "4 semaines" : locale === "en" ? "4 weeks" : "4 weken" },
    { key: "extraDag", label: locale === "fr" ? "Jour supplémentaire" : locale === "en" ? "Extra day" : "Extra dag" },
  ];

  const waTekst = encodeURIComponent(dict.voertuig.huurBericht(v.titel));
  const vanaf = v.tarieven?.laagSeizoen?.weekend;
  const heeftTarieven = Boolean(v.tarieven?.laagSeizoen || v.tarieven?.middenSeizoen || v.tarieven?.hoogSeizoen);

  return (
    <main id="inhoud" className="detail">
      <JsonLd
        data={buildRentalProduct(locale, {
          titel: v.titel,
          slug: v.slug,
          vanafPrijs: vanaf,
          afbeelding: urlFor(v.coverFoto).width(1200).height(900).fit("crop").url(),
          beschrijving: v.indeling,
        })}
      />
      <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.voertuig.kruimelTeHuur, pad: "/verhuur/" }, { label: v.titel }])} />
      <div className="detail-kruimel">
        <div className="wrap">
          <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
          <span className="scheiding" aria-hidden="true">/</span>
          <Link href={L(locale, "/verhuur/")}>{dict.voertuig.kruimelTeHuur}</Link>
          <span className="scheiding" aria-hidden="true">/</span>
          <span aria-current="page">{v.titel}</span>
        </div>
      </div>

      <div className="wrap">
        <Link className="terugknop" href={L(locale, "/verhuur/")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          {d.terugHuurmodellen}
        </Link>

        <div className="detail-raster">
          <div>
            <Gallery fotos={v.fotos} titel={v.titel} locale={locale} />

            <header className="detail-titel">
              {v.promoTekst && (
                <div className="pil-rij" style={{ marginBottom: "var(--sp-3)" }}>
                  <span className="badge badge-nieuw">{dict.voertuig.promo}: {v.promoTekst}</span>
                </div>
              )}
              <h1>{v.titel}</h1>
            </header>

            {(v.opbouwtype || v.staat || v.indeling || v.afmetingen?.lengte || v.zitplaatsen || v.slaapplaatsen || v.onderstel || v.motor || v.brandstof || v.transmissie || v.rijbewijs || v.leeggewicht || v.mtm) && (
              <section className="detail-blok">
                <h2>{d.specificaties}</h2>
                <dl className="spec-raster">
                  {v.opbouwtype && <div><dt>{d.opbouwtype}</dt><dd>{opbouwtypeLabel(v.opbouwtype, locale)}</dd></div>}
                  {v.staat && <div><dt>{d.staat}</dt><dd>{staatLabel(v.staat, locale)}</dd></div>}
                  {v.indeling && <div><dt>{d.indeling}</dt><dd>{v.indeling}</dd></div>}
                  {v.afmetingen?.lengte && v.afmetingen?.breedte && v.afmetingen?.hoogte && (
                    <div><dt>{d.afmetingen}</dt><dd>{`${v.afmetingen.lengte.toFixed(2)} × ${v.afmetingen.breedte.toFixed(2)} × ${v.afmetingen.hoogte.toFixed(2)} m`}</dd></div>
                  )}
                  {(v.zitplaatsen || v.slaapplaatsen) && (
                    <div><dt>{dict.voertuig.zitSlaap}</dt><dd>{v.zitplaatsen ?? "–"} / {v.slaapplaatsen ?? "–"}</dd></div>
                  )}
                  {v.onderstel && <div><dt>{d.onderstel}</dt><dd>{v.onderstel}</dd></div>}
                  {v.motor && <div><dt>{dict.voertuig.motor}</dt><dd>{v.motor}</dd></div>}
                  {v.brandstof && <div><dt>{d.brandstof}</dt><dd>{brandstofLabel(v.brandstof, locale)}</dd></div>}
                  {v.transmissie && <div><dt>{d.transmissie}</dt><dd>{transmissieLabel(v.transmissie, locale)}</dd></div>}
                  {v.rijbewijs && <div><dt>{d.rijbewijs}</dt><dd>{rijbewijsLabel(v.rijbewijs, locale)}</dd></div>}
                  {(v.leeggewicht || v.mtm) && (
                    <div><dt>{d.gewicht}</dt><dd>{v.leeggewicht ? `${v.leeggewicht.toLocaleString(localeCode)} kg` : "–"} / {v.mtm ? `${v.mtm.toLocaleString(localeCode)} kg` : "–"}</dd></div>
                  )}
                </dl>
              </section>
            )}

            {heeftTarieven && (
              <section className="detail-blok">
                <h2>{d.huurtarieven}</h2>
                <p style={{ marginTop: "0.25rem", fontSize: "var(--fs-small)", color: "var(--text-muted)" }}>
                  {d.alleBtw}
                </p>
                <div className="tabel-scroll" style={{ marginTop: "var(--sp-5)" }}>
                  <table className="tabel">
                    <thead>
                      <tr>
                        <th scope="col">{d.periodeKol}</th>
                        <th scope="col">{d.laagSeizoen}</th>
                        <th scope="col">{d.middenSeizoen}</th>
                        <th scope="col">{d.hoogSeizoen}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {RIJEN.map((rij) => (
                        <tr key={rij.key}>
                          <th scope="row">{rij.label}</th>
                          <td className={v.tarieven?.laagSeizoen?.[rij.key] ? undefined : "leeg"}>{bedrag(v.tarieven?.laagSeizoen?.[rij.key], localeCode)}</td>
                          <td className={v.tarieven?.middenSeizoen?.[rij.key] ? undefined : "leeg"}>{bedrag(v.tarieven?.middenSeizoen?.[rij.key], localeCode)}</td>
                          <td className={v.tarieven?.hoogSeizoen?.[rij.key] ? undefined : "leeg"}>{bedrag(v.tarieven?.hoogSeizoen?.[rij.key], localeCode)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul style={{ marginTop: "var(--sp-5)", display: "grid", gap: "0.375rem", fontSize: "var(--fs-mini)", color: "var(--text-muted)" }}>
                  <li>{d.seizoenLaagUitleg}</li>
                  <li>{d.seizoenMiddenUitleg}</li>
                  <li>{d.seizoenHoogUitleg}</li>
                </ul>
                <p className="notitie notitie-goud" style={{ marginTop: "var(--sp-4)" }}>
                  {d.wasNotitie}
                </p>
              </section>
            )}

            <div className="raster raster-2" style={{ marginTop: "var(--sp-5)" }}>
              <div className="kaart kaart-ruim">
                <h2 style={{ fontSize: "1.125rem" }}>{d.inbegrepenTitel}</h2>
                <div style={{ marginTop: "var(--sp-4)" }}>
                  <ul className="vinklijst">
                    <li><VinkIcoon />{d.inbegrepenOmnium}</li>
                    <li><VinkIcoon />{d.inbegrepenPech}</li>
                    <li><VinkIcoon />{d.inbegrepenGas}</li>
                    <li><VinkIcoon />{d.inbegrepenInstructie}</li>
                  </ul>
                </div>
              </div>
              <div className="kaart kaart-ruim">
                <h2 style={{ fontSize: "1.125rem" }}>{d.voorwaardenTitel}</h2>
                <dl className="spec-raster" style={{ gridTemplateColumns: "1fr" }}>
                  <div><dt>{d.waarborg}</dt><dd>{d.waarborgWaarde}</dd></div>
                  <div><dt>{d.kilometers}</dt><dd>{d.kilometersWaarde}</dd></div>
                  <div><dt>{d.bestuurder}</dt><dd>{d.bestuurderWaarde}</dd></div>
                  <div><dt>{d.inleveren}</dt><dd>{d.inleverenWaarde}</dd></div>
                  <div><dt>{d.huisdieren}</dt><dd>{d.huisdierenWaarde}</dd></div>
                </dl>
              </div>
            </div>

            {(v.dagindeling || v.nachtindeling) && (
              <section className="detail-blok">
                <h2>{d.indeling}</h2>
                <div className="raster raster-2" style={{ marginTop: "var(--sp-4)" }}>
                  {v.dagindeling && (
                    <div>
                      <KlikbareFoto
                        src={urlFor(v.dagindeling).width(700).height(525).fit("crop").url()}
                        groteSrc={urlForVolledig(v.dagindeling).width(1800).height(1350).fit("max").url()}
                        alt={v.dagindeling.alt ?? d.dagindeling}
                        locale={locale}
                      />
                      <p className="onder" style={{ marginTop: "0.5rem" }}>{d.dagindeling}</p>
                    </div>
                  )}
                  {v.nachtindeling && (
                    <div>
                      <KlikbareFoto
                        src={urlFor(v.nachtindeling).width(700).height(525).fit("crop").url()}
                        groteSrc={urlForVolledig(v.nachtindeling).width(1800).height(1350).fit("max").url()}
                        alt={v.nachtindeling.alt ?? d.nachtindeling}
                        locale={locale}
                      />
                      <p className="onder" style={{ marginTop: "0.5rem" }}>{d.nachtindeling}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            <Uitrusting chassisEnCabine={v.chassisEnCabine} woongedeelte={v.woongedeelte} extras={v.extras} dict={dict} />

            {v.mindervalideGeschikt && (
              <section className="detail-blok">
                <h2>{d.mindervalidenTitel}</h2>
                {v.mindervalideAanpassingen && v.mindervalideAanpassingen.length > 0 ? (
                  <ul className="vinklijst" style={{ marginTop: "var(--sp-4)" }}>
                    {v.mindervalideAanpassingen.map((aanpassing) => (
                      <li key={aanpassing}>
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                        {aanpassing}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="onder" style={{ marginTop: "var(--sp-3)" }}>{d.mindervalidenFallback}</p>
                )}
              </section>
            )}

            {v.notitie && <p className="notitie notitie-stil" style={{ marginTop: "var(--sp-5)" }}>{v.notitie}</p>}
          </div>

          <aside className="zijkolom">
            <div className="kaart prijskaart">
              <p className="label label-stil">{d.vanaf}</p>
              <p className="bedrag">{vanaf ? `€ ${vanaf.toLocaleString(localeCode)}` : d.opAanvraag}</p>
              <p className="btw">{vanaf ? d.vanafWaarde : d.contacteerTarieven}</p>
              <div className="knoppen">
                <a className="btn btn-goud" href="tel:+32471407949">{d.bel}</a>
                <a className="btn btn-stil" href={`https://wa.me/32471407949?text=${waTekst}`}>{d.vraagWhatsapp}</a>
              </div>
            </div>

            <Formulier titel={d.formTitel} intro={d.formIntroHuur} submitLabel={d.formSubmit} locale={locale}>
              <input type="hidden" name="camper" value={v.titel} />
              <div className="veld"><label htmlFor="huur-voornaam">{d.voornaam}</label><input id="huur-voornaam" name="voornaam" type="text" required /></div>
              <div className="veld"><label htmlFor="huur-achternaam">{d.achternaam}</label><input id="huur-achternaam" name="achternaam" type="text" required /></div>
              <div className="veld"><label htmlFor="huur-email">{d.email}</label><input id="huur-email" name="email" type="email" required /></div>
              <div className="veld"><label htmlFor="huur-telefoon">{d.telefoon}</label><input id="huur-telefoon" name="telefoon" type="tel" /></div>
              <div className="veld veld-breed">
                <label>{d.gewensePeriode}</label>
                <div className="periode-raster">
                  <div className="veld">
                    <label htmlFor="huur-periode-start">{d.periodeStart}</label>
                    <input id="huur-periode-start" name="periode_start" type="date" />
                  </div>
                  <div className="veld">
                    <label htmlFor="huur-periode-eind">{d.periodeEind}</label>
                    <input id="huur-periode-eind" name="periode_eind" type="date" />
                  </div>
                </div>
              </div>
              <div className="veld veld-breed">
                <label htmlFor="huur-bericht">{d.bericht}</label>
                <textarea id="huur-bericht" name="bericht" rows={4} defaultValue={dict.voertuig.huurBericht(v.titel)} />
              </div>
            </Formulier>
          </aside>
        </div>
      </div>
    </main>
  );
}

function VinkIcoon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
  );
}
