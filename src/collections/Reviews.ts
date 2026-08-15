import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    group: 'Content',
    useAsTitle: 'author',
    defaultColumns: ['author', 'tour', 'rating', 'status', 'createdAt'],
    description: 'Customer reviews and testimonials with optional tour linkage.',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        status: {
          equals: 'published',
        },
      }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the reviewer.',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Reviewer location (e.g. London, UK or New York, USA).',
      },
    },
    {
      name: 'tour',
      type: 'relationship',
      relationTo: 'tours',
      required: false,
      admin: {
        description: 'Optional tour or experience this review is for.',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Star rating from 1 to 5.',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Short headline or summary of the review.',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The full text of the review.',
      },
    },
    {
      name: 'reviewDate',
      type: 'date',
      admin: {
        description: 'Date of travel or when the review was written.',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Pending Moderation', value: 'pending' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'published',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Feature this review prominently across the website.',
      },
    },
    {
      name: 'createdAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && !data.createdAt) {
          data.createdAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
}
