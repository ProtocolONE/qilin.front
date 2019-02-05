import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

export interface State {
  gameId: string;
}

export default function CreateGameStore(apiUrl: string) {
  const state: State = {
    gameId: '',
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    createGame({commit}, payload) {
      axios
        .post(`${apiUrl}/api/v1/games`, payload)
        .then(res => commit('updateGameId', res.data.id));
    },
  };
  const mutations: MutationTree<State> = {
    updateGameId: (state, value: string) => {state.gameId = value},
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
