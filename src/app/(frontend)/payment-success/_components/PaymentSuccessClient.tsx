/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
// import { useEffect } from 'react'
// import { getPayload } from '@/lib/payload'

export default function PaymentSuccess() {
  const searchParams = useSearchParams()

  const paymentID = searchParams.get('paymentID')

  const [paymentData, setPaymentData] = useState<any>(null)

  console.log('paymentData', paymentData)

  const status = paymentData?.transactionStatus
  const trxID = paymentData?.trxID

  useEffect(() => {
    if (!paymentID) return
    ;(async () => {
      try {
        const payment = await fetch(`/getPaymentInfo?paymentID=${paymentID}`)
        const paymentData = await payment.json()

        setPaymentData(paymentData)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [paymentID])

  console.log('payment', paymentData)

  const booked =
    paymentData?.transactionStatus === 'Completed' && paymentData?.payerReference === 'partial'
  const purchased =
    paymentData?.transactionStatus === 'Completed' && paymentData?.payerReference === 'fullPrice'

  const hasSentPurchaseEvent = useRef(false)

  const sendPurchaseEvent = async () => {
    if (!paymentData) return

    const orderId = `tt_purchase_${paymentID}_${trxID}`

    const purchaseType = booked ? 'partial' : purchased ? 'full' : 'standard'

    // Build product contents array
    const contents = [
      {
        content_type: 'product',
        content_id: paymentData.id || paymentData.pricingId,
        content_name: paymentData.productInfo?.label,
        price: paymentData.productInfo?.price,
        quantity: 1,
      },
    ]

    // Build payload for your API route
    const eventData = {
      event_name: 'Purchase', // TikTok standard event
      event_id: orderId,
      value: paymentData?.amount,
      currency: 'BDT',
      contents, // <-- array of purchased items
      customer: {
        name: paymentData?.customerInfo.name,
        email: paymentData?.customerInfo.email,
        phone: paymentData?.customerInfo.phone,
        address: paymentData?.customerInfo.address,
      },
      extra: {
        purchase_type: purchaseType, // optional custom info
        productPrice: paymentData?.productInfo?.price,
        size: paymentData?.size,
      },
    }

    console.log('🔵 Sending TikTok Purchase Event:', eventData)

    try {
      const res = await fetch('/fb-conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      })

      const result = await res.json()
      console.log('🟢 TikTok API Response:', result)
    } catch (err) {
      console.error('Failed to send TikTok Purchase Event:', err)
    }
  }

  useEffect(() => {
    if (!paymentID) return
    if (!paymentData) return
    if (paymentData.transactionStatus !== 'Completed') return
    if (!paymentData.trxID) return

    if ((purchased || booked) && !hasSentPurchaseEvent.current) {
      sendPurchaseEvent()
      hasSentPurchaseEvent.current = true
    }
  }, [paymentID, paymentData, purchased, booked])

  if (
    !paymentID ||
    !paymentData ||
    paymentData?.error ||
    paymentData?.transactionStatus !== 'Completed'
  ) {
    return (
      <div className="min-h-[50vh] bg-gray-100 flex flex-col justify-center items-center px-3 py-6 text-black">
        <h2 className="text-2xl font-semibold">invalid page</h2>
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-black text-white px-3 py-2 rounded-md mt-10 cursor-pointer"
        >
          Go Home
        </button>
      </div>
    )
  }

  // Normally these should come from DB
  const customer = paymentData?.customerInfo

  const product = {
    name: paymentData?.productInfo?.label,
    qty: 1,
    paid: paymentData?.amount,
    price: paymentData?.productInfo?.price,
  }

  const downloads = [
    {
      title: 'Healthy Intimate Life',
      url: 'https://drive.google.com/file/d/1-RE0NnNuY5B2iqcRlItIYlj14KyciwUV/view',
      type: 'main',
    },
    {
      title: 'Healthy Sex Life',
      url: 'https://drive.google.com/file/d/1RukRJ07vSxn5A3WYL3N-vNZw0ks8kxH0/view',
      type: 'bonus',
    },
    {
      title: 'The Science Of Desire',
      url: 'https://drive.google.com/file/d/1SM1hTwqqJTTygjPVPlJCc-QPcvEwbryn/view',
      type: 'bonus',
    },
    {
      title: 'Golden Rules Of Intimacy',
      url: 'https://drive.google.com/file/d/1YSpe-dl-sQYY0rFOm3ZqYzqpedBOXavH/view',
      type: 'bonus',
    },
    {
      title: 'Daily Intimacy Guide – Real Q&A',
      url: 'https://drive.google.com/file/d/12s6qe5XtY2kDYLoaiorRPg3MgvW9sxfs/view',
      type: 'bonus',
    },
    {
      title: 'Erectile Dysfunction & Premature Ejaculation',
      url: 'https://drive.google.com/file/d/17Jkwp7u144UpOwkFJv8OHZ-Z3qC-DKLc/view',
      type: 'bonus',
    },
    {
      title: 'Female Period Problems & Intimate Health',
      url: 'https://drive.google.com/file/d/1woNy5ec65Wy9gicMSoK9deZumZvy-vHn/view',
      type: 'bonus',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-3 py-6 text-black">
      <div className="w-full min px-3 max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white text-center py-8">
          <div className="flex justify-center mb-3">
            <CheckCircle size={56} className="text-green-400" />
          </div>
          <h1 className="text-2xl font-semibold">
            {booked ? 'Booking Completed' : purchased ? 'Purchase Completed' : 'Payment Failed'}
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Thank you for choosing us — your{' '}
            {booked ? 'booking' : purchased ? 'purchase' : 'payment'} has been confirmed
          </p>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Customer Info */}
          <section>
            <h2 className="font-semibold text-lg border-l-4 border-yellow-400 pl-3 mb-3">
              Customer Information
            </h2>

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Name:</span> {customer?.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {customer?.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span> {customer?.address}
              </p>
            </div>
          </section>

          {/* Summary */}
          <section>
            <h2 className="font-semibold text-lg border-l-4 border-yellow-400 pl-3 mb-3">
              {booked ? 'Booking Summary' : purchased ? 'Purchase Summary' : 'Payment Summary'}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1 text-left">#</th>
                    <th className="border px-2 py-1 text-left">Product</th>
                    <th className="border px-2 py-1 text-center">Qty</th>
                    <th className="border px-2 py-1 text-right">Price (৳)</th>
                    {/* <th className="border px-2 py-1 text-right">Paid (৳)</th> */}
                    {/* <th className="border px-2 py-1 text-right">Due (৳)</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-2">1</td>
                    <td className="border px-2 py-2">{product?.name}</td>
                    <td className="border px-2 py-2 text-center">{product?.qty}</td>
                    {/* <td className="border px-2 py-2 text-right">{product?.price}</td> */}
                    <td className="border px-2 py-2 text-right">{product?.paid}</td>

                    {/* <td className="border px-2 py-2 text-right">
                      {product?.price - product?.paid}
                    </td> */}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Payment Info */}
          <section className="bg-green-50 rounded-lg p-4 text-sm">
            <p>
              <span className="font-medium">
                {booked ? 'Booking' : purchased ? 'Purchase' : 'Payment'} Status:
              </span>{' '}
              <span className="text-green-600 font-semibold capitalize">{status}</span>
            </p>
            <p className="mt-1 break-all">
              <span className="font-medium">Transaction ID:</span> {trxID}
            </p>
          </section>
          {/* Download Section */}
          <section className="space-y-6">
            {/* bonus Downloads */}
            <div>
              <h2 className="font-semibold text-lg border-l-4 border-green-500 pl-3 mb-3">
                📥 Your Downloads
              </h2>

              <ul className="space-y-2">
                {downloads
                  .filter((d) => d.type === 'main')
                  .map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md px-3 py-2"
                    >
                      <span className="text-sm font-medium">{item.title}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-semibold hover:underline"
                      >
                        Download
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Bonus Downloads */}
            <div>
              <h2 className="font-semibold text-lg border-l-4 border-yellow-400 pl-3 mb-3">
                🎁 Bonus E-Books
              </h2>

              <ul className="space-y-2">
                {downloads
                  .filter((d) => d.type === 'bonus')
                  .map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-md px-3 py-2"
                    >
                      <span className="text-sm font-medium">{item.title}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-700 font-semibold hover:underline"
                      >
                        Download
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
