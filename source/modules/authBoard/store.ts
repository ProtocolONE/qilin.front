import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function AuthBoardStore(apiUrl: string) {
  const state: State = {
    documents: null,
  };
  const getters: GetterTree<State, any> = {
    steps: ({ documents }) => documents ? ['company', 'contact', 'banking'] : [],
    disabled: ({ documents }) => documents && documents.status !== 'draft',
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, vendorId) {
      const documents = await axios
        .get(`${apiUrl}/vendors/${vendorId}/documents`)
        .then(response => response.data);

      commit('documents', documents);
    },
  };
  const mutations: MutationTree<State> = {
    documents: (state, value) => state.documents = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
