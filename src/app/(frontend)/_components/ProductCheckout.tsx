/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'

export default function ProductCheckout({ page }: { page: any }) {
  const data = page?.pricing
  const [variant, setVariant] = useState(data[0])
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

  const DELIVERY_CHARGE = deliveryCharge
  const total =
    payment === 'full'
      ? variant.price + DELIVERY_CHARGE
      : payment === 'partial'
        ? DELIVERY_CHARGE
        : 0
  const fullPrice = variant?.price

  const generateEventId = (prefix: string) =>
    `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`

  // ===== BOTH PLATFORMS EVENT FUNCTIONS =====

  // Send ViewContent to both platforms
  const sendViewContentEvents = async () => {
    const eventId = generateEventId('view_content')

    // 1. Facebook Pixel (browser)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_ids: [variant.id || variant.pricingId],
        content_name: variant.label,
        content_type: 'product',
        currency: 'BDT',
        value: variant.price,
        eventID: eventId,
      })
    }

    // 2. TikTok Pixel (browser)
    if (typeof window !== 'undefined' && (window as any).ttq) {
      ;(window as any).ttq.track('ViewContent', {
        content_id: variant.id || variant.pricingId,
        content_type: 'product',
        currency: 'BDT',
        value: variant.price,
      })
    }

    // 3. Facebook Server Event
    const facebookEventData = {
      platform: 'facebook',
      event_name: 'ViewContent',
      event_id: eventId,
      customer_info: customerInfo,
      currency: 'BDT',
      value: variant.price,
      custom_data: {
        variant,
        content_ids: [variant.id || variant.pricingId],
        content_type: 'product',
        product_name: variant.label,
        size: variant.size || variant.sizes?.[0]?.size,
        product_price: variant.price,
      },
    }

    // 4. TikTok Server Event
    const tiktokEventData = {
      platform: 'tiktok',
      event_name: 'ViewContent',
      event_id: eventId,
      value: variant.price,
      currency: 'BDT',
      contents: [
        {
          content_id: variant.id || variant.pricingId,
          content_name: variant.label,
          content_type: 'product',
          price: variant.price,
          quantity: 1,
        },
      ],
      customer: customerInfo,
    }

    // Send both events in parallel
    try {
      await Promise.all([
        fetch('/fb-conversion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(facebookEventData),
        }),
        fetch('/fb-conversion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tiktokEventData),
        }),
      ])
    } catch (error) {
      console.error('Error sending ViewContent events:', error)
    }
  }

  // Send InitiateCheckout to both platforms
  const sendInitiateCheckoutEvents = async () => {
    const eventId = generateEventId('initiate_checkout')

    // 1. Facebook Pixel (browser)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_ids: [variant.id || variant.pricingId],
        content_type: 'product',
        currency: 'BDT',
        value: fullPrice,
        num_items: 1,
        eventID: eventId,
      })
    }

    // 2. TikTok Pixel (browser)
    if (typeof window !== 'undefined' && (window as any).ttq) {
      ;;(window as any).ttq.track('InitiateCheckout', {
        content_id: variant.id || variant.pricingId,
        content_type: 'product',
        currency: 'BDT',
        value: fullPrice,
        quantity: 1,
      })
    }

    // 3. Facebook Server Event
    const facebookEventData = {
      platform: 'facebook',
      event_name: 'InitiateCheckout',
      event_id: eventId,
      customer_info: customerInfo,
      currency: 'BDT',
      value: fullPrice,
      custom_data: {
        variant,
        content_ids: [variant.id || variant.pricingId],
        content_type: 'product',
        product_name: variant.label,
        size: variant.size || variant.sizes?.[0]?.size,
        product_price: variant.price,
        delivery_charge: DELIVERY_CHARGE,
        num_items: 1,
      },
    }

    // 4. TikTok Server Event
    const tiktokEventData = {
      platform: 'tiktok',
      event_name: 'InitiateCheckout',
      event_id: eventId,
      value: fullPrice,
      currency: 'BDT',
      contents: [
        {
          content_id: variant.id || variant.pricingId,
          content_name: variant.label,
          content_type: 'product',
          price: variant.price,
          quantity: 1,
        },
      ],
      customer: customerInfo,
    }

    // Send both events in parallel
    try {
      await Promise.all([
        fetch('/fb-conversion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(facebookEventData),
        }),
        fetch('/fb-conversion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(tiktokEventData),
        }),
      ])
    } catch (error) {
      console.error('Error sending InitiateCheckout events:', error)
    }
  }

  // Send on component mount
  useEffect(() => {
    sendViewContentEvents()
  }, [])

  // ===== FORM VALIDATION =====
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

  // ===== PURCHASE HANDLER =====
  const handlePurchase = async () => {
    const newErrors = {
      name: validateField('name', customerInfo.name),
      address: validateField('address', customerInfo.address),
      phone: validateField('phone', customerInfo.phone),
      email: validateField('email', customerInfo.email),
    }

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      // Send InitiateCheckout events to both platforms
      await sendInitiateCheckoutEvents()

      // Original bKash payment logic
      const response = await fetch('/api/bkash/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: fullPrice,
          callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/bkash/callback`,
          payerReference: 'fullPrice',
          pricingId: variant.pricingId || variant.id,
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
      console.error(error)
      alert('Something went wrong while processing payment.')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    customerInfo.name && customerInfo.address && /^01\d{9}$/.test(customerInfo.phone)

  // Rest of your JSX remains the same...
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
              <span>৳{fullPrice}</span>
            </div>

            <hr className="my-3" />
            <div className="flex justify-between ">
              <span>Subtotal</span>
              <span>৳{fullPrice}</span>
            </div>
            {/* <div className="flex justify-between font-semibold">
              <span>Steadfast Parcel Payment</span>
              <span>৳{DELIVERY_CHARGE}</span>
            </div> */}
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>৳{fullPrice}</span>
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
            className={`w-full bg-black text-white py-3  rounded text-lg ${loading || !isFormValid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? 'Processing...' : `Place Purchase — ৳${fullPrice}`}
          </button>
        </aside>
      </div>
    </div>
  )
}
