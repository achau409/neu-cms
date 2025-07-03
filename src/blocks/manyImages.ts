import { Block } from 'payload'

export const manyImages: Block = {
  slug: 'manyImages',
  interfaceName: 'ManyImagesBlock',
  fields: [
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
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
    {
      name: 'isTopPosition',
      type: 'checkbox',
      label: 'Position at top',
      defaultValue: false,
    },
  ],
}
