import React from 'react';

import { getMenuAndSidebarLinks } from '@/utils/strapi/getSidebarLinks';
import { Sidebar } from './components/Sidebar';
import { Breadcrumbs } from './components/Breadcrumbs';

import styles from './layout.module.css';

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}

export default async function EquipmentLayout({ children }: iProps) {
  const { menuLinks, sidebarLinks } = await getMenuAndSidebarLinks();

  return (
    <div className={styles.layout}>
      <Sidebar equipmentSidebarLinks={sidebarLinks} />

      <div>
        <Breadcrumbs
          className={styles.breadcrumbs}
          equipmentMenuLink={menuLinks}
        />
        {children}
      </div>
    </div>
  );
}
