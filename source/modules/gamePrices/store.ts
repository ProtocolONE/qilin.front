import axios from 'axios'

import { State } from './types'
import { ActionTree, MutationTree, GetterTree } from 'vuex'

import { merge } from 'lodash-es'

async function sendRequest (url: string, method: string = 'get', config: object = {}) {
  try {
    let { data } = await axios({ url, method, ...config })
    return data
  }
  catch (error) {
    void console.error(error)
  }
}

export default function PricesStore (apiUrl: string) {
  const state: State = {
    contents: ['defaultCurrency', 'preorders', 'prices'],
    prices: {}
  }

  const actions: ActionTree<State, any> = {
    loadPrices: async ({ commit, getters }, gameId: string) =>
      commit('savePrices', await sendRequest(getters.getUrl('prices', gameId))),

    save: async ({ state, dispatch, commit, getters }, gameId: string) =>
      sendRequest(getters.getUrl('prices', gameId), 'put', { data: state.prices })
  }

  const mutations: MutationTree<State> = {
    savePrices: (state, value: Object) => state.prices = value,
    updatePrices: (state, value: Object) => state.prices = merge(state.prices, value)
  }

  const getters: GetterTree<State, any> = {
    getUrl: () => (value: string, id: string) =>
      `${ apiUrl }/api/v1/games/${ id }/${ value }/`
  }

  return {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
  }
}
