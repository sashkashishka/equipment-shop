'use client';

import { useParams } from 'next/navigation';
import { t } from 'ttag';
import cn from 'classnames';
import type { iEquipmentLink } from '@/utils/getLinksTree';
import { Link } from '@/components/Link';

import ArrowDownIcon from '@/images/icons/arrow-down.svg';

import styles from './Sidebar.module.css';

interface iNestedMenuProps {
  equipmentLinksTree: iEquipmentLink[];
  isNested?: boolean;
}

function NestedMenu({ isNested, equipmentLinksTree }: iNestedMenuProps) {
  const params = useParams();

  const activeEquipment = params.slugs.slice(1);

  return (
    <>
      {equipmentLinksTree.map((link) => {
        const hasChild = !!link?.children?.length;
        const isOpen = activeEquipment.includes(link.slug);
        const active =
          activeEquipment[activeEquipment.length - 1] === link.slug;

        return (
          <div key={link.url} className={styles.block}>
            <Link
              href={link.url}
              data-test={active}
              className={cn(
                styles.link,
                active && styles.linkActive,
                isNested && styles.nested,
                link.type !== 'product' && styles.uppercase,
                link.type === 'product' && styles.productLink,
              )}
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
                <NestedMenu isNested equipmentLinksTree={link.children!} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

interface iSidebarProps {
  equipmentLinksTree: iEquipmentLink[];
}

export function Sidebar({ equipmentLinksTree }: iSidebarProps) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTitle}>{t`Equipment catalog`}</div>
      <NestedMenu equipmentLinksTree={equipmentLinksTree} />
    </div>
  );
}
