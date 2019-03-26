import '@babel/polyfill';

import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import * as Sentry from '@sentry/browser';
import { directive as onClickaway } from 'vue-clickaway';
import RootStore from './RootStore';
import router from './router';
import i18n from './i18n';
import MainLayout from './layouts/Main.vue';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://cf58349faae345a29d8e62e457824532@sentry.tst.protocol.one/5',
    integrations: [new Sentry.Integrations.Vue()]
  });
}
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept-Language'] = localStorage.getItem('lang') || navigator.language;
const accessToken = localStorage.getItem('accessToken') || '';

if (accessToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}

Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.directive('clickaway', onClickaway);

const store = new Vuex.Store({
  ...RootStore,
});

// eslint-disable-next-line no-new
new Vue({
  i18n,
  router,
  store,
  el: '#app',
  render: (h: any) => h(MainLayout, {}),
});
