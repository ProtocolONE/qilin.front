import axios from 'axios';
import { mergeWith } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Media, State } from './types';

const defaultMedia: Media = {
  coverImage: { en: '' },
  coverVideo: { en: '' },
  trailers: { en: [] },
  screenshots: { en: [] },
  store: { special: { en: '' }, friends: { en: '' } },
  capsule: { generic: { en: '' }, small: { en: '' } },
};

export default function MediaStore(apiUrl: string) {
  const state: State = {
    media: defaultMedia,
    hasChanges: false,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async save({ state }, gameId) {
      if (state.hasChanges) {
        await axios.put(`${apiUrl}/api/v1/games/${gameId}/media`, state.media);
      }
    },
    async initState({ commit }, gameId: string) {
      const media = await axios
        .get(`${apiUrl}/api/v1/games/${gameId}/media`)
        .then(({ data }) => data);
        
      commit('updateMedia', mergeWith(defaultMedia, media, (a, b) => (b === null ? a : b)));
    },
  };
  const mutations: MutationTree<State> = {
    updateMedia: (state, value) => {
      state.media = value;
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
