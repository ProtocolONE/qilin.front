import axios from 'axios';
import VueRouter from 'vue-router';
import { find, get, includes, isEmpty, reduce } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import State from './userTypes';

export default function UserStore(apiUrl: string, authApiUrl: string, router: VueRouter) {
  const state: State = {
    accessToken: localStorage.getItem('accessToken') || null,
    currentVendor: null,
    nextRoute: null,
    permissions: null,
    user: null,
    vendors: null,
  };
  const getters: GetterTree<State, any> = {
    currentVendorId({ currentVendor }) {
      return get(currentVendor, 'id', '');
    },
    hasAccessToModule({ permissions, nextRoute }) {
      const hasPermissions = !isEmpty(permissions);
      const requiresPermissions = get(nextRoute, 'meta.requiresPermissions', true);
      const module = get(nextRoute, 'meta.permissions', '');
      const permission = hasPermissions ? permissions[module] : null;
      const allowed = get(permission, 'allowed', false);
      const action = get(permission, 'action', '');
      const hasAccess = allowed && includes(['any', 'read'], action);

      if (!hasPermissions && requiresPermissions) {
        return false;
      }
      
      if (hasAccess || !requiresPermissions) {
        return true;
      }

      return false;
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
      commit('nextRoute', router.currentRoute);

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
      } else {
        router.replace({ name: 'onBoarding' });
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
    async createVendor({ commit, dispatch, state }, query) {
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

        await dispatch('fetchPermissions');
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
        .get(`${authApiUrl}/auth1/refresh`, { withCredentials: true })
        .then((response) => {
          const accessToken = get(response, 'data.access_token', null);

          if (accessToken) {
            dispatch('setToken', accessToken);
          } else {
            localStorage.removeItem('accessToken');
            router.replace({ name: 'authBoard' });
          }
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          router.replace({ name: 'authBoard' });
        });
    },
    async logout() {
      localStorage.removeItem('accessToken');
      await axios
        .get(`${authApiUrl}/auth1/logout`, { withCredentials: true })
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
    nextRoute: (state, value) => state.nextRoute = value,
    permissions: (state, value) => state.permissions = value,
    vendors: (state, value) => state.vendors = value,
    user: (state, value) => state.user = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
  };
}
