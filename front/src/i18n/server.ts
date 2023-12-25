import { addLocale, useLocale } from 'ttag';

import en from './locales/en.po.json';
import sk from './locales/sk.po.json';
import { setCurrentLocale } from './common';

export function initTtag(locale: string) {
  addLocale('en', en);
  addLocale('sk', sk);

  // eslint-disable-next-line
  useLocale(locale);
  setCurrentLocale(locale);
}
