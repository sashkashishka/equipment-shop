import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getEquipmentPageTypeBySlug } from '@/utils/strapi/getEquipmentPageTypeBySlug';
import { getEquipmentContent } from '@/utils/strapi/getEquipmentContent';

import { Category } from './components/Category';
import { ProductList } from './components/ProductList';
import { Product } from './components/Product/Product';

interface iProps {
  params: { locale: string; slugs: string[] };
}

export async function generateMetadata({ params }: iProps): Promise<Metadata> {
  const [page] = await getEquipmentPageTypeBySlug(params.slugs, params.locale);

  if (!page) return {};

  const { metatags } = await getEquipmentContent(page.id, params.locale);

  return metatags;
}

export default async function Equipment({ params: { slugs, locale } }: iProps) {
  const [page] = await getEquipmentPageTypeBySlug(slugs, locale);

  if (!page) {
    notFound();
  }

  switch (page.type) {
    case 'category': {
      return <Category id={page.id} locale={locale} />;
    }

    case 'productList': {
      return <ProductList id={page.id} locale={locale} />;
    }

    default: {
      return <Product id={page.id} locale={locale} />;
    }
  }
}
