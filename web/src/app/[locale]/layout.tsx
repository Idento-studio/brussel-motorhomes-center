import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ActionBar } from "@/components/ActionBar";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { SetHtmlLang } from "@/components/SetHtmlLang";

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
      ? "Motorhomes à vendre et à louer chez Brussel Motorhomes Center."
      : locale === "en"
      ? "Motorhomes for sale and for rent at Brussel Motorhomes Center."
      : "Motorhomes te koop en te huur bij Brussel Motorhomes Center.";
  const ogLocale = locale === "fr" ? "fr_BE" : locale === "en" ? "en_US" : "nl_BE";

  // Standaard OG/Twitter-afbeelding voor alle pagina's. Enkel de detailpagina's
  // van een camper (verkoop/[slug] en verhuur/[slug]) zetten hier zelf een
  // eigen openGraph-object overheen (met de kaartfoto uit Sanity) — Next.js
  // vervangt het volledige openGraph-object van de parent zodra een pagina
  // er zelf een opgeeft, dus die twee routes moeten expliciet hun eigen
  // afbeelding meegeven i.p.v. deze standaard.
  return {
    title: {
      default: "Brussel Motorhomes Center",
      template: "%s | Brussel Motorhomes Center",
    },
    description,
    openGraph: {
      type: "website",
      siteName: "Brussel Motorhomes Center",
      locale: ogLocale,
      title: "Brussel Motorhomes Center",
      description,
      images: [{ url: "/assets/img/og/bmc-featured.png", width: 1200, height: 630, alt: "Brussel Motorhomes Center" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Brussel Motorhomes Center",
      description,
      images: ["/assets/img/og/bmc-featured.png"],
    },
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
      <a className="skip-link" href="#inhoud">{locale === "fr" ? "Aller au contenu" : locale === "en" ? "Skip to content" : "Ga naar inhoud"}</a>
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} dict={dict} />
      <ActionBar locale={locale} dict={dict} />
      <FloatingWhatsApp locale={locale} />
    </>
  );
}
