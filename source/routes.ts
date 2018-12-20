
import Home from './app/home/Home.vue';
import About from './app/about/About.vue';
import {RouteConfig} from "vue-router";

const routes: RouteConfig[] = [
    { path: '/about', name: 'about', component: About },
    { path: '/',  name: 'home', component: Home },
];

export default routes;