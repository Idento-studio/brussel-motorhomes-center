import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { haalVerkoopVoertuig, haalVerkoopVoertuigen } from "@/sanity/queries";
import { Gallery } from "@/components/Gallery";
import { Uitrusting } from "@/components/Uitrusting";
import { Formulier } from "@/components/Formulier";
import { KlikbareFoto } from "@/components/KlikbareFoto";
import { urlFor, urlForVolledig } from "@/sanity/image";
import { L, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { opbouwtypeLabel, brandstofLabel, transmissieLabel, staatLabel, rijbewijsLabel } from "@/lib/voertuigLabels";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList } from "@/lib/structuredData";

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const voertuigen = await haalVerkoopVoertuigen(params.locale as Locale);
  return voertuigen.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const voertuig = await haalVerkoopVoertuig(slug, locale);
  if (!voertuig) return {};
  const beschrijving =
    locale === "fr"
      ? `${voertuig.titel}, ${staatLabel(voertuig.staat, locale).toLowerCase()}, ${voertuig.bouwjaar}, ${voertuig.kilometerstand.toLocaleString("fr-BE")} km. À vendre chez Brussel Motorhomes Center.`
      : locale === "en"
      ? `${voertuig.titel}, ${staatLabel(voertuig.staat, locale).toLowerCase()}, ${voertuig.bouwjaar}, ${voertuig.kilometerstand.toLocaleString("en-GB")} km. For sale at Brussel Motorhomes Center.`
      : `${voertuig.titel}, ${voertuig.staat.toLowerCase()}, ${voertuig.bouwjaar}, ${voertuig.kilometerstand.toLocaleString("nl-BE")} km. Te koop bij Brussel Motorhomes Center.`;
  const kaartfoto = urlFor(voertuig.coverFoto).width(1200).height(630).fit("crop").url();
  return {
    title: voertuig.titel,
    description: beschrijving,
    alternates: buildAlternates(`/verkoop/${slug}/`),
    ...buildOpenGraph({
      locale,
      title: voertuig.titel,
      description: beschrijving,
      pad: `/verkoop/${slug}/`,
      afbeelding: { url: kaartfoto, width: 1200, height: 630, alt: voertuig.coverFoto.alt ?? voertuig.titel },
    }),
  };
}

export default async function VerkoopDetailPagina({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug, locale } = await params;
  const dict = getDictionary(locale);
  const d = dict.voertuig.detail;
  const v = await haalVerkoopVoertuig(slug, locale);
  if (!v) notFound();

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: v.titel,
    brand: { "@type": "Brand", name: v.merk },
    model: v.titel,
    vehicleModelDate: String(v.bouwjaar),
    fuelType: v.brandstof,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: String(v.kilometerstand), unitCode: "KMT" },
    offers: {
      "@type": "Offer",
      price: v.promoPrijs ?? v.prijs,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      itemCondition: v.staat === "Nieuw" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
    },
  };

  const localeCode = locale === "fr" ? "fr-BE" : locale === "en" ? "en-GB" : "nl-BE";
  const waTekst = encodeURIComponent(dict.voertuig.interesseBericht(v.titel));

  return (
    <main id="inhoud" className="detail">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.voertuig.kruimelTeKoop, pad: "/verkoop/" }, { label: v.titel }])} />

      <div className="detail-kruimel">
        <div className="wrap">
          <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
          <span className="scheiding" aria-hidden="true">/</span>
          <Link href={L(locale, "/verkoop/")}>{dict.voertuig.kruimelTeKoop}</Link>
          <span className="scheiding" aria-hidden="true">/</span>
          <span aria-current="page">{v.titel}</span>
        </div>
      </div>

      <div className="wrap">
        <Link className="terugknop" href={L(locale, "/verkoop/")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          {d.terugAanbod}
        </Link>

        <div className="detail-raster">
          <div>
            <Gallery fotos={v.fotos} titel={v.titel} badge={staatLabel(v.staat, locale)} locale={locale} />

            <header className="detail-titel">
              <div className="pil-rij">
                <span className="badge badge-blauw">{opbouwtypeLabel(v.opbouwtype, locale)}</span>
                <span className="badge badge-stil">{staatLabel(v.staat, locale)}</span>
                {v.promoTekst && <span className="badge badge-nieuw">{dict.voertuig.promo}: {v.promoTekst}</span>}
              </div>
              <h1>{v.titel}</h1>
            </header>

            <section className="detail-blok">
              <h2>{d.specificaties}</h2>
              <dl className="spec-raster">
                <div><dt>{d.opbouwtype}</dt><dd>{opbouwtypeLabel(v.opbouwtype, locale)}</dd></div>
                <div><dt>{d.staat}</dt><dd>{staatLabel(v.staat, locale)}</dd></div>
                {v.indeling && <div><dt>{d.indeling}</dt><dd>{v.indeling}</dd></div>}
                <div><dt>{dict.voertuig.zitSlaap}</dt><dd>{v.zitplaatsen} / {v.slaapplaatsen}</dd></div>
                {v.onderstel && <div><dt>{d.onderstel}</dt><dd>{v.onderstel}</dd></div>}
                {v.motor && <div><dt>{dict.voertuig.motor}</dt><dd>{v.motor}</dd></div>}
                {v.brandstof && <div><dt>{d.brandstof}</dt><dd>{brandstofLabel(v.brandstof, locale)}</dd></div>}
                {v.transmissie && <div><dt>{d.transmissie}</dt><dd>{transmissieLabel(v.transmissie, locale)}</dd></div>}
                {v.rijbewijs && <div><dt>{d.rijbewijs}</dt><dd>{rijbewijsLabel(v.rijbewijs, locale)}</dd></div>}
                {v.eersteInschrijving && <div><dt>{d.eersteInschrijving}</dt><dd>{v.eersteInschrijving}</dd></div>}
                <div><dt>{dict.voertuig.bouwjaar}</dt><dd>{v.bouwjaar}</dd></div>
                <div><dt>{dict.voertuig.kilometerstand}</dt><dd>{v.kilometerstand.toLocaleString(localeCode)} km</dd></div>
                {(v.leeggewicht || v.mtm) && (
                  <div><dt>{d.gewicht}</dt><dd>{v.leeggewicht ? `${v.leeggewicht.toLocaleString(localeCode)} kg` : "–"} / {v.mtm ? `${v.mtm.toLocaleString(localeCode)} kg` : "–"}</dd></div>
                )}
                {v.garantie && <div><dt>{d.garantie}</dt><dd>{v.garantie}</dd></div>}
              </dl>
            </section>

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

            <Uitrusting chassisEnCabine={v.chassisEnCabine} woongedeelte={v.woongedeelte} extras={v.extras} dict={dict} />

            <p className="notitie-leeg" style={{ marginTop: "var(--sp-6)" }}>
              {d.uitrustingVraag}
            </p>
          </div>

          <aside className="zijkolom">
            <div className="kaart prijskaart">
              <p className="label label-stil">{v.promoPrijs ? d.promoprijsLabel : d.prijsLabel}</p>
              {v.promoPrijs ? (
                <>
                  <p className="bedrag" style={{ display: "flex", alignItems: "baseline", gap: "0.625rem" }}>
                    <span style={{ textDecoration: "line-through", opacity: 0.5, fontSize: "1.25rem" }}>€ {v.prijs.toLocaleString(localeCode)}</span>
                    € {v.promoPrijs.toLocaleString(localeCode)}
                  </p>
                  {v.promoTekst && <p className="btw" style={{ color: "var(--accent-ink)", fontWeight: 600 }}>{v.promoTekst}</p>}
                </>
              ) : (
                <p className="bedrag">€ {v.prijs.toLocaleString(localeCode)}</p>
              )}
              <p className="btw">{d.inclBtw}</p>

              <div className="knoppen">
                <a className="btn btn-goud" href="tel:+32471407949">{d.bel}</a>
                <a className="btn btn-stil" href={`https://wa.me/32471407949?text=${waTekst}`}>{d.vraagWhatsapp}</a>
              </div>
            </div>

            <Formulier titel={d.formTitel} intro={d.formIntroKoop} submitLabel={d.formSubmit} locale={locale}>
              <input type="hidden" name="camper" value={v.titel} />
              <div className="veld"><label htmlFor="aanvraag-voornaam">{d.voornaam}</label><input id="aanvraag-voornaam" name="voornaam" type="text" required /></div>
              <div className="veld"><label htmlFor="aanvraag-achternaam">{d.achternaam}</label><input id="aanvraag-achternaam" name="achternaam" type="text" required /></div>
              <div className="veld"><label htmlFor="aanvraag-email">{d.email}</label><input id="aanvraag-email" name="email" type="email" required /></div>
              <div className="veld"><label htmlFor="aanvraag-telefoon">{d.telefoon}</label><input id="aanvraag-telefoon" name="telefoon" type="tel" /></div>
              <div className="veld veld-breed">
                <label htmlFor="aanvraag-bericht">{d.bericht}</label>
                <textarea id="aanvraag-bericht" name="bericht" rows={4} defaultValue={dict.voertuig.interesseBericht(v.titel)} />
              </div>
            </Formulier>
          </aside>
        </div>
      </div>
    </main>
  );
}
