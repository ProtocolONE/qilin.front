import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import State from './mainTypes';

export default function MainStore(apiUrl: string, accessToken: string) {
  const state: State = {
    user: null,
  };
  const getters: GetterTree<State, any> = {
    hasAuth() {
      const token = localStorage.getItem('accessToken');
      return !!token;
    },
  };
  const actions: ActionTree<State, any> = {
    async initUser({ commit, getters }) {
      if (!getters.hasAuth) {
        return;
      }

      const user = await axios
        .get(`${apiUrl}/me`)
        .then(res => res.data.user);

      if (user) {
        commit('user', user);
        dispatch('startWatchNotifications');
      }
    },

    async logout() {
      localStorage.removeItem('accessToken');
      await axios.get('/auth1/logout', {
        withCredentials: true,
      });
      location.reload();
    },
  };
  const mutations: MutationTree<State> = {
    user: (state, value) => state.user = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
  };
}
