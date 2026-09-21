"use client";

import { useState } from "react";

export type FaqGroep = {
  id: string;
  label: string;
  vragen: { vraag: string; antwoord: string }[];
};

export function FaqAccordion({
  groepen,
  categorieenLabel = "Categorieën",
}: {
  groepen: FaqGroep[];
  /** Label voor de aria-label van de categorie-tabs; geef de FR-vertaling mee vanuit de pagina. */
  categorieenLabel?: string;
}) {
  const [actieveGroep, setActieveGroep] = useState(groepen[0]?.id);
  const [opengeklapt, setOpengeklapt] = useState<string | null>(null);

  return (
    <>
      <div className="tabs faq-tabs" role="tablist" aria-label={categorieenLabel}>
        {groepen.map((groep) => (
          <button
            key={groep.id}
            type="button"
            className="tab"
            role="tab"
            id={`tab-${groep.id}`}
            aria-controls={`groep-${groep.id}`}
            aria-selected={actieveGroep === groep.id}
            onClick={() => setActieveGroep(groep.id)}
          >
            {groep.label} <span className="aantal">({groep.vragen.length})</span>
          </button>
        ))}
      </div>

      {groepen.map((groep) => (
        <div
          key={groep.id}
          className="faq-groep"
          id={`groep-${groep.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${groep.id}`}
          hidden={actieveGroep !== groep.id}
        >
          <div className="accordeon">
            {groep.vragen.map((item, i) => {
              const antwoordId = `${groep.id}-${i}`;
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
        </div>
      ))}
    </>
  );
}
