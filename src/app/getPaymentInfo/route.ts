/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from '@/lib/payload'

export async function GET(req: Request) {
  //   const { searchParams } = new URL(req.url)

  const { searchParams } = new URL(req.url)

  const paymentID = searchParams.get('paymentID')

  console.log('paymentID', paymentID)

  if (!paymentID) {
    return Response.json({ error: 'paymentID required' }, { status: 400 })
  }

  const payload = await getPayload()

  const orderData: any = await payload.find({
    collection: 'bkash-payments',
    where: {
      paymentID: { equals: paymentID },
    },

    limit: 1,
  })

  const order = orderData.docs[0]

  // console.log('Oder', order)

  if (!order) {
    console.log('Oder not found', order)
    return Response.json({ error: 'purchase not found' }, { status: 404 })
  }

  // ✅ Match pricing by pricingId
  // const matchedPricing = order.product?.pricing?.find((p: any) => p.pricingId === order.pricingId)
  const matchedPricing = {
    label: 'যৌ*ন স্বাস্থ্য সমস্যা ও সমাধানের Complete Guideline × 1',
  }

  console.log('matchedPricing', matchedPricing)

  const response = {
    id: order.id,
    pricingId: order.pricingId,
    productInfo: matchedPricing || null,
    amount: order.amount,
    trxID: order.trxID,
    size: order.size,
    payerReference: order.payerReference,
    transactionStatus: order.transactionStatus,
    ...(order.customerInfo && { customerInfo: order.customerInfo }),
  }
  console.log('response', response)

  return Response.json(response)
}
