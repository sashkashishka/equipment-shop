'use client';

import { useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Select } from '@/components/Select';
import { generatePath } from '@/utils/generatePath';
import { iCommonConfig } from '@/types/strapi';
import { LANG_COOKIE, defaultLocale, locales } from '@/i18n/common';
import { ROUTES } from '@/constants/routes';

import styles from './LanguageSwitcher.module.css';

interface iProps {
  locales: iCommonConfig['locales'];
}

const FLAGS: Record<string, string> = {
  en: '🇬🇧',
  sk: '🇸🇰',
  pl: '🇵🇱',
  de: '🇩🇪',
};

export function LanguageSwitcher({ locales }: iProps) {
  const params = useParams();
  const pathname = usePathname();
  const items = useMemo(
    () =>
      locales.reduce<{ id: number; value: string; label: string }[]>(
        (acc, lang, i) => {
          if (locales.includes(lang)) {
            acc.push({
              id: i,
              value: lang,
              label: FLAGS[lang],
            });
          }

          return acc;
        },
        [],
      ),
    [locales],
  );

  return (
    <Select
      className={styles.languageSwitcher}
      items={items}
      value={params.locale as string}
      onChange={(e) => {
        const lang = e.target.value;
        const currLang = params.locale as string;

        if (lang === currLang) return;

        let url = '';

        switch (true) {
          case pathname.includes(ROUTES.EQUIPMENT): {
            url = `/${lang}`;

            break;
          }

          default: {
            url =
              pathname.replace(
                generatePath(`/:id?`, { id: currLang }),
                generatePath(`/:id?`, { id: lang }),
              ) || '/';
          }
        }

        document.cookie = `${LANG_COOKIE}=${lang};path=/`;
        window.location.replace(url);
      }}
    />
  );
}
