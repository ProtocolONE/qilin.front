import axios, {AxiosResponse} from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {State} from './types';
import {NUM_ROWS} from './constants';

export default function BundlesStore(apiUrl: string) {
  const state: State = {
    bundles: [],
    foundPackages: [],
    itemsCount: 0,
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

      dispatch('fetchBundles', { vendorId });
    },

    async fetchBundles({ commit, state }, { vendorId }) {
      const res: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${vendorId}/bundles/store`, {
          params: {
            query: state.search,
            sort: state.sort,
            offset: state.page * NUM_ROWS,
            limit: NUM_ROWS
          }
        });
      commit('setBundles', res.data || []);
      commit('setItemsCount', res.headers['x-items-count']);
    },

    async fetchPackages({ commit }, { sort = '-date', query = '', vendorId }) {
      const res: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${vendorId}/packages`, {
          params: {
            limit: 5,
            sort: sort || undefined,
            query: query || undefined
          }
        });
      commit('setFoundPackages', res.data || []);
    },

    async createBundle({ commit }, { name, packages, vendorId }) {
      const bundleId = await axios
        .post(`${apiUrl}/vendors/${vendorId}/bundles/store`, {name, packages})
        .then(res => res.data.id);
      return bundleId;
    },

  };
  const mutations: MutationTree<State> = {
    setBundles: (state, value) => state.bundles = value,
    setPage: (state, value) => state.page = value,
    setSort: (state, value) => state.sort = value,
    setSearch: (state, value) => state.search = value,
    setItemsCount: (state, value) => state.itemsCount = value,
    setFoundPackages: (state, packages) => state.foundPackages = packages,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
