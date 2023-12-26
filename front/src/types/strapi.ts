export interface iStrapiResponse<T> {
  id: number;
  attributes: T;
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
}

export interface iHtmlContent {
  html: string;
  __component: 'content.html';
}

export interface iServiceContent {
  icon: {
    data: iStrapiResponse<iMediaImage>[];
  };
  description: string;
  children: {
    data: iStrapiResponse<iPage>[];
  };
  __component: 'service.service';
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
  content: Array<iHtmlContent | iServiceContent | iContactsContent>;
}

export interface iEquipmentConfig {
  services: iServiceContent[];
}
