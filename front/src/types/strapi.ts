export interface iStrapiResponse<T> {
  id: number;
  attributes: T;
}

export interface iCommonConfig {
  phone: string;
  languages: string[];
  copyright: string;
}

interface iProduct {
  slug: string;
  name: string;
}

export interface iEquipmentCategory {
  slug: string;
  name: string;
  children: {
    data: iStrapiResponse<iEquipmentCategory>[];
  };
  products?: {
    data: iStrapiResponse<iProduct>[];
  };
}
