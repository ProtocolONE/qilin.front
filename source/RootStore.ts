import MainStores from '@/stores';
import routes from '@/routes';
import config from '@/config';
import MediaStore from '@/modules/game_media/store';
import GameStore from '@/modules/game/store';
import CreateGameStore from '@/modules/game_create/store';

const mainStores = MainStores(routes);
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
    Game: GameStore(config.api),
    Media: MediaStore(config.api),
    CreateGame: CreateGameStore(config.api),
  },
};
