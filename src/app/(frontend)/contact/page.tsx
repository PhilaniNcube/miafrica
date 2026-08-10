import type { Metadata } from "next";
import Image from "next/image";
import { InquiryForm } from "@/features/inquiries/components/inquiry-form";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Compass } from "lucide-react";
import { ContactPageJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with MiAfrica. Reach out to our Cape Town concierge team to plan your custom South African tour experience.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact MiAfrica Concierge | Cape Town Travel Specialists",
    description:
      "Get in touch with MiAfrica. Reach out to our Cape Town concierge team to plan your custom South African tour experience.",
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact MiAfrica Concierge | Cape Town Travel Specialists",
    description:
      "Get in touch with MiAfrica. Reach out to our Cape Town concierge team to plan your custom South African tour experience.",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactPageJsonLd />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <Badge className="bg-secondary text-white uppercase tracking-widest px-3 py-1 mb-3 text-xs border-none">
            Reach Our Concierge
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            We&apos;re here to help you plan your perfect African adventure. Reach out with any questions, requests, or bespoke tour inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Contact Details & Map */}
          <div className="flex flex-col gap-8">
            <Card className="border border-border bg-card p-6 sm:p-8 rounded-xl shadow-sm">
              <CardContent className="p-0 space-y-6">
                <h2 className="font-serif text-2xl font-bold text-primary border-b border-border pb-4">
                  Contact Information
                </h2>

                <div className="space-y-6 pt-2">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Email HQ</span>
                      <a href="mailto:info@miafrica.co.za" className="font-medium text-primary hover:text-secondary transition-colors text-base">
                        info@miafrica.co.za
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Direct Phone</span>
                      <a href="tel:+27215550123" className="font-medium text-primary hover:text-secondary transition-colors text-base">
                        +27 (0) 21 555 0123
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">Office Address</span>
                      <p className="font-medium text-primary leading-relaxed text-base">
                        14 Safari Drive, Victoria &amp; Alfred Waterfront<br />
                        Cape Town, 8001<br />
                        South Africa
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Satellite Map Container */}
            <Card className="border border-border bg-card overflow-hidden rounded-xl shadow-sm relative group">
              <div className="relative h-[320px] w-full">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFnkpUk-jLO6NTv70y_gpQhfDeGeCQeeFLprZ3f-T0t_M_yOIoha57Ivn4B_3Vv4912x3dtlji_gVQkmY-IXkyBYUnAb5TsOXW52A90rSmIzThUW0EprxpzXVUukJgUpYT3SgH24-mlyKRrCNZqmy7ZJe5DHi9BlSKF1HkpNicVxGeK4Eh5l9KRkPF9ab1P20iwa5dhWeR5kz9IqY3zCPh_BrSzE-p38zoNswM-G3pQdHWIs74NhhOBA"
                  alt="Satellite map view of Cape Town V&A Waterfront office location"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/15 group-hover:bg-transparent transition-colors duration-300" />

                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg border border-border shadow-md flex items-center gap-2">
                  <Compass className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Cape Town Office • V&amp;A Waterfront</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Inquiry Form */}
          <Card className="border border-border bg-card p-6 sm:p-8 rounded-xl shadow-sm">
            <CardContent className="p-0 space-y-4">
              <h2 className="font-serif text-2xl font-bold text-primary border-b border-border pb-4">
                Send an Inquiry
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have questions about tour availability, itineraries, or private group bookings? Complete the form below and we will get back to you within 24 hours.
              </p>
              <InquiryForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

