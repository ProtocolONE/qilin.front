import {LocalizedString} from '@/modules/packageMedia/types';
import {DiscountPolicy, RegionalRestrictions} from "@/modules/package/types";
import {PackageItem} from "@/modules/packages/types";

export interface Bundle {
  id: string;
  createdAt: Date;
  sku: string;
  name: LocalizedString;
  isUpgradeAllowed: boolean;
  isEnabled: boolean;
  discountPolicy: DiscountPolicy;
  regionalRestrinctions: RegionalRestrictions;
  packages: PackageItem[];
}

export interface State {
  bundle: Bundle;
  foundPackages: PackageItem[];
  initialPrices: string[];
}
