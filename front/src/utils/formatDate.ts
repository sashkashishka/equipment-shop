import 'server-only';
import { getCurrentLocale } from '@/i18n/common';

const defaultOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export function formatDate(
  stringDate: string,
  options = defaultOptions,
): string {
  const date = new Date(stringDate);

  return new Intl.DateTimeFormat(getCurrentLocale(), options).format(date);
}
