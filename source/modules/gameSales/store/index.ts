import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default function SalesStore(apiUrl: string) {
  actions.initState = function ({ commit, dispatch }, gameId: string) {
    commit('updateGameId', gameId)
    commit('updateApi', `${ apiUrl }/api/v1/games/`)
    dispatch('loadPrices')
    dispatch('loadDiscounts')
  }
  return {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
  }
}
