import 'server-only';

import de from './locales/de.po.json';
import en from './locales/en.po.json';
import { addLocale, useLocale } from 'ttag';

export const locales = ['en', 'de'];

export const defaultLocale = 'en';

export function initTtag(locale: string) {
  addLocale('en', en);
  addLocale('de', de);

  // eslint-disable-next-line
  useLocale(locale);
}
