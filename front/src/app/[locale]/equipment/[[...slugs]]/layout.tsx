import React from 'react';

import { Sidebar } from './components/Sidebar';
import { Breadcrumbs } from './components/Breadcrumbs';

import styles from './layout.module.css';
import { getCommonConfig } from '@/utils/strapi/getCommonConfig';

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}

export default async function EquipmentLayout({ children }: iProps) {
  const { equipmentLinksTree } = await getCommonConfig();

  return (
    <div className={styles.layout}>
      <Sidebar equipmentLinksTree={equipmentLinksTree[0].children!} />

      <div>
        <Breadcrumbs
          className={styles.breadcrumbs}
          equipmentLinksTree={equipmentLinksTree}
        />
        {children}
      </div>
    </div>
  );
}
