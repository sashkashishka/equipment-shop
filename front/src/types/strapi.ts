export interface iStrapiResponse<T> {
  id: number;
  attributes: T;
}

export interface iStrapiMeta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export interface iLinks {
  slug: string;
  name: string;
}

export interface iCommonConfig {
  phone: string;
  languages: string[];
  copyright: string;
  links: {
    data: iStrapiResponse<iLinks>[];
  };
}

export interface iMediaImage {
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
    data: iStrapiResponse<iMediaImage>[];
  };
  children: {
    data: iStrapiResponse<iEquipment>[];
  };
  metatags: iMetatags;
}

export interface iHtmlContent {
  html: string;
  __component: 'content.html';
}

export interface iServiceContent {
  photo: {
    data: iStrapiResponse<iMediaImage>;
  };
  description: string;
  children: {
    data: iStrapiResponse<iPage>;
  };
}

export interface iServicesContent {
  service: iServiceContent[];
  __component: 'services.services';
}

export interface iContactsContent {
  email: string;
  phone: string;
  address: string;
  __component: 'contacts.contacts';
}

export interface iPage {
  name: string;
  slug: string;
  content: Array<iHtmlContent | iServicesContent | iContactsContent>;
  metatags: iMetatags;
}

export interface iEquipmentConfig {
  services: iServiceContent[];
}

export interface iBlogPost {
  slug: string;
  title: string;
  photos: {
    data: iStrapiResponse<iMediaImage>[];
  };
  content: string;
  publishedAt: string; // Date
  metatags: iMetatags;
}

export interface iYoutubeVideoComponent {
  name: string;
  url: string;
}

export interface iMainPageConfig {
  aboutCompany: string;
  equipment: {
    data: iStrapiResponse<iEquipment>[];
  };
  services: {
    data: iStrapiResponse<iPage>;
  };
  videos: iYoutubeVideoComponent[];
  carousel: {
    photos: {
      data: iStrapiResponse<iMediaImage>[];
    };
    videos: iYoutubeVideoComponent[];
  };
  metatags: iMetatags;
}

export interface iMetatags {
  title: string;
  description: string;
}
