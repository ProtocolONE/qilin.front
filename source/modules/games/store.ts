import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

const ROWS_LIMIT = 10;

export default function GamesStore(apiUrl: string) {
  const state: State = {
    rowsLimit: ROWS_LIMIT,
    games: [],
    genres: [],
    gamesCount: 0,
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
      const response: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${vendorId}/games`, {
          params: { sort: sort || undefined },
        })
        .catch(e => e);
      
      const games = get(response, 'data') || [];

      commit('games', games);
      commit('gamesCount', get(response, 'headers.x-items-count') || games.length);
    },
  };
  const mutations: MutationTree<State> = {
    games: (state, value) => state.games = value,
    genres: (state, value) => state.genres = value,
    gamesCount: (state, value) => state.gamesCount = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
