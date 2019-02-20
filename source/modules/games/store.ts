import axios from 'axios';
import cloneDeep from 'lodash-es/cloneDeep';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import formatDate from '@/helpers/formatDate';
import { VueRouter } from "vue-router/types/router";
import { Game, State } from './types';

export default function GamesStore(apiUrl: string) {
  const state: State = {
    games: [],
    genres: [],
    vendorId: '',
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit }, {router}: {router: VueRouter}) {
      const vendors = await axios
        .get(`${apiUrl}/api/v1/vendors`, { params: { limit: 1 } })
        .then(res => res.data || []);
      if (!vendors.length) {
        router.push({path: '/vendor/on-boarding'});
        return;
      }
      commit('vendorId', vendors[0].id);

      const games = await axios
        .get(`${apiUrl}/api/v1/vendor/${vendors[0].id}/games`)
        .then(res => res.data || []);

      const preparedGames = games.map((game: Game) => ({
        ...cloneDeep(game),
        releaseDate: formatDate(new Date(game.releaseDate), 'dd LLLL yyyy, HH:mm'),
      }))

      commit('games', preparedGames);

      const genres = await axios
        .get(`${apiUrl}/api/v1/genres`)
        .then(response => response.data);
      commit('genres', genres);
    },
  };
  const mutations: MutationTree<State> = {
    games: (state, value) => state.games = value,
    genres: (state, value) => state.genres = value,
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
