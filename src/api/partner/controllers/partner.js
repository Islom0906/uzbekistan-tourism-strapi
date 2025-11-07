'use strict';

/**
 * partner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::partner.partner',({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    image: {
                        fields: ['id', 'url','mime'],
                    },
                    service: {
                        fields: ['id', 'title'],
                    },

                },
            },
        });


        return data;
    },
}));
