import type { Metadata } from "next";

const SANITY_STUDIO_URL = "https://brussel-motorhomes-center.sanity.studio/";

// Onthoudbare snelkoppeling voor de klant (i.p.v. de volledige
// .sanity.studio-URL te moeten onthouden/bookmarken). Statische export kent
// geen server/edge, dus een "echte" HTTP-redirect kan hier niet vanuit
// Next.js zelf komen — vandaar dezelfde aanpak als de taalwissel-redirect op
// "/" (src/app/page.tsx): een JS-redirect die meteen bij het laden vuurt,
// met een noscript-link als vangnet. Op de uiteindelijke Vercel-host komt
// daar bovenop nog een echte edge-redirect (zie vercel.json) die dit al
// afvangt vóór deze pagina ooit geserveerd wordt.
export const metadata: Metadata = {
  title: "Sanity Studio",
  robots: { index: false, follow: false },
};

export default function StudioRedirect() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.location.replace(${JSON.stringify(SANITY_STUDIO_URL)});`,
        }}
      />
      <noscript>
        <a href={SANITY_STUDIO_URL}>Ga naar Sanity Studio</a>
      </noscript>
    </>
  );
}
