import type { Dictionary } from "@/dictionaries";

function regelsNaarLijst(tekst?: string): string[] {
  return (tekst ?? "")
    .split("\n")
    .map((regel) => regel.trim())
    .filter(Boolean);
}

const VINK = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
);

function Kolom({ label, tekst }: { label: string; tekst?: string }) {
  const items = regelsNaarLijst(tekst);
  if (items.length === 0) return null;
  return (
    <div>
      <p className="label">{label}</p>
      <ul className="vinklijst" style={{ marginTop: "var(--sp-3)" }}>
        {items.map((item) => (
          <li key={item}>
            {VINK}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Uitrusting({
  chassisEnCabine,
  woongedeelte,
  extras,
  dict,
}: {
  chassisEnCabine?: string;
  woongedeelte?: string;
  extras?: string;
  dict: Dictionary;
}) {
  if (!chassisEnCabine && !woongedeelte && !extras) return null;
  const d = dict.voertuig.detail;

  return (
    <section className="detail-blok">
      <h2>{d.uitrustingTitel}</h2>
      <div className="uitrusting">
        <Kolom label={d.chassisEnCabine} tekst={chassisEnCabine} />
        <Kolom label={d.woongedeelte} tekst={woongedeelte} />
        <Kolom label={d.extras} tekst={extras} />
      </div>
    </section>
  );
}
