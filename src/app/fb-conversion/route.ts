/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// ===== HELPER FUNCTIONS =====

// Hash function for PII data
function hashData(value?: string): string | undefined {
  if (!value) return undefined
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

// Helper to get client IP from request
function getClientIp(request: NextRequest): string {
  // Try multiple headers in order of reliability
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwardedFor) {
    // x-forwarded-for may contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  if (realIp) {
    return realIp.trim()
  }

  return ''
}

// Helper to get user agent
function getUserAgent(request: NextRequest): string {
  return request.headers.get('user-agent') || ''
}

// Build Facebook user data
function buildFacebookUserData(customerInfo: any, request: NextRequest) {
  const userData: Record<string, any> = {}

  // Hashed PII fields
  if (customerInfo?.email) userData.em = [hashData(customerInfo.email)]
  if (customerInfo?.phone) userData.ph = [hashData(customerInfo.phone)]
  if (customerInfo?.name) userData.fn = [hashData(customerInfo.name)]

  // For name, if you have first/last name separately
  if (customerInfo?.firstName) userData.fn = [hashData(customerInfo.firstName)]
  if (customerInfo?.lastName) userData.ln = [hashData(customerInfo.lastName)]

  // Web parameters
  userData.client_ip_address = getClientIp(request)
  userData.client_user_agent = getUserAgent(request)

  // Facebook cookies
  const cookies = request.cookies
  userData.fbc = cookies.get('_fbc')?.value || undefined
  userData.fbp = cookies.get('_fbp')?.value || undefined

  return userData
}

// Build TikTok user context
function buildTikTokUserContext(customer: any, request: NextRequest) {
  return {
    email: hashData(customer?.email),
    phone: hashData(customer?.phone),
    name: hashData(customer?.name),
    address: hashData(customer?.address),

    // TikTok specific cookies
    ttp: request.cookies.get('_ttp')?.value || undefined,
    ttclid: request.cookies.get('ttclid')?.value || undefined,

    // IP and user agent
    ip: getClientIp(request),
    user_agent: getUserAgent(request),
  }
}

// Build TikTok properties
function buildTikTokProperties(body: any) {
  const properties: Record<string, any> = {
    currency: body.currency || 'BDT',
    value: body.value,
  }

  // Handle contents if provided
  if (body.contents && Array.isArray(body.contents)) {
    properties.contents = body.contents.map((content: any) => ({
      content_id: content.content_id || content.contentId,
      content_name: content.content_name || content.contentName || content.product_name,
      content_type: content.content_type || content.contentType || 'product',
      price: content.price || content.product_price,
      quantity: content.quantity || 1,
    }))
  } else if (body.custom_data?.content_ids) {
    // Fallback for Facebook-style data
    properties.contents = body.custom_data.content_ids.map((id: string, index: number) => ({
      content_id: id,
      content_name: body.custom_data?.product_name || `Product ${index + 1}`,
      content_type: 'product',
      price: body.custom_data?.product_price || body.value,
      quantity: 1,
    }))
  }

  // Add any extra properties
  if (body.extra) {
    Object.assign(properties, body.extra)
  }

  return properties
}

// ===== MAIN API HANDLER =====
export async function POST(request: NextRequest) {
  let body: any
  let rawBody: string = ''

  try {
    // Try to read the body as text first for debugging
    rawBody = await request.text()

    if (!rawBody || rawBody.trim() === '') {
      console.error('❌ Empty request body received')
      return NextResponse.json(
        {
          error: 'Empty request body',
          details: 'No data was sent in the request',
        },
        { status: 400 },
      )
    }

    try {
      body = JSON.parse(rawBody)
    } catch (parseError) {
      console.error('❌ Failed to parse JSON:', rawBody.substring(0, 500))
      return NextResponse.json(
        {
          error: 'Invalid JSON',
          details: parseError instanceof Error ? parseError.message : 'Unknown parsing error',
          rawBodySample: rawBody.substring(0, 200), // Log first 200 chars for debugging
        },
        { status: 400 },
      )
    }

    const platform = body.platform // 'facebook' or 'tiktok'

    if (!platform) {
      console.error('❌ No platform specified in request body')
      return NextResponse.json({ error: 'Platform not specified in request body' }, { status: 400 })
    }

    console.log(`🟡 Received ${platform} event:`, JSON.stringify(body, null, 2))

    if (platform === 'facebook') {
      // ===== FACEBOOK CAPI =====
      const pixelId = process.env.FACEBOOK_PIXEL_ID
      const accessToken = process.env.FACEBOOK_ACCESS_TOKEN

      if (!pixelId || !accessToken) {
        console.error('❌ Facebook API credentials not configured')
        return NextResponse.json(
          { error: 'Facebook API credentials not configured' },
          { status: 500 },
        )
      }

      const payload = {
        event_name: body.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        event_source_url: request.headers.get('referer') || '',
        action_source: 'website',
        user_data: buildFacebookUserData(body.customer_info || {}, request),
        custom_data: {
          currency: body.currency || 'BDT',
          value: body.value,
          ...(body.custom_data || {}),
        },
      }

      console.log('🔵 Facebook Payload:', JSON.stringify(payload, null, 2))

      const response = await fetch(
        `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: [payload],
            test_event_code: process.env.FACEBOOK_TEST_EVENT_CODE,
          }),
        },
      )

      const result = await response.json()
      console.log('🟢 Facebook Response:', result)

      return NextResponse.json({
        success: true,
        platform: 'facebook',
        data: result,
      })
    } else if (platform === 'tiktok') {
      // ===== TIKTOK EVENTS API =====
      const pixelId = process.env.TIKTOK_PIXEL_ID
      const accessToken = process.env.TIKTOK_ACCESS_TOKEN

      if (!pixelId || !accessToken) {
        console.error('❌ TikTok API credentials not configured')
        return NextResponse.json(
          { error: 'TikTok API credentials not configured' },
          { status: 500 },
        )
      }

      // TikTok event mapping (Facebook event names to TikTok event names)
      const tiktokEventMap: Record<string, string> = {
        ViewContent: 'ViewContent',
        InitiateCheckout: 'InitiateCheckout',
        Purchase: 'PlaceAnOrder',
        AddToCart: 'AddToCart',
        CompletePayment: 'CompletePayment',
      }

      const tiktokEventName = tiktokEventMap[body.event_name] || body.event_name

      const eventObj = {
        event: tiktokEventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        page: {
          url: request.headers.get('referer') || '',
        },
        user: buildTikTokUserContext(body.customer || body.customer_info || {}, request),
        properties: buildTikTokProperties(body),
      }

      const tiktokPayload = {
        event_source: 'web',
        event_source_id: pixelId,
        data: [eventObj],
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
      console.log('🟢 TikTok Response:', result)

      return NextResponse.json({
        success: true,
        platform: 'tiktok',
        data: result,
      })
    } else {
      console.error('❌ Invalid platform:', platform)
      return NextResponse.json({ error: 'Invalid platform specified' }, { status: 400 })
    }
  } catch (err: any) {
    console.error('🔴 Conversion API Error:', err)
    console.error('Raw body that caused error:', rawBody.substring(0, 500))

    return NextResponse.json(
      {
        error: 'Failed to send event',
        details: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      },
      { status: 500 },
    )
  }
}

// Also handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
