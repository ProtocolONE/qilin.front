import axios, { AxiosResponse } from 'axios';
import { find, findIndex, get, map, reduce, union } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

const ROWS_LIMIT = 10;

export default function UsersStore(apiUrl: string) {
  const state: State = {
    rowsLimit: ROWS_LIMIT,
    users: [],
    usersCount: 0,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ dispatch }, { vendorId }: { vendorId: string}) {
      await dispatch('fetchUsers', { vendorId });
    },
    async fetchUsers({ commit }, { sort = '', vendorId }) {
      const response: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${vendorId}/memberships`, {
          params: { sort: sort || undefined },
        })
        .catch(e => e);
      
      const users = get(response, 'data') || [];

      commit('users', users);
      commit('usersCount', get(response, 'headers.x-items-count') || users.length);
    },
    async sendInvite({}, { selectedGameId, rolesList, email, vendorId }) {
      await axios.post(
        `${apiUrl}/vendors/${vendorId}/memberships/invites`,
        {
          email,
          roles: map(rolesList, role => ({
            role,
            resource: { id: selectedGameId, domain: 'vendor' },
          })),
        },
      )
      .catch(e => e);
    },
    async changeRoles({ state }, { userId, vendorId, roles }) {
      if (!roles.length) {
        const user = find(state.users, ({ id }) => id === userId);

        if (!user || !user.roles) {
          return;
        }

        const removed = reduce(
          user.roles,
          (roles, currentRole) => {
            const index = findIndex(roles, ({ id }) => id === currentRole.resource.id);
            if (index !== -1) {
              roles[index].roles = union(roles[index].roles, [ currentRole.role ]);
              return roles;
            }

            roles.push({
              id: currentRole.resource.id,
              roles: [ currentRole.role ],
            });

            return roles;
          },
          [],
        );

        await axios.put(
          `${apiUrl}/vendors/${vendorId}/memberships/${userId}`,
          { added: [], removed },
        )
        .catch(e => e);
      }
    },
  };
  const mutations: MutationTree<State> = {
    users: (state, value) => state.users = value,
    usersCount: (state, value) => state.usersCount = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
