// in your payload config file, e.g., payload.config.ts

import { CollectionConfig } from 'payload'

const BkashTokens: CollectionConfig = {
  slug: 'bkash-tokens',
  labels: {
    singular: 'bKash Token',
    plural: 'bKash Tokens',
  },
  access: {
    read: () => false,
  },
  fields: [
    {
      name: 'accessToken',
      type: 'text',
      required: true,
    },
    {
      name: 'refreshToken',
      type: 'text',
      required: true,
    },
    {
      name: 'expiresIn',
      type: 'date',
      required: true,
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
    },
  ],
}

export default BkashTokens
