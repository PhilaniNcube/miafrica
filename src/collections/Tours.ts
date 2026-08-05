import type { CollectionConfig } from 'payload'

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'tourType', 'status', 'sortOrder'],
    description: 'Tour products offered by MiAfrica.',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    // --- Identification ---
    {
      name: 'title',
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
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        description: 'A one-to-two sentence summary shown on cards and listings.',
      },
    },

    // --- Media ---
    {
      name: 'heroMedia',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          localized: true,
        },
      ],
    },

    // --- Format ---
    {
      name: 'tourType',
      type: 'select',
      options: [
        { label: 'Day Tour', value: 'day' },
        { label: 'Multi-Day Tour', value: 'multi-day' },
      ],
      required: true,
      defaultValue: 'day',
    },
    {
      name: 'durationLabel',
      type: 'text',
      localized: true,
      admin: {
        description: 'Human-readable duration (e.g. "4 days, 3 nights").',
      },
    },

    // --- Content ---
    {
      name: 'overview',
      type: 'richText',
      localized: true,
      label: 'Overview',
      admin: {
        description: 'The main descriptive text for this tour.',
      },
    },
    {
      name: 'itinerary',
      type: 'array',
      label: 'Itinerary / Content Sections',
      admin: {
        description: 'Ordered itinerary for day tours, or content sections for multi-format tours like Safari and Hiking.',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Day', value: 'day' },
            { label: 'Section', value: 'section' },
            { label: 'Stop', value: 'stop' },
          ],
          defaultValue: 'section',
        },
        {
          name: 'dayNumber',
          type: 'number',
          admin: {
            condition: (_data, siblingData) => siblingData?.type === 'day',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'summary',
          type: 'richText',
          localized: true,
        },
        {
          name: 'locations',
          type: 'relationship',
          relationTo: 'locations',
          hasMany: true,
        },
        {
          name: 'activities',
          type: 'array',
          fields: [
            {
              name: 'activity',
              type: 'text',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'highlight',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'included',
      type: 'array',
      label: 'Included',
      fields: [
        {
          name: 'item',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'notIncluded',
      type: 'array',
      label: 'Not Included',
      fields: [
        {
          name: 'item',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'practicalInformation',
      type: 'richText',
      localized: true,
    },
    {
      name: 'seasonalInformation',
      type: 'richText',
      localized: true,
    },

    // --- Optional Extras ---
    {
      name: 'optionalExtras',
      type: 'array',
      label: 'Optional Extras',
      admin: {
        description: 'Add-on experiences like funicular rides, boat cruises, bungee jumps, etc.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Included', value: 'included' },
            { label: 'Optional', value: 'optional' },
            { label: 'Upgrade', value: 'upgrade' },
          ],
          defaultValue: 'optional',
        },
        {
          name: 'location',
          type: 'relationship',
          relationTo: 'locations',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },

    // --- Display ---
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
      },
    },

    // --- SEO ---
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Overrides the page title for search engines.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Overrides the meta description.',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Open Graph image for social sharing.',
          },
        },
      ],
    },
  ],
}