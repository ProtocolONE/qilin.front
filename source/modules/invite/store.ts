import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function HistoryStore(apiUrl: string) {
  const state: State = {
    hasAccepted: false,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async accept({ commit }, { inviteId, vendorId }) {
      await axios
        .put(`${apiUrl}/vendors/${vendorId}/memberships/invites/${inviteId}`, {
          method: 'accept',
        })
        .then(() => {
          commit('hasAccepted', true);
        })
        .catch(e => e);
    },
  };
  const mutations: MutationTree<State> = {
    hasAccepted: (state, value) => state.hasAccepted = value,
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
