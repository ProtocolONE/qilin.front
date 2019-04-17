import axios from 'axios';
import { includes } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { VueRouter } from "vue-router/types/router";
import { State } from './types';

export default function GamesStore(apiUrl: string) {
  const state: State = {
    games: [],
    genres: [],
    vendorId: '',
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch }, { router }: { router: VueRouter }) {
      const vendors = await axios
        .get(`${apiUrl}/vendors`, { params: { limit: 1 } })
        .then(res => res.data || []);
      if (!vendors.length) {
        router.push({path: '/vendor/on-boarding'});
        return;
      }
      commit('vendorId', vendors[0].id);

      dispatch('fetchGames');

      const genres = await axios
        .get(`${apiUrl}/genres`)
        .then(response => response.data);
      commit('genres', genres);
    },

    async fetchGames({ commit, state }, sort = '') {
      const games = await axios
        .get(`${apiUrl}/vendors/${state.vendorId}/games`, {
          params: { sort: sort || undefined },
        })
        .then(res => res.data || []);

      commit('games', games);
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
