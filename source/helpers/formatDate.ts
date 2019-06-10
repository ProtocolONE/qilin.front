import {format, isValid} from 'date-fns';
import * as locales from 'date-fns/locale';

export default function formatDate(
  date: Date | string | number,
  formatStr: string,
  locale: string,
  fallbackLocale: string
) {
  return isValid(new Date(date)) ? format(new Date(date), formatStr, {
    locale: locales[locale] || locales[fallbackLocale],
  }) : null;
}
