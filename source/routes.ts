
import Home from './app/home/Home.vue';
import OnBoarding from './app/onboarding/OnBoarding.vue';
import {RouteConfig} from "vue-router";
import VendorGames from './app/vendor/Games.vue';

const routes: RouteConfig[] = [
    { path: '/',  name: 'home', component: Home },
    { path: '/vendor/on-boarding', name: 'onboarding', component: OnBoarding },
    { path: '/vendor/games', name: 'vendor-games', component: VendorGames },
];

export default routes;