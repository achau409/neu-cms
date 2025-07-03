import { Block } from 'payload'

export const Card: Block = {
  slug: 'card',

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      admin: {
        description: 'Enter a color value (e.g., #FFFFFF)',
      },
      required: false,
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Option Sections',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
          required: true,
        },
        {
          name: 'options',
          type: 'array',
          label: 'Options',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Option Image',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Option Label',
              required: true,
            },
            {
              name: 'link',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Link (Optional)',
              hasMany: false,
            },
          ],
        },
        {
          name: 'showMoreButton',
          type: 'checkbox',
          label: 'Show "Show More" Button',
          defaultValue: false,
        },
      ],
    },
  ],
}
