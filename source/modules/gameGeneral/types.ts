export interface Genre {
  id: string;
  title: {
    en: string,
    ru: string,
  };
}
export interface Tag {
  id: string;
  title: {
    en: string,
    ru: string,
  };
}
export interface GameGenres {
  main: string;
  addition: string[];
}
export interface GameFeatures {
  common: string[];
  controllers: string;
}
export interface GamePlatforms {
  Windows: boolean;
  MacOs: boolean;
  Linux: boolean;
}
export interface MachineRequirements {
  system: string;
  processor: string;
  graphics: string;
  sound: string;
  ram: string;
  ramdimension: string;
  storage: string;
  storagedimension: string;
  other: string;
}
export interface PlatformRequirements {
  minimal: MachineRequirements;
  recommended: MachineRequirements;
}
export interface GameRequirements {
  Windows: PlatformRequirements;
  MacOs: PlatformRequirements;
  Linux: PlatformRequirements;
}
export interface Langs {
  voice: boolean;
  interface: boolean;
  subtitles: boolean;
}
export interface GameLangs {
  en: Langs;
  ru: Langs;
}
export interface GameInfo {
  id: string;
  internalName: string;
  title: string;
  developers: string;
  publishers: string;
  releaseDate: Date;
  displayRemainingTime: boolean;
  achievementOnProd: boolean;
  features: GameFeatures;
  platforms: GamePlatforms;
  requirements: GameRequirements;
  languages: GameLangs;
  genres: GameGenres;
  tags: string[];
}
export interface State {
  gameInfo: GameInfo;
  genres: Genre[];
  tags: Tag[];
  hasChanges: Boolean;
}
