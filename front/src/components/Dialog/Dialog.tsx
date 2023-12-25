'use client';

import React from 'react';

import { LockScroll } from '@/components/LockScroll';
import { EscClick } from '@/components/EscClick';
import { Button } from '@/components/Button';
import CloseIcon from '@/images/icons/close.svg';

import styles from './Dialog.module.css';

interface iProps {
  isOpen: boolean;
  setIsOpen(v: boolean): void;
  children: React.ReactNode | React.ReactNode[];
}

export function Dialog({ isOpen, setIsOpen, children }: iProps) {
  if (!isOpen) return null;

  const close = () => setIsOpen(false);

  return (
    <div className={styles.dialogContainer}>
      <div className={styles.dialog}>
        <Button type="button" className={styles.closeButton} onClick={close}>
          <CloseIcon width={24} height={24} />
        </Button>

        {children}
      </div>
      <div className={styles.overlay} onClick={close} />
      <LockScroll />
      <EscClick handler={close} />
    </div>
  );
}
