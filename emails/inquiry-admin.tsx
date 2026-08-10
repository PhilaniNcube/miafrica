import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from '@react-email/components'
import * as React from 'react'

export interface InquiryAdminEmailProps {
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  tourTitle?: string
  preferredDate?: string
  travellerCount?: number
  message?: string
  inquiryId?: string | number
  adminUrl?: string
}

export function InquiryAdminEmail({
  customerName = 'Jane Doe',
  customerEmail = 'jane.doe@example.com',
  customerPhone = '+27 82 123 4567',
  tourTitle = 'General Inquiry',
  preferredDate = 'Not specified',
  travellerCount = 2,
  message = 'No additional message provided.',
  inquiryId,
  adminUrl = 'http://localhost:3000/admin/collections/inquiries',
}: InquiryAdminEmailProps) {
  const previewText = `New Tour Inquiry from ${customerName} for ${tourTitle}`

  return (
    <Html lang="en" dir="ltr">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                primary: '#0F2C59',
                secondary: '#C5A880',
                dark: '#1E1E1E',
                alert: '#D97706',
                card: '#F8FAFC',
              },
              fontFamily: {
                serif: ['Georgia', 'serif'],
                sans: ['Helvetica', 'Arial', 'sans-serif'],
              },
            },
          },
        }}
      >
        <Head />
        <Body className="bg-slate-100 font-sans my-auto mx-auto font-normal text-slate-800">
          <Preview>{previewText}</Preview>
          <Container className="border border-solid border-slate-200 rounded-lg bg-white my-[40px] mx-auto p-[32px] max-w-[580px] shadow-sm">
            {/* Header / Admin Notification Banner */}
            <Section className="pb-[20px] border-b border-solid border-slate-200">
              <Row>
                <Text className="text-[12px] font-bold text-amber-700 uppercase tracking-[1.5px] bg-amber-50 px-[10px] py-[4px] rounded inline-block m-0">
                  New Website Inquiry
                </Text>
              </Row>
              <Heading className="text-[22px] font-serif font-bold text-primary mt-[12px] mb-[4px]">
                Inquiry: {tourTitle}
              </Heading>
              {inquiryId && (
                <Text className="text-[13px] text-slate-500 m-0">
                  Record ID #{inquiryId}
                </Text>
              )}
            </Section>

            {/* Enquirer Details Section */}
            <Section className="py-[16px]">
              <Text className="text-[14px] font-bold text-primary uppercase tracking-[1px] mb-[12px]">
                Customer Details
              </Text>

              <Row className="mb-[8px]">
                <Text className="text-[14px] text-slate-600 m-0">
                  <strong className="text-slate-800">Full Name:</strong> {customerName}
                </Text>
              </Row>

              <Row className="mb-[8px]">
                <Text className="text-[14px] text-slate-600 m-0">
                  <strong className="text-slate-800">Email Address:</strong>{' '}
                  <a href={`mailto:${customerEmail}`} className="text-primary underline">
                    {customerEmail}
                  </a>
                </Text>
              </Row>

              {customerPhone && (
                <Row className="mb-[8px]">
                  <Text className="text-[14px] text-slate-600 m-0">
                    <strong className="text-slate-800">Phone Number:</strong>{' '}
                    <a href={`tel:${customerPhone}`} className="text-slate-800 underline">
                      {customerPhone}
                    </a>
                  </Text>
                </Row>
              )}
            </Section>

            <Hr className="border-solid border-slate-200 my-[12px]" />

            {/* Booking Request Details */}
            <Section className="py-[16px]">
              <Text className="text-[14px] font-bold text-primary uppercase tracking-[1px] mb-[12px]">
                Tour Request Details
              </Text>

              <Row className="mb-[8px]">
                <Text className="text-[14px] text-slate-600 m-0">
                  <strong className="text-slate-800">Experience / Tour:</strong> {tourTitle}
                </Text>
              </Row>

              <Row className="mb-[8px]">
                <Text className="text-[14px] text-slate-600 m-0">
                  <strong className="text-slate-800">Preferred Date:</strong> {preferredDate}
                </Text>
              </Row>

              <Row className="mb-[8px]">
                <Text className="text-[14px] text-slate-600 m-0">
                  <strong className="text-slate-800">Travellers:</strong> {travellerCount}
                </Text>
              </Row>

              {message && (
                <Section className="bg-card border border-solid border-slate-200 rounded-md p-[16px] mt-[12px]">
                  <Text className="text-[12px] font-bold text-slate-500 uppercase tracking-[1px] m-0 mb-[6px]">
                    Message / Special Requests
                  </Text>
                  <Text className="text-[14px] text-slate-800 m-0 leading-[22px] whitespace-pre-wrap">
                    {message}
                  </Text>
                </Section>
              )}
            </Section>

            {/* Action CTA */}
            <Section className="text-center py-[20px]">
              <Button
                href={adminUrl}
                className="bg-primary text-white text-[14px] font-semibold tracking-wider uppercase px-[24px] py-[12px] rounded-md box-border no-underline inline-block"
              >
                View in Payload Admin
              </Button>
            </Section>

            <Hr className="border-solid border-slate-200 my-[20px]" />

            {/* Footer */}
            <Section className="text-center text-slate-400 text-[12px]">
              <Text className="m-0">
                MiAfrica Operations &amp; Concierge Notification System
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

InquiryAdminEmail.PreviewProps = {
  customerName: 'Marcus Vance',
  customerEmail: 'marcus.vance@example.com',
  customerPhone: '+27 83 987 6543',
  tourTitle: 'Cape Peninsula & Cape of Good Hope Private Tour',
  preferredDate: '2026-12-01',
  travellerCount: 3,
  message: 'Can we include a helicopter transfer over Table Mountain?',
  inquiryId: '42',
  adminUrl: 'http://localhost:3000/admin/collections/inquiries/42',
} satisfies InquiryAdminEmailProps

export default InquiryAdminEmail
