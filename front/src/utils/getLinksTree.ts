import type { iEquipmentCategory, iStrapiResponse } from '@/types/strapi';

export interface iEquipmentMenuLink {
  label: string;
  url: string;
  slug: string;
  children?: iEquipmentMenuLink[];
}

export function getEquipmentMenuLinks(
  data: iStrapiResponse<iEquipmentCategory>[],
  prefix = '/equipment',
): iEquipmentMenuLink[] {
  return data.map<iEquipmentMenuLink>((v) => {
    const label = v.attributes.name;
    const slug = v.attributes.slug;
    const url = `${prefix}/${v.attributes.slug}`;

    if (!v?.attributes?.children?.data?.length) {
      return {
        label,
        url,
        slug,
      };
    }

    return {
      label,
      url,
      slug,
      children: getEquipmentMenuLinks(v?.attributes?.children?.data, url),
    };
  });
}

export function getEquipmentSidebarLinks(
  tree: iEquipmentMenuLink[],
): iEquipmentMenuLink[] {
  return tree.reduce<iEquipmentMenuLink[]>((acc, link) => {
    if (link.children) {
      acc = acc.concat(link.children);
    }

    return acc;
  }, []);
}

export interface iEquipmentFooterLink {
  label: string;
  url: string;
}

export function getEquipmentFooterLinks(
  data: iStrapiResponse<iEquipmentCategory>[],
  prefix = '/equipment',
  depth = 1,
): iEquipmentFooterLink[] {
  const tree = getEquipmentMenuLinks(data, prefix);

  function flatten(links: typeof tree, d = depth) {
    return links.reduce<iEquipmentFooterLink[]>(
      (acc, { url, label, children }) => {
        acc.push({ url, label });

        if (children && d > 0) {
          acc = acc.concat(flatten(children, d - 1));
        }

        return acc;
      },
      [],
    );
  }

  return flatten(tree);
}
