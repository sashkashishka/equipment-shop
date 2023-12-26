import { t } from 'ttag';
import { Link } from '@/components/Link';
import { NestedMenu } from './NestedMenu';
import { getMenuLinks } from '@/utils/strapi/getMenuLinks';
import { ROUTES } from '@/constants/routes';

export async function Links() {
  const equipmentMenuLinks = await getMenuLinks();

  return (
    <>
      <NestedMenu equipmentMenuLinks={equipmentMenuLinks} />
      <Link href={ROUTES.ABOUT_US}>{t`About company`}</Link>
      <Link href={ROUTES.CONTACTS}>{t`Contacts`}</Link>
      <Link href={ROUTES.SERVICES}>{t`Services`}</Link>
      <Link href={ROUTES.NEWS}>{t`News`}</Link>
      <Link href={ROUTES.BUSINESS_CONDITIONS}>{t`Business conditions`}</Link>
    </>
  );
}
