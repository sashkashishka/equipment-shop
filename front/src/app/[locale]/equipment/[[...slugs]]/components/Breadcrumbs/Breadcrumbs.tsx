'use client';

import React from 'react';
import { t } from 'ttag';
import { useParams } from 'next/navigation';
import cn from 'classnames';

import { Link } from '@/components/Link';

import { iEquipmentMenuLink } from '@/utils/getLinksTree';
import { findLinksInTree } from '@/utils/findLinksInTree';

import styles from './Breadcrumbs.module.css';

interface iProps {
  className?: string;
  equipmentMenuLink: iEquipmentMenuLink[];
}

export function Breadcrumbs({ className, equipmentMenuLink }: iProps) {
  const { slugs } = useParams();
  const links = findLinksInTree(equipmentMenuLink, slugs as string[]);

  return (
    <div className={cn(styles.container, className)}>
      <Link href="/">{t`Main`}</Link>

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
