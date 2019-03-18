import axios, {AxiosResponse} from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';
import { NUM_ROWS } from './constants';

export default function NotificationsStore(apiUrl: string) {
  const state: State = {
    notifications: [],
    itemsCount: 0,
    vendorId: '',
    search: '',
    page: 0,
    sort: '-createdDate',
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, state }) {
      const vendors = await axios
        .get(`${apiUrl}/vendors`, { params: { limit: 1 } })
        .then(res => res.data || []);
      if (!vendors.length) {
        return;
      }
      commit('vendorId', vendors[0].id);

      const res: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${vendors[0].id}/messages`, {
          params: {
            offset: 0,
            limit: NUM_ROWS,
            sort: state.sort,
          }
        });

      commit('setNotifys', res.data || []);
      commit('setItemsCount', res.headers['x-items-count']);
    },

    async fetchNotifys({ commit, state }) {
      const res: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${state.vendorId}/messages`, {
          params: {
            query: state.search,
            sort: state.sort,
            offset: state.page * NUM_ROWS,
            limit: NUM_ROWS
          }
        });
      commit('setNotifys', res.data || []);
      commit('setItemsCount', res.headers['x-items-count']);
    },
  };
  const mutations: MutationTree<State> = {
    setNotifys: (state, value) => state.notifications = value,
    vendorId: (state, value) => state.vendorId = value,
    setPage: (state, value) => state.page = value,
    setSort: (state, value) => state.sort = value,
    setSearch: (state, value) => state.search = value,
    setItemsCount: (state, value) => state.itemsCount = value,
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
