interface Genre {
  id: number;
  title: {
    en: string,
    ru: string,
  };
}

export interface Price {
  price: number;
  currency: string;
}

export interface Game {
  id: string;
  internalName: string;
  icon: string;
  genres: number[];
  releaseDate: Date;
  prices: Price;
}

export interface State {
  games: Game[];
  genres: Genre[];
}
