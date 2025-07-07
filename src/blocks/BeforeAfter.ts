import { Block } from 'payload'

export const BeforeAfter: Block = {
  slug: 'beforeAfter',
  interfaceName: 'BeforeAfterBlock',
  fields: [
    {
      name: 'headerTitle',
      type: 'text',
      label: 'Header Title',
    },
    {
      name: 'headerDescription',
      type: 'text',
      label: 'Header Description',
    },
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Before Image',
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'After Image',
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
