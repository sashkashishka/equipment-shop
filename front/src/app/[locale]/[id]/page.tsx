import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getDynamicPageContent } from '@/utils/strapi/getDynamicPageContent';
import { HTMLParser } from '@/components/HTMLParser';

import { ContactsContent } from './contents/Contacts';
import { ServicesContent } from './contents/Services';

import styles from './page.module.css';

interface iProps {
  params: { id: string; locale: string };
}

export async function generateMetadata({ params }: iProps): Promise<Metadata> {
  const data = await getDynamicPageContent(params.id, params.locale);

  if (!data) return {};

  return data.metatags;
}

export default async function DynamicPage({ params }: iProps) {
  const data = await getDynamicPageContent(params.id, params.locale);

  if (!data) {
    notFound();
  }

  return (
    <div>
      <h2 className="h2Title">{data.title}</h2>

      <div className={styles.content}>
        {data.content.map((item, i) => {
          switch (item.__component) {
            case 'content.html': {
              return <HTMLParser key={i}>{item.html}</HTMLParser>;
            }

            case 'contacts.contacts-list': {
              return <ContactsContent content={item} locale={params.locale} />;
            }

            case 'services.services': {
              return <ServicesContent content={item} />;
            }
          }
        })}
      </div>
    </div>
  );
}
