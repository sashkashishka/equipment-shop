'use client';

import React from 'react';
import { t } from 'ttag';
import { useParams } from 'next/navigation';
import cn from 'classnames';

import { Link } from '@/components/Link';

import type { iCommonConfigContent } from '@/utils/strapi/getCommonConfig';
import { searchTree, includesSlug } from '@/utils/searchTree';
import { ROUTES } from '@/constants/routes';

import styles from './Breadcrumbs.module.css';

interface iProps extends Pick<iCommonConfigContent, 'equipmentLinksTree'> {
  className?: string;
}

export function Breadcrumbs({ className, equipmentLinksTree }: iProps) {
  const { slugs } = useParams();
  const links = searchTree(equipmentLinksTree, includesSlug(slugs as string[]));

  return (
    <div className={cn(styles.container, className)}>
      <Link href={ROUTES.MAIN}>{t`Main`}</Link>

      {links.map((l, i, arr) => {
        const isLast = i === arr.length - 1;
        const Component = isLast ? 'div' : Link;

        return (
          <React.Fragment key={l.slug}>
            {' / '}
            <Component href={l.url} className={styles.item}>
              {l.label}
            </Component>
          </React.Fragment>
        );
      })}
    </div>
  );
}
