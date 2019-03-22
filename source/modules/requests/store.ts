import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function RequestsStore(apiUrl: string) {
  const state: State = {
    requests: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ dispatch }) {
      await dispatch('fetchRequests');
    },
    async fetchRequests({ commit }, sort = '') {
      const requests = await axios
        .get(`${apiUrl}/vendors/reviews`, {
          params: { sort: sort || undefined },
        })
        .then(res => res.data || [])
        .catch(e => []);

      commit('requests', requests);
    },
  };
  const mutations: MutationTree<State> = {
    requests: (state, value) => state.requests = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
