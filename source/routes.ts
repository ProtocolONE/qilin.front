import { RouteConfig } from 'vue-router';
import Home from '@/modules/home/Home.vue';
import OnBoarding from '@/modules/onboarding/OnBoarding.vue';
import VendorGames from '@/modules/vendor/Games.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: 'routes.home.meta',
  },
  {
    path: '/vendor/on-boarding',
    name: 'onBoarding',
    component: OnBoarding,
    meta: 'routes.onBoarding.meta',
  },
  {
    path: '/vendor/games',
    name: 'vendorGames',
    component: VendorGames,
    meta: 'routes.vendorGames.meta',
  },
];

export default routes;
