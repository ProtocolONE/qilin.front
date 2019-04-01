import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

const ROWS_LIMIT = 15;

export default function HistoryStore(apiUrl: string) {
  const state: State = {
    history: [],
    historyCount: 0,
    rowsLimit: ROWS_LIMIT,
    vendorId: null,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch }, vendorId) {
      commit('vendorId', vendorId);

      await dispatch('fetchHistory', {});
    },
    async fetchHistory({ commit, state }, { offset = 0, sort = ''}) {
      const response: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${state.vendorId}/messages`, {
          params: {
            limit: state.rowsLimit,
            offset,
            sort: sort || undefined,
          },
        })
        .catch(e => e);

      commit('history', get(response, 'data') || []);
      commit('historyCount', get(response, 'headers.x-items-count') || 0);
    },
  };
  const mutations: MutationTree<State> = {
    history: (state, value) => state.history = value,
    historyCount: (state, value) => state.historyCount = value,
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
