import { RouteConfig } from 'vue-router';
import Home from '@/modules/home/Home.vue';
import OnBoarding from '@/modules/onboarding/OnBoarding.vue';
import VendorGames from '@/modules/vendor/Games.vue';

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
    path: '/vendor/games',
    name: 'vendorGames',
    component: VendorGames,
  },
].map(route => ({...route, meta: `routes.${route.name}.meta`}));

export default routes;
