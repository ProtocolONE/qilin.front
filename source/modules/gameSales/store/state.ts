import Prices from '../types/prices'
import Discounts from '../types/discounts'

export interface State {
  id: string
  api: string
  prices: Prices
  discounts: Discounts[]
}

const state: State = {
  id: null,
  api: null,
  prices: {},
  discounts: []
}

export default state
