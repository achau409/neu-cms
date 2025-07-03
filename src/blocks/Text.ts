import { Block } from 'payload'

export const Text: Block = {
  slug: 'text',
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'Text',
    },
    {
      name: 'textAlign',
      type: 'select',
      options: ['left', 'right', 'center'],
      label: 'Text Align',
    },
    {
      name: 'fontSize',
      type: 'number',
      label: 'Font Size',
    },
    {
      name: 'fontWeight',
      type: 'number',
      label: 'Font Weight',
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
