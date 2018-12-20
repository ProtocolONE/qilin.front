import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ru from './locale/ru.json'
import en from './locale/en.json'

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: (window.navigator && window.navigator.language ? window.navigator.language : 'en-Au').split('-')[0],
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