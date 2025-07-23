import type { Block } from 'payload'

export const ZipCode: Block = {
  slug: 'zipcode',
  interfaceName: 'ZipCodeBlock',
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
      required: false,
    },
    {
      name: 'belowTextEnabled',
      type: 'checkbox',
      label: 'Enable Below Text',
      admin: {
        description: 'Toggle to enable or disable the Below Text field',
      },
      required: false,
    },
    {
      name: 'belowText',
      type: 'text',
      label: 'Below Text',
      admin: {
        condition: (_, siblingData) => siblingData?.belowTextEnabled === true,
        placeholder: 'Enter text to display below',
      },
      required: false,
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
