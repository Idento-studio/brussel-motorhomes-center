import type { Metadata } from "next";
import { locales, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ActionBar } from "@/components/ActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CookieConsent } from "@/components/CookieConsent";
import { SetHtmlLang } from "@/components/SetHtmlLang";
import { JsonLd } from "@/components/JsonLd";
import { buildLocalBusiness } from "@/lib/structuredData";
import { BASE_PATH } from "@/lib/basePath";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description =
    locale === "fr"
      ? "Camping-cars à vendre et à louer chez Brussel Motorhomes Center."
      : locale === "en"
      ? "Motorhomes for sale and for rent at Brussel Motorhomes Center."
      : "Motorhomes te koop en te huur bij Brussel Motorhomes Center.";
  // Vangnet-metadata: elke pagina onder [locale] geeft zelf al title/
  // description/openGraph terug (via buildOpenGraph in @/lib/i18n), dit is
  // enkel wat een pagina zonder eigen generateMetadata zou tonen.
  return {
    title: {
      default: "Brussel Motorhomes Center",
      template: "%s | Brussel Motorhomes Center",
    },
    description,
    // BASE_PATH staat enkel tijdens de GitHub Pages-previewbuild: die mag
    // nooit naast het echte domein in Google terechtkomen. robots.ts
    // blokkeert daar ook al het crawlen zelf, maar een meta-noindex is het
    // betrouwbaardere signaal tegen indexering van al bekende URL's.
    ...(BASE_PATH ? { robots: { index: false, follow: false } } : {}),
    ...buildOpenGraph({ locale, title: "Brussel Motorhomes Center", description, pad: "/" }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <SetHtmlLang locale={locale} />
      <JsonLd data={buildLocalBusiness(locale)} />
      <a className="skip-link" href="#inhoud">{locale === "fr" ? "Aller au contenu" : locale === "en" ? "Skip to content" : "Ga naar inhoud"}</a>
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} dict={dict} />
      <ActionBar locale={locale} dict={dict.actionBar} />
      <FloatingWhatsApp locale={locale} />
      <CookieConsent locale={locale} />
    </>
  );
}
