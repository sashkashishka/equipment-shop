import { addLocale, useLocale } from 'ttag';

import en from './locales/en.po.json';
import sk from './locales/sk.po.json';
import de from './locales/de.po.json';
import pl from './locales/pl.po.json';

export function initTtag(locale: string) {
  addLocale('en', en);
  addLocale('sk', sk);
  addLocale('de', de);
  addLocale('pl', pl);

  // eslint-disable-next-line
  useLocale(locale);
}
