export interface Price {
  currency: string
  vat: number
  price: number
}

export interface Prices {
  common?: Object
  preOrder?: Object
  prices?: Price[]
}

export interface State {
  contents: Array<string>
  prices: Prices
}
