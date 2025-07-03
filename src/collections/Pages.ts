import { blocks } from '@/blocks/registerBlocks'
import createSlugField from '@/fields/slug'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt','status'],
    group: 'Content', // Group pages in the admin panel',
  },
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },

  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    createSlugField('slug', 'title', 'pages'),
    {
      name: 'content',
      type: 'blocks',
      minRows: 1,
      maxRows: 999,
      blocks: blocks,
    },

    {
      name: 'isHomePage',
      label: 'Home Page',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name:'status',
      label: 'Status',
      type: 'select',
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Metadata',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
        {
          name: 'metaKeywords',
          type: 'text',
          label: 'Meta Keywords',
        },
      ],
    },

  ],
}

export default Pages
