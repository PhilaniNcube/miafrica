import { Resend } from 'resend'
import React from 'react'

const apiKey = process.env.RESEND_API_KEY

export const resend = apiKey ? new Resend(apiKey) : null

export const DEFAULT_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'MiAfrica Concierge <onboarding@resend.dev>'

export const DEFAULT_CONCIERGE_EMAIL =
  process.env.CONCIERGE_EMAIL || 'info@miafrica.co.za'

export type SendEmailOptions = {
  to: string | string[]
  subject: string
  react: React.ReactElement
  from?: string
  replyTo?: string
  idempotencyKey?: string
}

export type SendEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string }

/**
 * Helper to send transactional emails via Resend with typed error handling and idempotency keys.
 */
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  if (!resend) {
    console.warn('RESEND_API_KEY is not configured. Email notification skipped.')
    return {
      ok: false,
      error: 'Resend API key is missing from environment variables.',
    }
  }

  try {
    const { data, error } = await resend.emails.send(
      {
        from: options.from || DEFAULT_FROM_EMAIL,
        to: options.to,
        subject: options.subject,
        react: options.react,
        replyTo: options.replyTo,
      },
      options.idempotencyKey ? { idempotencyKey: options.idempotencyKey } : undefined,
    )

    if (error) {
      console.error('[Resend Error]', error)
      return { ok: false, error: error.message }
    }

    return { ok: true, id: data?.id ?? '' }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error sending email'
    console.error('[Resend Exception]', errorMessage)
    return { ok: false, error: errorMessage }
  }
}
