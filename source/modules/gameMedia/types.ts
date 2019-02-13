export interface LocalizedString {
  [key: string]: string;
}

export interface LocalizedStringArray {
  [key: string]: string[];
}

export interface MediaStore {
  special: LocalizedString;
  friends: LocalizedString;
}

export interface MediaCapsule {
  generic: LocalizedString;
  small: LocalizedString;
}

export interface Media {
  coverImage: LocalizedString;
  coverVideo: LocalizedString;
  trailers: LocalizedStringArray;
  screenshots: LocalizedStringArray;
  store: MediaStore;
  capsule: MediaCapsule;
}

export interface State {
  media: Media;
  hasChanges: Boolean;
}
