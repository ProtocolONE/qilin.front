import { RouteConfig } from 'vue-router';
import Home from '@/modules/home/Home.vue';
import OnBoarding from '@/modules/onboarding/OnBoarding.vue';
import GameCommon from '@/modules/gameCommon/GameCommon.vue';
import GameGeneral from '@/modules/gameGeneral/General.vue';
import GameNavigation from '@/modules/gameNavigation/GameNavigation.vue';
import GameMedia from '@/modules/gameMedia/Media.vue';
import GameRatings from '@/modules/gameRatings/Ratings.vue';
import GameDescriptions from '@/modules/gameDescriptions/Descriptions.vue';
import Games from '@/modules/games/Games.vue';

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
].map(route => ({ ...route, meta: `routes.${route.name}.meta` }));

export default routes;
