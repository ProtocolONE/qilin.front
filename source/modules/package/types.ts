import {LocalizedString} from "@/modules/gameMedia/types";
import {PackageMedia} from "@/modules/packages/types";
import {Game} from "@/modules/games/types";

enum ProductType {
  Game = "games",
  DLC = "dlcs",
}

enum BuyOption {
  Whole = "games",
  Part = "dlcs",
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  image: LocalizedString;
}

export interface Price {
  currency: string;
  price: number;
  vat: number;
}

export interface PackagePreOrder {
  date: Date
  enabled: boolean;
}

export interface PackagePrices {
  common: number;
  preOrder: PackagePreOrder;
  prices: Price[];
}

export interface DiscountPolicy {
  discount: number;
  buyOption: BuyOption;
}

export interface RegionalRestrictions {
  allowedCountries: string[];
}

export interface Package {
  id: string;
  createdAt: Date;
  sku: string;
  name: string;
  isUpgradeAllowed: boolean;
  isEnabled: boolean;
  isDefault: boolean;
  products: Product[];
  media: PackageMedia;
  discountPolicy: DiscountPolicy;
  regionalRestrinctions: RegionalRestrictions;
  commercial: PackagePrices;
}

export interface State {
  packageObj: Package;
  foundGames: Game[];
  initialPrices: string[];
}
