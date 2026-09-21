import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/lib/i18n";

/**
 * Blijvend zichtbare WhatsApp-knop linksonder, op elke pagina en elke
 * schermgrootte. Op mobiel (< 768px) staat de vaste actiebalk (ActionBar.tsx)
 * al onderaan met een eigen WhatsApp-optie — deze knop komt daarboven te
 * staan (zie .whatsapp-zwevend in components.css) zodat ze niet overlappen.
 */
export function FloatingWhatsApp({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const waTekst = encodeURIComponent(
    locale === "fr"
      ? "Bonjour, j'ai une question."
      : locale === "en"
      ? "Hello, I have a question."
      : "Hallo, ik heb een vraag.",
  );

  return (
    <a
      className="whatsapp-zwevend"
      href={`https://wa.me/32471407949?text=${waTekst}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.actionBar.whatsapp}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.5 3.5a12 12 0 0 1 17 17 12 12 0 0 1-13.7 2.3l-5.8.7a.4.4 0 0 1-.5-.4l.8-5.8A12 12 0 0 1 3.5 3.5zm3.6 17 .3.2a9.9 9.9 0 0 0 11.5-1.8 9.8 9.8 0 1 0-15.6-2.4l.1.3-.5 3.9a.2.2 0 0 0 .2.2zm6.6-7-1 1.2a9.8 9.8 0 0 1-3.5-3.5l1.2-1a.8.8 0 0 0 .2-.9L9.6 7a.8.8 0 0 0-.9-.5l-2 .6a.8.8 0 0 0-.6.9 11.8 11.8 0 0 0 10 10 .8.8 0 0 0 .9-.6l.5-2a.8.8 0 0 0-.4-.9l-2.5-1.1a.8.8 0 0 0-.9.2z" /></svg>
    </a>
  );
}
