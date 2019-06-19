import axios, {AxiosResponse} from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {State} from './types';
import {NUM_ROWS} from './constants';

export default function PackagesStore(apiUrl: string) {
  const state: State = {
    packages: [],
    itemsCount: 0,
    foundGames: [],
    search: '',
    page: 0,
    sort: '-name',
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
      commit('setFoundGames', games);
    },

    async fetchPackages({ commit, state }, { vendorId }) {
      const res: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${vendorId}/packages`, {
          params: {
            query: state.search,
            sort: state.sort,
            offset: state.page * NUM_ROWS,
            limit: NUM_ROWS
          }
        });
      commit('setPackages', res.data || []);
      commit('setItemsCount', res.headers['x-items-count']);
    },

    async createPackage({ commit }, { name, products, vendorId }) {
      const packageId = await axios
        .post(`${apiUrl}/vendors/${vendorId}/packages`, {name, products})
        .then(res => res.data.id);
      return packageId;
    },

  };
  const mutations: MutationTree<State> = {
    setPackages: (state, value) => state.packages = value,
    setFoundGames: (state, games) => state.foundGames = games,
    setPage: (state, value) => state.page = value,
    setSort: (state, value) => state.sort = value,
    setSearch: (state, value) => state.search = value,
    setItemsCount: (state, value) => state.itemsCount = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
