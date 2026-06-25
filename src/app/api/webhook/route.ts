import { NextResponse, type NextRequest } from 'next/server'
import type Stripe from 'stripe'
import * as Sentry from '@sentry/nextjs'

import { getStripe } from '@/lib/stripe'
import { getSupabaseServer } from '@/lib/supabase-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.error('[/api/webhook] STRIPE_WEBHOOK_SECRET 누락')
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  const rawBody = await req.text()
  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown'
    console.error('[/api/webhook] signature verify 실패:', msg)
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 })
  }

  const supabase = getSupabaseServer()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const productId =
          session.metadata?.studio_product_id ??
          (typeof session.payment_intent === 'object'
            ? session.payment_intent?.metadata?.studio_product_id
            : undefined)
        const buyerEmail =
          session.customer_details?.email ?? session.customer_email ?? null
        const buyerName = session.customer_details?.name ?? null

        if (!productId || !buyerEmail) {
          console.warn('[/api/webhook] checkout.session.completed: productId/email 누락', {
            productId,
            buyerEmail,
            sessionId: session.id,
          })
          break
        }

        const { error } = await supabase.from('studio_purchases').upsert(
          {
            product_id: productId,
            buyer_email: buyerEmail,
            buyer_name: buyerName,
            amount_cents: session.amount_total ?? 0,
            currency: (session.currency ?? 'krw').toUpperCase(),
            stripe_session_id: session.id,
            stripe_payment_intent:
              typeof session.payment_intent === 'string'
                ? session.payment_intent
                : (session.payment_intent?.id ?? null),
            status: 'paid',
            paid_at: new Date().toISOString(),
            metadata: { mode: session.mode, payment_status: session.payment_status },
          },
          { onConflict: 'stripe_session_id' },
        )
        if (error) throw error
        break
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent
        const productId = intent.metadata?.studio_product_id
        const buyerEmail = intent.receipt_email ?? null
        if (!productId || !buyerEmail) break

        const { error } = await supabase.from('studio_purchases').upsert(
          {
            product_id: productId,
            buyer_email: buyerEmail,
            amount_cents: intent.amount ?? 0,
            currency: (intent.currency ?? 'krw').toUpperCase(),
            stripe_payment_intent: intent.id,
            status: 'failed',
            metadata: { last_payment_error: intent.last_payment_error?.message ?? null },
          },
          { onConflict: 'stripe_payment_intent' },
        )
        if (error) throw error
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId =
          typeof charge.payment_intent === 'string'
            ? charge.payment_intent
            : charge.payment_intent?.id
        if (!paymentIntentId) break

        const { error } = await supabase
          .from('studio_purchases')
          .update({ status: 'refunded' })
          .eq('stripe_payment_intent', paymentIntentId)
        if (error) throw error
        break
      }

      default:
        // 무시 — 필요한 이벤트만 처리
        break
    }
  } catch (err) {
    console.error('[/api/webhook] handler 실패:', err)
    Sentry.captureException(err)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
