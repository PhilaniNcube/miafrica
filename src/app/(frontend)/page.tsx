import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedTours } from "@/features/tours/tours-queries";
import { TourGrid, TourGridSkeleton } from "@/features/tours/components/tour-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Compass, HeartHandshake, ArrowRight, PlayCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "MiAfrica — Curated Tour Experiences Across South Africa",
  description:
    "Embark on a journey designed for the modern explorer. Experience the raw beauty of South Africa combined with luxury bespoke service.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MiAfrica — Curated Tour Experiences Across South Africa",
    description:
      "Embark on a journey designed for the modern explorer. Experience the raw beauty of South Africa combined with luxury bespoke service.",
    url: "/",
    images: [
      {
        url: "https://pub-6b436ff2d3c345dcb470af66f325dda3.r2.dev/kruger-safari-hero.jpg",
        width: 1200,
        height: 630,
        alt: "South African safari landscape at golden hour",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-16 pb-24 overflow-hidden">
        {/* Background Image overlay */}
        <div className="absolute inset-0 z-0 bg-stone-900">
          <Image
            src="https://pub-6b436ff2d3c345dcb470af66f325dda3.r2.dev/Table%20Mountain"
            alt="South African safari landscape at golden hour"
            fill
            priority
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-primary/30" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl flex flex-col items-center">
          <Badge className="bg-white/15 backdrop-blur-md text-white border-white/30 uppercase tracking-[0.2em] px-4 py-1.5 mb-6 text-xs font-semibold">
            Discover the Extraordinary
          </Badge>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
            Curated Tour Experiences Across South Africa
          </h1>

          <p className="font-sans text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
            Embark on a journey designed for the modern explorer. Experience the raw beauty of South Africa combined with luxury bespoke service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Link href="/tours" className="w-full sm:w-auto">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white uppercase tracking-wider font-semibold px-8 py-6 rounded-md shadow-lg text-sm w-full">
                Explore Tours
              </Button>
            </Link>
            <Link href={"/contact" as any} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="border-white/80 hover:text-white hover:bg-white/10 uppercase tracking-wider font-semibold px-8 py-6 rounded-md text-sm gap-2 w-full">
                Plan Bespoke Journey <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">
              The MiAfrica Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              Crafted For Extraordinary Travel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-border bg-card p-8 rounded-xl shadow-sm hover:border-primary/40 transition-colors">
              <CardContent className="p-0 flex flex-col gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary">Curated Itineraries</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every tour is hand-crafted by local experts to ensure authentic cultural encounters and prime wildlife viewing.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card p-8 rounded-xl shadow-sm hover:border-primary/40 transition-colors">
              <CardContent className="p-0 flex flex-col gap-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary">Bespoke Concierge</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enjoy dedicated 24/7 travel support from your personal South African travel specialist throughout your journey.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card p-8 rounded-xl shadow-sm hover:border-primary/40 transition-colors">
              <CardContent className="p-0 flex flex-col gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-primary">Verified Luxury</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Partnered with premier lodges, private reserves, and licensed local transport to deliver uncompromising safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 block">
              Hand-picked Journeys
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              Featured Experiences
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Our signature tours across Cape Town, Kruger National Park, Winelands, and the Garden Route.
            </p>
          </div>
          <Link href="/tours">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-wider text-xs font-semibold">
              View All Tours &rarr;
            </Button>
          </Link>
        </div>

        <Suspense fallback={<TourGridSkeleton />}>
          <FeaturedTours />
        </Suspense>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <Badge className="bg-secondary text-white uppercase tracking-widest px-3 py-1 mb-6 text-xs border-none">
            Ready to Begin?
          </Badge>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-6">
            Start Planning Your Custom African Adventure
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
            Reach out to our Cape Town concierge team today to build your personalized safari or coastal itinerary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/contact" as any}>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-semibold uppercase tracking-wider px-8">
                Send Travel Inquiry
              </Button>
            </Link>
            <Link href="/tours">
              <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 uppercase tracking-wider font-semibold px-8">
                Browse Tour Catalog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

async function FeaturedTours() {
  const tours = await getFeaturedTours();
  if (tours.length === 0) return null;
  return <TourGrid tours={tours} />;
}