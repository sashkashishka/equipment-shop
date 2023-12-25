'use client';
import { t } from 'ttag';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import styles from './Form.module.css';

export function Form() {
  const pathname = usePathname();

  return (
    <form action="/api/request-callback">
      <p className={styles.title}>
        {t`Have a questions?`}
        <br />
        {t`We will call you back`}
      </p>

      <label htmlFor="oc-name">{t`Name`}</label>
      <Input
        id="oc-name"
        type="text"
        name="name"
        required
        minLength={2}
        placeholder={t`Your name`}
      />
      <br />
      <br />

      <label htmlFor="oc-phone">{t`Phone`}</label>
      <Input
        id="oc-phone"
        type="tel"
        name="phone"
        required
        pattern="(\+|\d|-|\(|\)|\s){6,20}"
        placeholder={t`Phone number`}
      />
      <br />
      <br />
      <Input type="hidden" name="pathname" value={pathname} />

      <Button type="submit">{t`Request a call back`}</Button>
    </form>
  );
}
