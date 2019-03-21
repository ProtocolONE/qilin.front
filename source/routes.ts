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
import OnBoarding from '@/modules/onBoarding/OnBoarding.vue';
import Notifications from '@/modules/notifications/Notifications.vue';
import Requests from '@/modules/requests/Requests.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'authBoard',
    component: AuthBoard,
  },
  {
    path: '/vendor/on-boarding',
    name: 'onBoarding',
    component: OnBoarding,
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
        name: 'gameGeneral',
        path: 'general',
        component: GameGeneral,
        meta: 'routes.game.general.meta'
      },
      {
        name: 'gameMedia',
        path: 'media',
        component: GameMedia,
        meta: 'routes.game.media.meta'
      },
      {
        name: 'gamePrices',
        path: 'prices',
        component: GamePrices,
        meta: 'routes.game.prices.meta'
      },
      {
        name: 'GameRatings',
        path: 'ratings',
        component: GameRatings,
        meta: 'routes.game.ratings.meta'
      },
      {
        name: 'GameDescriptions',
        path: 'descriptions',
        component: GameDescriptions,
        meta: 'routes.game.descriptions.meta'
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
        meta: 'routes.admin.requests.meta'
      }
    ],
  },
].map(route => ({ ...route, meta: `routes.${route.name}.meta` }));

export default routes;
