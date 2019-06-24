import axios from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {Bundle, State} from './types';
import {DiscountPolicy, Package, RegionalRestrictions} from "@/modules/package/types";

export default function BundleStore(apiUrl: string) {
  const state: State = {
    bundle: null,
    foundPackages: [],
  };
  const getters: GetterTree<State, any> = {
    steps: () => ['general', 'discount', 'regional'],
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, bundleId: string) {
      const bundle: Bundle = await axios
        .get(`${apiUrl}/bundles/${bundleId}/store`)
        .then(({ data }) => data);
      commit('updateBundle', bundle);
    },

    async save({state, commit}) {
      await axios.put(`${apiUrl}/bundles/${state.bundle.id}/store`, state.bundle);
    },

    async fetchPackages({commit}, {sort = '-releaseDate', query = '', vendorId}) {
      const packages = await axios
        .get(`${apiUrl}/vendors/${vendorId}/packages`, {
          params: {
            limit: 5,
            sort: sort || undefined,
            name: query || undefined
          },
        })
        .then(res => res.data || []);

      commit('updateFoundPackages', packages);
    },

    async addPackages({commit, state}, packageIds) {
      const bundle = await axios
        .post(`${apiUrl}/bundles/${state.bundle.id}/packages`, packageIds)
        .then(res => res.data || []);

      commit('updateBundle', bundle);
    },

    async removePackages({commit, state}, packageIds) {
      const bundle = await axios
        .delete(`${apiUrl}/bundles/${state.bundle.id}/packages`, {data: packageIds})
        .then(res => res.data || []);

      commit('updateBundle', bundle);
    },
  };
  const mutations: MutationTree<State> = {
    updateBundle: (state, bundle: Bundle) => {
      state.bundle = bundle
    },

    updateDiscount: (state, discount: DiscountPolicy) => {
      state.bundle = {
        ...state.bundle,
        discountPolicy: {
          ...state.bundle.discountPolicy,
          ...discount,
        },
      };
    },

    updateRegional: (state, regional: RegionalRestrictions) => {
      state.bundle = {
        ...state.bundle,
        regionalRestrinctions: regional,
      };
    },

    updateFoundPackages: (state, packages: Package[]) => {
      state.foundPackages = state.bundle.packages
        ? packages.filter(
          pkg => !state.bundle.packages.find(
            bundlePkg => bundlePkg.id === pkg.id
          ))
        : packages;
    },
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
