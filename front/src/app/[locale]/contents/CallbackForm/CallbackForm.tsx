import { t } from 'ttag';
import cn from 'classnames';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { iCallbackFormComponentContent } from '@/utils/strapi/getMainPageConfig';

import styles from './CallbackForm.module.css';
import { ROUTES } from '@/constants/routes';

interface iProps {
  content: iCallbackFormComponentContent;
}

export function CallbackForm({ content }: iProps) {
  const { title, subtitle, illustration } = content;

  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <p className={cn('h2Title', styles.title)}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>

        <div className={styles.content}>
          <img
            className={styles.illustration}
            src={illustration.url}
            alt={title}
          />

          <form
            action="/api/send-request"
            method="POST"
            className={styles.form}
          >
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
            <Input type="hidden" name="pathname" value={ROUTES.MAIN} />

            <Button type="submit">{t`Request a call back`}</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
