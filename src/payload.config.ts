import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Locations } from './collections/Locations'
import { Tours } from './collections/Tours'
import { Inquiries } from './collections/Inquiries'
import { r2Adapter } from './lib/storage/r2Adapter'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  admin: {
    user: 'users',
    importMap: {
      baseDir: './src/app/(payload)/admin',
    },
  },
  collections: [Users, Media, Locations, Tours, Inquiries],
  localization: {
    locales: [
      {
        code: 'en',
        label: 'English',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./dev.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  plugins: [
    cloudStoragePlugin({
      enabled: process.env.R2_BUCKET_NAME !== undefined,
      collections: {
        media: {
          adapter: r2Adapter(),
        },
      },
    }),
  ],
  typescript: {
    outputFile: './src/payload-types.ts',
  },
})