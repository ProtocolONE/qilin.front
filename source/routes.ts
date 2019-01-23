import { RouteConfig } from 'vue-router';
import Home from '@/modules/home/Home.vue';
import OnBoarding from '@/modules/onboarding/OnBoarding.vue';
import VendorGames from '@/modules/vendor/Games.vue';

const routes: RouteConfig[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/vendor/on-boarding', name: 'onboarding', component: OnBoarding },
  { path: '/vendor/games', name: 'vendor-games', component: VendorGames },
];

export default routes;
