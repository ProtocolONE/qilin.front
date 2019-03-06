import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { VueRouter } from "vue-router/types/router";
import { State } from './types';

export default function NotificationsStore(apiUrl: string) {
  const state: State = {
    notifications: [],
    vendorId: '',
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch, state }) {
      const vendors = await axios
        .get(`${apiUrl}/api/v1/vendors`, { params: { limit: 1 } })
        .then(res => res.data || []);
      if (!vendors.length) {
        return;
      }
      commit('vendorId', vendors[0].id);

      const notifications = await axios
        .get(`${apiUrl}/api/v1/vendors/${vendors[0].id}/messages`, {
          params: {
            offset: 0,
            limit: 20
          }
        })
        .then(res => res.data || []);
      commit('notifications', notifications);
    },
  };
  const mutations: MutationTree<State> = {
    notifications: (state, value) => state.notifications = value,
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
