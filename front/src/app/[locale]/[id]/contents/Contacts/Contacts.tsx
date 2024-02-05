import { t } from 'ttag';
import { iContactsListTypeContent } from '@/utils/strapi/getDynamicPageContent';
import { Link } from '@/components/Link';
import { Form } from './Form';

import styles from './Contacts.module.css';

interface iProps {
  content: iContactsListTypeContent;
  locale: string;
}

export function ContactsContent({ content, locale }: iProps) {
  return (
    <div className={styles.container}>
      <div className={styles.contactsData}>
        {content.contacts.map((contact) => (
          <div className={styles.contact}>
            <div className={styles.row}>
              <div className={styles.label}>{t`Address`}:</div>
              {contact.address}
            </div>

            <div className={styles.row}>
              <div className={styles.label}>{t`Phone`}:</div>
              <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>
            </div>

            <div className={styles.row}>
              <div className={styles.label}>{t`Email`}:</div>
              <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
            </div>
          </div>
        ))}
      </div>

      <Form locale={locale} />
    </div>
  );
}
