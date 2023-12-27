'use client';
import { t } from 'ttag';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import styles from './Form.module.css';

interface iProps {
  productName: string;
}

export function Form({ productName }: iProps) {
  return (
    <form action="/api/send-request">
      <p className={styles.title}>
        {t`You will receive a detailed commercial offer`}
      </p>

      <label htmlFor="p-name">{t`Name`}</label>
      <Input
        id="p-name"
        type="text"
        name="name"
        required
        minLength={2}
        placeholder={t`Your name`}
      />
      <br />
      <br />

      <label htmlFor="p-phone">{t`Phone`}</label>
      <Input
        id="p-phone"
        type="tel"
        name="phone"
        required
        pattern="(\+|\d|-|\(|\)|\s){6,20}"
        placeholder={t`Phone number`}
      />
      <br />
      <br />

      <label htmlFor="p-email">{t`Email`}</label>
      <Input
        id="p-email"
        type="email"
        name="phone"
        required
        placeholder={t`Email`}
      />
      <br />
      <br />
      <Input type="hidden" name="product" value={productName} />

      <Button type="submit">{t`Get the price`}</Button>
    </form>
  );
}
