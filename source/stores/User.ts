import axios from 'axios';
import VueRouter from 'vue-router';
import { find, get, includes, reduce } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import State from './userTypes';

export default function UserStore(apiUrl: string, router: VueRouter) {
  const state: State = {
    accessToken: localStorage.getItem('accessToken') || null,
    currentVendor: null,
    user: null,
    vendors: null,
    permissions: null,
  };
  const getters: GetterTree<State, any> = {
    currentVendorId({ currentVendor }) {
      return get(currentVendor, 'id', '');
    },
    hasAccessToModule({ permissions }) {
      return includes(['any', 'read'], get(permissions, `${router.currentRoute.name}.action`, ''));
    },
    hasAuth({ accessToken }) {
      return !!accessToken;
    },
    userId({ user }) {
      return get(user, 'id', '');
    },
  };
  const actions: ActionTree<State, any> = {
    async initUser({ commit, getters, dispatch }) {
      const user = await axios
        .get(`${apiUrl}/me`)
        .then(res => get(res, 'data.user') || null)
        .catch(() => null);

      if (getters.hasAuth && !user) {
        dispatch('refreshToken');
        return;
      }

      commit('user', user);

      const vendors = await axios
        .get(`${apiUrl}/vendors`)
        .then(res => get(res, 'data') || null)
        .catch(() => null);

      if (vendors && vendors.length) {
        commit('vendors', vendors);
        commit('currentVendor', vendors[0]);
      }

      await dispatch('fetchPermissions');

      dispatch('startWatchNotifications');
    },
    async fetchPermissions({ commit, getters }) {
      const { hasAuth, currentVendorId, userId } = getters;

      if (!hasAuth || !userId || !currentVendorId) {
        return;
      }

      const permissions = await axios
        .get(`${apiUrl}/vendors/${currentVendorId}/memberships/${userId}/permissions`)
        .then(res => get(res, 'data.permissions') || null)
        .catch(() => null);

      if (permissions) {
        commit('permissions', reduce(
          permissions,
          (permObject, perm) => ({ ...permObject, [perm.resource]: perm }),
          {}
        ));
      }
    },
    async createVendor({ commit, state }, query) {
      const domain3 = query.name
        .toLowerCase()
        .replace(' ', '')
        .replace(/^\d+/, '');
      const name = query.name;
      const email = `${domain3}@protocol.one`;
      const howManyProducts = query.howManyProds;

      const vendor = await axios
        .post(
          `${apiUrl}/vendors`,
          { name, domain3, email, howManyProducts }
        )
        .then(res => res.data);

      if (vendor) {
        const vendors = state.vendors || [];
        commit('currentVendor', vendor);
        commit('vendors', [ vendor, ...vendors ]);
      }
    },
    changeCurrentVendor({ commit, state }, vendorId) {
      const currentVendor = find(
        state.vendors,
        ({ id }: { id: string }) => id === vendorId,
      );

      if (currentVendor) {
        commit('currentVendor', currentVendor);
      }
    },
    async refreshToken({ dispatch }) {
      await axios
        .get(`${apiUrl}/auth1/refresh`, { withCredentials: true })
        .then((response) => {
          const accessToken = get(response, 'data.access_token', null);

          if (accessToken) {
            dispatch('setToken', accessToken);
          } else {
            dispatch('logout');
          }
        })
        .catch(() => { dispatch('logout') });
    },
    async logout() {
      localStorage.removeItem('accessToken');
      await axios
        .get(`${apiUrl}/auth1/logout`, { withCredentials: true })
        .catch(() => null);
      router.replace({ name: 'authBoard' });
    },
    setToken({ commit }, accessToken) {
      localStorage.setItem('accessToken', accessToken);
      commit('accessToken', accessToken);
      router.go(0);
    },
  };
  const mutations: MutationTree<State> = {
    accessToken: (state, value) => state.accessToken = value,
    currentVendor: (state, value) => state.currentVendor = value,
    permissions: (state, value) => state.permissions = value,
    user: (state, value) => state.user = value,
    vendors: (state, value) => state.vendors = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
  };
}
