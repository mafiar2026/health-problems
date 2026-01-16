/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Endpoint } from 'payload'
import { grantToken } from '../lib/bkash'
import { getPayload } from '@/lib/payload'

const BASE_URL = 'https://tokenized.pay.bka.sh/v1.2.0-beta'

export const createPayment: Endpoint = {
  path: '/bkash/create',
  method: 'post',
  handler: async (req: any) => {
    console.log('hi_1')

    // console.log('body:', await req.json())

    const payloadData = await req.json()

    const payload = await getPayload()

    const { amount, callbackURL, payerReference, customerInfo } = payloadData

    console.log('hi_2 :', payloadData)

    const idToken = await grantToken()

    console.log('token res', idToken)

    const resp = await fetch('https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: idToken,
        'x-app-key': process.env.BK_APP_KEY!,
      },
      body: JSON.stringify({
        mode: '0011',
        amount: amount.toString(),
        currency: 'BDT',
        intent: 'sale',
        merchantInvoiceNumber: `INV_${Date.now()}`,
        callbackURL,
        payerReference: payerReference || '',
      }),
    })

    const data = await resp.json()

    console.log('data', data)

    if (data?.statusMessage !== 'Successful') {
      return Response.json({
        error: data?.message,
      })
    }

    console.log('daaoo', data)

    const payment = await payload.create({
      collection: 'bkash-payments',
      data: {
        paymentID: data.paymentID,
        amount: data.amount,
        transactionStatus: data.transactionStatus || 'Pending',
        payerReference: payerReference || '',
        // pricingId,
        // size,
        customerInfo,
      },
      draft: true,
    })

    console.log('resp', payment)

    return Response.json(data)
  },
}

// export const executePayment: Endpoint = {
//   path: '/bkash/execute',
//   method: 'post',
//   handler: async (req: any) => {
//     const { paymentID } = req.body
//     const idToken = await grantToken()

//     const payload = await getPayload()

//     const resp = await fetch(
//       'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout/execute',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: idToken,
//           'x-app-key': process.env.BK_APP_KEY!,
//         },
//         body: JSON.stringify({ paymentID }),
//       },
//     )

//     const data = await resp.json()

//     await payload.update({
//       collection: 'bkash-payments',
//       where: { paymentID: { equals: paymentID } },
//       data: {
//         transactionStatus: data.transactionStatus,
//         trxID: data.trxID,
//       },
//     })

//     return Response.json(data)
//   },
// }

export const bkashCallback: Endpoint = {
  path: '/bkash/callback',
  method: 'get',
  handler: async (req: any) => {
    const payload = await getPayload()

    const url = new URL(req.url)

    console.log('FULL URL:', url.toString())
    console.log('SEARCH PARAMS:', url.searchParams.toString())

    const paymentID = url.searchParams.get('paymentID')
    const status = url.searchParams.get('status')
    const signature = url.searchParams.get('signature')
    const apiVersion = url.searchParams.get('apiVersion')

    console.log({
      paymentID,
      status,
      signature,
      apiVersion,
    })

    if (!paymentID || status !== 'success') {
      return Response.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-fail?reason=${status}`,
      )
    }

    try {
      const idToken = await grantToken()

      // ✅ Execute payment
      const resp = await fetch(`${BASE_URL}/tokenized/checkout/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: idToken,
          'x-app-key': process.env.BK_APP_KEY!,
        },
        body: JSON.stringify({ paymentID }),
      })

      const data = await resp.json()
      console.log('bKash execute response:', data)

      // =============================
      // ✅ PAYMENT SUCCESS
      // =============================
      if (data.transactionStatus === 'Completed') {
        await payload.update({
          collection: 'bkash-payments',
          where: { paymentID: { equals: paymentID } },
          data: {
            amount: parseFloat(data.amount) || 0,
            currency: data.currency || 'BDT',
            merchantInvoiceNo: data.merchantInvoiceNumber,
            // payerReference: data.payerReference || 'anonymous',
            transactionStatus: 'Completed',
            trxID: data.trxID,
            user: data.customerMsisdn || '',
          },
        })

        return Response.redirect(
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-success?paymentID=${paymentID}`,
        )
      }

      // =============================
      // ❌ PAYMENT FAILED
      // =============================
      await payload.update({
        collection: 'bkash-payments',
        where: { paymentID: { equals: paymentID } },
        data: {
          transactionStatus: data.transactionStatus || 'Failed',
          amount: parseFloat(data.amount) || 0,
          currency: data.currency || 'BDT',
          merchantInvoiceNo: data.merchantInvoiceNumber,
        },
      })

      return Response.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-fail?paymentID=${paymentID}`,
      )
    } catch (error) {
      console.error('bKash callback error:', error)

      await payload.update({
        collection: 'bkash-payments',
        where: { paymentID: { equals: paymentID } },
        data: {
          transactionStatus: 'Error',
        },
      })

      return Response.redirect(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/payment-fail?reason=server_error`,
      )
    }
  },
}
