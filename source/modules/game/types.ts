

export interface GameTag {
  id:        string;
  title:     any;
}

export interface GameFeatures {
  common:       string[];
  controllers:  string;
}

export interface GamePlatforms {
  Windows:    boolean;
  MacOs:      boolean;
  Linux:      boolean;
}

export interface MachineRequirements {
  system:             string;
  processor:          string;
  graphics:           string;
  sound:              string;
  ram:                string;
  ramdimension:       string;
  storage:            string;
  storagedimension:   string;
  other:              string;
}

export interface PlatformRequirements {
  minimal:        MachineRequirements;
  recommended:    MachineRequirements;
}

export interface GameRequirements {
  Windows:    PlatformRequirements;
  MacOs:      PlatformRequirements;
  Linux:      PlatformRequirements;
}

export interface Langs {
  voice:        boolean;
  interface:    boolean;
  subtitles:    boolean;
}

export interface GameLangs {
  en:  Langs;
  ru:  Langs;
}


export interface GameInfo {
  id:               string;
  internalName:     string;
  title:            string;
  developers:       string;
  publishers:       string;
  releaseDate:      Date;
  displayRemainingTime:     boolean;
  achievementOnProd:        boolean;
  features:         GameFeatures;
  platforms:        GamePlatforms;
  requirements:     GameRequirements;
  languages:         GameLangs;
  genre:         GameTag[];
  tags:          GameTag[];
}