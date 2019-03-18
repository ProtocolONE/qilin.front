import axios from 'axios'

import { State } from './types'
import { ActionTree, MutationTree, GetterTree } from 'vuex'

import { omit, merge } from 'lodash-es'

async function sendRequest (url: string, method: string = 'get', config: object = {}) {
  try {
    let { data } = await axios({ url, method, ...config })
    return data
  }
  catch (error) {
    void console.error(error)
  }
}

// access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFtcmJCaEpXUmdlUnVRK1d0RTlzYXc9PSJ9.5AmFvsgIdEojBrwXTA5jtpi-UZJ4ZpeehKICd-f_Hj8"
// 026adb06-1256-4607-91b9-0f96b44f6c6b

export default function PricesStore (apiUrl: string) {
  const state: State = {
    contents: ['defaultCurrency', 'preorders', 'prices'],
    prices: {}
  }

  const actions: ActionTree<State, any> = {
    loadPrices: async ({ commit, getters }, gameId: string) =>
      commit('savePrices', await sendRequest(getters.getUrl('prices', gameId))),

    save: ({ state, dispatch, commit, getters }, gameId: string) =>
      sendRequest(getters.getUrl('prices', gameId), 'put', { data: omit(state.prices, 'prices') }),

    savePrice: ({ state, dispatch, commit, getters }, { gameId, currency }) => {
      let data = getters.getCurrencyPrice(currency)
      if (!data) {
        console.warn('no price data')
        return
      }
      sendRequest(getters.getUrl(`prices/${ currency }`, gameId), 'put', { data })
    }
  }

  const mutations: MutationTree<State> = {
    savePrices: (state, value: Object) => state.prices = value,
    updatePrices: (state, value: Object) => state.prices = merge(state.prices, value)
  }

  const getters: GetterTree<State, any> = {
    getUrl: () => (value: string, id: string) =>
      `${ apiUrl }/api/v1/games/${ id }/${ value }/`,

    getCurrencyPrice: ({ prices }) => (value: string) =>
      (prices.prices || []).find(({ currency }) => currency === value)
  }

  return {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
  }
}
