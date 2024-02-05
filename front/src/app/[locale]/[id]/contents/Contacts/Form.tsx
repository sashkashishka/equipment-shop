import { t } from 'ttag';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Select } from '@/components/Select';
import { Textarea } from '@/components/Textarea';
import { getCommonConfig } from '@/utils/strapi/getCommonConfig';

import styles from './Form.module.css';

interface iProps {
  locale: string;
}

export async function Form({ locale }: iProps) {
  const { equipmentLinksFlatten } = await getCommonConfig(locale);

  const items = equipmentLinksFlatten.slice(1).map(({ id, label, slug }) => ({
    id,
    label,
    value: slug,
  }));

  return (
    <form action="/api/send-request" className={styles.form}>
      <p className={styles.title}>{t`Feedback`}</p>

      <div className={styles.grid}>
        <label htmlFor="p-name">
          {t`Name`}
          <Input
            id="p-name"
            type="text"
            name="name"
            required
            minLength={2}
            placeholder={t`Your name`}
          />
        </label>

        <label htmlFor="p-phone">
          {t`Phone`}
          <Input
            id="p-phone"
            type="tel"
            name="phone"
            required
            pattern="(\+|\d|-|\(|\)|\s){6,20}"
            placeholder={t`Phone number`}
          />
        </label>

        <label htmlFor="p-email">
          {t`Email`}
          <Input
            id="p-email"
            type="email"
            name="phone"
            required
            placeholder={t`Email`}
          />
        </label>

        <label htmlFor="p-product">
          {t`Equipment`}
          <Select id="p-product" items={items} required />
        </label>
      </div>

      <br />
      <label htmlFor="p-message">
        {t`Message`}
        <Textarea id="p-message" rows={5} />
      </label>

      <br />
      <br />
      <Button type="submit">{t`Get the price`}</Button>
    </form>
  );
}
