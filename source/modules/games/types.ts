interface Genre {
  id: string;
  title: {
    en: string,
    ru: string,
  };
}

interface Price {
  price: number;
  currency: string;
}

export interface Game {
  id: string;
  internalName: string;
  icon: string;
  genres: string[];
  releaseDate: Date;
  prices: Price;
}

export interface State {
  games: Game[];
  genres: Genre[];
  vendorId: string;
}