import { RouteConfig } from 'vue-router';

import AuthBoard from '@/modules/authBoard/AuthBoard.vue';
import Documents from '@/modules/documents/Documents.vue';
import Home from '@/modules/home/Home.vue';
import GameCommon from '@/modules/gameCommon/GameCommon.vue';
import GameGeneral from '@/modules/gameGeneral/General.vue';
import GameMedia from '@/modules/gameMedia/Media.vue';
import GamePrices from '@/modules/gamePrices/Prices.vue';
import GameNavigation from '@/modules/gameNavigation/GameNavigation.vue';
import GameRatings from '@/modules/gameRatings/Ratings.vue';
import GameSales from '@/modules/gameSales/Sales.vue';
import GameDescriptions from '@/modules/gameDescriptions/Descriptions.vue';
import Games from '@/modules/games/Games.vue';
import History from '@/modules/history/History.vue';
import OnBoarding from '@/modules/onBoarding/OnBoarding.vue';
import Notifications from '@/modules/notifications/Notifications.vue';
import Requests from '@/modules/requests/Requests.vue';
import Request from '@/modules/request/Request.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresPermissions: false }, // default is 'true'
  },
  {
    path: '/auth',
    name: 'authBoard',
    component: AuthBoard,
    meta: { requiresAuth: false }, // default is 'true'
  },
  {
    path: '/vendor/on-boarding',
    name: 'onBoarding',
    component: OnBoarding,
    meta: { requiresPermissions: false }, // default is 'true'
  },
  {
    path: '/games',
    name: 'games',
    component: Games,
  },
  {
    path: '/games/:id',
    name: 'game',
    // @TODO - remove redirect when GameNavigation is implemented
    redirect: '/games/:id/general',
    components: {
      default: GameCommon,
      navigation: GameNavigation,
    },
    children: [
      {
        path: 'general',
        name: 'gameGeneral',
        component: GameGeneral,
        meta: { i18n: 'routes.game.general.meta' },
      },
      {
        path: 'media',
        name: 'gameMedia',
        component: GameMedia,
        meta: { i18n: 'routes.game.media.meta' },
      },
      {
        path: 'prices',
        name: 'gamePrices',
        component: GamePrices,
        meta: { i18n: 'routes.game.prices.meta' }
      },
      {
        path: 'ratings',
        name: 'GameRatings',
        component: GameRatings,
        meta: { i18n: 'routes.game.ratings.meta' },
      },
      {
        path: 'descriptions',
        name: 'GameDescriptions',
        component: GameDescriptions,
        meta: { i18n: 'routes.game.descriptions.meta' },
      },
    ],
  },
  {
    name: 'gameSales',
    path: '/games/:id/sales',
    component: GameSales
  },
  {
    path: '/notifications',
    name: 'notifications',
    component: Notifications,
  },
  {
    path: '/documents/:vendorId',
    name: 'documents',
    component: Documents,
    meta: { requiresPermissions: false }, // default is 'true'
  },
  {
    path: '/admin',
    name: 'admin',
    // @TODO - remove redirect when Admin page is implemented
    redirect: '/admin/requests',
    component: {
      template: '<router-view />',
    },
    children: [
      {
        path: 'requests',
        name: 'requests',
        component: Requests,
        meta: { i18n: 'routes.admin.requests.meta' },
      },
      {
        path: 'requests/:vendorId',
        name: 'request',
        component: Request,
        meta: { i18n: 'routes.admin.request.meta' },
      },
      {
        path: 'history/:vendorId',
        name: 'history',
        component: History,
        meta: { i18n: 'routes.admin.history.meta', },
      },
    ],
  },
].map(route => ({
  ...route,
  meta: { ...(route.meta || {}), i18n: `routes.${route.name}.meta` },
}));

export default routes;
