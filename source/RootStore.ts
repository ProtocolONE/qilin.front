import MainStores from '@/stores';
import config from '@/config';
import routes from '@/routes';
import CreateGameStore from '@/modules/gameCreate/store';
import DocumentsStore from '@/modules/documents/store';
import GameStore from '@/modules/gameCommon/store';
import GamesModule from '@/modules/games/store';

const apiUrl = config.api;
const accessToken = localStorage.getItem('accessToken') || '';

const mainStores = MainStores(apiUrl, accessToken, routes);

/**
 * Root store, that agragate high-level modules.
 * Every module have its own endpoint, that specified in routes
 */
export default {
  /**
   * Common state, getters, actions, mutations
   * are used for data, that all pages need.
   * @TODO (remove sentence)
   * It can be: some common analytics, authentication data, high-level error handling, etc
   */
  state: { ...mainStores.state },
  getters: { ...mainStores.getters },
  actions: { ...mainStores.actions },
  mutations: { ...mainStores.mutations },

  // Modules by root store
  modules: {
    CreateGame: CreateGameStore(apiUrl),
    Documents: DocumentsStore(apiUrl),
    Game: GameStore(apiUrl),
    Games: GamesModule(apiUrl),
  },
};
