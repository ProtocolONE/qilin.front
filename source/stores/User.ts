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
    hasAccessToModule: (
      { permissions, nextRoute },
      { currentVendorId }
    ) => (resourceId: string = '') => {
      const hasPermissions = !isEmpty(permissions);
      const requiresPermissions = get(nextRoute, 'meta.requiresPermissions', true);

      if (!hasPermissions && requiresPermissions) {
        return false;
      }

      const requiresAbsenceVendor = get(nextRoute, 'meta.requiresAbsenceVendor', false);

      if (requiresAbsenceVendor && currentVendorId) {
        return false;
      }

      const uuid = resourceId || '*';
      const module = get(nextRoute, 'meta.permissions', '');
      const permission = hasPermissions
        ? get(permissions[module], uuid, get(permissions[module], '*'))
        : null;
      const action = get(permission, 'action', '');
      const hasAccess = includes(['any', 'read', '*'], action);
      
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
    async initUser({ commit, dispatch, getters }) {
      const requiresAbsenceVendor = get(router.currentRoute, 'meta.requiresAbsenceVendor', false);

      if (!requiresAbsenceVendor) {
        commit('nextRoute', router.currentRoute);
      }

      await dispatch('fetchUser');
      await dispatch('fetchVendors');
      await dispatch('fetchPermissions');

      if (requiresAbsenceVendor) {
        commit('nextRoute', router.currentRoute);
      }

      dispatch('startWatchNotifications');
    },
    async fetchUser({ commit, dispatch, getters }) {
      const user = await axios
        .get(`${apiUrl}/me`)
        .then(res => get(res, 'data.user') || null)
        .catch(() => null);

      if (getters.hasAuth && !user) {
        dispatch('refreshToken');
        return;
      }

      commit('user', user);
    },
    async fetchVendors({ commit }) {
      const vendors = await axios
        .get(`${apiUrl}/vendors`)
        .then(res => get(res, 'data') || null)
        .catch(() => null);

      if (vendors && vendors.length) {
        commit('vendors', vendors);
        commit('currentVendor', vendors[0]);
      }
    },
    async fetchPermissions({ commit, getters }) {
      const { hasAuth, currentVendorId, userId } = getters;

      if (!hasAuth || !userId) {
        return;
      }

      const permissions = await axios
        .get(`${apiUrl}/vendors/${currentVendorId}/memberships/${userId}/permissions`)
        .then(res => get(res, 'data.permissions') || null)
        .catch(() => null);

      if (permissions) {
        commit('permissions', preparePermissions(permissions));
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
            router.push({ name: 'authBoard' });
          }
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          router.push({ name: 'authBoard' });
        });
    },
    async logout() {
      localStorage.removeItem('accessToken');
      await axios
        .get(`${authApiUrl}/auth1/logout`, { withCredentials: true })
        .catch(() => null);
      router.push({ name: 'authBoard' });
    },
    setToken({ commit }, accessToken) {
      localStorage.setItem('accessToken', accessToken);
      commit('accessToken', accessToken);

      const [ vendorId, inviteId ] = (localStorage.getItem('inviteData') || ';').split(';');

      if (vendorId && inviteId) {
        router.replace({ name: 'invite', params: { vendorId, inviteId } });
      } else {
        router.go(0);
      }
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

function preparePermissions(perms) {
  return restructurePermissions(
    unifiqPermissions(
      filterPermissions(perms),
    ),
  );
}
function restructurePermissions(perms) {
  return reduce(
    perms,
    (permObject, perm) => {
      const prePermResource = get(permObject, `${perm.resource}`);
      const prePerm = get(permObject, `${perm.resource}.${perm.uuid}`);

      if (!prePermResource) {
        return {
          ...permObject,
          [perm.resource]: {
            [perm.uuid]: { action: perm.action },
          },
        };
      }

      if (!prePerm) {
        const allPrePerm = get(prePermResource, '*');

        return {
          ...permObject,
          [perm.resource]: {
            ...prePermResource,
            [perm.uuid]: allPrePerm
              ? mergePermissions(allPrePerm, perm)
              : { action: perm.action },
          },
        };
      }

      return {
        ...permObject,
        [perm.resource]: {
          ...prePermResource,
          [perm.uuid]: mergePermissions(prePerm, perm),
        },
      };
    },
    {},
  );
}
function unifiqPermissions(perms) {
  return perms.map(perm => ({
    ...perm,
    uuid: perm.uuid === 'skip' ? '*' : perm.uuid,
  }));
}
function filterPermissions(perms) {
  return perms.filter(perm => perm.allowed);
}
function mergePermissions(perm1: any, perm2: any) {
  const action1 = perm1.action;
  const action2 = perm2.action;
  const anyArr = ['any', '*'];
  const action1IsAny = includes(anyArr, action1);
  const action2IsAny = includes(anyArr, action2);
  const action = (action1IsAny || action2IsAny || action1 !== action2) ? 'any' : action1;

  return { action };
}
