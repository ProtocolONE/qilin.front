import config from '@/config';
import MainStores from '@/stores';
import router from '@/router';
import routes from '@/routes';
import CreateGameStore from '@/modules/gameCreate/store';
import SalesStore from '@/modules/gameSales/store';
import DocumentsStore from '@/modules/documents/store';
import GameStore from '@/modules/gameCommon/store';
import GamesStore from '@/modules/games/store';
import HistoryStore from '@/modules/history/store';
import NotificationsStore from '@/modules/notifications/store';
import RequestsStore from '@/modules/requests/store';
import RequestStore from '@/modules/request/store';
import PackagesStore from '@/modules/packages/store';
import PackageStore from '@/modules/package/store';
import BundlesStore from '@/modules/bundles/store';
import BundleStore from '@/modules/bundle/store';

const adminApiUrl = config.adminApi;
const apiUrl = config.api;
const authApiUrl = config.authApi;

const mainStores = MainStores(apiUrl, authApiUrl, router, routes);

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
    Games: GamesStore(apiUrl),
    History: HistoryStore(adminApiUrl),
    Notifications: NotificationsStore(apiUrl),
    Request: RequestStore(adminApiUrl),
    Requests: RequestsStore(adminApiUrl),
    Sales: SalesStore(apiUrl),
    Packages: PackagesStore(apiUrl),
    Package: PackageStore(apiUrl),
    Bundles: BundlesStore(apiUrl),
    Bundle: BundleStore(apiUrl),
  },
};
