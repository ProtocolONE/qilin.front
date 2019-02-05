import anchors from './anchors';

export default {
  messages: {
    en: {
      tab_general: 'General',
      tab_description: 'Description',
      tab_ratings: 'Ratings',
      tab_media: 'Media',
      tab_price: 'Prices',
      tab_sales: 'Sales',
      ...anchors.messages.en,
    },
    ru: {
      tab_general: 'Основные',
      tab_description: 'Описание',
      tab_ratings: 'Ограничения',
      tab_media: 'Медиа',
      tab_price: 'Цены',
      tab_sales: 'Распродажи',
      ...anchors.messages.ru,
    },
  },
};
