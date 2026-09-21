export type SanityImage = {
  asset: {_ref: string; _type: "reference"};
  hotspot?: {x: number; y: number; height: number; width: number};
  alt?: string;
};

export type TariefPeriode = {
  weekend?: number;
  eenWeek?: number;
  tweeWeken?: number;
  drieWeken?: number;
  vierWeken?: number;
  extraDag?: number;
};

export type VerkoopVoertuig = {
  _id: string;
  titel: string;
  slug: string;
  merk: string;
  groep?: string;
  opbouwtype: "Alkoof" | "Campervan" | "Halfintegraal" | "Integraal";
  staat: "Nieuw" | "Occasie";
  prijs: number;
  promoTekst?: string;
  promoPrijs?: number;
  zitplaatsen: number;
  slaapplaatsen: number;
  bouwjaar: number;
  eersteInschrijving?: string;
  kilometerstand: number;
  motor?: string;
  brandstof?: string;
  transmissie?: string;
  rijbewijs?: string;
  onderstel?: string;
  indeling?: string;
  leeggewicht?: number;
  mtm?: number;
  garantie?: string;
  mindervalideGeschikt?: boolean;
  mindervalideAanpassingen?: string[];
  coverFoto: SanityImage;
  fotos: SanityImage[];
  dagindeling?: SanityImage;
  nachtindeling?: SanityImage;
  chassisEnCabine?: string;
  woongedeelte?: string;
  extras?: string;
};

export type VerhuurVoertuig = {
  _id: string;
  titel: string;
  slug: string;
  promoTekst?: string;
  merk?: string;
  opbouwtype?: "Alkoof" | "Campervan" | "Halfintegraal" | "Integraal";
  zitplaatsen?: number;
  slaapplaatsen?: number;
  onderstel?: string;
  motor?: string;
  brandstof?: string;
  transmissie?: string;
  rijbewijs?: string;
  indeling?: string;
  afmetingen?: {lengte?: number; breedte?: number; hoogte?: number};
  leeggewicht?: number;
  mtm?: number;
  mindervalideGeschikt?: boolean;
  mindervalideAanpassingen?: string[];
  coverFoto: SanityImage;
  fotos: SanityImage[];
  dagindeling?: SanityImage;
  nachtindeling?: SanityImage;
  chassisEnCabine?: string;
  woongedeelte?: string;
  extras?: string;
  tarieven?: {
    laagSeizoen?: TariefPeriode;
    middenSeizoen?: TariefPeriode;
    hoogSeizoen?: TariefPeriode;
  };
  notitie?: string;
};
