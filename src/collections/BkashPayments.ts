import { CollectionConfig } from 'payload'

const BkashPayments: CollectionConfig = {
  slug: 'bkash-payments',
  admin: {
    useAsTitle: 'paymentID',
    defaultColumns: [
      'trxID',
      'product',
      'pricingId',
      'amount',
      'user',
      'transactionStatus',
      'updatedAt',
    ],
  },
  fields: [
    { name: 'paymentID', type: 'text', required: true },
    // ✅ Relation to ProductLanding
    // {
    //   name: 'product',
    //   type: 'relationship',
    //   relationTo: 'product-landing',
    //   required: true,
    // },

    // ✅ Which pricing option user selected
    // {
    //   name: 'pricingId',
    //   type: 'text',
    //   required: true,
    //   admin: {
    //     description: 'pricing.pricingId from ProductLanding',
    //   },
    // },
    // { name: 'size', type: 'text' },
    { name: 'amount', type: 'number' },
    { name: 'currency', type: 'text', defaultValue: 'BDT' },
    { name: 'merchantInvoiceNo', type: 'text' },
    { name: 'payerReference', type: 'text' },
    { name: 'trxID', type: 'text' },
    {
      name: 'transactionStatus',
      type: 'select',
      options: ['Initiated', 'Pending', 'Completed', 'Failed', 'Error'],
      defaultValue: 'Pending',
    },
    {
      name: 'user',
      type: 'text',
    },
    {
      name: 'customerInfo',
      type: 'json',
    },
  ],
}

export default BkashPayments
