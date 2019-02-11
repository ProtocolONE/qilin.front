import axios from 'axios';
import { get } from 'lodash-es';
import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { State, GameInfo } from './types';

export default function GeneralStore(apiUrl: string) {
  const state: State = {
    gameInfo: {},
    genres: [],
    tags: [],
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
    genre: ({ gameInfo }) => get(gameInfo, 'genre', {}),
    selectedTags: ({ gameInfo }) => get(gameInfo, 'tags', []),
  };
  const actions: ActionTree<State, any> = {
    async initState({ commit }, gameId: string) {
      const gameInfo = await axios
        .get(`${apiUrl}/api/v1/games/${gameId}`);
      const genres = await axios
        .get(`${apiUrl}/api/v1/genre`);
      const tags = await axios
        .get(`${apiUrl}/api/v1/tags`);

      commit('gameInfo', gameInfo);
      commit('genres', genres);
      commit('tags', tags);
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

    changeCreators(state, creators) {
      state.gameInfo.developers = creators.developers;
      state.gameInfo.publishers = creators.publishers;
    },
    changeLanguages(state, languages) {
      state.gameInfo.languages = languages;
    },
    changeReleaseDate(state, releaseDate) {
      state.gameInfo.releaseDate = releaseDate;
    },
    changeGenre(state, genre) {
      state.gameInfo.genre = genre;
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
