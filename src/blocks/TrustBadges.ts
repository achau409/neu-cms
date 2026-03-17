import { Block } from 'payload'

export const TrustBadges: Block = {
  slug: 'trust-badges',
  interfaceName: 'TrustBadges',

  fields: [
    {
      name: 'badges',
      label: 'Badges',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'name',
          label: 'Badge Name',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },

        {
          name: 'description',
          label: 'Description',
          type: 'text',
          required: false,
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'text',
          required: false,
        },
      ],
    },

    {
      name: 'trustSignals',
      label: 'Trust Signals',
      type: 'array',
      fields: [
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
