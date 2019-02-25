import axios from 'axios'

import { State } from './state'
import { ActionTree } from 'vuex'
import Discounts from '../types/discounts'

async function sendRequest (url: string, method: string = 'get', config: object = {}) {
  try {
    let { data } = await axios({ url, method, ...config })
    return data
  }
  catch (error) {
    void console.error(error)
  }
}

const actions: ActionTree<State, any> = {
  loadPrices: async ({ state, commit, getters }) =>
    void commit('updatePrices', await sendRequest(getters.getUrl('prices'))),

  loadDiscounts: async ({ state, commit, getters }) =>
    void commit('updateDiscounts', await sendRequest(getters.getUrl('discounts'))),

  createDiscount: async ({ state, dispatch, commit, getters }, discount: Discounts) => {
    let url = getters.getUrl('discounts')
    void await sendRequest(url, 'post', { data: discount })
    void dispatch('loadDiscounts')
  },

  updateDiscount: async ({ state, dispatch, commit, getters }, discount: Discounts) => {
    let url = getters.getUrl('discounts') + discount.id
    void await sendRequest(url, 'put', { data: discount })
    void dispatch('loadDiscounts')
  },

  removeDiscount: async ({ state, dispatch, commit, getters }, id: (string | number)) => {
    let url = getters.getUrl('discounts') + id
    void await sendRequest(url, 'delete')
    void dispatch('loadDiscounts')
  }
}

export default actions
