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

export interface iHtmlContent {
  html: string;
  __component: 'content.html';
}

export interface iServiceContent {
  icon: {
    data: iStrapiResponse<iPhoto>[];
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
