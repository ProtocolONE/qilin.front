import axios from 'axios';
import qs from 'querystring';
import i18n from '@/i18n';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import State from './mainTypes';

export default function MainStore(apiUrl: string, accessToken: string) {
  const state: State = {
    user: null,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initUser({ commit }) {
      const user = await axios
        .get(`${apiUrl}/me`)
        .then(res => res.data.user);

      if (user) {
        commit('user', user);
      }
    },
    /**
     * Login with adding accessToken to axios
     * @param {Any} query
     */
    async login({ commit }, query: any) {
      const { user, newAccessToken } = await axios
        .post(`${apiUrl}/auth-api/login`, qs.stringify(query))
        .then(res => ({
          user: res.data.user,
          newAccessToken: res.data.access_token,
        }));

        if (user) {
          i18n.locale = user.lang;

          commit('user', user);
        }
        if (newAccessToken && newAccessToken !== accessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

          location.reload();
        }
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
