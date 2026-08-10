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

export interface InquiryCustomerEmailProps {
  customerName?: string
  tourTitle?: string
  preferredDate?: string
  travellerCount?: number
  message?: string
}

export function InquiryCustomerEmail({
  customerName = 'Valued Traveller',
  tourTitle = 'Bespoke Tour Experience',
  preferredDate,
  travellerCount,
  message,
}: InquiryCustomerEmailProps) {
  const previewText = `Thank you for your inquiry regarding ${tourTitle} with MiAfrica.`

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
                muted: '#64748B',
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
            {/* Header / Brand Banner */}
            <Section className="text-center pb-[24px]">
              <Heading className="text-[28px] font-serif font-bold text-primary p-0 m-0 tracking-wide">
                MiAfrica
              </Heading>
              <Text className="text-[12px] font-semibold text-secondary uppercase tracking-[2px] mt-[4px]">
                Luxury African Experiences • Cape Town
              </Text>
            </Section>

            <Hr className="border-solid border-slate-200 my-[20px]" />

            {/* Main Greeting & Message */}
            <Section className="py-[12px]">
              <Heading className="text-[20px] font-serif font-bold text-primary mb-[12px]">
                Warm Greetings, {customerName}!
              </Heading>
              <Text className="text-[15px] leading-[24px] text-slate-700">
                Thank you for contacting MiAfrica. We have received your inquiry for{' '}
                <strong className="text-primary">{tourTitle}</strong> and our Cape Town concierge team is already reviewing your details.
              </Text>
            </Section>

            {/* Summary Box */}
            <Section className="bg-card border border-solid border-slate-200 rounded-md p-[20px] my-[16px]">
              <Text className="text-[14px] font-bold text-primary uppercase tracking-[1px] m-0 mb-[12px]">
                Inquiry Summary
              </Text>
              
              <Row className="mb-[8px]">
                <Text className="text-[14px] text-slate-600 m-0">
                  <strong className="text-slate-800">Selected Experience:</strong> {tourTitle}
                </Text>
              </Row>

              {preferredDate && (
                <Row className="mb-[8px]">
                  <Text className="text-[14px] text-slate-600 m-0">
                    <strong className="text-slate-800">Preferred Travel Date:</strong> {preferredDate}
                  </Text>
                </Row>
              )}

              {travellerCount && travellerCount > 0 && (
                <Row className="mb-[8px]">
                  <Text className="text-[14px] text-slate-600 m-0">
                    <strong className="text-slate-800">Number of Travellers:</strong> {travellerCount}
                  </Text>
                </Row>
              )}

              {message && (
                <Row className="mt-[12px] pt-[12px] border-t border-solid border-slate-200">
                  <Text className="text-[14px] text-slate-600 m-0 italic">
                    &quot;{message}&quot;
                  </Text>
                </Row>
              )}
            </Section>

            {/* Next Steps */}
            <Section className="py-[12px]">
              <Heading className="text-[16px] font-bold text-primary mb-[8px]">
                What Happens Next?
              </Heading>
              <Text className="text-[14px] leading-[22px] text-slate-700">
                One of our dedicated travel specialists will curate a personalized response or contact you within 24 hours to confirm availability and refine your itinerary.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center py-[20px]">
              <Button
                href="https://miafrica.co.za/tours"
                className="bg-primary text-white text-[14px] font-semibold tracking-wider uppercase px-[24px] py-[12px] rounded-md box-border no-underline inline-block"
              >
                Explore More Tours
              </Button>
            </Section>

            <Hr className="border-solid border-slate-200 my-[24px]" />

            {/* Footer */}
            <Section className="text-center text-slate-500">
              <Text className="text-[12px] leading-[18px] m-0">
                <strong>MiAfrica Concierge Team</strong><br />
                Victoria &amp; Alfred Waterfront, Cape Town, 8001, South Africa<br />
                Direct: +27 (0) 21 555 0123 • Email: hello@miafrica.com
              </Text>
              <Text className="text-[11px] text-slate-400 mt-[12px] m-0">
                © {new Date().getFullYear()} MiAfrica. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

InquiryCustomerEmail.PreviewProps = {
  customerName: 'Eleanor Vance',
  tourTitle: 'Garden Route Scenic Odyssey',
  preferredDate: '2026-11-15',
  travellerCount: 4,
  message: 'We are looking forward to exploring Oudtshoorn and the coastline with a private guide.',
} satisfies InquiryCustomerEmailProps

export default InquiryCustomerEmail
