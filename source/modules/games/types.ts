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
  genres: Genre[];
  releaseDate: Date;
  prices: Price;
}

export interface State {
  games: Game[];
  vendorId: string;
}