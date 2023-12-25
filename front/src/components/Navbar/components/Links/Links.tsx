import { t } from 'ttag';
import { API } from '@/constants/api';
import { getStrapi } from '@/utils/getStrapi';
import { Link } from '@/components/Link';
import { NestedMenu } from './NestedMenu';
import { getEquipmentMenuLinks } from '@/utils/getLinksTree';

export async function Links() {
  const data = await getStrapi(API.EQUIPMENT_CATEGORIES);

  return (
    <>
      <NestedMenu equipmentMenuLinks={getEquipmentMenuLinks(data)} />
      <Link href="/about-us">{t`About company`}</Link>
      <Link href="/contacts">{t`Contacts`}</Link>
      <Link href="/service">{t`Service`}</Link>
      <Link href="/news">{t`News`}</Link>
      <Link href="/business-conditions">{t`Business conditions`}</Link>
    </>
  );
}
