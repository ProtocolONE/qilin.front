import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

const ROWS_LIMIT = 10;

export default function RequestsStore(apiUrl: string) {
  const state: State = {
    requests: [],
    requestsCount: 0,
    rowsLimit: ROWS_LIMIT,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ dispatch }) {
      await dispatch('fetchRequests', {});
    },
    async fetchRequests({ commit, state }, { offset = 0, sort = ''}) {
      const response: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/reviews`, {
          params: {
            limit: state.rowsLimit,
            offset,
            sort: sort || undefined,
          },
        })
        .catch(e => e);

      commit('requests', get(response, 'data') || []);
      commit('requestsCount', get(response, 'headers.x-items-count') || 0);
    },
  };
  const mutations: MutationTree<State> = {
    requests: (state, value) => state.requests = value,
    requestsCount: (state, value) => state.requestsCount = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
