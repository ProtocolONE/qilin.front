import axios from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {State} from './types';

export default function PackagesStore(apiUrl: string) {
  const state: State = {
    packages: [],
    foundGames: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch }, { vendorId }: { vendorId: string }) {
      if (!vendorId) {
        return;
      }

      dispatch('fetchPackages', { vendorId });
    },

    async fetchGames({commit}, {sort = '-releaseDate', query = '', vendorId}) {
      const games = await axios
        .get(`${apiUrl}/vendors/${vendorId}/games`, {
          params: {
            limit: 5,
            sort: sort || undefined,
            internalName: query || undefined
          },
        })
        .then(res => res.data || []);

      commit('updateFoundGames', games);
    },

    async fetchPackages({ commit }, { sort = '', search, vendorId }) {
      const packages = await axios
        .get(`${apiUrl}/vendors/${vendorId}/packages`, {
          params: {
            sort: sort || undefined,
            query: search || undefined,
          },
        })
        .then(res => res.data || []);

      commit('packages', packages);
    },

    async createPackage({ commit }, { name, products, vendorId }) {
      const packageId = await axios
        .post(`${apiUrl}/vendors/${vendorId}/packages`, {name, products})
        .then(res => res.data.id);

      return packageId;
    },

  };
  const mutations: MutationTree<State> = {
    packages: (state, value) => state.packages = value,
    updateFoundGames: (state, games) => state.foundGames = games,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
