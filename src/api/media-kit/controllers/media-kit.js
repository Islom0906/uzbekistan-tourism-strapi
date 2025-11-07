'use strict';

/**
 * media-kit controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::media-kit.media-kit',({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    image: {
                        fields: ['id', 'url','mime'],
                    },

                },
            },
        });


        return data;
    },
}));
