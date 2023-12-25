import 'server-only';

import en from './locales/en.po.json';
import sk from './locales/sk.po.json';
import { addLocale, useLocale } from 'ttag';

export const locales = ['en', 'sk'];

export const defaultLocale = 'en';

export function initTtag(locale: string) {
  addLocale('en', en);
  addLocale('sk', sk);

  useLocale(locale);
}
