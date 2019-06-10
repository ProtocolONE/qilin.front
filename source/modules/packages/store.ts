import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function PackagesStore(apiUrl: string) {
  const state: State = {
    packages: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch }, { vendorId }: { vendorId: string }) {
      if (!vendorId) {
        return;
      }

      dispatch('fetchPackages', { vendorId });
    },

    async fetchPackages({ commit }, { sort = '', vendorId }) {
      const packages = await axios
        .get(`${apiUrl}/vendors/${vendorId}/packages`, {
          params: { sort: sort || undefined },
        })
        .then(res => res.data || []);

      commit('packages', packages);
    },
  };
  const mutations: MutationTree<State> = {
    packages: (state, value) => state.packages = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
