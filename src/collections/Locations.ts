import type { CollectionConfig } from 'payload'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    description: 'Reusable locations referenced in tours.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'locationType',
      type: 'select',
      options: [
        { label: 'Landmark', value: 'landmark' },
        { label: 'Town', value: 'town' },
        { label: 'Reserve', value: 'reserve' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Trail', value: 'trail' },
      ],
      defaultValue: 'landmark',
    },
    {
      name: 'region',
      type: 'text',
      localized: true,
    },
    {
      name: 'country',
      type: 'text',
      defaultValue: 'South Africa',
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          admin: {
            description: 'Decimal degrees (e.g. -33.9023).',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          admin: {
            description: 'Decimal degrees (e.g. 18.4123).',
          },
        },
      ],
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        description: 'Official website for the location.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}