import type { CollectionConfig } from 'payload'
import sharp from 'sharp'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'uploads',
    disableLocalStorage: process.env.NODE_ENV === 'production',
    resizeOptions: {
      width: 2560,
      height: 2560,
      fit: 'inside',
      withoutEnlargement: true,
    },
    formatOptions: {
      format: 'webp',
      options: {
        quality: 80,
      },
    },
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
      async ({ data, req }) => {
        const file = (req as { file?: { data?: Buffer; mimeType?: string; size?: number } }).file
        if (file?.size && file.size > 10 * 1024 * 1024) {
          throw new Error('Uploaded file exceeds the 10MB maximum size limit.')
        }

        if (file?.data && file.mimeType?.startsWith('image/')) {
          // Pre-compress images larger than 2MB using sharp before saving
          if (file.size && file.size > 2 * 1024 * 1024) {
            try {
              const compressedBuffer = await sharp(file.data)
                .resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer()

              file.data = compressedBuffer
              file.size = compressedBuffer.length
            } catch {
              // If sharp processing fails, fall through to default payload sharp handling
            }
          }
        }

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