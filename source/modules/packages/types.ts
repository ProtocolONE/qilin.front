import {LocalizedString} from '@/modules/gameMedia/types';
import {Game} from '@/modules/games/types';

export interface PackageMedia {
  image: LocalizedString;
  cover: LocalizedString;
  thumb: LocalizedString;
}

export interface Price {
  price: number;
  currency: string;
}

export interface PackageItem {
  id: string;
  createdAt: Date;
  isDefault: boolean;
  isEnabled: boolean;
  media: PackageMedia;
  name: LocalizedString;
  sku: string;
  discount: number;
  price: Price;
}

export interface State {
  packages: PackageItem[];
  foundGames: Game[];
  search: string;
  page: number;
  sort: string;
  itemsCount: number;
  hasPackages: boolean;
}
