export const locales = ['en', 'de', 'pl', 'sk'] as const;

export const defaultLocale = 'en';

export const LANG_COOKIE = 'PGI_LOCALE_COOKIE';

export const i18nConfig = {
  locales,
  defaultLocale,
  localeCookie: LANG_COOKIE,
  serverSetCookie: 'always' as const,
};
