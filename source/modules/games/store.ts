import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import {Vendor} from './types';

export interface State {
  vendors: Vendor[]
}

export default function GamesStore(apiUrl: string) {
  const state: State = {
    vendors: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    preload({ commit }) {
      axios
        .get(`${apiUrl}/api/v1/vendors`, {params: {limit: 1}})
        .then(res => commit('updateVendors', res.data));
    },
  };
  const mutations: MutationTree<State> = {
    updateVendors: (state, value: Vendor[]) => {state.vendors = value},
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
