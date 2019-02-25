import { State } from './state'
import { MutationTree } from 'vuex'

import Prices from '../types/prices'
import Discounts from '../types/discounts'

function mapDiscounts (list: Discounts[]) {
  return list.map(item => ({
    ...item
  }))
}

const mutations: MutationTree<State> = {
  updateGameId: (state, value: string) => state.id = value,
  updateApi: (state, value: string) => state.api = value,
  updatePrices: (state, value: Prices) => state.prices = value,
  updateDiscounts: (state, value: Discounts[]) => state.discounts = mapDiscounts(value)
}

export default mutations
