import React from 'react';
import { API } from '@/constants/api';
import { getStrapi } from '@/utils/getStrapi';
import {
  getEquipmentMenuLinks,
  getEquipmentSidebarLinks,
} from '@/utils/getLinksTree';
import { Sidebar } from './components/Sidebar';

import styles from './layout.module.css';
import { Breadcrumbs } from './components/Breadcrumbs';

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}

export default async function EquipmentLayout({ children }: iProps) {
  const equipmentCategories = await getStrapi(API.EQUIPMENT_CATEGORIES);
  const equipmentMenuLinks = getEquipmentMenuLinks(equipmentCategories);
  const equipmentSidebarLinks = getEquipmentSidebarLinks(equipmentMenuLinks);

  return (
    <div className={styles.layout}>
      <Sidebar equipmentSidebarLinks={equipmentSidebarLinks} />
      <div className={styles.content}>
        <Breadcrumbs equipmentMenuLink={equipmentMenuLinks} />
        {children}
      </div>
    </div>
  );
}
