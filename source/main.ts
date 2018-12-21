import "@babel/polyfill";

import Vue from 'vue';
import router from "./router";
import i18n from "./i18n";
import MainLayout from './layouts/main/Main.vue';
import './bootstrap';
import axios from "axios";

axios.defaults.withCredentials = true;

const VueCookie = require('vue-cookie');
Vue.use(VueCookie);

new Vue({
    i18n,
    router,
    el: '#body',
    render: (h: any) => h(MainLayout, {}),
});
