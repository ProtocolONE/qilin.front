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

interface Game {
  id: string;
  technicalName: string;
  icon: string;
  genres: Genre[];
  releaseDate: Date;
  prices: Price;
}

export default interface State {
  games: Game[];
}