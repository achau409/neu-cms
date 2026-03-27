// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Pages from './collections/Pages'
import { Header } from './collections/Header'
import { Services } from './collections/Services'
import { Footer } from './collections/Footer'
import { contentPrompts } from './mcp/contentPrompts'

type McpPluginOptions = Parameters<typeof mcpPlugin>[0]
type McpPrompts = NonNullable<NonNullable<McpPluginOptions['mcp']>['prompts']>

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Header, Services, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    mcpPlugin({
      overrideApiKeyCollection: (collection) => ({
        ...collection,
        admin: {
          ...collection.admin,
          hidden: true,
        },
      }),
      collections: {
        pages: {
          enabled: {
            find: true,
            create: true,
            update: true,
            delete: false,
          },
          description:
            'Marketing and site pages with block-based layout, SEO metadata, and draft/published status.',
        },
        services: {
          enabled: {
            find: true,
            create: true,
            update: true,
            delete: false,
          },
          description: 'Service detail records with structured blocks and optional assets.',
        },
        header: {
          enabled: {
            find: true,
            create: true,
            update: true,
            delete: false,
          },
          description: 'Header navigation documents (logo, links, status).',
        },
        footer: {
          enabled: {
            find: true,
            create: true,
            update: true,
            delete: false,
          },
          description: 'Footer navigation and content documents.',
        },
        media: {
          enabled: {
            find: true,
            create: true,
            update: false,
            delete: false,
          },
          description: 'Uploaded files; reference by ID from pages and services.',
        },
      },
      mcp: {
        // Runtime schemas match; TS disagrees due to zod type identity across packages.
        prompts: contentPrompts as unknown as McpPrompts,
      },
    }),
    s3Storage({
      collections: {
        media: {
          disableLocalStorage: true,
          disablePayloadAccessControl: true,
          generateFileURL: (args: any) => {
            return `${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${args.filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION as string,
        endpoint: process.env.S3_ENDPOINT as string,
        forcePathStyle: true,
      },
    }),
    // storage-adapter-placeholder
  ],
})
