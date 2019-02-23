import {LocalizedString} from "@/modules/gameMedia/types";

export interface DescrReview {
  pressName: string;
  link: string;
  score: string;
  quote: string;
}

export interface DescrSocials {
  facebook: string;
  twitter: string;
}

export interface Descriptions {
  tagline: LocalizedString;
  description: LocalizedString;
  reviews: DescrReview[];
  additionalDescription: string;
  gameSite: string;
  socials: DescrSocials;
}

export interface State {
  descriptions: Descriptions;
  hasChanges: Boolean;
}
