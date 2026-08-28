import { NextRequest, NextResponse } from 'next/server'
import { getDebtWorkflowConfig, calculateDebtPricing } from '@/src/domain/workflow-engine'

export const runtime = 'nodejs'

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const config = getDebtWorkflowConfig(slug)
    if (!config) return NextResponse.json({ error: `Unknown workflow: ${slug}` }, { status: 404 })

    const payload = await req.json() as { supportingSheets?: number; mailingMethod?: 'standard' | 'certified' | 'registered' }
    const supportingSheets = Math.max(0, Math.floor(payload.supportingSheets ?? 0))
    const mailingMethod = payload.mailingMethod ?? 'standard'
    if (!['standard', 'certified', 'registered'].includes(mailingMethod)) return NextResponse.json({ error: 'Invalid mailing method.' }, { status: 400 })

    const pricing = calculateDebtPricing(config, supportingSheets, mailingMethod)
    if (pricing.total <= 0) return NextResponse.json({ error: 'Pricing calculation failed.' }, { status: 500 })

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) return NextResponse.json({ error: 'Stripe is not configured.' }, { status: 503 })

    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' })
    const appUrl = process.env.APP_URL || 'https://debt-defense.pages.dev'
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `${config.workflowName} Packet`, description: `Final approved packet — ${mailingMethod} mailing` },
          unit_amount: Math.round(pricing.total * 100),
        },
        quantity: 1,
      }],
      metadata: { workflow_id: slug, mailing_method: mailingMethod, packet_total: String(pricing.total) },
      success_url: `${appUrl}/workflows/${slug}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/workflows/${slug}?checkout=cancelled`,
    })

    return NextResponse.json({ ok: true, sessionId: session.id, url: session.url, pricing })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create checkout session.'
    return NextResponse.json({ error: message }, { status: 502 })
  }
}
