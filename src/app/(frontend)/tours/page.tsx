import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedTours } from "@/features/tours/tours-queries";
import {
  TourFilterableGrid,
  TourFilterableGridSkeleton,
} from "@/features/tours/components/tour-filterable-grid";
import { TourCatalogJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Explore Tours",
  description:
    "Explore all MiAfrica tour offerings: Garden Route, City Tour, Winelands, Township, Goodhope Tour, Safari, Hiking and Whale Watching.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "Explore Curated Tours Across South Africa | MiAfrica",
    description:
      "Explore all MiAfrica tour offerings: Garden Route, City Tour, Winelands, Township, Goodhope Tour, Safari, Hiking and Whale Watching.",
    url: "/tours",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Curated Tours Across South Africa | MiAfrica",
    description:
      "Explore all MiAfrica tour offerings: Garden Route, City Tour, Winelands, Township, Goodhope Tour, Safari, Hiking and Whale Watching.",
  },
};

export default function ToursPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Suspense fallback={<TourFilterableGridSkeleton />}>
        <AllTours />
      </Suspense>
    </div>
  );
}

async function AllTours() {
  const tours = await getPublishedTours();
  return (
    <>
      <TourCatalogJsonLd tours={tours} />
      <TourFilterableGrid tours={tours} />
    </>
  );
}