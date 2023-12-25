export interface iStrapiResponse<T> {
  id: number;
  attributes: T;
}

export interface iCommonConfig {
  phone: string;
  languages: string[];
}

export interface iEquipmentCategory {
  name: string;
}
