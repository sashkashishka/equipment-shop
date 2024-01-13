import { t } from 'ttag';
import { iContactsTypeContent } from '@/utils/strapi/getDynamicPageContent';
import { Link } from '@/components/Link';
import { Form } from './Form';

import styles from './Contacts.module.css';

interface iProps {
  content: iContactsTypeContent;
  locale: string;
}

export function ContactsContent({ content, locale }: iProps) {
  return (
    <div className={styles.container}>
      <div className={styles.contactsData}>
        <div className={styles.row}>
          <div className={styles.label}>{t`Address`}:</div>
          {content.address}
        </div>

        <div className={styles.row}>
          <div className={styles.label}>{t`Phone`}:</div>
          <Link href={`tel:${content.phone}`}>{content.phone}</Link>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>{t`Email`}:</div>
          <Link href={`mailto:${content.email}`}>{content.email}</Link>
        </div>
      </div>

      <Form locale={locale} />
    </div>
  );
}
