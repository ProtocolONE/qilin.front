import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function MediaStore(apiUrl: string) {
  const state: State = {
    media: null,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {

    initState({ commit }) {
      axios.get(`${apiUrl}/v1/games/`)
        .then(result => commit('media', result.data))
        .catch(err => alert(err.message))
    },

  };
  const mutations: MutationTree<State> = {
    media: (state, value) => state.media = value,
  };
  return {
    state,
    getters,
    actions,
    mutations,
  };
}