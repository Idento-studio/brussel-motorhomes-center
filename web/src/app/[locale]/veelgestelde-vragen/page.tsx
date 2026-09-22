import Link from "next/link";
import type { Metadata } from "next";
import { FaqAccordion, type FaqGroep } from "@/components/FaqAccordion";
import { L, buildAlternates, buildOpenGraph, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/dictionaries";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbList, buildFAQPage } from "@/lib/structuredData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "fr" ? "Questions fréquentes" : locale === "en" ? "Frequently asked questions" : "Veelgestelde vragen";
  const description =
    locale === "fr"
      ? "Réponses sur l'achat, la location, l'entretien et les accessoires de camping-cars chez BMC."
      : locale === "en"
      ? "Answers about buying, renting, maintaining and accessorising motorhomes at BMC."
      : "Antwoorden over kopen, huren, onderhoud en accessoires van motorhomes bij BMC.";
  return {
    title,
    description,
    alternates: buildAlternates("/veelgestelde-vragen/", locale),
    ...buildOpenGraph({ locale, title, description, pad: "/veelgestelde-vragen/" }),
  };
}

const FAQ_GROEPEN_NL: FaqGroep[] = [
  {
    id: "koop",
    label: "Te koop",
    vragen: [
      {
        vraag: "Is een financiering mogelijk via BMC?",
        antwoord:
          "BMC werkt samen met gespecialiseerde financieringspartners om leningen op maat aan te bieden, tot de maximale wettelijke looptijd, afgestemd op uw budget.",
      },
      {
        vraag: "Kan ik mijn huidige voertuig of motorhome inruilen?",
        antwoord:
          "Ja. Wij bieden overnames van uw huidige motorhome, caravan of personenwagen aan tegen een marktconforme overnameprijs. Dit kan ook zonder dat u meteen een nieuw of tweedehands model bij ons aankoopt.",
      },
      {
        vraag: "Hoe zit het met de inschrijving, BIV en verkeersbelasting in België?",
        antwoord:
          "Motorhomes van categorie M1 genieten in België gunstige tarieven. In Vlaanderen en Brussel betaalt u geen belasting op de inverkeerstelling (BIV). In Wallonië geldt een verminderd tarief met een minimumbedrag van € 61,50. De jaarlijkse verkeersbelasting hangt af van de maximale toegelaten massa (MTM): ongeveer € 132 per jaar tot 3.500 kg (rijbewijs B), en ongeveer € 145,20 per jaar van 3.500 tot 7.500 kg (rijbewijs C1).",
      },
      {
        vraag: "Welke garantie geldt er bij aankoop van een tweedehands motorhome?",
        antwoord:
          "Elke tweedehands motorhome krijgt wettelijke garantie, een volledige technische check-up van zowel motor als woongedeelte, een vochtmeting, Car-Pass en keuring voor verkoop.",
      },
      {
        vraag: "Wat is het verschil tussen een campervan, half-integraal, integraal en alkoof?",
        antwoord:
          "Campervan of buscamper: compact, wendbaar en gebouwd in het originele koetswerk van een bestelwagen, ideaal voor koppels en actieve roadtrips. Half-integraal: aerodynamisch met een originele stuurcabine en een opgebouwde leefruimte, veel ruimte en comfort bij een gunstig verbruik. Integraal: cabine en leefruimte vormen één geheel, met maximale binnenruimte, panoramisch uitzicht en optimale isolatie. Alkoof: herkenbaar aan de ruime slaapnis boven de bestuurderscabine, uitermate geschikt voor grote gezinnen.",
      },
      {
        vraag: "Welk rijbewijs heb ik nodig om met een motorhome te rijden?",
        antwoord:
          "Voor motorhomes met een MTM tot en met 3.500 kg volstaat een standaard rijbewijs B. Ligt de MTM daarboven, dan heeft u rijbewijs C1 of C nodig.",
      },
    ],
  },
  {
    id: "huur",
    label: "Te huur",
    vragen: [
      {
        vraag: "Hoe moet de motorhome ingeleverd worden?",
        antwoord:
          "Het interieur dient schoon ingeleverd te worden, met een geledigde en gespoelde afvalwatertank en toiletcassette. De buitenzijde wordt door onze eigen poetsdienst gereinigd.",
      },
      {
        vraag: "Mogen huisdieren mee tijdens de huur?",
        antwoord:
          "Huisdieren zijn in specifieke huurwagens toegelaten op aanvraag, mits een toeslag van € 100 voor extra dieptereiniging.",
      },
      {
        vraag: "Zijn reizen naar het buitenland toegestaan?",
        antwoord: "U mag reizen naar alle Europese landen die vermeld staan op de groene verzekeringskaart.",
      },
      {
        vraag: "Hoeveel kilometers zijn inbegrepen?",
        antwoord:
          "Bij korte huurperiodes geldt een limiet van 2.500 km per week. Vanaf een huurperiode van 3 weken geniet u van onbeperkte kilometers.",
      },
      {
        vraag: "Hoeveel bedraagt de waarborg en wanneer krijg ik die terug?",
        antwoord:
          "De waarborg bedraagt € 1.500, gelijk aan de vrijstelling van de omniumverzekering, en wordt binnen 7 tot 14 werkdagen na een schadevrije inlevering teruggestort.",
      },
      {
        vraag: "Wat is er inbegrepen in de huurprijs?",
        antwoord:
          "Volledige omniumverzekering met een franchise van € 1.500, 24/7 Europese pechverhelping, een volle gasfles en toiletproducten, en de technische uitrusting met instructie.",
      },
      {
        vraag: "Wat zijn de voorwaarden om een motorhome te huren?",
        antwoord:
          "De chauffeur moet minimaal 23 jaar oud zijn, afhankelijk van het model, en minstens 3 jaar in het bezit zijn van een geldig Europees rijbewijs B.",
      },
    ],
  },
  {
    id: "onderhoud",
    label: "Onderhoud",
    vragen: [
      {
        vraag: "Wat moet ik doen om de motorhome winterklaar te maken?",
        antwoord:
          "Laat vóór de eerste vorst altijd alle waterreservoirs leeglopen: vers water, vuil water en vooral de boiler via het vorstbeveiligingsventiel. Koppel de leefbatterij los of sluit ze aan op een druppellader om diepontlading tijdens de winterstalling te vermijden.",
      },
      {
        vraag: "Maken jullie motorhomes klaar voor de Belgische autokeuring?",
        antwoord:
          "Ja. Wij voeren een volledige pre-keuring uit, inclusief controle van remmen, lichten, ophanging, bandenleeftijd en gewicht. Indien gewenst rijden wij met uw motorhome naar het keuringsstation.",
      },
      {
        vraag: "Waarom is een jaarlijkse vochtmeting noodzakelijk?",
        antwoord:
          "Vocht is de grootste vijand van een motorhome. Een jaarlijkse waterdichtheidscontrole is verplicht om de fabrieksgarantie op waterdichtheid, vaak 5 tot 10 jaar, te behouden en beginnende infiltraties tijdig op te sporen vóór er structurele schade ontstaat.",
      },
      {
        vraag: "Wat houdt het onderhoud van een motorhome in?",
        antwoord:
          "Motor en chassis: regulier auto-onderhoud volgens fabrieksspecificaties, waaronder olie, remmen, distributieriem, banden en filters. Woongedeelte en opbouw: controle van gassysteem, watersysteem, elektronica, koelkast, verwarming, sloten en dichtingen.",
      },
    ],
  },
  {
    id: "accessoires",
    label: "Accessoires",
    vragen: [
      {
        vraag: "Houdt BMC rekening met het laadvermogen en de MTM van 3.500 kg?",
        antwoord:
          "Ja. Wij berekenen samen met u het gewicht van de gewenste accessoires, zodat uw motorhome binnen de wettelijke gewichtsgrenzen blijft.",
      },
      {
        vraag: "Kan een fietsendrager zware elektrische fietsen dragen?",
        antwoord:
          "Standaard fietsendragers op de achterwand hebben vaak een maximale draagkracht van 40 tot 60 kg. Voor zware e-bikes monteren wij speciale dragers op het chassis of neerlaatbare liftdragers met een hogere capaciteit.",
      },
      {
        vraag: "Wat is het voordeel van een lithium-batterij tegenover AGM of gel?",
        antwoord:
          "Lithium-batterijen (LiFePO4) wegen tot 60 % minder, leveren tot 90 % bruikbare capaciteit en hebben een levensduur tot 6.000 cycli.",
      },
      {
        vraag: "Welke accessoires kan BMC monteren?",
        antwoord:
          "Zonnepanelen, lithium-batterijen en omvormers; dakairco's, ventilatoren en luifels; trekhaken, fietsendragers en e-bike-liften; achteruitrijcamera's, alarmsystemen en wifi-routers; LPG-flessen met Truma Crash Sensor; en voor andersvaliden ook stuurwielaanpassingen, een lift-dak en een oprijramp voor rolstoelen.",
      },
    ],
  },
];

const FAQ_GROEPEN_FR: FaqGroep[] = [
  {
    id: "koop",
    label: "À vendre",
    vragen: [
      {
        vraag: "Un financement est-il possible via BMC ?",
        antwoord:
          "BMC travaille avec des partenaires financiers spécialisés pour proposer des prêts sur mesure, jusqu'à la durée légale maximale, adaptés à votre budget.",
      },
      {
        vraag: "Puis-je faire reprendre mon véhicule ou camping-car actuel ?",
        antwoord:
          "Oui. Nous reprenons votre camping-car, caravane ou voiture actuelle à un prix de reprise conforme au marché. Cela est également possible sans que vous achetiez immédiatement un nouveau modèle ou un modèle d'occasion chez nous.",
      },
      {
        vraag: "Qu'en est-il de l'immatriculation, de la TMC et de la taxe de circulation en Belgique ?",
        antwoord:
          "Les camping-cars de catégorie M1 bénéficient de tarifs avantageux en Belgique. En Flandre et à Bruxelles, vous ne payez pas de taxe de mise en circulation (TMC). En Wallonie, un tarif réduit s'applique, avec un montant minimum de 61,50 €. La taxe de circulation annuelle dépend de la masse maximale autorisée (MMA) : environ 132 € par an jusqu'à 3 500 kg (permis B), et environ 145,20 € par an de 3 500 à 7 500 kg (permis C1).",
      },
      {
        vraag: "Quelle garantie s'applique à l'achat d'un camping-car d'occasion ?",
        antwoord:
          "Chaque camping-car d'occasion bénéficie d'une garantie légale, d'un contrôle technique complet du moteur et de la partie habitation, d'une mesure d'humidité, d'un Car-Pass et d'un contrôle technique avant la vente.",
      },
      {
        vraag: "Quelle est la différence entre un campervan, un profilé, un intégral et une capucine ?",
        antwoord:
          "Campervan ou fourgon aménagé : compact, maniable et construit dans la carrosserie d'origine d'un utilitaire, idéal pour les couples et les road trips actifs. Profilé (half-intégral) : aérodynamique, avec une cabine de conduite d'origine et un espace de vie surélevé, offrant beaucoup d'espace et de confort pour une consommation avantageuse. Intégral : la cabine et l'espace de vie ne forment qu'un seul ensemble, avec un espace intérieur maximal, une vue panoramique et une isolation optimale. Capucine : reconnaissable à sa vaste alcôve de couchage au-dessus de la cabine de conduite, particulièrement adaptée aux grandes familles.",
      },
      {
        vraag: "Quel permis de conduire me faut-il pour conduire un camping-car ?",
        antwoord:
          "Pour les camping-cars d'une MMA allant jusqu'à 3 500 kg inclus, un permis B standard suffit. Au-delà de cette MMA, vous avez besoin du permis C1 ou C.",
      },
    ],
  },
  {
    id: "huur",
    label: "À louer",
    vragen: [
      {
        vraag: "Comment le camping-car doit-il être restitué ?",
        antwoord:
          "L'intérieur doit être restitué propre, avec le réservoir d'eaux usées et la cassette de toilettes vidés et rincés. L'extérieur est nettoyé par notre propre service de nettoyage.",
      },
      {
        vraag: "Les animaux domestiques sont-ils autorisés pendant la location ?",
        antwoord:
          "Les animaux domestiques sont autorisés sur demande dans certains véhicules de location spécifiques, moyennant un supplément de 100 € pour un nettoyage en profondeur supplémentaire.",
      },
      {
        vraag: "Les voyages à l'étranger sont-ils autorisés ?",
        antwoord: "Vous pouvez voyager vers tous les pays européens mentionnés sur la carte verte d'assurance.",
      },
      {
        vraag: "Combien de kilomètres sont inclus ?",
        antwoord:
          "Pour les périodes de location courtes, une limite de 2 500 km par semaine s'applique. À partir d'une période de location de 3 semaines, vous bénéficiez d'un kilométrage illimité.",
      },
      {
        vraag: "Quel est le montant de la caution et quand la récupérer ?",
        antwoord:
          "La caution s'élève à 1 500 €, ce qui correspond à la franchise de l'assurance omnium, et est remboursée dans les 7 à 14 jours ouvrables suivant une restitution sans dommage.",
      },
      {
        vraag: "Qu'est-ce qui est inclus dans le prix de location ?",
        antwoord:
          "Une assurance omnium complète avec une franchise de 1 500 €, une assistance dépannage européenne 24h/24 et 7j/7, une bouteille de gaz pleine et des produits pour les toilettes, ainsi que l'équipement technique avec instructions.",
      },
      {
        vraag: "Quelles sont les conditions pour louer un camping-car ?",
        antwoord:
          "Le conducteur doit avoir au moins 23 ans, selon le modèle, et être titulaire depuis au moins 3 ans d'un permis de conduire B européen valide.",
      },
    ],
  },
  {
    id: "onderhoud",
    label: "Entretien",
    vragen: [
      {
        vraag: "Que dois-je faire pour préparer le camping-car à l'hiver ?",
        antwoord:
          "Avant les premières gelées, videz toujours tous les réservoirs d'eau : eau propre, eau usée et surtout le chauffe-eau via la vanne de protection contre le gel. Débranchez la batterie auxiliaire ou raccordez-la à un chargeur d'entretien afin d'éviter une décharge profonde pendant le stockage hivernal.",
      },
      {
        vraag: "Préparez-vous les camping-cars au contrôle technique belge ?",
        antwoord:
          "Oui. Nous effectuons un contrôle technique préalable complet, incluant la vérification des freins, des feux, de la suspension, de l'âge des pneus et du poids. Si vous le souhaitez, nous conduisons votre camping-car jusqu'à la station de contrôle technique.",
      },
      {
        vraag: "Pourquoi une mesure d'humidité annuelle est-elle nécessaire ?",
        antwoord:
          "L'humidité est le pire ennemi d'un camping-car. Un contrôle d'étanchéité annuel est obligatoire pour conserver la garantie d'usine sur l'étanchéité, souvent de 5 à 10 ans, et pour détecter à temps les débuts d'infiltration avant qu'ils ne causent des dommages structurels.",
      },
      {
        vraag: "En quoi consiste l'entretien d'un camping-car ?",
        antwoord:
          "Moteur et châssis : entretien automobile régulier selon les spécifications du fabricant, notamment l'huile, les freins, la courroie de distribution, les pneus et les filtres. Partie habitation et carrosserie : contrôle du circuit de gaz, du circuit d'eau, de l'électronique, du réfrigérateur, du chauffage, des serrures et des joints d'étanchéité.",
      },
    ],
  },
  {
    id: "accessoires",
    label: "Accessoires",
    vragen: [
      {
        vraag: "BMC tient-il compte de la charge utile et de la MMA de 3 500 kg ?",
        antwoord:
          "Oui. Nous calculons avec vous le poids des accessoires souhaités, afin que votre camping-car reste dans les limites de poids légales.",
      },
      {
        vraag: "Un porte-vélos peut-il supporter des vélos électriques lourds ?",
        antwoord:
          "Les porte-vélos standards montés sur la paroi arrière ont souvent une capacité de charge maximale de 40 à 60 kg. Pour les e-bikes plus lourds, nous montons des porte-vélos spéciaux sur le châssis ou des porte-vélos élévateurs rabattables offrant une capacité supérieure.",
      },
      {
        vraag: "Quel est l'avantage d'une batterie lithium par rapport à une batterie AGM ou gel ?",
        antwoord:
          "Les batteries lithium (LiFePO4) pèsent jusqu'à 60 % de moins, offrent jusqu'à 90 % de capacité utile et ont une durée de vie pouvant atteindre 6 000 cycles.",
      },
      {
        vraag: "Quels accessoires BMC peut-il monter ?",
        antwoord:
          "Panneaux solaires, batteries lithium et convertisseurs ; climatisations de toit, ventilateurs et auvents ; attelages, porte-vélos et lifts pour e-bikes ; caméras de recul, systèmes d'alarme et routeurs wifi ; bouteilles de GPL avec Truma Crash Sensor ; et pour les personnes à mobilité réduite également des adaptations de volant, un toit relevable et une rampe d'accès pour fauteuil roulant.",
      },
    ],
  },
];

const FAQ_GROEPEN_EN: FaqGroep[] = [
  {
    id: "koop",
    label: "For sale",
    vragen: [
      {
        vraag: "Is financing available through BMC?",
        antwoord:
          "BMC works with specialised financing partners to offer tailored loans, up to the maximum legal term, matched to your budget.",
      },
      {
        vraag: "Can I trade in my current vehicle or motorhome?",
        antwoord:
          "Yes. We buy back your current motorhome, caravan or car at a market-rate trade-in price. This is also possible without immediately purchasing a new or used model from us.",
      },
      {
        vraag: "How does registration, BIV/TMC and road tax work in Belgium?",
        antwoord:
          "Category M1 motorhomes benefit from favourable rates in Belgium. In Flanders and Brussels, you pay no registration tax (BIV/TMC). In Wallonia, a reduced rate applies, with a minimum amount of €61.50. Annual road tax depends on the maximum authorised mass (MAM): around €132 per year up to 3,500 kg (driving licence B), and around €145.20 per year from 3,500 to 7,500 kg (driving licence C1).",
      },
      {
        vraag: "What warranty applies when buying a used motorhome?",
        antwoord:
          "Every used motorhome comes with a legal warranty, a full technical check-up of both the engine and living area, a damp measurement, a Car-Pass and an inspection before sale.",
      },
      {
        vraag: "What is the difference between a campervan, semi-integrated, fully integrated and overcab motorhome?",
        antwoord:
          "Campervan: compact, manoeuvrable and built in the original bodywork of a van, ideal for couples and active road trips. Semi-integrated (low-profile): aerodynamic, with an original driving cab and a raised living area, offering plenty of space and comfort with favourable fuel consumption. Fully integrated: the cab and living area form a single unit, with maximum interior space, panoramic views and optimal insulation. Overcab (alcove): recognisable by its spacious sleeping area above the driver's cab, particularly suited to large families.",
      },
      {
        vraag: "Which driving licence do I need to drive a motorhome?",
        antwoord:
          "For motorhomes with a MAM up to and including 3,500 kg, a standard licence B is sufficient. Above that MAM, you need a licence C1 or C.",
      },
    ],
  },
  {
    id: "huur",
    label: "For rent",
    vragen: [
      {
        vraag: "How does the motorhome need to be returned?",
        antwoord:
          "The interior must be returned clean, with the wastewater tank and toilet cassette emptied and rinsed. The exterior is cleaned by our own cleaning service.",
      },
      {
        vraag: "Are pets allowed during the rental?",
        antwoord:
          "Pets are allowed on request in specific rental vehicles, subject to a €100 surcharge for extra deep cleaning.",
      },
      {
        vraag: "Are trips abroad allowed?",
        antwoord: "You may travel to all European countries listed on the green insurance card.",
      },
      {
        vraag: "How many kilometres are included?",
        antwoord:
          "For short rental periods, a limit of 2,500 km per week applies. From a rental period of 3 weeks onwards, you enjoy unlimited kilometres.",
      },
      {
        vraag: "How much is the deposit and when do I get it back?",
        antwoord:
          "The deposit is €1,500, equal to the excess on the comprehensive insurance, and is refunded within 7 to 14 working days after a damage-free return.",
      },
      {
        vraag: "What is included in the rental price?",
        antwoord:
          "Full comprehensive insurance with a €1,500 excess, 24/7 European breakdown assistance, a full gas bottle and toilet products, and the technical equipment with instructions.",
      },
      {
        vraag: "What are the conditions to rent a motorhome?",
        antwoord:
          "The driver must be at least 23 years old, depending on the model, and have held a valid European licence B for at least 3 years.",
      },
    ],
  },
  {
    id: "onderhoud",
    label: "Maintenance",
    vragen: [
      {
        vraag: "What do I need to do to winterise the motorhome?",
        antwoord:
          "Before the first frost, always drain all water tanks: fresh water, waste water and especially the water heater via the frost protection valve. Disconnect the leisure battery or connect it to a trickle charger to prevent deep discharge during winter storage.",
      },
      {
        vraag: "Do you prepare motorhomes for the Belgian roadworthiness inspection?",
        antwoord:
          "Yes. We carry out a full pre-inspection, including checks of the brakes, lights, suspension, tyre age and weight. If you wish, we can drive your motorhome to the inspection centre.",
      },
      {
        vraag: "Why is an annual damp measurement necessary?",
        antwoord:
          "Damp is a motorhome's worst enemy. An annual water-tightness check is mandatory to preserve the manufacturer's water-tightness warranty, often 5 to 10 years, and to detect emerging leaks in time before they cause structural damage.",
      },
      {
        vraag: "What does motorhome maintenance involve?",
        antwoord:
          "Engine and chassis: regular automotive maintenance according to manufacturer specifications, including oil, brakes, timing belt, tyres and filters. Living area and body: check of the gas system, water system, electronics, refrigerator, heating, locks and seals.",
      },
    ],
  },
  {
    id: "accessoires",
    label: "Accessories",
    vragen: [
      {
        vraag: "Does BMC take payload and the 3,500 kg MAM into account?",
        antwoord:
          "Yes. We calculate the weight of the desired accessories together with you, so your motorhome stays within the legal weight limits.",
      },
      {
        vraag: "Can a bike rack carry heavy electric bikes?",
        antwoord:
          "Standard bike racks mounted on the rear wall often have a maximum load capacity of 40 to 60 kg. For heavier e-bikes, we fit special chassis-mounted racks or foldable lift racks with a higher capacity.",
      },
      {
        vraag: "What is the advantage of a lithium battery over AGM or gel?",
        antwoord:
          "Lithium batteries (LiFePO4) weigh up to 60% less, deliver up to 90% usable capacity and have a lifespan of up to 6,000 cycles.",
      },
      {
        vraag: "Which accessories can BMC install?",
        antwoord:
          "Solar panels, lithium batteries and inverters; roof air conditioning, fans and awnings; tow bars, bike racks and e-bike lifts; reversing cameras, alarm systems and wifi routers; LPG bottles with Truma Crash Sensor; and for people with reduced mobility also steering wheel adaptations, a lift roof and a wheelchair access ramp.",
      },
    ],
  },
];

export default async function VeelgesteldeVragenPagina({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const faqGroepen =
    locale === "fr" ? FAQ_GROEPEN_FR : locale === "en" ? FAQ_GROEPEN_EN : FAQ_GROEPEN_NL;

  const inhoud =
    locale === "fr"
      ? {
          titel: "Questions fréquentes",
          intro:
            "Réponses aux questions que nos clients nous posent le plus souvent, sur l'achat, la location, l'entretien et les accessoires.",
          ctaTitel: "Vous ne trouvez pas votre question ?",
          ctaTekst: "Appelez-nous ou envoyez-nous un message : nous répondons sous un jour ouvrable.",
          categorieen: "Catégories",
        }
      : locale === "en"
      ? {
          titel: "Frequently asked questions",
          intro:
            "Answers to what customers ask us most often, about buying, renting, maintenance and accessories.",
          ctaTitel: "Can't find your question?",
          ctaTekst: "Call us or send a message: we reply within one business day.",
          categorieen: "Categories",
        }
      : {
          titel: "Veelgestelde vragen",
          intro:
            "Antwoorden op wat klanten ons het vaakst vragen, over kopen, huren, onderhoud en accessoires.",
          ctaTitel: "Staat uw vraag er niet bij?",
          ctaTekst: "Bel ons of stuur een bericht: wij antwoorden binnen één werkdag.",
          categorieen: "Categorieën",
        };

  return (
    <main id="inhoud">
      <div className="paginakop">
        <div className="wrap">
          <JsonLd data={buildBreadcrumbList(locale, [{ label: dict.breadcrumbHome, pad: "/" }, { label: dict.nav.veelgesteldeVragen }])} />
          <JsonLd data={buildFAQPage(faqGroepen.flatMap((groep) => groep.vragen))} />
          <nav className="kruimelpad" aria-label="Kruimelpad">
            <Link href={L(locale, "/")}>{dict.breadcrumbHome}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{dict.nav.veelgesteldeVragen}</span>
          </nav>
          <h1>{inhoud.titel}</h1>
          <p className="intro">{inhoud.intro}</p>
        </div>
      </div>

      <section className="sectie sectie-vlak">
        <div className="wrap">
          <FaqAccordion groepen={faqGroepen} categorieenLabel={inhoud.categorieen} />
        </div>
      </section>

      <section className="sectie slot-cta">
        <div className="wrap">
          <h2>{inhoud.ctaTitel}</h2>
          <p>{inhoud.ctaTekst}</p>
          <div className="knoppen">
            <Link className="btn btn-goud" href={L(locale, "/contact/")}>
              {dict.nav.contact}
            </Link>
            <a className="btn btn-blauw" href="tel:+32471407949">
              {dict.voertuig.detail.bel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
