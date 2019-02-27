import axios from 'axios';
import { omit } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import {Descriptions, DescrReview, State} from './types';

const defaultReview: DescrReview = {
  pressName: '',
  link: '',
  score: '10',
  quote: '',
};
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
      'reviews'
    ],
    socials: (state) => ({
      ...state.descriptions.socials,
      ...{game: state.descriptions.gameSite},
    }),
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, gameId: string) {
      const descr = await axios
        .get(`${apiUrl}/api/v1/games/${gameId}/descriptions`)
        .then(({ data }) => data);
      descr.reviews = [
        descr.reviews[0] || defaultReview,
        descr.reviews[1] || defaultReview,
        descr.reviews[2] || defaultReview,
      ];
      commit('changeDescriptions', descr);
    },
    async save({ state, commit }, gameId) {
      if (state.hasChanges) {
        await axios.put(`${apiUrl}/api/v1/games/${gameId}/descriptions`, state.descriptions);
        commit('hasChanges', false);
      }
    },
  };
  const mutations: MutationTree<State> = {
    changeLangProp(state, {prop, lang, value}) {
      state.descriptions = {
        ...state.descriptions,
        ...{
          [prop]: {
            ...(state.descriptions as any)[prop],
            [lang]: value
          }
        }
      };
      state.hasChanges = true;
    },
    changeProp(state, {prop, value}) {
      state.descriptions = {
        ...state.descriptions,
        ...{[prop]: value}
      };
      state.hasChanges = true;
    },
    changeReview(state, {index, review}) {
      state.descriptions = {
        ...state.descriptions,
        ...{reviews: state.descriptions.reviews.map((r, i) => i === index ? review : r)}
      };
      state.hasChanges = true;
    },
    changeDescriptions: (state, value) => {
      state.descriptions = value;
      state.hasChanges = true;
    },
    updateSocials: (state, value) => {
      state.descriptions = {
        ...state.descriptions,
        ...{
          gameSite: value.game,
          socials: omit(value, 'game')
        }
      };
      state.hasChanges = true;
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
