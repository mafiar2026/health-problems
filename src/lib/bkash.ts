/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPayload } from './payload'

const SANDBOX = false
const BASE_URL = SANDBOX
  ? 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'
  : 'https://tokenized.pay.bka.sh/v1.2.0-beta'

// ✅ Helper function to refresh token
async function refreshToken(refresh_token: string) {
  const payload = await getPayload()

  console.log('♻️ Refreshing bKash token...')
  const url = `${BASE_URL}/tokenized/checkout/token/refresh`

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      username: process.env.BK_USERNAME!,
      password: process.env.BK_PASSWORD!,
      'x-app-key': process.env.BK_APP_KEY!,
    },
    body: JSON.stringify({
      app_key: process.env.BK_APP_KEY!,
      app_secret: process.env.BK_APP_SECRET!,
      refresh_token,
    }),
  })

  const data = await resp.json()

  if (!resp.ok || !data.id_token) {
    console.error('❌ Refresh token failed:', data)
    throw new Error('Refresh token failed')
  }

  const expiresAt:any = new Date(Date.now() + (data.expires_in - 60) * 1000)

  // 🧹 clean old token
  await payload.delete({
    collection: 'bkash-tokens',
    where: {},
  })

  // 💾 save new token
  await payload.create({
    collection: 'bkash-tokens',
    data: {
      accessToken: data.id_token,
      refreshToken: data.refresh_token || refresh_token,
      expiresIn: expiresAt,
    },
  })

  console.log('✅ Token refreshed successfully, expires at', expiresAt)
  return data.id_token
}

export async function grantToken() {
  console.log('bkash:grant:start')

  const payload = await getPayload()

  const existing = await payload.find({
    collection: 'bkash-tokens',
    limit: 1,
  })
  console.log('bkash:grant:start 2')

  const tokenDoc = existing.docs[0]

  // ✅ reuse token if not expired
  if (tokenDoc && new Date(tokenDoc.expiresIn) > new Date()) {
    console.log('bkash:grant:reuse')
    return tokenDoc.accessToken
  }

  // If token expired but refresh_token exists, refresh it
  if (tokenDoc?.refreshToken) {
    try {
      const newToken = await refreshToken(tokenDoc.refreshToken)
      return newToken
    } catch (err: any) {
      console.warn(err || '⚠️ Refresh failed, requesting new grant...')
    }
  }
  console.log('bkash:grant:new-token')

  const resp = await fetch(`${BASE_URL}/tokenized/checkout/token/grant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      username: process.env.BK_USERNAME!,
      password: process.env.BK_PASSWORD!,
      'x-app-key': process.env.BK_APP_KEY!,
    },
    body: JSON.stringify({
      app_key: process.env.BK_APP_KEY,
      app_secret: process.env.BK_APP_SECRET,
    }),
  })

  const data = await resp.json()

  if (!data.id_token || !data.refresh_token) {
    console.error('bKash token error:', data)
    throw new Error('Failed to grant bKash token')
  }

  // ⏱ expiresIn from bKash is seconds
  const expiresAt:any = new Date(
    Date.now() + (data.expires_in - 60) * 1000, // 1 min buffer
  )

  // 🧹 clean old token
  await payload.delete({
    collection: 'bkash-tokens',
    where: {},
  })

  // 💾 save new token
  await payload.create({
    collection: 'bkash-tokens',
    data: {
      accessToken: data.id_token,
      refreshToken: data.refresh_token,
      expiresIn: expiresAt,
    },
  })

  return data.id_token
}
