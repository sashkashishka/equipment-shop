export const locales = ['en', 'sk'];

export const defaultLocale = 'en';

export const LANG_COOKIE = 'PGI_LOCALE_COOKIE';

export const i18nConfig = {
  locales,
  defaultLocale,
  localeCookie: LANG_COOKIE,
  serverSetCookie: 'always' as const,
};
