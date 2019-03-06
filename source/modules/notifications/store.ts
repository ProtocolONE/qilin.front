import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { VueRouter } from "vue-router/types/router";
import { State } from './types';

export default function NotificationsStore(apiUrl: string) {
  const state: State = {
    notifications: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch }, { router }: { router: VueRouter }) {
      const notifications = await axios
        .get(`${apiUrl}/api/v1/notifications`, { params: { limit: 1 } })
        .then(res => res.data || []);
      commit('notifications', notifications);
    },
  };
  const mutations: MutationTree<State> = {
    notifications: (state, value) => state.notifications = value,
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
