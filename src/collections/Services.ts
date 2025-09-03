import { blocks } from '@/blocks/registerBlocks'
import createSlugField from '@/fields/slug'
import { CollectionConfig } from 'payload'
import { createLexicalEditor } from './Lexical'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['slug', 'variant', 'updatedAt', 'status'],
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
    createSlugField('slug', 'title', 'services'),
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'customerLogo',
      label: 'Customer Logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Please upload a logo for the customer',
        position: 'sidebar',
      },
    },

    {
      name: 'heroImage',
      type: 'upload',
      label: 'Hero Image',
      relationTo: 'media',
    },
    {
      name: 'heroHeading',
      type: 'text',
      label: 'Hero Heading',
    },
    {
      name: 'hasLocation',
      type: 'checkbox',
      label: 'Show User Location',
      defaultValue: true,
    },

    {
      name: 'hasQuestionMark',
      type: 'checkbox',
      label: 'Heading Has Question Mark',
      defaultValue: false,
    },

    {
      name: 'heroSubHeading',
      type: 'text',
      label: 'Hero Sub Heading',
    },
    {
      name: 'afterCTAText',
      type: 'text',
      label: 'After CTAText',
    },
    {
      name: 'serviceIcon',
      type: 'upload',
      label: 'Service Icon',
      relationTo: 'media',
    },

    {
      name: 'serviceImage',
      type: 'upload',
      label: 'Service Image',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'benefits',
      type: 'group',
      label: 'Benefits',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
        },
        {
          name: 'benefitsList',
          type: 'array',
          label: 'Benefits List',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
          ],
        },
      ],
    },
    {
      name: 'advantages',
      type: 'group',
      label: 'Advantages',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
        },
        {
          name: 'advantageList',
          type: 'array',
          label: 'Advantage List',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
            {
              name: 'description',
              type: 'text',
              label: 'Description',
            },
          ],
        },
      ],
    },
    {
      name: 'features',
      type: 'group',
      label: 'Features',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
        },

        {
          name: 'images',
          type: 'array',
          label: 'Feature Images',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
              required: true,
            },
          ],
        },
        {
          name: 'featureList',
          type: 'array',
          label: 'Feature Lists',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
            },
          ],
        },
      ],
    },
    {
      name: 'inspirationImages',
      type: 'group',
      label: 'Inspiration Images',
      admin: {
        description: 'Please upload  at leatsr 4 images',
      },
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
        },
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
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      type: 'group',
      label: 'Testimonials',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          label: 'Section Title',
        },
        {
          name: 'testimonialList',
          type: 'array',
          label: 'Testimonial List',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Name',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Image',
            },
            {
              name: 'testimonial',
              type: 'richText',
              label: 'Testimonial',
              editor: createLexicalEditor(),
              admin: {
                description: 'Please enter the testimonial in the rich text format',
              },
            },
          ],
        },
      ],
    },

    {
      name: 'content',
      type: 'blocks',
      minRows: 1,
      maxRows: 999,
      blocks: blocks,
    },

    {
      name: 'questions',
      type: 'json',
      label: 'Questions',
      admin: {
        description: 'Please enter the questions and answers in the JSON format',
      },
    },
    {
      name: 'zipCodes',
      type: 'text',
      label: 'ZIP Codes Table',
      admin: {
        description: 'Please enter the table name for ZIP codes',
      },
    },
    {
      name: 'serviceRequest',
      type: 'text',
      label: 'Service Request Table',
      admin: {
        description: 'Please enter the table name for Service Request',
      },
    },

    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Contact Phone Text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Landing Page Variant',
      defaultValue: 'lp1',
      options: [
        { label: 'Landing Page 1 - lp1', value: 'lp1' },
        { label: 'Landing Page 2 - lp2', value: 'lp2' },
        { label: 'Landing Page 3 - lp3', value: 'lp3' },
      ],
      admin: {
        position: 'sidebar',
      },
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
