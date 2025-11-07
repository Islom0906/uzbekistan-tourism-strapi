'use strict';

/**
 * video controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::video.video',({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    banner_image: {
                        fields: ['id', 'url','mime'],
                    },
                    video: {
                        fields: ['id', 'url','mime'],
                    },

                },
            },
        });


        return data;
    },
}))
