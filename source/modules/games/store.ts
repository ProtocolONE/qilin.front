import axios from 'axios';
import cloneDeep from 'lodash-es/cloneDeep';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import formatDate from '@/helpers/formatDate';
import { VueRouter } from 'vue-router/types/router';
import State from './types';
// import testData from './testData';

export default function GamesStore(apiUrl: string) {
  const state: State = {
    games: [],
    vendorId: '',
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit }, {router}: {router: VueRouter}) {
      // const games = testData;

      const vendors = await axios
        .get(`${apiUrl}/api/v1/vendors`, {params: {limit: 1}})
        .then(res => res.data || []);
      if (!vendors.length) {
        router.push({path: '/vendor/on-boarding'});
        return;
      }
      commit('vendorId', vendors[0].id);

      const games = await axios
        .get(`${apiUrl}/api/v1/vendor/${vendors[0].id}/games`)
        .then(res => res.data || []);

      const preparedGames = games.map(game => ({
        ...cloneDeep(game),
        releaseDate: formatDate(game.releaseDate, 'dd LLLL yyyy, HH:mm'),
      }))

      commit('games', preparedGames);
    },
  };
  const mutations: MutationTree<State> = {
    games: (state, value) => state.games = value,
    vendorId: (state, value) => state.vendorId = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
