import { CollectionConfig } from 'payload'

export const Footer: CollectionConfig = {
  slug: 'footer',
  admin: {
    useAsTitle: 'title',
    group: 'Navigation',
    defaultColumns: ['title', 'updatedAt', 'status'],
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
      name: 'footerLogo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'footerLinks',
      label: 'Links',
      type: 'array',
      fields: [
        {
          name: 'linkText',
          label: 'Link Text',
          type: 'text',
        },
        {
          name: 'URL',
          label: 'Link URL',
          type: 'text',
        },
      ],
    },
    {
      name: 'footerCopyright',
      label: 'Copyright Text',
      type: 'text',
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
