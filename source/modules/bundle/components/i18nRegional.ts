import packageI18n from '@/modules/package/components/i18nRegional';

export default {
  messages: {
    de: {},
    en: {
      regionalRestrictions: 'Regional restrictions',
      regionalRestrictionsDescription: 'Here you can specify in which countries the bundle will be sold.',
      country: 'Country',
      allowedInAllCountries: 'Allowed in all countries',
      addNewCountry: 'Add new country',
      append: 'Add',
      remove: 'Remove',
      countries: packageI18n.messages.en.countries,
    },
    ru: {
      regionalRestrictions: 'Ограничение по регионам',
      regionalRestrictionsDescription: 'Тут можно указать в каких странах будет продаваться данный набор',
      country: 'Страна',
      allowedInAllCountries: 'Доступен во всех странах',
      addNewCountry: 'Добавить новую страну',
      append: 'Добавить',
      remove: 'Удалить',
      countries: packageI18n.messages.ru.countries,
    },
  },
};
