export interface iStrapiResponse<T> {
  id: number;
  attributes: T;
}

export interface iCommonConfig {
  phone: string;
  languages: string[];
  copyright: string;
}

interface iPhoto {
  url: string;
}

export interface iEquipment {
  slug: string;
  name: string;
  type: 'category' | 'productList' | 'product';
  title: string;
  subtitle: string;
  topText?: string;
  bottomText?: string;
  photos: {
    data: iStrapiResponse<iPhoto>[];
  };
  children: {
    data: iStrapiResponse<iEquipment>[];
  };
}
