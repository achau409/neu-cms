import type { Block } from 'payload'

export const Statistic: Block = {
  slug: 'statistic',
  interfaceName: 'Statistic',
  fields: [
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          type: 'tabs',
          tabs: [
            {
              label: 'Content',
              fields: [
                {
                  name: 'total',
                  type: 'number',
                  label: 'Total Count',
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title',
                  required: false,
                },
                {
                  name: 'cardIcon',
                  type: 'upload',
                  label: 'Card Image',
                  relationTo: 'media',
                  admin: {
                    description: 'Please upload SVG or PNG',
                  },
                  required: true,
                },
              ],
            },
            {
              label: 'Appearance',
              fields: [
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
            },
          ],
        },
      ],
    },
  ],
}
