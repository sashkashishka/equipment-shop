'use client';

import { useState } from 'react';
import cn from 'classnames';
import { iEquipmentLink } from '@/utils/getLinksTree';
import { Link } from '@/components/Link';

import ArrowDownIcon from '@/images/icons/arrow-down.svg';

import styles from './NestedMenu.module.css';

interface iBlockProps {
  link: iEquipmentLink;
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
      <Link
        href={link.url}
        className={cn(isNested && styles.link)}
        onClick={(e) => {
          if (hasChild && !isOpen) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {link.label}

        {hasChild && (
          <span className={styles.arrow}>
            <ArrowDownIcon />
          </span>
        )}
      </Link>

      {hasChild && isOpen && (
        <div className={cn(styles.links, isNested && styles.linksRight)}>
          <NestedMenu isNested equipmentLinksTree={link.children!} />
        </div>
      )}
    </div>
  );
}

interface iProps {
  equipmentLinksTree: iEquipmentLink[];
  isNested?: boolean;
}

export function NestedMenu({ equipmentLinksTree, isNested = false }: iProps) {
  return (
    <div className={cn(isNested && styles.container)}>
      {equipmentLinksTree.map((link) => (
        <Block key={link.url} link={link} isNested={isNested} />
      ))}
    </div>
  );
}
