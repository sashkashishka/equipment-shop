import type { iEquipment, iStrapiResponse } from '@/types/strapi';

export interface iEquipmentMenuLink {
  id: number;
  label: string;
  url: string;
  slug: string;
  children?: iEquipmentMenuLink[];
}

export function getEquipmentMenuLinks(
  data: iStrapiResponse<iEquipment>[],
  prefix = '/equipment',
): iEquipmentMenuLink[] {
  return data.map<iEquipmentMenuLink>((v) => {
    const id = v.id;
    const label = v.attributes.name;
    const slug = v.attributes.slug;
    const url = `${prefix}/${v.attributes.slug}`;

    if (!v?.attributes?.children?.data?.length) {
      return {
        id,
        label,
        url,
        slug,
      };
    }

    return {
      id,
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
  data: iStrapiResponse<iEquipment>[],
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

export interface iPageTree {
  id: number;
  slug: string;
  type: iEquipment['type'];
  children?: iPageTree[];
}

export function getPageTree(
  data: iStrapiResponse<iEquipment>[],
): iPageTree[] {
  return data.map<iPageTree>((v) => {
    const id = v.id;
    const type = v.attributes.type;
    const slug = v.attributes.slug;

    if (!v?.attributes?.children?.data?.length) {
      return {
        id,
        type,
        slug,
      };
    }

    return {
      id,
      type,
      slug,
      children: getPageTree(v?.attributes?.children?.data),
    };
  });
}
