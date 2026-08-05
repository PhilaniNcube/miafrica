import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'uploads',
    disableLocalStorage: process.env.NODE_ENV === 'production',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    mimeTypes: ['image/*', 'video/*'],
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'mediaType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      required: true,
      defaultValue: 'image',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        description: 'Descriptive text for accessibility. Required for all uploads.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional caption displayed with the media.',
      },
    },
    {
      name: 'credit',
      type: 'text',
    },
    {
      name: 'posterImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        condition: (_data, siblingData) => siblingData?.mediaType === 'video',
        description: 'A still image displayed before the video plays.',
      },
    },
    {
      name: 'focalPoint',
      type: 'group',
      fields: [
        {
          name: 'x',
          type: 'number',
          admin: {
            description: 'Horizontal focal point (0-100).',
          },
        },
        {
          name: 'y',
          type: 'number',
          admin: {
            description: 'Vertical focal point (0-100).',
          },
        },
      ],
      admin: {
        condition: (_data, siblingData) => siblingData?.mediaType === 'image',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        const file = (req as { file?: { mimeType?: string } }).file
        if (file?.mimeType) {
          if (file.mimeType.startsWith('video/')) {
            data.mediaType = 'video'
          } else {
            data.mediaType = 'image'
          }
        }
        return data
      },
    ],
  },
}