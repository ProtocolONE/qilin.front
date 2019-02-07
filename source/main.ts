import '@babel/polyfill';

import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import { directive as onClickaway } from 'vue-clickaway';
import RootStore from './RootStore';
import router from './router';
import i18n from './i18n';
import MainLayout from './layouts/Main.vue';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Accept-Language'] = localStorage.getItem('lang') || navigator.language;
if (localStorage.getItem('access_token')) {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
}

const accessToken = localStorage.getItem('accessToken') || '';

if (accessToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
}
Vue.use(Vuex);
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
