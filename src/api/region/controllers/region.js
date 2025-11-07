'use strict';

/**
 * region controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::region.region',({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    video: {
                        fields: ['id', 'url','mime'],
                    },
                    region_list:{
                        fields: ['id', 'name'],
                    },
                    gallery: {
                        populate:{
                            image:{
                                fields: ['id', 'url','mime'],
                            }
                        }
                    },

                },
            },
        });


        return data;
    },
}));
