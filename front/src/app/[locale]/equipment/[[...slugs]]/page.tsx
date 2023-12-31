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
  const [page] = await getEquipmentPageTypeBySlug(params.slugs);

  if (!page) return {};

  const { metatags } = await getEquipmentContent(page.id);

  return metatags;
}

export default async function Equipment({ params }: iProps) {
  const [page] = await getEquipmentPageTypeBySlug(params.slugs);

  if (!page) {
    notFound();
  }

  switch (page.type) {
    case 'category': {
      return <Category id={page.id} />;
    }

    case 'productList': {
      return <ProductList id={page.id} />;
    }

    default: {
      return <Product id={page.id} />;
    }
  }
}
