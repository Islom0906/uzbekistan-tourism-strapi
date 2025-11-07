'use strict';

/**
 * gallery controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::gallery.gallery',({ strapi }) => ({
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
