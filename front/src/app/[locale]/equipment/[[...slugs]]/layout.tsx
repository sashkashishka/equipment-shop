import React from 'react';

import { Sidebar } from './components/Sidebar';
import { Breadcrumbs } from './components/Breadcrumbs';

import styles from './layout.module.css';
import { getCommonConfig } from '@/utils/strapi/getCommonConfig';

interface iProps {
  params: { locale: string };
  children: React.ReactNode | React.ReactNode[];
}

export default async function EquipmentLayout({ params, children }: iProps) {
  const { equipmentLinksTree } = await getCommonConfig(params.locale);

  return (
    <div className={styles.layout}>
      <Sidebar equipmentLinksTree={equipmentLinksTree[0].children!} />

      <div>
        <Breadcrumbs equipmentLinksTree={equipmentLinksTree} />
        {children}
      </div>
    </div>
  );
}
