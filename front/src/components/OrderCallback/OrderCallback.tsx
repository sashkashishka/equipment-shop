'use client';

import { useState } from 'react';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';

import styles from './OrderCallback.module.css';

export function OrderCallback() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button className={styles.button} onClick={() => setIsOpen(true)}>
        Order callback
      </Button>

      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        form
      </Dialog>
    </>
  );
}
