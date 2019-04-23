import axios, { AxiosResponse } from 'axios';
import { get } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

const ROWS_LIMIT = 10;

export default function UsersStore(apiUrl: string) {
  const state: State = {
    rowsLimit: ROWS_LIMIT,
    users: [],
    usersCount: 0,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ dispatch }, { vendorId }: { vendorId: string}) {
      await dispatch('fetchUsers', { vendorId });
    },
    async fetchUsers({ commit }, { sort = '', vendorId }) {
      const response: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${vendorId}/memberships`, {
          params: { sort: sort || undefined },
        })
        .catch(e => e);
      
      const users = get(response, 'data') || [];

      commit('users', users);
      commit('usersCount', get(response, 'headers.x-items-count') || users.length);
    },
  };
  const mutations: MutationTree<State> = {
    users: (state, value) => state.users = value,
    usersCount: (state, value) => state.usersCount = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
