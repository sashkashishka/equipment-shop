import { Metadata } from 'next';
import { t } from 'ttag';
import { notFound } from 'next/navigation';
import cn from 'classnames';
import { getBlogPostBySlug } from '@/utils/strapi/getBlogPosts';
import { formatDate } from '@/utils/formatDate';
import { HTMLParser } from '@/components/HTMLParser';
import { Link } from '@/components/Link';
import { ROUTES } from '@/constants/routes';
import { PhotoGallery } from './components/PhotoGallery';

import styles from './page.module.css';

interface iProps {
  params: { slug: string; locale: string };
}

export async function generateMetadata({ params }: iProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug, params.locale);

  if (!post) return {};

  return post.metatags;
}

export default async function BlogPostPage({ params }: iProps) {
  const post = await getBlogPostBySlug(params.slug, params.locale);

  if (!post) {
    notFound();
  }

  const { title, content, photos, publishedAt } = post;

  return (
    <div className={styles.container}>
      <Link href={ROUTES.NEWS}>{t`Back to news`}</Link>

      <div className={styles.headerContainer}>
        <h2 className={cn('h2Title', styles.title)}>{title}</h2>

        <time className={styles.time} dateTime={publishedAt}>
          {formatDate(publishedAt, params.locale)}
        </time>
      </div>

      <HTMLParser>{content}</HTMLParser>

      <PhotoGallery photos={photos} />
    </div>
  );
}
