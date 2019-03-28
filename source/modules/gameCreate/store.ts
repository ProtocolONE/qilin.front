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
    createGame({commit}, { internalName, vendorId }) {
      axios
        .post(`${apiUrl}/vendor/${vendorId}/games`, { internalName })
        .then(res => commit('updateGameId', res.data.id));
    },
  };
  const mutations: MutationTree<State> = {
    updateGameId: (state, value) => state.gameId = value,
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
