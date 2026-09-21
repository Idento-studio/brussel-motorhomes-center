"use client";

import { useState } from "react";

export type AccordeonVraag = { vraag: string; antwoord: string };

/**
 * Eenvoudige, niet-getabde accordeon (poort van de statische accordeon +
 * site.js-toggle) voor infopagina's met een enkele FAQ-lijst, zoals
 * onderhoud en accessoires-en-opties. Voor de getabde FAQ-pagina, zie
 * FaqAccordion.
 */
export function Accordeon({ idPrefix, vragen }: { idPrefix: string; vragen: AccordeonVraag[] }) {
  const [opengeklapt, setOpengeklapt] = useState<string | null>(null);

  return (
    <div className="accordeon">
      {vragen.map((item, i) => {
        const antwoordId = `${idPrefix}-${i}`;
        const open = opengeklapt === antwoordId;
        return (
          <div key={antwoordId}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={antwoordId}
                onClick={() => setOpengeklapt(open ? null : antwoordId)}
              >
                {item.vraag}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
              </button>
            </h3>
            <p className="antwoord" id={antwoordId} hidden={!open}>{item.antwoord}</p>
          </div>
        );
      })}
    </div>
  );
}
