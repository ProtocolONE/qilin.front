import { format } from 'date-fns';
import * as locales from 'date-fns/locale';
import i18n from '@/i18n';

export default function formatDate(date: Date, formatStr: string) {
  return format(date, formatStr, {
    locale: locales[i18n.locale] || locales[i18n.fallbackLocale],
  });
}
