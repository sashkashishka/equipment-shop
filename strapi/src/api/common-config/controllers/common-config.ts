/**
 * common-config controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::common-config.common-config",
  ({ strapi }) => ({
    async find(ctx) {
      const result = await super.find(ctx);
      const locales = await strapi.plugins.i18n.services.locales.find();

      result.data.attributes.locales = locales.map((l) => l.code);

      return result;
    },
  })
);
