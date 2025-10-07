import type { CollectionConfig } from 'payload'

export const Experiments: CollectionConfig = {
  slug: 'experiments',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },

    {
      name: 'slug',
      label: 'Slug',
      type: 'relationship',
      relationTo: 'services',

      hasMany: false,
    },
  ],
}
