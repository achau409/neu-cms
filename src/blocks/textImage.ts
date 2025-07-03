import { Block } from 'payload'

export const TextImage: Block = {
  slug: 'textImage',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
    },
    {
      name: 'rounded',
      type: 'checkbox',
      label: 'Rounded',
    },
    {
      name: 'textAlign',
      type: 'select',
      options: ['left', 'right', 'center'],
      label: 'Text Align',
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: ['left', 'bottom'],
      label: 'Image Position',
      admin: {
        position: 'sidebar',
      },
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
