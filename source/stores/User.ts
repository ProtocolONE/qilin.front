import axios from 'axios';
import { find, get, reduce } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import State from './userTypes';

export default function UserStore(apiUrl: string) {
  const state: State = {
    currentVendor: null,
    user: null,
    vendors: [],
    permissions: [],
  };
  const getters: GetterTree<State, any> = {
    hasAuth() {
      const token = localStorage.getItem('accessToken');
      return !!token;
    },
    currentVendorId({ currentVendor }) {
      return get(currentVendor, 'id', '');
    },
    userId({ user }) {
      return get(user, 'id', '');
    },
  };
  const actions: ActionTree<State, any> = {
    async initUser({ commit, getters, dispatch }, { router }) {
      if (!getters.hasAuth) {
        return;
      }

      const user = await axios
        .get(`${apiUrl}/me`)
        .then(res => get(res, 'data.user') || {});

      const vendors = await axios
        .get(`${apiUrl}/vendors`)
        .then(res => res.data || []);

      if (!user) {
        return;
      }

      commit('user', user);
      dispatch('startWatchNotifications');

      await dispatch('fetchPermissions');

      if (vendors.length) {
        commit('vendors', vendors);
        commit('currentVendor', vendors[0]);
      } else {
        router.replace({ name: 'onBoarding' });
      }
    },
    async fetchPermissions({ commit, getters }) {
      const { hasAuth, currentVendorId, userId } = getters;

      if (!hasAuth || !userId || !currentVendorId) {
        return;
      }

      const permissions = await axios
        .get(`${apiUrl}/vendors/${currentVendorId}/memberships/${userId}/permissions`)
        .then(res => get(res, 'data.permissions', null));

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
        commit('currentVendor', vendor);
        commit('vendors', [ vendor, ...state.vendors ]);
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
    async logout() {
      localStorage.removeItem('accessToken');
      await axios.get('/auth1/logout', {
        withCredentials: true,
      });
      location.reload();
    },
  };
  const mutations: MutationTree<State> = {
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
