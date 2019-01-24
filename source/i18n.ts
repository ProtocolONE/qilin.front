import Vue from 'vue';
import VueI18n from 'vue-i18n';
import forEach from 'lodash-es/forEach';
import locales from '@/locales';

Vue.use(VueI18n);

const locale = (window.localStorage.lang || window.navigator.language).split('-')[0];

const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en',
});

export default i18n;

if (module.hot) {
  module.hot.accept([], () => {
    forEach(locales, (localeItem: any, key: string) => {
      i18n.setLocaleMessage(key, localeItem);
    });
  });
}
