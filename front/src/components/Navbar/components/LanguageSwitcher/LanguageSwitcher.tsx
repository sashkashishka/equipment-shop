'use client';

import { useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { Select } from '@/components/Select';
import { iCommonConfig } from '@/types/strapi';

import styles from './LanguageSwitcher.module.css';

interface iProps {
  languages: iCommonConfig['languages'];
}

const FLAGS: Record<string, string> = {
  en: '🇬🇧',
  sk: '🇸🇰',
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

        let url = pathname.replace(params.locale as string, lang);

        if (pathname.includes('/equipment')) {
          url = `/${lang}`;
        }

        window.location.replace(url);
      }}
    />
  );
}
