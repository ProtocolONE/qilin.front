import axios from 'axios';
import { mergeWith } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { RatingAgency, Ratings, RatingIndex, State } from './types';

const defAgency: RatingAgency = {
  displayOnlineNotice: false,
  showAgeRestrict: false,
  ageRestrict: 0,
  descriptors: [],
  rating: '',
};

const defaultRatings: Ratings = {
  ESRB: defAgency,
  PEGI: defAgency,
  BBFC: defAgency,
  USK: defAgency,
  CERO: defAgency,
};

export default function RatingsStore(apiUrl: string) {
  const state: State = {
    ratings: defaultRatings,
    descriptors: [],
    hasChanges: false,
  };
  const getters: GetterTree<State, any> = {};
  const actions: ActionTree<State, any> = {
    async initState({ commit }, gameId: string) {
      const descriptors = await axios
        .get(`${apiUrl}/api/v1/descriptors`)
        .then(result => result.data);
      commit('updateDescriptors', descriptors);

      const ratings = await axios
        .get(`${apiUrl}/api/v1/games/${gameId}/ratings`)
        .then(result => mergeWith(defaultRatings, result.data, (a, b) => (b === null ? a : b)));
      commit('updateRatings', ratings);
    },
    async save({ state, commit }, gameId) {
      if (state.hasChanges) {
        await axios.put(`${apiUrl}/api/v1/games/${gameId}/ratings`, state.ratings);
        commit('hasChanges', false);
      }
    },
    updateRating({ commit }, value) {
      commit('updateRating', value);
      commit('hasChanges', true);
    },
  };
  const mutations: MutationTree<State> = {
    hasChanges: (state, value) => state.hasChanges = value,
    updateRatings: (state, value) => state.ratings = value,
    updateDescriptors: (state, value) => state.descriptors = value,
    updateRating: (state: any, {agency, value}: {agency: RatingIndex, value: any}) => state.ratings[agency] = value,
  };
  return {
    state,
    getters,
    actions,
    mutations,
    namespaced: true,
  };
}
