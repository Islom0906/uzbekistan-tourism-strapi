'use strict';

/**
 * partner-logo controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::partner-logo.partner-logo',({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    logo: {
                        fields: ['id', 'url','mime'],
                    },

                },
            },
        });


        return data;
    },
}));
