import {LocalizedString} from '@/modules/gameMedia/types';
import {PackageItem} from "@/modules/packages/types";

export interface BundleItem {
  id: string;
  createdAt: Date;
  sku: string;
  name: LocalizedString;
  isEnabled: boolean;
  isUpgradeAllowed: boolean;
}

export interface State {
  bundles: BundleItem[];
  foundPackages: PackageItem[];
  search: string;
  page: number;
  sort: string;
  itemsCount: number;
}
