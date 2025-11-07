'use strict';

/**
 * journal controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::journal.journal',({ strapi }) => ({
    async find(ctx) {
        const data = await super.find({
            ...ctx,
            query: {
                ...ctx.query,
                populate: {
                    pdf_ru: {
                        fields: ['id', 'url','mime'],
                    },
                    pdf_en:{
                        fields: ['id', 'url'],
                    },
                    card_image:{
                        fields: ['id', 'url'],
                    },
                    images:{
                        fields: ['id', 'url'],
                    },
                },
            },
        });


        return data;
    },
}));
