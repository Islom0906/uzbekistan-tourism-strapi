'use strict';

/**
 * about controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::about.about',({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    image: {
                        fields: ['id', 'url','mime'],
                    },
                    certificates: {
                        fields: ['id', 'url','mime'],
                    },

                },
            },
        });


        return data;
    },
}))
