import {LocalizedString} from '@/modules/gameMedia/types';
import {PackageItem, Price} from "@/modules/packages/types";

export interface BundleItem {
  id: string;
  createdAt: Date;
  sku: string;
  name: LocalizedString;
  isEnabled: boolean;
  isUpgradeAllowed: boolean;
  discount: number;
  price: Price;
}

export interface State {
  bundles: BundleItem[];
  foundPackages: PackageItem[];
  search: string;
  page: number;
  sort: string;
  itemsCount: number;
  hasBundles: boolean;
}
