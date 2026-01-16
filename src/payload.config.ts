import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
// import { cloudinaryStorage } from 'payload-storage-cloudinary' // 🟢
import BkashTokens from './collections/BkashTokens'
import BkashPayments from './collections/BkashPayments'
import { bkashCallback, createPayment } from './endpoints/bkash'
// import DeliveryCharge from './collections/DeliveryCharge'
// import Booking from './collections/Booking'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, BkashTokens, BkashPayments],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
    connectOptions: {
      maxPoolSize: 5,
      minPoolSize: 0,
    },
  }),
  sharp,
  endpoints: [createPayment, bkashCallback],
  // plugins: [
  //   cloudinaryStorage({
  //     // 👇 Your Cloudinary credentials
  //     cloudConfig: {
  //       cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  //       api_key: process.env.CLOUDINARY_API_KEY!,
  //       api_secret: process.env.CLOUDINARY_API_SECRET!,
  //     },

  //     // 👇 Enable Cloudinary storage for your Media collection
  //     collections: {
  //       media: true, // or { folder: 'your-folder-name' } to group uploads

  //     },
  //   }),
  // ],
})
