'use client';

import { useState } from 'react';
import { t } from 'ttag';

import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';

import { Form } from './Form';

import styles from './OrderCallback.module.css';

export function OrderCallback() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button className={styles.button} onClick={() => setIsOpen(true)}>
        {t`Request a call back`}
      </Button>

      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form />
      </Dialog>
    </>
  );
}
