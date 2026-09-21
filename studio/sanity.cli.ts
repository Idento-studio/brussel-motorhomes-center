import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'th815q8m',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    // Vastgelegd zodat een volgende "sanity deploy" niet opnieuw naar de
    // hostname vraagt — al gekoppeld aan https://brussel-motorhomes-center.sanity.studio/
    appId: 'v6td6642n1itjdkvgzr9sgm8',
  },
  typegen: {
    enabled: true,
    path: '../web/src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
    overloadClientMethods: true,
  },
})
