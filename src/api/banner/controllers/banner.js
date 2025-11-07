'use strict';

/**
 * banner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::banner.banner',({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    media: {
                        fields: ['id', 'url','mime'],
                    },

                },
            },
        });


        return data;
    },
}))
