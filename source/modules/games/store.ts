import axios from 'axios';
import cloneDeep from 'lodash-es/cloneDeep';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import formatDate from '@/helpers/formatDate';
import State from './types';
import testData from './testData';

export default function GamesStore(apiUrl: string) {
  const state: State = {
    games: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit }, { vendorId: string }) {
      const games = testData;
      
      // const games = await axios
      //   .get(`${apiUrl}/v1/vendors/${vendorId}/games`)
      //   .then(result => result || []);

      const preparedGames = games.map(game => ({
        ...cloneDeep(game),
        releaseDate: formatDate(game.releaseDate, 'dd LLLL yyyy, HH:mm'),
      }))

      commit('games', preparedGames);
    },
  };
  const mutations: MutationTree<State> = {
    games: (state, value) => state.games = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
