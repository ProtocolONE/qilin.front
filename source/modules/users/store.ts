import axios, { AxiosResponse } from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Role, User, State } from './types';

const ROWS_LIMIT = 10;

export default function UsersStore(apiUrl: string) {
  const state: State = {
    rowsLimit: ROWS_LIMIT,
    users: [],
    usersCount: null,
    vendorId: null,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit, dispatch }, { vendorId }: { vendorId: string}) {
      commit('vendorId', vendorId);
      await dispatch('fetchUsers', {});
    },
    async fetchUsers({ commit, state }, { offset = 0, sort = ''}) {
      const response: AxiosResponse = await axios
        .get(`${apiUrl}/vendors/${state.vendorId}/memberships`, {
          params: {
            limit: state.rowsLimit,
            offset,
            sort: sort || undefined,
          },
        })
        .catch(e => e);
      
      console.error(response);

      const users: User[] = [
        {
          id: 0,
          email: 'first@user.one',
          name: 'First user',
          lastSeen: (new Date()).toString(),
          icon: '//image.flaticon.com/icons/svg/61/61205.svg',
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
        {
          id: 1,
          name: 'Second user',
          email: 'second@user.one',
          lastSeen: (new Date()).toString(),
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
        {
          id: 2,
          name: 'Second user',
          email: 'second@user.one',
          lastSeen: (new Date()).toString(),
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
        {
          id: 3,
          name: 'Second user',
          email: 'second@user.one',
          lastSeen: (new Date()).toString(),
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
        {
          id: 4,
          name: 'Second user',
          email: 'second@user.one',
          lastSeen: (new Date()).toString(),
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
        {
          id: 5,
          name: 'Second user',
          email: 'second@user.one',
          lastSeen: (new Date()).toString(),
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
        {
          id: 6,
          name: 'Second user',
          email: 'second@user.one',
          lastSeen: (new Date()).toString(),
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
        {
          id: 7,
          name: 'Second user',
          email: 'second@user.one',
          lastSeen: (new Date()).toString(),
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
        {
          id: 8,
          name: 'Second user',
          email: 'second@user.one',
          lastSeen: (new Date()).toString(),
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
        {
          id: 9,
          name: 'Second user',
          email: 'second@user.one',
          lastSeen: (new Date()).toString(),
          roles: [
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
            {
              role: 'admin',
              domain: 'vendor',
              resource: {
                id: '8ab4a94c-38bc-4fb9-98fe-cdb8c63e723e',
                type: 'global',
                meta: {
                  internalName: 'First_Game',
                  preview: '//image.flaticon.com/icons/svg/61/61205.svg',
                },
              },
            },
          ],
        },
      ];
        
      commit('users', users);
      commit('usersCount', 13);
    },
  };
  const mutations: MutationTree<State> = {
    users: (state, value) => state.users = value,
    usersCount: (state, value) => state.usersCount = value,
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
