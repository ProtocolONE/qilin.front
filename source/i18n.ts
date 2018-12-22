import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ru from './locale/ru.json'
import en from './locale/en.json'

Vue.use(VueI18n);

let defaultLang = '';
if (window.localStorage && window.localStorage.lang) {
    defaultLang = window.localStorage.lang;
} else {
    defaultLang = (window.navigator && window.navigator.language ? window.navigator.language : 'ru-RU').split('-')[0];
}

const i18n = new VueI18n({
    locale: defaultLang,
    fallbackLocale: 'en',
    messages: {en, ru}
});

export default i18n;

if (module.hot) {
    module.hot.accept([], function () {
        i18n.setLocaleMessage('en', require('./locale/en.json').default);
        i18n.setLocaleMessage('ru', require('./locale/ru.json').default);
    })
}