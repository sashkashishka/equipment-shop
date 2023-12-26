import { t } from 'ttag';
import { Link } from '@/components/Link';
import { NestedMenu } from './NestedMenu';
import { getMenuLinks } from '@/utils/strapi/getMenuLinks';

export async function Links() {
  const equipmentMenuLinks = await getMenuLinks();

  return (
    <>
      <NestedMenu equipmentMenuLinks={equipmentMenuLinks} />
      <Link href="/about-us">{t`About company`}</Link>
      <Link href="/contacts">{t`Contacts`}</Link>
      <Link href="/service">{t`Service`}</Link>
      <Link href="/news">{t`News`}</Link>
      <Link href="/business-conditions">{t`Business conditions`}</Link>
    </>
  );
}
