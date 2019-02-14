import axios from 'axios';
import { get } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State, GameInfo } from './types';

export default function GeneralStore(apiUrl: string) {
  const state: State = {
    gameInfo: null,
    genres: [],
    tags: [],
    hasChanges: false,
  };
  const getters: GetterTree<State, any> = {
    creators: ({ gameInfo }) => ({
      developers: get(gameInfo, 'developers', ''),
      publishers: get(gameInfo, 'publishers', ''),
    }),
    languages: ({ gameInfo }) => get(gameInfo, 'languages', {
      en: {
        'voice': false,
        'interface': false,
        'subtitles': false,
      },
      ru: {
        'voice': false,
        'interface': false,
        'subtitles': false,
      },
      de: {
        'voice': false,
        'interface': false,
        'subtitles': false,
      },
    }),
    releaseDate: ({ gameInfo }) => get(gameInfo, 'releaseDate', ''),
    genre: ({ gameInfo }) => get(gameInfo, 'genre[0]', {}),
    selectedTags: ({ gameInfo }) => get(gameInfo, 'tags', []),
    features: ({ gameInfo }) => get(gameInfo, 'features.common', []),
    platforms: ({ gameInfo }) => get(gameInfo, 'platforms', {
      windows: true,
      macOs: false,
      linux: false
    }),
    requirements: ({ gameInfo }) => get(gameInfo, 'requirements', {
      windows: {},
      macOs: {},
      linux: {}
    }),
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, gameId: string) {
      const gameInfo = await axios
        .get(`${apiUrl}/api/v1/games/${gameId}`)
        .then(response => response.data);
      commit('gameInfo', gameInfo);
        
      const genres = await axios
        .get(`${apiUrl}/api/v1/genre`)
        .then(response => response.data);
      commit('genres', genres);

      const tags = await axios
        .get(`${apiUrl}/api/v1/tags`)
        .then(response => response.data);
      commit('tags', tags);
    },
    async save({ state, commit }, gameId: string) {
      if (state.hasChanges) {
        await axios.put(`${apiUrl}/api/v1/games/${gameId}`, state.gameInfo);
        commit('hasChanges', false);
      }
    },
  };
  const mutations: MutationTree<State> = {
    gameInfo(state, value: GameInfo) {
      state.gameInfo = value;
    },
    genres(state, value) {
      state.genres = value;
    },
    tags(state, value) {
      state.tags = value;
    },
    hasChanges(state, value) {
      state.hasChanges = value;
    },

    changeCreators(state, creators) {
      state.gameInfo = {
        ...state.gameInfo,
        developers: creators.developers,
      }
      state.gameInfo = {
        ...state.gameInfo,
        publishers: creators.publishers,
      }
    },
    changeLanguages(state, languages) {
      state.gameInfo = {
        ...state.gameInfo,
        languages,
      }
    },
    changeReleaseDate(state, releaseDate) {
      state.gameInfo = {
        ...state.gameInfo,
        releaseDate,
      }
    },
    changeGenre(state, genre) {
      state.gameInfo = {
        ...state.gameInfo,
        genre,
      }
    },
    changeFeatures(state, features) {
      state.gameInfo = {
        ...state.gameInfo,
        features: {
          common: features,
          controllers: '',
        },
      }
    },
    changePlatforms(state, platforms) {
      state.gameInfo = {
        ...state.gameInfo,
        platforms,
      }
    },
    changeRequirements(state, requirements) {
      state.gameInfo = {
        ...state.gameInfo,
        requirements,
      }
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
