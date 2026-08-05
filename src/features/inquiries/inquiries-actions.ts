'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type InquiryResult = { ok: true } | { ok: false; error: string }

export async function createInquiry(
  _prevState: InquiryResult | null,
  formData: FormData,
): Promise<InquiryResult> {
  const payload = await getPayload({ config: configPromise })

  const name = formData.get('name')
  const email = formData.get('email')
  const phone = formData.get('phone')
  const preferredDate = formData.get('preferredDate')
  const travellerCount = formData.get('travellerCount')
  const message = formData.get('message')
  const tourId = formData.get('tourId')

  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    typeof email !== 'string' ||
    email.trim().length === 0 ||
    typeof tourId !== 'string' ||
    tourId.trim().length === 0
  ) {
    return {
      ok: false,
      error: 'Please provide your name, email and the tour you are interested in.',
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      ok: false,
      error: 'Please provide a valid email address.',
    }
  }

  try {
    await payload.create({
      collection: 'inquiries',
      data: {
        tour: Number(tourId),
        name: name.trim(),
        email: email.trim(),
        phone: (typeof phone === 'string' && phone.trim()) || undefined,
        preferredDate: (typeof preferredDate === 'string' && preferredDate.trim()) || undefined,
        travellerCount:
          typeof travellerCount === 'string' && travellerCount
            ? parseInt(travellerCount, 10)
            : undefined,
        message: (typeof message === 'string' && message.trim()) || undefined,
        status: 'new',
      },
    })
    return { ok: true }
  } catch {
    return {
      ok: false,
      error: 'Something went wrong sending your inquiry. Please try again.',
    }
  }
}