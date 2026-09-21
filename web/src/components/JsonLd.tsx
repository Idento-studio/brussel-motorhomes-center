/**
 * Kleine herbruikbare renderer voor JSON-LD structured data (schema.org).
 * `data` mag een los object zijn of een array (Next/Google aanvaarden beide
 * — een array wordt als meerdere afzonderlijke schema's gelezen).
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
