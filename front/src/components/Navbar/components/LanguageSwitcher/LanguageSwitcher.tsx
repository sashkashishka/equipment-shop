'use client';

import { useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Select } from '@/components/Select';
import { generatePath } from '@/utils/generatePath';
import { iCommonConfig } from '@/types/strapi';
import { LANG_COOKIE, defaultLocale } from '@/i18n/common';
import { ROUTES } from '@/constants/routes';

import styles from './LanguageSwitcher.module.css';

interface iProps {
  languages: iCommonConfig['languages'];
}

const FLAGS: Record<string, string> = {
  en: '🇬🇧',
  sk: '🇸🇰',
  pl: '🇵🇱',
  de: '🇩🇪',
};

export function LanguageSwitcher({ languages }: iProps) {
  const params = useParams();
  const pathname = usePathname();
  const items = useMemo(
    () => languages.map((l, i) => ({ id: i, value: l, label: FLAGS[l] })),
    [languages],
  );

  return (
    <Select
      className={styles.languageSwitcher}
      items={items}
      value={params.locale as string}
      onChange={(e) => {
        const lang = e.target.value;
        const newLang = lang === defaultLocale ? '' : lang;
        const currLang = params.locale as string;

        if (lang === currLang) return;

        let url = '';

        switch (true) {
          case pathname.includes(ROUTES.EQUIPMENT): {
            url = `/${newLang}`;

            break;
          }

          case currLang === defaultLocale: {
            url = `/${newLang}${pathname}`;
            break;
          }

          default: {
            url =
              pathname.replace(
                generatePath(`/:id?`, { id: currLang }),
                newLang,
              ) || '/';
          }
        }

        document.cookie = `${LANG_COOKIE}=${lang};path=/`;
        window.location.replace(url);
      }}
    />
  );
}
