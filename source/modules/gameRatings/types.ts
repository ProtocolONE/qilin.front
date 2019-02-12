import {LocalizedString} from "@/modules/gameMedia/types";

export interface RatingAgency {
  displayOnlineNotice: boolean;
  showAgeRestrict: boolean;
  ageRestrict: number;
  descriptors: number[];
  rating: string;
}

export type RatingIndex = 'ESRB'|'PEGI'|'BBFC'|'USK'|'CERO';

export interface Ratings {
  [key: RatingIndex]: RatingAgency;
}

export interface RatingDescriptor {
  id: number;
  title: LocalizedString;
  system: string;
}

export interface State {
  ratings: Ratings;
  descriptors: RatingDescriptor[];
}
