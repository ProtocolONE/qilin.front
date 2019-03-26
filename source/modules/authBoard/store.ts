import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

interface State {
  accessToken: string;
}

export default function AuthStore() {
  const state: State = {
    accessToken: undefined,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    setToken({ commit }, accessToken) {
      localStorage.setItem('accessToken', accessToken);
      commit('accessToken', accessToken);
    },
  };
  const mutations: MutationTree<State> = {
    accessToken: (state, value) => state.accessToken = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
