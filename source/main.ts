import "@babel/polyfill";

import Vue from 'vue';
import router from "./router";
import i18n from "./i18n";
import MainLayout from './layouts/main/Main.vue';
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept-Language'] = window.localStorage.lang || window.navigator.language;

const VueCookie = require('vue-cookie');
Vue.use(VueCookie);

const vueHeadful = require('vue-headful').default;
Vue.component('vue-headful', vueHeadful);

import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        update_user(state) {
            //state.count++
        }
    },
    getters: {}
});

new Vue({
    i18n,
    router,
    store,
    el: '#body',
    render: (h: any) => h(MainLayout, {}),
});
