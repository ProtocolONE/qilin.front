import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function HistoryStore(apiUrl: string) {
  const state: State = {
    hasAccepted: false,
    inviteId: null,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit }, inviteId) {
      commit('inviteId', inviteId);
    },
    async accept({ commit, state }, vendorId) {
      const resp = await axios
        .put(`${apiUrl}/vendors/${vendorId}/memberships/invites/${state.inviteId}`, {
          method: 'accept',
        })
        .then(() => {
          commit('hasAccepted', true);
        })
        .catch(e => e);

      console.error(resp);
    },
  };
  const mutations: MutationTree<State> = {
    hasAccepted: (state, value) => state.hasAccepted = value,
    inviteId: (state, value) => state.inviteId = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
