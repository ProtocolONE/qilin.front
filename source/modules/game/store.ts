import { GetterTree, ActionTree, MutationTree } from 'vuex';
import axios from 'axios';
import MediaStore from '@/modules/gameMedia/store';
import {GameInfo} from './types';

export interface ContentsItem {
  anchor: string;
  text: string;
}

export interface State {
  gameInfo: GameInfo;
  contents: ContentsItem[],
}

export default function GameStore(apiUrl: string) {
  const state: State = {
    gameInfo: null,
    contents: [{text: 'Cover', anchor: 'cover'}],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    saveGame({ commit }, gameId) {
      this.dispatch('Game/Media/clickSave', gameId);
    },
    initState({ commit }, gameId: string) {
      axios
        .get(`${apiUrl}/api/v1/games/${gameId}`)
        .then(result => {
          commit('updateGame', result.data);
        });
    },
  };
  const mutations: MutationTree<State> = {
    updateGame: (state, value: GameInfo) => {state.gameInfo = value},
    updateContents: (state, value: ContentsItem[]) => {state.contents = value},
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
    modules: {
      Media: MediaStore(apiUrl),
    }
  };



}
