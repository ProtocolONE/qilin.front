import axios from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {State} from './types';

export default function BundlesStore(apiUrl: string) {
  const state: State = {
    bundles: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch }, { vendorId }: { vendorId: string }) {
      if (!vendorId) {
        return;
      }

      dispatch('fetchBundles', { vendorId });
    },

    async fetchBundles({ commit }, { sort = '', vendorId }) {
      const bundles = await axios
        .get(`${apiUrl}/vendors/${vendorId}/bundles`, {
          params: { sort: sort || undefined },
        })
        .then(res => res.data || []);

      commit('bundles', bundles);
    },
  };
  const mutations: MutationTree<State> = {
    bundles: (state, value) => state.bundles = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
