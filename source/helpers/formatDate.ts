import { format } from 'date-fns';
import * as locales from 'date-fns/locale';

export default function formatDate(
  date: Date,
  formatStr: string,
  locale: string,
  fallbackLocale: string
) {
  return format(date, formatStr, {
    locale: locales[locale] || locales[fallbackLocale],
  });
}
