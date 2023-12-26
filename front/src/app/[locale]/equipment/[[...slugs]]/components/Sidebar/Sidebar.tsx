'use client';

import { useParams } from 'next/navigation';
import { t } from 'ttag';
import cn from 'classnames';
import { iEquipmentMenuLink } from '@/utils/getLinksTree';
import { Link } from '@/components/Link';

import ArrowDownIcon from '@/images/icons/arrow-down.svg';

import styles from './Sidebar.module.css';

interface iNestedMenuProps {
  equipmentSidebarLinks: iEquipmentMenuLink[];
  isNested?: boolean;
}

function NestedMenu({ equipmentSidebarLinks }: iNestedMenuProps) {
  const params = useParams();

  const activeEquipment = params.slugs.slice(1);

  return (
    <>
      {equipmentSidebarLinks.map((link) => {
        const hasChild = !!link?.children?.length;
        const isOpen = activeEquipment.includes(link.slug);
        const active =
          activeEquipment[activeEquipment.length - 1] === link.slug;

        return (
          <div key={link.url} className={styles.block}>
            <Link
              href={link.url}
              className={cn(styles.link, active && styles.linkActive)}
            >
              {link.label}

              {hasChild && (
                <span className={styles.arrow}>
                  <ArrowDownIcon />
                </span>
              )}
            </Link>

            {hasChild && isOpen && (
              <div className={styles.links}>
                <NestedMenu isNested equipmentSidebarLinks={link.children!} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

interface iSidebarProps {
  equipmentSidebarLinks: iEquipmentMenuLink[];
}

export function Sidebar({ equipmentSidebarLinks }: iSidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>{t`Equipment catalog`}</div>
      <NestedMenu equipmentSidebarLinks={equipmentSidebarLinks} />
    </div>
  );
}
