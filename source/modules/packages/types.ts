import {LocalizedString} from "@/modules/gameMedia/types";

export interface PackageMedia {
  image: LocalizedString;
  cover: LocalizedString;
  thumb: LocalizedString;
}

export interface PackageItem {
  id: string;
  createdAt: Date;
  isDefault: boolean;
  isEnabled: boolean;
  media: PackageMedia;
  name: LocalizedString;
  sku: string;
}

export interface State {
  packages: PackageItem[];
}
