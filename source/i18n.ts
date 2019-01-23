import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from '@/locale/en.json';
import ru from '@/locale/ru.json';

Vue.use(VueI18n);

const locale = (window.localStorage.lang || window.navigator.language).split('-')[0];

const i18n = new VueI18n({
  locale,
  fallbackLocale: 'en',
});

export default i18n;

if (module.hot) {
  module.hot.accept([], () => {
    i18n.setLocaleMessage('en', en);
    i18n.setLocaleMessage('ru', ru);
  });
}
