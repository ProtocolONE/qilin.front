import {LocalizedString} from '@/modules/gameMedia/types';

export interface BundleMedia {
  image: LocalizedString;
  cover: LocalizedString;
  thumb: LocalizedString;
}

export interface BundleItem {
  id: string;
  createdAt: Date;
  isDefault: boolean;
  isEnabled: boolean;
  media: BundleMedia;
  name: LocalizedString;
  sku: string;
}

export interface State {
  bundles: BundleItem[];
}
