import { t } from 'ttag';
import { Link } from '@/components/Link';
import { Button } from '@/components/Button';
import { HTMLParser } from '@/components/HTMLParser';
import { iExhibitionsComponentContent } from '@/utils/strapi/getMainPageConfig';

import styles from './Exhibitions.module.css';

interface iProps {
  content: iExhibitionsComponentContent;
}

export function Exhibitions({ content }: iProps) {
  const { title, exhibitions, bottomText } = content;

  return (
    <div className={styles.container}>
      <p className="h2Title">{title}</p>

      <div className={styles.cardsList}>
        {exhibitions.map(({ link, logo, name }) => (
          <Link key={link} href={link} rel="noreferrer" className={styles.card}>
            <p className={styles.cardTitle}>{name}</p>

            <img className={styles.logo} src={logo.url} alt={name} />
          </Link>
        ))}
      </div>

      <HTMLParser>{bottomText}</HTMLParser>
    </div>
  );
}
