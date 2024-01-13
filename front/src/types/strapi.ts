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

// ===============
// ===============
// misc
// ===============
// ===============

export interface iLinks {
  slug: string;
  linkName: string;
}

export interface iMediaImage {
  url: string;
}

// ===============
// ===============
// COMPONENTS
// ===============
// ===============

export interface iHtmlContent {
  html: string;
  title: string;
  __component: 'content.html';
}

export interface iServiceComponent {
  photo: {
    data: iStrapiResponse<iMediaImage>;
  };
  description: string;
  children: {
    data: iStrapiResponse<iPage>;
  };
}

export interface iServicesComponent {
  title: string;
  service: iServiceComponent[];
  __component: 'services.services';
}

export interface iContactsContent {
  email: string;
  phone: string;
  address: string;
  __component: 'contacts.contacts';
}

export interface iYoutubeVideoComponent {
  name: string;
  url: string;
}

export interface iMetatagsComponent {
  title: string;
  description: string;
}

export interface iCarouselComponent {
  photos: {
    data: iStrapiResponse<iMediaImage>[];
  };
  videos: iYoutubeVideoComponent[];
  __component: 'carousel.carousel';
}

export interface iCallbackFormComponent {
  title: string;
  subtitle: string;
  illustration: {
    data: iStrapiResponse<iMediaImage>;
  };
  __component: 'callback-form.callback-form';
}

export interface iMainEquipmentComponent {
  title: string;
  equipment: {
    data: iStrapiResponse<iEquipment>[];
  };
  __component: 'main.equipment-block';
}

export interface iExhibitionComponent {
  name: string;
  logo: {
    data: iStrapiResponse<iMediaImage>;
  };
  link: string;
}

export interface iExhibitionsComponent {
  title: string;
  bottomText: string;
  exhibitions: iExhibitionComponent[];
  __component: 'main.exhibitions';
}

export interface iYoutubeVideosComponent {
  title: string;
  bottomText: string;
  videos: iYoutubeVideoComponent[];
  __component: 'youtube-video.videos';
}

// ===============
// ===============
// CONFIGS
// ===============
// ===============

export interface iCommonConfig {
  phone: string;
  languages: string[];
  copyright: string;
  links: {
    data: iStrapiResponse<iLinks>[];
  };
}

export interface iEquipmentConfig {
  services: iServiceComponent[];
}

export interface iMainPageConfig {
  metatags: iMetatagsComponent;
  content: Array<
    | iCarouselComponent
    | iServicesComponent
    | iHtmlContent
    | iYoutubeVideosComponent
    | iCallbackFormComponent
    | iMainEquipmentComponent
    | iExhibitionsComponent
  >;
}

// ===============
// ===============
// COLLECTIONS
// ===============
// ===============

export interface iEquipment {
  slug: string;
  linkName: string;
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
  metatags: iMetatagsComponent;
}

export interface iPage {
  linkName: string;
  slug: string;
  content: Array<iHtmlContent | iServicesComponent | iContactsContent>;
  metatags: iMetatagsComponent;
}

export interface iBlogPost {
  slug: string;
  title: string;
  photos: {
    data: iStrapiResponse<iMediaImage>[];
  };
  content: string;
  publishedAt: string; // Date
  metatags: iMetatagsComponent;
}
