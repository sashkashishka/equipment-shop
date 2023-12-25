'use client';

import { useState } from 'react';
import cn from 'classnames';
import { iEquipmentMenuLink } from '@/utils/getLinksTree';
import { Link } from '@/components/Link';

import styles from './NestedMenu.module.css';

interface iBlockProps {
  link: iEquipmentMenuLink;
  isNested: boolean;
}

function Block({ link, isNested }: iBlockProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChild = !!link?.children?.length;

  return (
    <div
      className={styles.block}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link href={link.url} className={cn(isNested && styles.link)}>
        {link.label}
      </Link>

      {hasChild && isOpen && (
        <div className={cn(styles.links, isNested && styles.linksRight)}>
          <NestedMenu isNested equipmentMenuLinks={link.children!} />
        </div>
      )}
    </div>
  );
}

interface iProps {
  equipmentMenuLinks: iEquipmentMenuLink[];
  isNested?: boolean;
}

export function NestedMenu({ equipmentMenuLinks, isNested = false }: iProps) {
  return (
    <div className={cn(isNested && styles.container)}>
      {equipmentMenuLinks.map((link) => (
        <Block key={link.url} link={link} isNested={isNested} />
      ))}
    </div>
  );
}
