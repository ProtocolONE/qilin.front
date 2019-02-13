import { RouteConfig } from 'vue-router';
import Home from '@/modules/home/Home.vue';
import OnBoarding from '@/modules/onboarding/OnBoarding.vue';
import Game from '@/modules/game/Game.vue';
import GameGeneral from '@/modules/gameGeneral/General.vue';
import GameMedia from '@/modules/gameMedia/Media.vue';
import Games from '@/modules/games/Games.vue';
import GameMedia from '@/modules/gameMedia/Media.vue';
import GameRatings from '@/modules/gameRatings/Ratings.vue';
import Game from '@/modules/game/Game.vue';

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
    component: Game,
    children: [
      {
        name: 'GameGeneral',
        path: 'general',
        component: GameGeneral
      },
      {
        name: 'GameMedia',
        path: 'media',
        component: GameMedia
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
