import { Block } from 'payload'

export const Cities: Block = {
  slug: 'cities',
  interfaceName: 'CitiesBlock',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'cities',
      type: 'array',
      label: 'Cities',
      fields: [
        {
          name: 'city',
          type: 'text',
          label: 'City',
        },
      ],
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
  ],
}
