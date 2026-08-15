import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { resendAdapter } from '@payloadcms/email-resend'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Locations } from './collections/Locations'
import { Tours } from './collections/Tours'
import { Inquiries } from './collections/Inquiries'
import { Reviews } from './collections/Reviews'
import { r2Adapter } from './lib/storage/r2Adapter'

export default buildConfig({
  sharp,
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'info@miafrica.co.za',
    defaultFromName: 'MiAfrica Concierge',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  admin: {
    user: 'users',
    importMap: {
      baseDir: './src/app/(payload)/admin',
    },
  },
  collections: [Users, Media, Locations, Tours, Inquiries, Reviews],
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL,
    'https://miafrica.vercel.app',
    'https://miafrica.co.za',
    'https://www.miafrica.co.za',
    'http://localhost:3000',
  ].filter(Boolean) as string[],
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL,
    'https://miafrica.vercel.app',
    'https://miafrica.co.za',
    'https://www.miafrica.co.za',
    'http://localhost:3000',
  ].filter(Boolean) as string[],
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
    push: process.env.PAYLOAD_DB_PUSH === 'true',
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