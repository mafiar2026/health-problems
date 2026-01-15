/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { sendGTMEvent } from '@next/third-parties/google'
import { useEffect, useState } from 'react'

// const variants = [
//   { id: 'turtleneck_black_single', label: 'Black – Single', price: 1200 },
//   { id: 'turtleneck_white_single', label: 'Black – Combo 2', price: 2000 },
//   { id: 'turtleneck_black_combo_3', label: 'Black – Combo 3', price: 2500 },
//   { id: 'turtleneck_white_single', label: 'White – Single', price: 1200 },
//   { id: 'turtleneck_white_combo_2', label: 'White – Combo 2', price: 2000 },
//   { id: 'turtleneck_white_combo_3', label: 'White – Combo 3', price: 2500 },
// ]

// const sizes = ['S', 'M', 'L', 'XL', 'XXL']

export default function ProductCheckout({ page }: { page: any }) {
  const data = page?.pricing
  console.log('data', data)
  const [variant, setVariant] = useState(data[0])
  // console.log('variant', variant)
  const [payment, setPayment] = useState<'partial' | 'full' | 'pickup'>('partial')
  const [deliveryCharge, setDeliveryCharge] = useState(99)
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  })
  const [errors, setErrors] = useState<{
    name?: string
    address?: string
    phone?: string
    email?: string
  }>({})

  // useEffect(() => {
  //   ;(async () => {
  //     try {
  //       const deliveryCharge = await fetch(`/getDeliveryCharge`)
  //       const deliveryChargeData = await deliveryCharge.json()
  //       setDeliveryCharge(deliveryChargeData)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   })()
  // }, [])

  const DELIVERY_CHARGE = deliveryCharge
  const total =
    payment === 'full'
      ? variant.price + DELIVERY_CHARGE
      : payment === 'partial'
        ? DELIVERY_CHARGE
        : 0

  const fullPrice = 499

  // Function to hash sensitive data (required by Facebook CAPI)
  const hashData = (data: string): string => {
    // This is a simplified example - implement proper SHA-256 hashing
    // In production, use: crypto.subtle.digest('SHA-256', ...)
    return btoa(data) // Replace with actual SHA-256 implementation
  }

  // Example: ViewContent event (call on product page mount)
  const sendViewContentEvent = async () => {
    const eventId = `view_${variant.id}_${Date.now()}`

    // 1. Send Browser Pixel Event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_ids: [variant.id],
        content_name: variant.label,
        content_type: 'product',
        currency: 'BDT',
        value: variant.price,
        // CRITICAL for deduplication
        eventID: eventId,
      })
    }

    // 2. Your existing server-side CAPI call (keep this)
    const eventData = {
      event_name: 'ViewContent',
      event_id: eventId, // Same ID as above
      customer_info: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
      },
      custom_data: {
        variant,
        content_name: variant.label,
        content_ids: [variant.id],
        content_type: 'product',
        currency: 'BDT',
        value: variant.price,
      },
    }
    await fetch('/fb-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
  }

  useEffect(() => {
    sendViewContentEvent()
  }, [])
  // Facebook Conversions API Event Function
  // Updated sendInitialCheckOutEvent function in ProductCheckout component
  const sendInitialCheckOutEvent = async () => {
    const checkoutId = `initial_checkout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // 1. Send Browser Pixel Event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        // Note: Event name is one word
        content_ids: [variant.id || variant.pricingId],
        content_type: 'product',
        currency: 'BDT',
        value: total,
        num_items: 1, // Consider adding the actual item count
        eventID: checkoutId, // Same ID as server event
      })
    }

    // Send data in the correct structure for your backend to process
    const eventData = {
      event_name: 'Initiate Checkout', // Use snake_case
      event_id: checkoutId,
      // Pass required web parameters. Your backend will hash 'phone'.
      customer_info: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        address: customerInfo.address,
      },
      currency: 'BDT',
      value: total,
      // Facebook will read standard fields like 'content_ids' from custom_data
      custom_data: {
        variant,
        content_ids: [variant.id || variant.pricingId],
        content_type: 'product',
        // You can keep other fields; they may be ignored but won't break the call.
        product_name: variant.label,
        size: variant.size || variant.sizes?.[0].size,
        product_price: variant.price,
        delivery_charge: DELIVERY_CHARGE,
      },
    }

    try {
      const response = await fetch('/fb-conversion', {
        // Ensure endpoint is correct
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData), // Send the new structure
      })
      const result = await response.json()
      console.log('Event sent:', result)
    } catch (error) {
      console.error('Failed to send event:', error)
    }
  }

  const validateField = (field: 'name' | 'address' | 'phone' | 'email', value: string) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        return undefined
      case 'address':
        if (!value.trim()) return 'Address is required'
        return undefined
      case 'phone':
        if (!value.trim()) return 'Mobile number is required'
        if (!/^01\d{9}$/.test(value)) return 'Enter a valid 11-digit Bangladeshi number'
        return undefined
      case 'email':
        if (!value.trim()) return 'Email is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address'
        return undefined
      default:
        return undefined
    }
  }

  const handlePurchase = async () => {
    setLoading(true)

    try {
      const newErrors = {
        name: validateField('name', customerInfo.name),
        address: validateField('address', customerInfo.address),
        phone: validateField('phone', customerInfo.phone),
        email: validateField('email', customerInfo.email),
      }

      if (newErrors.name || newErrors.address || newErrors.phone || newErrors.email) {
        setErrors(newErrors)
        setLoading(false)
        return
      }

      setErrors({})

      // Send Facebook Purchase Event
      await sendInitialCheckOutEvent()

      if (total === 0 || total === '0') {
        // Original bKash payment logic
        const response = await fetch(`/createBooking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: token,
          },
          body: JSON.stringify({
            amount: fullPrice,
            // callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/bkash/callback`,
            payerReference: 'booking',
            pricingId: variant.pricingId,
            size: variant.size || variant.sizes?.[0].size,
            customerInfo,
          }),
        })

        const data = await response.json()

        console.log('data', data)

        if (!data?.alreadyCreated) {
          return (window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/booking-success?bookingId=${data?.booking?.bookingId}`)
        }
        return null
      }

      // Original bKash payment logic
      const response = await fetch(`/api/bkash/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: token,
        },
        body: JSON.stringify({
          amount: total,
          callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/bkash/callback`,
          payerReference: payment === 'full' ? 'full' : 'partial',
          pricingId: variant.pricingId,
          size: variant.size || variant.sizes?.[0].size,
          customerInfo,
        }),
      })

      const data = await response.json()

      if (data?.statusMessage === 'Successful' && data?.bkashURL) {
        window.location.href = data.bkashURL
      } else {
        alert('Failed to initiate bKash payment: ' + JSON.stringify(data.error || data))
      }
    } catch (error) {
      console.error('Error initiating bKash payment:', error)
      alert('Something went wrong while processing payment.')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    customerInfo.name && customerInfo.address && /^01\d{9}$/.test(customerInfo.phone)

  return (
    <div className="w-[95%] pb-10 bg-transparent mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 px-6 borer rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-10 py-3">
        {/* Variants */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 pt-5.5">Product</h2>
          <div className="space-y-3">
            {/* {data.map((v: any) => ( */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="variant"
                checked={true}
                // checked={variant.id === v.id}
                // onChange={() => setVariant(v)}
              />
              <span className="flex-1">
                যৌ*ন স্বাস্থ্য সমস্যা ও সমাধানের Complete Guideline × 1
              </span>
              <span className="font-medium">৳{variant.price}</span>
            </label>
            {/* ))} */}
          </div>
        </section>

        {/* Sizes */}
        {/* <section>
          <h2 className="text-xl font-semibold mb-3">Select Size</h2>
          <select
            value={variant.size || variant.sizes?.[0].size}
            onChange={(e) => setVariant({ ...variant, size: e.target.value })}
            className="w-full border rounded p-3 h40"
          >
            {variant.sizes?.map((s: any) => (
              <option key={s.size} value={s.size}>
                {s.size}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Hold Ctrl (Windows) or Cmd (Mac) to select multiple sizes
          </p>
        </section> */}

        {/* Delivery Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">এনরোলের জন্য আপনার তথ্য দিন</h2>
          <label className="font-semibold" htmlFor="name">
            আপনার নাম লিখুন
          </label>
          <input
            id="name"
            className={`w-full border rounded p-3 mt-2 ${errors.name ? 'border-red-500' : ''}`}
            placeholder="সম্পূর্ণ নাম লিখুন"
            value={customerInfo.name}
            onChange={(e) => {
              const value = e.target.value
              setCustomerInfo({ ...customerInfo, name: value })
              setErrors({ ...errors, name: validateField('name', value) })
            }}
          />

          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

          <label className="font-semibold" htmlFor="address">
            আপনার ঠিকানা লিখুন
          </label>

          <input
            id="address"
            className={`w-full border rounded p-3 mt-2 ${errors.address ? 'border-red-500' : ''}`}
            placeholder="বাড়ির নাম্বার, রোড, উপজেলা, জেলা"
            value={customerInfo.address}
            onChange={(e) => {
              const value = e.target.value
              setCustomerInfo({ ...customerInfo, address: value })
              setErrors({ ...errors, address: validateField('address', value) })
            }}
          />

          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}

          <label className="font-semibold" htmlFor="mobile">
            আপনার মোবাইল নাম্বর লিখুন{' '}
          </label>
          <input
            id="mobile"
            className={`w-full border rounded p-3 mt-2 ${errors.phone ? 'border-red-500' : ''}`}
            placeholder="01XXXXXXXXX"
            value={customerInfo.phone}
            onChange={(e) => {
              const value = e.target.value
              setCustomerInfo({ ...customerInfo, phone: value })
              setErrors({ ...errors, phone: validateField('phone', value) })
            }}
          />

          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

          <label className="font-semibold" htmlFor="email">
            আপনার ইমেইল লিখুন
          </label>
          <input
            id="email"
            className={`w-full border rounded p-3 mt-2 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="your@email.com"
            value={customerInfo.email}
            onChange={(e) => {
              const value = e.target.value
              setCustomerInfo({ ...customerInfo, email: value })
              setErrors({ ...errors, email: validateField('email', value) })
            }}
          />

          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </section>
      </div>

      {/* RIGHT */}
      <div className="border-l border-gray-200">
        <aside className="sticky top-6 rounded-lg pb-6 ml-6 pt-3 space-y-6 h-fit">
          <div className="space-y-2">
            <h3 className="font-semibold mb-3 text-2xl pt-5">Purchase Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Product</span>
              <span>Subtotal</span>
            </div>
            <div className="flex justify-between">
              <span>যৌ*ন স্বাস্থ্য সমস্যা ও সমাধানের Complete Guideline × 1</span>
              <span>৳{variant.price}</span>
            </div>

            <hr className="my-3" />
            <div className="flex justify-between ">
              <span>Subtotal</span>
              <span>৳{variant.price}</span>
            </div>
            {/* <div className="flex justify-between font-semibold">
              <span>Steadfast Parcel Payment</span>
              <span>৳{DELIVERY_CHARGE}</span>
            </div> */}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳{total}</span>
            </div>
          </div>

          {/* COD */}
          {/* <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-lg">Cash on Parcel</h4>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              Pay after receiving the product. COP charge may vary based on location.
            </p>
          </div> */}

          {/* Payment Method */}
          {/* <div>
            <p className="font-medium mb-2">Payment Method</p>
            <div className="border rounded p-3 space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="pickup"
                  checked={payment === 'pickup'}
                  onChange={() => setPayment('pickup')}
                />
                Cash on Parcel
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="partial"
                  checked={payment === 'partial'}
                  onChange={() => setPayment('partial')}
                />
                Advance Parcel Payment
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="full"
                  checked={payment === 'full'}
                  onChange={() => setPayment('full')}
                />
                Full Payment
              </label>
            </div>
          </div> */}

          <button
            onClick={handlePurchase}
            disabled={loading || !isFormValid}
            className={`w-full bg-black text-white py-3 rounded text-lg ${loading || !isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : `Place Purchase — ৳${total}`}
          </button>
        </aside>
      </div>
    </div>
  )
}
