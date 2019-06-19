import {LocalizedString} from '@/modules/gameMedia/types';
import {Game} from '@/modules/games/types';

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
  foundGames: Game[];
  search: string;
  page: number;
  sort: string;
  itemsCount: number;
}
