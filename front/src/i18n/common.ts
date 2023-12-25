export const locales = ['en', 'sk'];

export const defaultLocale = 'en';

let currentLocale = defaultLocale;

export function setCurrentLocale(locale: string) {
  currentLocale = locale;
}

export function getCurrentLocale() {
  return currentLocale;
}
