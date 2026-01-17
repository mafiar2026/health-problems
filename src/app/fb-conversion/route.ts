import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/* -----------------------------------
   SHA‑256 Hash Function
------------------------------------ */
function hashData(value?: string) {
  if (!value) return undefined
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

/* -----------------------------------
   Build TikTok user context
------------------------------------ */
function buildUserContext(customer: any, req: NextRequest) {
  return {
    name: hashData(customer.name),
    email: hashData(customer.email),
    phone: hashData(customer.phone),
    address: hashData(customer.address),

    // Not mandatory but improves match quality
    ttp: req.cookies.get('_ttp')?.value || undefined,
    ttclid: req.cookies.get('ttclid')?.value || undefined,

    ip: req.headers.get('x-forwarded-for')?.split(',')[0] || '',
    user_agent: req.headers.get('user-agent') || '',
  }
}

/* -----------------------------------
   POST handler
------------------------------------ */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('🔵 TikTok Payload:', JSON.stringify(body, null, 2))

    const pixelId = process.env.TIKTOK_PIXEL_ID
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN

    if (!pixelId || !accessToken) {
      return NextResponse.json({ error: 'TikTok API credentials not configured' }, { status: 500 })
    }

    // Build single event object
    const eventObj = {
      event: body.event_name, // e.g. ViewContent
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.event_id,
      page: {
        url: request.headers.get('referer') || '',
      },
      user: buildUserContext(body.customer || {}, request),
      properties: {
        currency: body.currency || 'BDT',
        value: body.value,
        contents: body.contents || [],
      },
    }

    // Wrap in data array (required by TikTok)
    const tiktokPayload = {
      event_source: 'web', // for web events
      event_source_id: pixelId, // your TikTok Pixel ID
      data: [eventObj], // <<– Notice array
    }

    console.log('🔵 TikTok Payload:', JSON.stringify(tiktokPayload, null, 2))

    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify(tiktokPayload),
    })

    const result = await response.json()
    console.log('🟢 TikTok API Response:', result)

    return NextResponse.json(result)
  } catch (err: any) {
    console.error('🔴 TikTok Events API Error:', err)
    return NextResponse.json(
      { error: 'Failed to send TikTok event', details: err.message },
      { status: 500 },
    )
  }
}
