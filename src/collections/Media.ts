import type { CollectionConfig } from 'payload'
import { revalidateCms, revalidateCmsOnDelete } from '@/hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: {
    afterChange: [revalidateCms],
    afterDelete: [revalidateCmsOnDelete],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },

  ],
  upload: true,
};