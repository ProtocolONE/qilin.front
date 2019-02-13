import { RouteConfig } from 'vue-router';
import Home from '@/modules/home/Home.vue';
import OnBoarding from '@/modules/onboarding/OnBoarding.vue';
import GameNavigation from '@/modules/gameNavigation/GameNavigation.vue';
import GameCommon from '@/modules/gameCommon/GameCommon.vue';
import GameGeneral from '@/modules/gameGeneral/General.vue';
import Games from '@/modules/games/Games.vue';
import GameMedia from '@/modules/gameMedia/Media.vue';
import GameRatings from '@/modules/gameRatings/Ratings.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
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
        name: 'GameRatings',
        path: 'ratings',
        component: GameRatings
      },
    ],
  },
].map(route => ({ ...route, meta: `routes.${route.name}.meta` }));

export default routes;
