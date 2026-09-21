"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { L, type Locale } from "@/lib/i18n";
import { metPad } from "@/lib/basePath";
import { getDictionary } from "@/dictionaries";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function SiteHeader({ locale, actiefPad }: { locale: Locale; actiefPad?: string }) {
  const dict = getDictionary(locale);
  const [vast, setVast] = useState(false);
  const [mobielOpen, setMobielOpen] = useState(false);
  const navKnopRef = useRef<HTMLButtonElement>(null);
  const mobieleNavRef = useRef<HTMLElement>(null);

  const NAV_LINKS = [
    { href: L(locale, "/verkoop/"), label: dict.nav.teKoop },
    { href: L(locale, "/verhuur/"), label: dict.nav.teHuur },
    { href: L(locale, "/onderhoud/"), label: dict.nav.onderhoud },
    { href: L(locale, "/accessoires-en-opties/"), label: dict.nav.accessoires },
    { href: L(locale, "/andersvaliden/"), label: dict.nav.andersvaliden },
    { href: L(locale, "/camper-op-maat/"), label: dict.nav.camperOpMaat },
    { href: L(locale, "/verkoop-je-camper/"), label: dict.nav.verkoopJeCamper },
  ];

  useEffect(() => {
    let wachtend = false;
    const meet = () => {
      wachtend = false;
      const y = window.scrollY;
      setVast((huidig) => (huidig ? y > 60 : y > 140));
    };
    const onScroll = () => {
      if (!wachtend) {
        wachtend = true;
        window.requestAnimationFrame(meet);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    meet();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sluit met Escape, blokkeer de paginascroll erachter zolang het mobiele
  // menu open staat (anders lijkt het net of het menu "kapot" is: de lijst
  // met 7 hoofdlinks + over ons/FAQ + taalwissel + contactknop is langer dan
  // veel telefoonschermen, en zonder scroll-lock scrollt de pagina eronder
  // mee weg i.p.v. het menu zelf) en verplaats de focus naar de eerste link
  // bij het openen, terug naar de knop bij het sluiten.
  useEffect(() => {
    if (!mobielOpen) return;
    const vorigeOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const eersteLink = mobieleNavRef.current?.querySelector("a");
    (eersteLink as HTMLElement | null)?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobielOpen(false);
        navKnopRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = vorigeOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobielOpen]);

  return (
    <header className={`site-header${vast ? " is-vast" : ""}`}>
      <div className="service-balk">
        <div className="wrap">
          <a className="service-balk-tel" href="tel:+32471407949">+32 471 40 79 49</a>
          <span className="service-balk-scheiding" aria-hidden="true">&middot;</span>
          <span className="service-balk-uren">
            {dict.header.urenTijden}
            <span className="service-balk-scheiding" aria-hidden="true">&middot;</span>
            {dict.header.urenAfspraak}
          </span>
          <nav className="service-nav" aria-label="Secundaire navigatie">
            <Link href={L(locale, "/over-ons/")}>{dict.nav.overOns}</Link>
            <Link href={L(locale, "/veelgestelde-vragen/")}>{dict.nav.veelgesteldeVragen}</Link>
            <span className="service-balk-scheiding" aria-hidden="true">&middot;</span>
            <a href="mailto:bmcbrussel@outlook.com">bmcbrussel@outlook.com</a>
            <span className="service-balk-scheiding" aria-hidden="true">&middot;</span>
            <LanguageSwitcher locale={locale} dict={dict} />
          </nav>
        </div>
      </div>

      <div className="header-balk">
        <div className="wrap">
          <Link className="merk" href={L(locale, "/")} aria-label={dict.header.logoAria}>
            <img src={metPad("/assets/img/logo/bmc-logo.svg")} alt="Brussel Motorhomes Center" width="323" height="100" onError={(e) => e.currentTarget.remove()} />
            <span className="merk-tekst">Brussel<span>Motorhomes Center</span></span>
          </Link>

          <nav className="hoofdnav" aria-label="Hoofdnavigatie">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} aria-current={actiefPad === link.href ? "page" : undefined}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link className="btn btn-goud btn-klein header-cta" href={L(locale, "/contact/")}>{dict.nav.contact}</Link>

          <button
            ref={navKnopRef}
            className="nav-knop"
            type="button"
            aria-expanded={mobielOpen}
            aria-controls="mobiele-nav"
            aria-label={mobielOpen ? dict.header.menuSluit : dict.header.menuOpen}
            onClick={() => setMobielOpen((open) => !open)}
          >
            <svg className="icoon-open" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            <svg className="icoon-sluit" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
      </div>

      <nav
        ref={mobieleNavRef}
        className={`mobiele-nav${mobielOpen ? " is-open" : ""}`}
        id="mobiele-nav"
        aria-label="Mobiele navigatie"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setMobielOpen(false);
        }}
      >
        <div className="mobiele-nav-inhoud wrap">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
          <div className="mobiele-nav-scheiding" aria-hidden="true" />
          <Link href={L(locale, "/over-ons/")}>{dict.nav.overOns}</Link>
          <Link href={L(locale, "/veelgestelde-vragen/")}>{dict.nav.veelgesteldeVragen}</Link>
          <LanguageSwitcher locale={locale} dict={dict} />
          <Link className="btn btn-goud" href={L(locale, "/contact/")}>{dict.nav.contact}</Link>
        </div>
      </nav>
    </header>
  );
}
