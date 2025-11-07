'use strict';

/**
 * map controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::map.map',({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    service: {
                        fields: ['id', 'title'],
                    },
                    region_list:{
                        fields: ['id', 'name'],
                    },
                    partner: {
                        populate:{
                            image:{
                                fields: ['id', 'url','mime'],
                            },
                            service: {
                                fields: ['id', 'title'],
                            },
                        }
                    },

                },
            },
        });


        return data;
    },
}));
