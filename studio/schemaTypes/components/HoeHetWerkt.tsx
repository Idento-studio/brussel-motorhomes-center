import {Badge, Box, Card, Container, Flex, Heading, Text} from '@sanity/ui'
import type {ReactNode} from 'react'

/**
 * Statische handleiding, rechtstreeks in de Studio (geen los document dat
 * kwijtgeraakt of vergeten kan worden). De inhoud verwijst bewust naar de
 * exacte veldnamen/tabs uit verhuurVoertuig.ts en verkoopVoertuig.ts, zodat
 * ze niet uit sync kan raken met wat de klant écht op zijn scherm ziet.
 *
 * Bewust géén @sanity/ui "Stack"/"Inline": hun "space"-prop geeft met de
 * TypeScript-instellingen van dit project (tsconfig.json) een verwarrende
 * "number is not assignable to undefined"-fout — een generic-inferentieprobleem
 * van die twee componenten specifiek (Box/Flex/Card/Heading/Text zijn hier niet
 * door getroffen). "Flex" met "direction" en "gap" geeft hetzelfde resultaat
 * zonder dat probleem.
 */

function Kolom({gap = 3, children}: {gap?: number; children: ReactNode}) {
  return (
    <Flex direction="column" gap={gap}>
      {children}
    </Flex>
  )
}

function Stap({nummer, titel, children}: {nummer: number; titel: string; children: ReactNode}) {
  return (
    <Card padding={4} radius={3} shadow={1} tone="transparent">
      <Flex gap={4} align="flex-start">
        <Flex
          align="center"
          justify="center"
          style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'var(--card-badge-default-bg-color, #2276fc)',
            color: 'white',
            fontWeight: 700,
          }}
        >
          {nummer}
        </Flex>
        <Box flex={1}>
          <Kolom gap={3}>
            <Heading size={1} as="h3">
              {titel}
            </Heading>
            <Kolom gap={3}>{children}</Kolom>
          </Kolom>
        </Box>
      </Flex>
    </Card>
  )
}

function Sectie({titel, children}: {titel: string; children: ReactNode}) {
  return (
    <Kolom gap={4}>
      <Heading size={2} as="h2">
        {titel}
      </Heading>
      <Kolom gap={3}>{children}</Kolom>
    </Kolom>
  )
}

function Veld({naam, uitleg}: {naam: string; uitleg: ReactNode}) {
  return (
    <Flex gap={3} align="flex-start">
      <Box style={{flexShrink: 0, minWidth: 190}}>
        <Badge tone="primary">
          {naam}
        </Badge>
      </Box>
      <Text size={1} muted style={{lineHeight: 1.6}}>
        {uitleg}
      </Text>
    </Flex>
  )
}

export function HoeHetWerkt() {
  return (
    <Box style={{overflowY: 'auto', height: '100%'}} padding={4}>
      <Container width={2}>
        <Box paddingBottom={6}>
          <Kolom gap={6}>
            <Card padding={4} radius={3} tone="primary">
              <Flex gap={3} align="center">
                <Text size={4} style={{flexShrink: 0}} aria-hidden="true">
                  💡
                </Text>
                <Kolom gap={2}>
                  <Heading size={3} as="h1">
                    Hoe het werkt
                  </Heading>
                  <Text size={2}>
                    Korte handleiding om zelf een camper toe te voegen of aan te passen onder{' '}
                    <strong>Te huur — motorhome</strong> of <strong>Te koop — motorhome</strong> in
                    het menu links.
                  </Text>
                </Kolom>
              </Flex>
            </Card>

            <Sectie titel="1. Een nieuwe camper toevoegen">
              <Stap nummer={1} titel='Klik links op "Te huur — motorhome" of "Te koop — motorhome"'>
                <Text size={1}>
                  Kies de juiste lijst, afhankelijk van of de camper te huur of te koop staat. Klik
                  daarna rechtsboven op de knop <strong>+ Nieuw document</strong> (of het plusje
                  naast de lijstnaam).
                </Text>
              </Stap>
              <Stap nummer={2} titel="Vul de tabs bovenaan in">
                <Text size={1}>
                  Het formulier is opgedeeld in tabs. Je hoeft niet alles in te vullen — enkel de
                  velden met een rood sterretje zijn verplicht, de rest is optioneel en wordt gewoon
                  niet getoond op de website als je het leeg laat.
                </Text>
                <Flex gap={2} wrap="wrap" paddingTop={2}>
                  <Badge tone="default">Algemeen</Badge>
                  <Badge tone="default">Specificaties</Badge>
                  <Badge tone="default">Tarieven (enkel bij Te huur)</Badge>
                  <Badge tone="default">Uitrusting &amp; accessoires</Badge>
                  <Badge tone="default">Foto&apos;s</Badge>
                </Flex>
              </Stap>
              <Stap nummer={3} titel='Klik rechtsboven op "Publiceren" (Publish)'>
                <Text size={1}>
                  Zolang je niet op <strong>Publiceren</strong> klikt, blijft je wijziging een{' '}
                  <em>concept</em> (draft) dat alleen jij ziet in de Studio — de website verandert
                  dan nog niet. Eens gepubliceerd, bouwt de website zichzelf automatisch opnieuw en
                  staat je wijziging binnen enkele minuten live. Je hoeft daar verder niets voor te
                  doen.
                </Text>
              </Stap>
            </Sectie>

            <Sectie titel="2. Tab &quot;Algemeen&quot;">
              <Card padding={4} radius={3} shadow={1} tone="transparent">
                <Kolom gap={4}>
                  <Veld
                    naam="Titel"
                    uitleg='Merk + model, bv. "Blucamp 527" of "Benimar Cocoon 486". Dit is meteen ook de grote titel op de website. De webadres-link wordt hier automatisch uit gemaakt — daar hoef je zelf niets voor te doen.'
                  />
                  <Veld
                    naam="Merk"
                    uitleg='Kies het merk uit de lijst. Staat het merk er nog niet bij? Typ gewoon de naam en klik op "Nieuwe [merk] aanmaken" — dat merk staat dan meteen klaar voor de volgende camper ook.'
                  />
                  <Veld
                    naam="Prijs (enkel Te koop)"
                    uitleg='Typ enkel het getal, zonder punten, komma of €-teken. Bv. typ 44950 voor € 44.950,00 — de website toont dit automatisch correct opgemaakt.'
                  />
                  <Veld
                    naam="Promotekst / Promoprijs"
                    uitleg='Optioneel, voor een lopende actie. Vul enkel de promoprijs in als er echt een korting is — de gewone prijs wordt dan automatisch doorstreept getoond met de promoprijs ernaast.'
                  />
                  <Veld
                    naam="Gepubliceerd"
                    uitleg="Zet dit vinkje uit om een camper tijdelijk van de website te halen (bv. verkocht of tijdelijk niet beschikbaar) zonder hem te verwijderen. Later terug aanzetten kan gewoon."
                  />
                  <Veld
                    naam="Sorteervolgorde"
                    uitleg="Optioneel. Een lager getal komt hoger te staan in het overzicht. Leeg laten sorteert automatisch op titel, onderaan de campers die wel een getal hebben."
                  />
                </Kolom>
              </Card>
            </Sectie>

            <Sectie titel="3. Tab &quot;Specificaties&quot;">
              <Text size={1} muted>
                Technische gegevens zoals opbouwtype, staat (nieuw/occasie), zit- en slaapplaatsen,
                motor, afmetingen en gewicht. Bij <strong>Te koop</strong> komen daar ook bouwjaar,
                kilometerstand en garantie bij. Alles hier is optioneel, behalve wat met een rood
                sterretje gemarkeerd staat — een leeg veld toont op de website gewoon niet of toont
                "op aanvraag".
              </Text>
            </Sectie>

            <Sectie titel="4. Tab &quot;Tarieven&quot; (enkel bij Te huur)">
              <Text size={1} muted>
                Drie seizoenen (laag, midden, hoogseizoen), elk met prijzen voor weekend, 1/2/3/4
                weken en een extra dag. Typ overal enkel het getal, zonder punten, komma of
                €-teken (bv. 900 voor € 900,00). Laat een vakje leeg als die periode niet geboekt
                kan worden in dat seizoen.
              </Text>
            </Sectie>

            <Sectie titel="5. Tab &quot;Uitrusting &amp; accessoires&quot;">
              <Text size={1} muted>
                Drie lijstjes: <strong>Chassis &amp; cabine</strong>, <strong>Woongedeelte</strong>{' '}
                en <strong>Extra&apos;s</strong>. Typ één kenmerk per regel (bv. "Airco",
                "Cruisecontrol", "Zonnepaneel") — elke regel verschijnt als apart vinkje op de
                website. Deze velden hebben taaltabbladen (NL/FR/EN) bovenaan het veld: vul minstens
                Nederlands in, en Frans en Engels als je die vertaling al hebt. Een taal leeg laten
                toont die kolom gewoon niet in die taal.
              </Text>
            </Sectie>

            <Sectie titel="6. Tab &quot;Foto&apos;s&quot;">
              <Card padding={4} radius={3} shadow={1} tone="transparent">
                <Kolom gap={4}>
                  <Veld
                    naam="Kaartfoto"
                    uitleg="Verplicht. Dit is de foto die op de overzichtskaartjes verschijnt (bv. op de pagina Te huur of Te koop). Kies een duidelijke buitenfoto, het liefst liggend formaat."
                  />
                  <Veld
                    naam="Fotogalerij"
                    uitleg="Verplicht: minstens 1 foto. Alle foto's voor de detailpagina van deze camper. Je mag de kaartfoto hier gerust nog eens toevoegen als die ook als eerste foto in de galerij moet staan. Sleep de foto's om de volgorde te wijzigen."
                  />
                  <Veld
                    naam="Foto dagindeling / nachtindeling"
                    uitleg="Optioneel. Grondplan overdag (bv. zitruimte) en 's nachts (bv. bedden opgemaakt) — deze twee foto's worden apart getoond op de detailpagina."
                  />
                  <Veld
                    naam="Uitsnede (hotspot)"
                    uitleg='Klik op een foto en versleep de cirkel naar het belangrijkste deel van de foto (bv. het gezicht van de camper). Zo blijft dat deel altijd zichtbaar, ook als de foto ergens smaller wordt bijgesneden.'
                  />
                  <Veld
                    naam="Alt-tekst"
                    uitleg="Een korte omschrijving per foto in de fotogalerij, voor schermlezers en zoekmachines. Bv. 'Blucamp 527 van opzij, deur open'. Niet verplicht, maar goed voor SEO."
                  />
                </Kolom>
              </Card>
            </Sectie>

            <Sectie titel="7. Een nieuw merk toevoegen">
              <Text size={1} muted>
                Dat hoeft nooit apart: typ in het veld <strong>Merk</strong> gewoon de naam die je
                zoekt. Staat die er nog niet bij, dan verschijnt de optie{' '}
                <strong>"Nieuwe [naam] aanmaken"</strong> — één klik en dat merk staat vanaf dan ook
                klaar voor je volgende camper.
              </Text>
            </Sectie>

            <Sectie titel="8. Een camper aanpassen of verwijderen">
              <Text size={1} muted>
                Klik in de lijst links gewoon op de camper om hem te openen en aan te passen —
                vergeet niet opnieuw op <strong>Publiceren</strong> te klikken na een wijziging.
                Verwijderen kan via het menu met de drie puntjes (⋯) rechtsboven in het document.
                Wil je een camper enkel tijdelijk van de website halen (bv. verkocht), zet dan
                liever het vinkje <strong>Gepubliceerd</strong> uit in plaats van te verwijderen —
                zo kan je hem later makkelijk terugzetten.
              </Text>
            </Sectie>
          </Kolom>
        </Box>
      </Container>
    </Box>
  )
}
