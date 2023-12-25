const PREFIX = 'http://strapi:1337';

export const AUTH_HEADER = {
  authorization: `bearer ${process.env.API_TOKEN}`,
};

export enum API {
  COMMON_CONFIG = `${PREFIX}/api/common-config`,
  EQUIPMENT_CATEGORIES = `${PREFIX}/api/equipment-categories/1?populate=*`,
}
