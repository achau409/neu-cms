import { Block } from 'payload'

export const Htmlblock: Block = {
  slug: 'htmlblock',
  interfaceName: 'HTMLBlock',
  fields: [
    {
      name: 'html',
      type: 'textarea',
      label: 'HTML',
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
