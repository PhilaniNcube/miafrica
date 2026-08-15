'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import { sendEmail, DEFAULT_CONCIERGE_EMAIL } from '@/lib/resend'
import InquiryCustomerEmail from '../../../emails/inquiry-customer'
import InquiryAdminEmail from '../../../emails/inquiry-admin'

export type InquiryResult = { ok: true } | { ok: false; error: string }

export async function createInquiry(
  _prevState: InquiryResult | null,
  formData: FormData,
): Promise<InquiryResult> {
  const payload = await getPayload({ config: configPromise })

  const name = formData.get('name')
  const email = formData.get('email')
  const phone = formData.get('phone')
  const startDate = formData.get('startDate')
  const endDate = formData.get('endDate')
  const travellerCount = formData.get('travellerCount')
  const message = formData.get('message')
  const tourId = formData.get('tourId')

  if (
    typeof name !== 'string' ||
    name.trim().length === 0 ||
    typeof email !== 'string' ||
    email.trim().length === 0
  ) {
    return {
      ok: false,
      error: 'Please provide your name and email address.',
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      ok: false,
      error: 'Please provide a valid email address.',
    }
  }

  const parsedTourId = typeof tourId === 'string' && tourId.trim() ? parseInt(tourId, 10) : undefined
  let tourTitle = 'Bespoke Experience Inquiry'

  if (parsedTourId && !isNaN(parsedTourId)) {
    try {
      const tourDoc = await payload.findByID({
        collection: 'tours',
        id: parsedTourId,
      })
      if (tourDoc && tourDoc.title) {
        tourTitle = tourDoc.title
      }
    } catch {
      console.warn(`[Inquiry Action] Could not find tour by ID: ${parsedTourId}`)
    }
  }

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedPhone = (typeof phone === 'string' && phone.trim()) || undefined
  const formattedStartDate = (typeof startDate === 'string' && startDate.trim()) || undefined
  const formattedEndDate = (typeof endDate === 'string' && endDate.trim()) || undefined
  const numTravellers =
    typeof travellerCount === 'string' && travellerCount
      ? parseInt(travellerCount, 10)
      : undefined
  const trimmedMessage = (typeof message === 'string' && message.trim()) || undefined

  try {
    const inquiryData: any = {
      name: trimmedName,
      email: trimmedEmail,
      status: 'new',
    }
    if (parsedTourId && !isNaN(parsedTourId)) {
      inquiryData.tour = parsedTourId
    }
    if (trimmedPhone) inquiryData.phone = trimmedPhone
    if (formattedStartDate) inquiryData.startDate = formattedStartDate
    if (formattedEndDate) inquiryData.endDate = formattedEndDate
    if (numTravellers) inquiryData.travellerCount = numTravellers
    if (trimmedMessage) inquiryData.message = trimmedMessage

    const inquiry = await payload.create({
      collection: 'inquiries',
      data: inquiryData,
    })

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const adminUrl = `${siteUrl}/admin/collections/inquiries/${inquiry.id}`

    // Trigger dual emails via Resend asynchronously
    Promise.all([
      // Send confirmation to customer
      sendEmail({
        to: trimmedEmail,
        subject: `Thank you for your inquiry — ${tourTitle}`,
        react: React.createElement(InquiryCustomerEmail, {
          customerName: trimmedName,
          tourTitle,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          travellerCount: numTravellers,
          message: trimmedMessage,
        }),
        idempotencyKey: `inquiry-customer-${inquiry.id}`,
      }),
      // Send notification alert to concierge / admin
      sendEmail({
        to: DEFAULT_CONCIERGE_EMAIL,
        subject: `New Inquiry Alert: ${tourTitle} (${trimmedName})`,
        replyTo: trimmedEmail,
        react: React.createElement(InquiryAdminEmail, {
          customerName: trimmedName,
          customerEmail: trimmedEmail,
          customerPhone: trimmedPhone,
          tourTitle,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          travellerCount: numTravellers,
          message: trimmedMessage,
          inquiryId: inquiry.id,
          adminUrl,
        }),
        idempotencyKey: `inquiry-admin-${inquiry.id}`,
      }),
    ]).then(([customerRes, adminRes]) => {
      if (!customerRes.ok) {
        console.warn('[Inquiry Email] Customer notification failed:', customerRes.error)
      }
      if (!adminRes.ok) {
        console.warn('[Inquiry Email] Admin notification failed:', adminRes.error)
      }
    })

    return { ok: true }
  } catch (err) {
    console.error('[Inquiry Creation Error]', err)
    return {
      ok: false,
      error: 'Something went wrong sending your inquiry. Please try again.',
    }
  }
}