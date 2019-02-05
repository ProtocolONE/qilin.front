import axios from 'axios';
import { mergeWith } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Media, State } from './types';

const defaultMedia: Media = {
  coverImage: { en: '' },
  coverVideo: { en: '' },
  trailers: { en: [] },
  store: { special: { en: '' }, friends: { en: '' } },
  capsule: { generic: { en: [] }, small: { en: [] } },
};

export default function MediaStore(apiUrl: string) {
  const state: State = {
    media: defaultMedia,
    wait: false,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    clickSave({ commit, state }, gameId) {
      axios.put(`${apiUrl}/api/v1/games/${gameId}/media`, state.media);
    },
    initState({ commit }, gameId: string) {
      axios
        .get(`${apiUrl}/api/v1/games/${gameId}/media`)
        .then(result => {
          commit('updateMedia', mergeWith(defaultMedia, result.data, (a, b) => (b === null ? a : b)));
        });
    },
  };
  const mutations: MutationTree<State> = {
    updateMedia: (state, value) => {state.media = value},
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
