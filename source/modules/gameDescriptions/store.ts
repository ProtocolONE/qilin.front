import axios from 'axios';
import { mergeWith } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Descriptions, State } from './types';

const defaultDescriptions: Descriptions = {
  tagline: {en: ''},
  description: {en: ''},
  reviews: [],
  additionalDescription: '',
  gameSite: '',
  socials: {
    facebook: '',
    twitter: '',
  }
};

export default function DescriptionStore(apiUrl: string) {
  const state: State = {
    descriptions: defaultDescriptions,
    hasChanges: false,
  };
  const getters: GetterTree<State, any> = {
    contents: () => [
      'tagline',
    ],
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, gameId: string) {
      const descriptions = await axios
        .get(`${apiUrl}/api/v1/games/${gameId}/descriptions`)
        .then(({ data }) => data);

      commit('descriptions', mergeWith(defaultDescriptions, descriptions, (a, b) => (b === null ? a : b)));
    },
    async save({ state, commit }, gameId) {
      if (state.hasChanges) {
        await axios.put(`${apiUrl}/api/v1/games/${gameId}/descriptions`, state.descriptions);
        commit('hasChanges', false);
      }
    },
    update({ commit }, value) {
      commit('descriptions', value);
      commit('hasChanges', true);
    },
  };
  const mutations: MutationTree<State> = {
    descriptions: (state, value) => {
      state.descriptions = value;
    },
    hasChanges: (state, value) => {
      state.hasChanges = value;
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
