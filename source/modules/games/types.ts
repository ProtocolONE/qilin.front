interface Genre {
  id: number;
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
  genres: number[];
  releaseDate: Date;
  sales: Sale;
}

export interface State {
  rowsLimit: number;
  games: Game[];
  genres: Genre[];
  gamesCount: number;
}
