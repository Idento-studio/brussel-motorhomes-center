# Foto's toevoegen

De oude statische site (met de vaste `assets/img/`-mappen in de root) is
verwijderd — de website draait nu volledig via de Next.js-app in `web/` en
Sanity. Dit bestand beschrijft waar foto's nu terechtkomen. Er zijn twee heel
verschillende soorten:

1. **Vaste sitefoto's** (logo, hero, dienstenkaartjes, team, merklogo's) —
   die staan als bestand in de map, net als vroeger, alleen op een nieuwe plek.
2. **Camperfoto's** (te koop en te huur) — die staan **niet** meer als
   bestand in de repo. Die voeg je toe via de Sanity Studio.

## 1. Vaste sitefoto's — nieuwe locatie

Alles staat nu in **`web/public/assets/img/`** in plaats van `assets/img/` in
de repo-root. Zelfde principe als vroeger: zet het bestand op de juiste naam
neer en het verschijnt automatisch, zonder dat er iets in de code moet
veranderen. Ontbreekt een bestand, dan toont de site het blauwe kader met het
campersilhouet in plaats van een gebroken afbeelding.

```
web/public/assets/img/
├── logo/
│   ├── bmc-logo.svg                       logo in de header
│   └── bmc-logo-white.svg                 witte versie, logo in de footer
├── home/
│   ├── hero.jpg                           grote foto bovenaan            1600×1200
│   ├── dienst-onderhoud.jpg               kaartje "Onderhoud"             800×500
│   ├── dienst-accessoires.jpg             kaartje "Accessoires & opties"  800×500
│   ├── dienst-verkoop-je-camper.jpg       kaartje "Verkoop je camper"     800×500
│   ├── maatwerk.jpg                       bij "Van leeg chassis"         1200×900
│   └── andersvaliden-poster.jpg           still van de video op de home
├── merken/
│   ├── adria.png  blucamp.png  burstner.png  dethleffs.png
│   └── hymer.png  ilusion.png  knaus.png     westfalia.png
├── over-ons/
│   └── jimmy-verstraete.jpg  didier-de-paepe.jpg  maxime-catry.jpg  philip-thijs.jpg   staand, 800×1000
├── andersvaliden/
│   └── (nog leeg — foto voor de pagina "Andersvaliden")
├── contact/
│   └── (nog leeg — foto/kaart voor de contactpagina)
└── social/
    └── bmc-featured.png                     deel-afbeelding (WhatsApp/Facebook/LinkedIn)  1200×630
```

**Deel-afbeelding (social/bmc-featured.png):** dit is de foto die verschijnt wanneer
iemand een link naar de website deelt op WhatsApp, Facebook, LinkedIn, ... Deze
ene afbeelding wordt gebruikt op alle pagina's, **behalve** de detailpagina's
van een camper te koop of te huur — daar wordt automatisch de kaartfoto van
die specifieke camper (uit Sanity) getoond in plaats van deze afbeelding. Zet
het bestand hier neer op exact 1200×630 px voor het beste resultaat op alle
platformen.

`web/src/app/icon.svg` is het favicon (apart bestand, geen map) — daar hoef je
normaal niet aan te komen.

In elke map staat een `LEESMIJ.txt` met dezelfde info.

**Let op:** `dienst-te-koop.jpg` en `dienst-te-huur.jpg` staan nog in de
`home/`-map maar worden nergens meer getoond (die kaartjes zijn van de
homepage gehaald, de sectie "Ons aanbod" toont dat al). Je mag ze laten staan
of verwijderen.

**Nog niet gekoppeld:** geen apple-touch-icon en geen PWA-iconen (icon-192/512).
Zeg het als je die wil laten toevoegen.

## 2. Camperfoto's (te koop en te huur) — via Sanity, niet via bestanden

Dit is een echte wijziging tegenover vroeger. Elke camper (te koop of te
huur) is nu een document in **Sanity Studio** (lokaal op
`http://localhost:3333/`, of het gepubliceerde Studio-adres), met daarin:

- **Kaartfoto** — één foto, verschijnt op de overzichtspagina.
- **Fotogalerij** — alle foto's voor de detailpagina, in de volgorde waarin
  je ze sleept.
- **Foto dagindeling / Foto nachtindeling** — optioneel, telkens één foto.

Je opent het camper-document in de Studio, sleept of kiest de foto's in het
juiste veld, en klikt op **Publiceren**. Er is geen vaste bestandsnaam of
mapstructuur meer nodig — Sanity beheert de bestanden zelf.

## Formaat en gewicht

Voor de vaste sitefoto's (deel 1): JPG voor foto's, PNG voor de merklogo's
(transparante achtergrond), SVG voor het BMC-logo. Niet breder dan 1600 px,
en let op het gewicht — een foto rechtstreeks van een telefoon kan 5 tot 10 MB
wegen, terwijl 150 tot 300 kB ruim voldoende is op deze schermformaten. Zeg
het gerust als een foto te zwaar aankomt, dan verklein ik ze.

Voor camperfoto's (deel 2) doet Sanity zelf de optimalisatie bij het tonen op
de site — daar hoef je niet op te letten, upload gerust de originele foto's.
