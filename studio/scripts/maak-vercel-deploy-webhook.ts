/**
 * Eenmalig script: maakt een Sanity-webhook aan die bij elke publicatie
 * (create/update/delete van een document) de Vercel Deploy Hook aanroept,
 * zodat een contentwijziging in Sanity Studio — zonder git push — ook een
 * rebuild triggert. sanity CLI's "hooks create" is enkel interactief, dus
 * dit gaat rechtstreeks via de management API met het CLI-token.
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

  const res = await fetch(`https://api.sanity.io/v2021-06-07/hooks/projects/${config.projectId}`, {
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
