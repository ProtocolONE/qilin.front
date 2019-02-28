import axios from 'axios';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State } from './types';

export default function DocumentsStore(apiUrl: string) {
  const state: State = {
    documents: null,
    requiredFields: {
      banking: ['accountNumber', 'address', 'currency', 'details', 'name', 'swift'],
      company: ['address', 'city', 'country', 'name', 'registrationNumber', 'taxId', 'zip'],
      contacts: {
        authorized: ['email', 'fullName', 'position'],
        technical: [],
      },
    },
  };
  const getters: GetterTree<State, any> = {
    steps: ({ documents }) => documents ? ['company', 'contacts', 'banking'] : [],
    disabled: ({ documents }) => documents.status !== 'new',
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, vendorId) {
      const documents = await axios
        .get(`${apiUrl}/vendors/${vendorId}/documents`)
        .then(response => response.data);

      commit('documents', documents);
    },
    async save({}, vendorId) {
      await axios
        .get(`${apiUrl}/vendors/${vendorId}/documents`)
        .then(response => response.data);
    },
  };
  const mutations: MutationTree<State> = {
    documents: (state, value) => state.documents = value,
    banking: (state, banking) => state.documents = {
      ...state.documents,
      banking,
    },
    company: (state, company) => state.documents = {
      ...state.documents,
      company,
    },
    contacts: (state, contacts) => state.documents = {
      ...state.documents,
      contacts,
    },
  };

  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
