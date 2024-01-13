import 'server-only';

const defaultOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export function formatDate(
  stringDate: string,
  locale: string,
  options = defaultOptions,
): string {
  const date = new Date(stringDate);

  return new Intl.DateTimeFormat(locale, options).format(date);
}
