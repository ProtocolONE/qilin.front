
import Home from './app/home/Home.vue';
import About from './app/about/About.vue';
import OnBoarding from './app/onboarding/OnBoarding.vue';
import {RouteConfig} from "vue-router";

const routes: RouteConfig[] = [
    { path: '/about', name: 'about', component: About },
    { path: '/',  name: 'home', component: Home },
    { path: '/vendor/on-boarding', name: 'onboarding', component: OnBoarding },
];

export default routes;