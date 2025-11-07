import type { Schema, Struct } from '@strapi/strapi';

export interface RegionGallery extends Struct.ComponentSchema {
  collectionName: 'components_region_galleries';
  info: {
    displayName: 'gallery';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'region.gallery': RegionGallery;
    }
  }
}
