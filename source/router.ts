import VueRouter from 'vue-router';
import Vue from 'vue';
import changeI18nMeta from '@/helpers/changeI18nMeta';
import routes from '@/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  changeI18nMeta(to.meta);

  next();
});

export default router;
