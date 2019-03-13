import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State, NUM_ROWS } from './types';

export default function NotificationsStore(apiUrl: string) {
  const state: State = {
    notifications: [],
    vendorId: '',
    search: '',
    page: 0,
    sort: '-createdDate',
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, state }) {
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
            limit: NUM_ROWS,
            sort: state.sort,
          }
        })
        .then(res => res.data || []);
      commit('setNotifys', notifications);
    },

    async fetchNotifys({ commit, state }) {
      const notifications = await axios
        .get(`${apiUrl}/api/v1/vendors/${state.vendorId}/messages`, {
          params: {
            query: state.search,
            sort: state.sort,
            offset: state.page * NUM_ROWS,
            limit: NUM_ROWS
          }
        })
        .then(res => res.data || []);
      commit('setNotifys', notifications);
    },
  };
  const mutations: MutationTree<State> = {
    setNotifys: (state, value) => state.notifications = value,
    vendorId: (state, value) => state.vendorId = value,
    setPage: (state, value) => state.page = value,
    setSort: (state, value) => state.sort = value,
    setSearch: (state, value) => state.search = value,
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
