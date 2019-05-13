import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function UserStore(apiUrl: string) {
  const state: State = {};
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {};
  const mutations: MutationTree<State> = {};

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
