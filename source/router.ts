import Vue from 'vue';
import { get } from 'lodash-es';
import VueRouter from 'vue-router';
import changeI18nMeta from '@/helpers/changeI18nMeta';
import routes from '@/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  changeI18nMeta(get(to, 'meta.i18n', ''));
  
  const requiresAuth = get(to, 'meta.requiresAuth', true);
  const accessToken = localStorage.getItem('accessToken');

  if (requiresAuth !== false && !accessToken) {
    if (to.name === 'invite') {
      saveInviteData(to.params.vendorId, to.params.inviteId);
    }

    return next({ name: 'authBoard' });
  } else if (to.name === 'authBoard' && accessToken) {
    return next({ name: 'home' });
  }

  next();
});

function saveInviteData(vendorId: string, inviteId: string) {
  if (vendorId && inviteId) {
    localStorage.setItem('inviteData', `${vendorId};${inviteId}`);
  }
}

export default router;
