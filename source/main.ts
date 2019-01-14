import '@babel/polyfill';

import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import RootStore from './RootStore';
import router from './router';
import i18n from './i18n';
import MainLayout from './layouts/main/Main.vue';

// Нет @types для модулей, потому импортим их через require
const VueCookie = require('vue-cookie');
const vueHeadful = require('vue-headful').default;

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept-Language'] = window.localStorage.lang || window.navigator.language;

Vue.use(VueCookie);
Vue.use(Vuex);

Vue.component('vue-headful', vueHeadful);

const store = new Vuex.Store({
    ...RootStore,
});

new Vue({
    i18n,
    router,
    store,
    el: '#app',
    render: (h: any) => h(MainLayout, {}),
});
