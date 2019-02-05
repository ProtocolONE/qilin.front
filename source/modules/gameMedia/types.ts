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
  generic: LocalizedStringArray;
  small: LocalizedStringArray;
}

export interface Media {
  coverImage: LocalizedString;
  coverVideo: LocalizedString;
  trailers: LocalizedStringArray;
  store: MediaStore;
  capsule: MediaCapsule;
}

export interface State {
  media: Media;
  wait: boolean;
}
