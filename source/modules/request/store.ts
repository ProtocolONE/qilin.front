import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import defaultCountries from '@/helpers/defaultCountries';
import defaultCurrencies from '@/helpers/defaultCurrencies';
import { State } from './types';

export default function DocumentsStore(apiUrl: string) {
  const state: State = {
    countries: defaultCountries,
    currencies: defaultCurrencies,
    request: null,
    vendorId: null,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit }, vendorId) {
      const request = await axios
        .get(`${apiUrl}/vendors/${vendorId}/documents`)
        .then(response => response.data)
        .catch(e => {});

      commit('vendorId', vendorId);
      commit('request', request);
    },
    async changeStatus({ commit, state }, { status, message }) {
      await axios.put(`${apiUrl}/vendors/${state.vendorId}/documents`, { message, status });

      commit('status', status);
    },
  };
  const mutations: MutationTree<State> = {
    status: (state, status) => state.request = { ...state.request, status },
    request: (state, value) => state.request = value,
    vendorId: (state, value) => state.vendorId = value,
    banking: (state, banking) => state.request = {
      ...state.request,
      banking: {
        ...state.request.banking,
        ...banking,
      },
    },
    company: (state, company) => state.request = {
      ...state.request,
      company: {
        ...state.request.company,
        ...company,
      },
    },
    contact: (state, contact) => state.request = {
      ...state.request,
      contact: {
        ...state.request.contact,
        ...contact,
      },
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
