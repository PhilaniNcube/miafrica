import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getSiteUrl } from "@/lib/site-url";
import { TravelAgencyJsonLd } from "@/components/seo/json-ld";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const baseUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "MiAfrica — Curated Tour Experiences Across South Africa",
    template: "%s | MiAfrica",
  },
  description:
    "Discover South Africa with MiAfrica. City tours, winelands, safaris, hiking, whale watching, township experiences and the iconic Garden Route.",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: baseUrl,
    siteName: "MiAfrica",
    title: "MiAfrica — Curated Tour Experiences Across South Africa",
    description:
      "Discover South Africa with MiAfrica. City tours, winelands, safaris, hiking, whale watching, township experiences and the iconic Garden Route.",
    images: [
      {
        url: "https://pub-6b436ff2d3c345dcb470af66f325dda3.r2.dev/kruger-safari-hero.jpg",
        width: 1200,
        height: 630,
        alt: "MiAfrica South African Safaris and Curated Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MiAfrica — Curated Tour Experiences Across South Africa",
    description:
      "Discover South Africa with MiAfrica. City tours, winelands, safaris, hiking, whale watching, township experiences and the iconic Garden Route.",
    images: ["https://pub-6b436ff2d3c345dcb470af66f325dda3.r2.dev/kruger-safari-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "AU65mtbDbkyasySGHc5WaGLFgUjKCWx35M9yRgUnCjM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F9FA] text-stone-900 font-sans">
        <GoogleTagManager />
        <TravelAgencyJsonLd />
        <TooltipProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppButton />
        </TooltipProvider>
      </body>
    </html>
  );
}