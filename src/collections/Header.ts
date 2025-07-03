import { CollectionConfig } from 'payload'

export const Header: CollectionConfig = {
  slug: 'header',
  admin: {
    useAsTitle: 'title',
    group: 'Navigation',
    defaultColumns: ['title','updatedAt','status'],
  },
access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
    },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'headerLogo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'active',
      options: ['active', 'inactive'],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
