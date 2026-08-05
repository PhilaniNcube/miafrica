import { Suspense } from "react";
import Link from "next/link";
import { getFeaturedTours } from "@/features/tours/tours-queries";
import { TourGrid, TourGridSkeleton } from "@/features/tours/components/tour-grid";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center bg-gradient-to-br from-amber-900 via-stone-800 to-stone-900 text-white">
        <div className="px-6 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Experience South Africa
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-200">
            From the heights of Table Mountain to the wilds of the Garden Route,
            MiAfrica crafts unforgettable journeys across the Western Cape and
            beyond.
          </p>
          <Link
            href="/tours"
            className="mt-8 inline-block rounded-full bg-amber-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Explore Tours
          </Link>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-stone-900">Featured Tours</h2>
            <p className="mt-2 text-stone-500">
              Our most popular experiences, chosen by travellers like you.
            </p>
          </div>
          <Link
            href="/tours"
            className="hidden text-sm font-medium text-amber-700 hover:text-amber-800 sm:block"
          >
            View all tours &rarr;
          </Link>
        </div>
        <Suspense fallback={<TourGridSkeleton />}>
          <FeaturedTours />
        </Suspense>
      </section>

      {/* Contact section */}
      <section id="contact" className="bg-stone-50 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-stone-900">Ready to Explore?</h2>
          <p className="mt-4 text-stone-500">
            Browse our tour offerings and send us an inquiry. We&apos;ll help you
            plan the perfect South African adventure.
          </p>
          <Link
            href="/tours"
            className="mt-8 inline-block rounded-full bg-stone-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-stone-800"
          >
            Browse All Tours
          </Link>
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