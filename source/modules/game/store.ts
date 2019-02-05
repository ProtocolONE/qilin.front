import { GetterTree, ActionTree, MutationTree } from 'vuex';
import axios from 'axios';
import { GameInfo } from './types';
import anchors from './anchors';

export interface State {
  game: GameInfo;
  currentTab: string;
  wait: boolean;
  anchors: { [key: string]: any };
}

export default function GameStore(apiUrl: string) {
  const state: State = {
    game: null,
    currentTab: 'General',
    wait: false,
    anchors: anchors.messages.en,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    preload({ commit }, gameId) {
      commit('wait', true);
      axios
        .get(`${apiUrl}/api/v1/games/${gameId}`)
        .then(res => commit('game', res.data))
        .finally(() => commit('wait', false));
    },
  };
  const mutations: MutationTree<State> = {
    wait: (state, value: boolean) => (state.wait = value),
    game: (state, value: GameInfo) => (state.game = value),
    selectTab: (state, value: string) => (state.currentTab = value),
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
