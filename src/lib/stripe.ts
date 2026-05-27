import 'server-only'

import Stripe from 'stripe'

let cached: Stripe | null = null

export function getStripe(): Stripe {
  if (cached) return cached
  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    throw new Error('Missing STRIPE_SECRET_KEY env (Vercel Settings → Environment Variables)')
  }
  cached = new Stripe(secret, {
    appInfo: { name: 'Yohan Studio', version: '0.1.0' },
    typescript: true,
  })
  return cached
}
