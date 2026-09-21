import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2026-09-21", // Bijgehouden datum, niet automatisch aan te passen
  // De site wordt volledig statisch geëxporteerd (output: 'export') en enkel op
  // build-time herbouwd via een Sanity-webhook. Elke build moet dus de meest
  // recente content lezen i.p.v. een CDN-cache die net-gepubliceerde
  // wijzigingen nog niet heeft — vandaar useCdn: false, in afwijking van het
  // gebruikelijke advies voor apps met een runtime-server.
  useCdn: false,
});
