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

      <label htmlFor="p-product">{t`Equipment`}</label>
      <Select id="p-product" items={items} required />

      <br />
      <label htmlFor="p-message">{t`Message`}</label>
      <Textarea id="p-message" rows={3} />

      <br />
      <br />
      <Button type="submit">{t`Get the price`}</Button>
    </form>
  );
}
