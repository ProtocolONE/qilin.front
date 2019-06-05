import axios from 'axios';
import {ActionTree, GetterTree, MutationTree} from 'vuex';
import {State} from './types';

export default function GamesStore(apiUrl: string) {
  const state: State = {
    games: [],
    genres: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch }, { vendorId }: { vendorId: string }) {
      if (!vendorId) {
        return;
      }

      dispatch('fetchGames', { vendorId });

      const genres = await axios
        .get(`${apiUrl}/genres`)
        .then(response => response.data);
      commit('genres', genres);
    },

    async fetchGames({ commit }, { sort = '', vendorId }) {
      const games = await axios
        .get(`${apiUrl}/vendors/${vendorId}/games`, {
          params: { sort: sort || undefined },
        })
        .then(res => res.data || []);

      commit('games', games);
    },
  };
  const mutations: MutationTree<State> = {
    games: (state, value) => state.games = value,
    genres: (state, value) => state.genres = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
