import axios from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {merge} from 'lodash-es';
import {Game} from '@/modules/games/types';
import {PackageMedia} from '@/modules/packages/types';
import {DiscountPolicy, Package, PackagePrices, RegionalRestrictions, State} from './types';

export default function PackageStore(apiUrl: string) {
  const state: State = {
    packageObj: null,
    foundGames: [],
    initialPrices: [],
  };
  const getters: GetterTree<State, any> = {
    steps: () => ['general', 'media', 'prices', 'discount', 'regional'],
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, packageId: string) {
      const pkg: Package = await axios
        .get(`${apiUrl}/packages/${packageId}`)
        .then(({ data }) => data);
      commit('updatePackage', pkg);
      commit('updateInitialPrices');
    },

    async save({state, commit}) {
      await axios.put(`${apiUrl}/packages/${state.packageObj.id}`, state.packageObj);
      commit('updateInitialPrices');
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

    async addProducts({commit, state}, productIds) {
      const pkg = await axios
        .post(`${apiUrl}/packages/${state.packageObj.id}/products`, productIds)
        .then(res => res.data || []);

      commit('updatePackage', pkg);
    },

    async removeProducts({commit, state}, productIds) {
      const pkg = await axios
        .delete(`${apiUrl}/packages/${state.packageObj.id}/products`, {data: productIds})
        .then(res => res.data || []);

      commit('updatePackage', pkg);
    },
  };
  const mutations: MutationTree<State> = {
    updatePackage: (state, pkg: Package) => {
      state.packageObj = pkg;
    },

    updateMedia: (state, media: PackageMedia) => {
      state.packageObj = {...state.packageObj, media};
    },

    updatePrices: (state, prices: PackagePrices) => {
      state.packageObj = {
        ...state.packageObj,
        commercial: merge(state.packageObj.commercial, prices),
      };
    },

    updateDiscount: (state, discount: DiscountPolicy) => {
      state.packageObj = {
        ...state.packageObj,
        discountPolicy: {
          ...state.packageObj.discountPolicy,
          ...discount,
        },
      };
    },

    updateRegional: (state, regional: RegionalRestrictions) => {
      state.packageObj = {
        ...state.packageObj,
        regionalRestrinctions: regional,
      };
    },

    removeCurrency(state, name) {
      state.packageObj = {
        ...state.packageObj,
        commercial: {
          ...state.packageObj.commercial,
          prices: (state.packageObj.commercial.prices || [])
            .filter(({currency}) => name !== currency)
        }
      };
      if (state.packageObj.commercial.common.currency === name) {
        const prices = (state.packageObj.commercial.prices || []);
        const def = prices.length ? prices[0].currency : '';
        state.packageObj = {
          ...state.packageObj,
          commercial: {
            ...state.packageObj.commercial,
            common: {
              ...state.packageObj.commercial.common,
              currency: def,
            }
          },
        };
      }
    },

    addCurrency(state, currency) {
      const prices = (state.packageObj.commercial.prices || []);

      state.packageObj = {
        ...state.packageObj,
        commercial: {
          ...state.packageObj.commercial,
          prices: prices
            .concat({
              currency: currency.value,
              price: currency.price,
              vat: 0,
              edit: true,
            })
        }
      };
      if (!prices.length) {
        state.packageObj = {
          ...state.packageObj,
          commercial: {
            ...state.packageObj.commercial,
            common: {
              ...state.packageObj.commercial.common,
              currency: currency.value,
            }
          },
        };
      }
    },

    updateInitialPrices: (state) => {
      state.initialPrices = (state.packageObj.commercial.prices || [])
        .map(({currency}) => currency);
    },

    updateFoundGames: (state, games: Game[]) => {
      state.foundGames = state.packageObj.products
        ? games.filter(
          game => !state.packageObj.products.find(
            product => product.id === game.id
          ))
        : games;
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
