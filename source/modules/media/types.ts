
export interface LocalizedString {
  [key: string]: string;
}

export interface MediaStore {
  special: LocalizedString;
  friends: LocalizedString;
}

export interface MediaStore {
  generic: LocalizedString;
  small: LocalizedString;
}

export interface Media {
  coverImage: LocalizedString;
  coverVideo: LocalizedString;
  trailers: LocalizedString;
  store: MediaStore;
  capsule: MediaStore;
}

export interface State {
  media: Media;
}