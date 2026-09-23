/**
 * Eenmalig script: maakt een Sanity-webhook aan die bij elke publicatie
 * (create/update/delete van een document) de Vercel Deploy Hook aanroept,
 * zodat een contentwijziging in Sanity Studio — zonder git push — ook een
 * rebuild triggert. sanity CLI's "hooks create" is enkel interactief, dus
 * dit gaat rechtstreeks via de management API met het CLI-token.
 *
 * BELANGRIJK — `rule` is verplicht: de eerste versie van dit script liet
 * `rule` weg, en de webhook werd dan wel aangemaakt (201, zichtbaar in
 * "sanity hooks list") maar vuurde nooit af — geen enkele "attempt" in
 * "sanity hooks logs", ook niet na echte documentwijzigingen. GET op de
 * hook (via apiVersion v2024-01-01 — v2021-06-07 geeft op die route zelfs
 * een foutmelding) toonde `"rule": null`. Blijkbaar bepaalt `rule` (een
 * object, geen GROQ-string — zie ook sanity.blueprint.ts se `event`-veld
 * voor exact hetzelfde patroon) of en wanneer een "document"-webhook
 * afgaat; zonder rule matcht hij dus niets. `rule: {on: [...], filter:
 * "true"}` hieronder lost dat op. Bevestigd met een echte testwijziging:
 * nadien wél een geslaagde "attempt" (resultCode 201) in de logs.
 *
 * De Deploy Hook-URL van Vercel is een bearer-achtige credential (wie hem
 * heeft, kan een rebuild triggeren) en staat daarom bewust niet hardcoded
 * hier — geef hem mee via een env var, nooit in git committen.
 *
 * Draai met:
 *   VERCEL_DEPLOY_HOOK_URL="https://api.vercel.com/v1/integrations/deploy/..." \
 *     npx sanity exec scripts/maak-vercel-deploy-webhook.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2021-06-07'})
const config = client.config()

const VERCEL_DEPLOY_HOOK_URL = process.env.VERCEL_DEPLOY_HOOK_URL

async function main() {
  if (!VERCEL_DEPLOY_HOOK_URL) {
    throw new Error('Zet VERCEL_DEPLOY_HOOK_URL als env var voor je dit script draait.')
  }
  const token = config.token
  if (!token) throw new Error('Geen token gevonden op de CLI-client — draai met --with-user-token.')

  // v2024-01-01 i.p.v. v2021-06-07: op die oudere versie faalt zelfs een
  // GET van een "document"-hook nadien met "not supported in this API
  // version" — de POST zelf lukt met beide, maar dit is consistenter.
  const res = await fetch(`https://api.sanity.io/v2024-01-01/hooks/projects/${config.projectId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'document',
      name: 'Vercel rebuild bij publicatie',
      dataset: config.dataset,
      url: VERCEL_DEPLOY_HOOK_URL,
      httpMethod: 'POST',
      apiVersion: 'v2021-06-07',
      includeDrafts: false,
      rule: {
        on: ['create', 'update', 'delete'],
        filter: 'true',
      },
    }),
  })

  const body = await res.json()
  if (!res.ok) {
    console.error('Mislukt:', res.status, JSON.stringify(body, null, 2))
    process.exit(1)
  }
  console.log('Webhook aangemaakt:', JSON.stringify(body, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
