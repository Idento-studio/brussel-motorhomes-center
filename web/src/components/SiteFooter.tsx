import Link from "next/link";
import { L, type Locale } from "@/lib/i18n";
import { metPad } from "@/lib/basePath";
import type { Dictionary } from "@/dictionaries";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const jaar = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-raster">
          <div className="footer-merk">
            <img className="footer-logo" src={metPad("/assets/img/logo/bmc-logo-white.svg")} alt="Brussel Motorhomes Center" width="323" height="100" />
            <p>{dict.footer.tagline}</p>
          </div>
          <div>
            <h2>{dict.footer.contactTitel}</h2>
            <p className="regel">Rue de l&rsquo;Alliance 103<br />1480 Clabecq</p>
            <p className="regel"><a href="tel:+32471407949">+32 471 40 79 49</a></p>
            <p className="regel"><a href="mailto:bmcbrussel@outlook.com">bmcbrussel@outlook.com</a></p>
          </div>
          <div>
            <h2>{dict.footer.snelleLinks}</h2>
            <ul>
              <li><Link href={L(locale, "/verkoop/")}>{dict.footer.verkoop}</Link></li>
              <li><Link href={L(locale, "/verhuur/")}>{dict.footer.verhuur}</Link></li>
              <li><Link href={L(locale, "/onderhoud/")}>{dict.footer.onderhoud}</Link></li>
              <li><Link href={L(locale, "/over-ons/")}>{dict.footer.overOns}</Link></li>
            </ul>
          </div>
          <div>
            <h2>{dict.footer.openingsurenTitel}</h2>
            <p className="regel">{dict.footer.openingsurenRegel1}</p>
            <p className="regel">{dict.footer.openingsurenRegel2}</p>
          </div>
        </div>
        <div className="footer-slot">
          <p>
            &copy; {jaar} Brussel Motorhomes Center
            <span className="tekst-scheiding" aria-hidden="true">&middot;</span>
            <a href="https://idento.be/" target="_blank" rel="noopener noreferrer">{dict.footer.webdesign}</a>
          </p>
          <p>
            <Link href={L(locale, "/privacy/")}>{dict.footer.privacybeleid}</Link>
            <span className="tekst-scheiding" aria-hidden="true">&middot;</span>
            <a href="#" data-cookie-settings>{dict.footer.cookieInstellingen}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
