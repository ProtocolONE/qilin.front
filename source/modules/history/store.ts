import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function HistoryStore(apiUrl: string) {
  const state: State = {
    history: [],
    vendorId: null,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch }, vendorId) {
      commit('vendorId', vendorId);

      await dispatch('fetchHistory');
    },
    async fetchHistory({ commit, state }, sort = '') {
      const history = await axios
        .get(`${apiUrl}/vendors/${state.vendorId}/messages`, {
          params: { sort: sort || undefined },
        })
        .then(res => res.data || [])
        .catch(e => []);

      commit('history', history);
    },
  };
  const mutations: MutationTree<State> = {
    history: (state, value) => state.history = value,
    vendorId: (state, value) => state.vendorId = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
