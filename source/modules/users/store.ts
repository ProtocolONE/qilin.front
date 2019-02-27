import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Role, User, State } from './types';

export default function UsersStore(apiUrl: string) {
  const state: State = {
    users: [],
    roles: [],
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit }) {
      const users: User[] = [
        {
          id: 1,
          name: 'First user',
          email: 'first@user.one',
          icon: 'https://iconshow.me/media/images/Mixed/small-n-flat-icon/png/32/user.png',
          lastSean: new Date(),
          games: [
            {
              id: 'ea3800a5-542c-4c22-985b-07f048ee9add',
              internalName: 'New_Game',
              roles: [1, 2],
            }
          ],
        },
      ];
      const roles: Role[] = [
        {
          id: 1,
          title: {
            en: 'Admin',
            ru: 'Админ',
          },
        },
        {
          id: 2,
          title: {
            en: 'Support',
            ru: 'Поддержка',
          },
        },
        {
          id: 3,
          title: {
            en: 'Accountent',
            ru: 'Бухгалтер',
          },
        },
      ];
        
      commit('users', users);
      commit('roles', roles);
    },
  };
  const mutations: MutationTree<State> = {
    users: (state, value) => state.users = value,
    roles: (state, value) => state.roles = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
