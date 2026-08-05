import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedTours } from "@/features/tours/tours-queries";
import { TourGrid, TourGridSkeleton } from "@/features/tours/components/tour-grid";

export const metadata: Metadata = {
  title: "Tours — MiAfrica",
  description:
    "Explore all MiAfrica tour offerings: Garden Route, City Tour, Winelands, Township, Goodhope Tour, Safari, Hiking and Whale Watching.",
};

export default function ToursPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-stone-900">Our Tours</h1>
        <p className="mx-auto mt-4 max-w-2xl text-stone-500">
          Choose from our curated selection of South African experiences. Each
          tour is led by expert local guides and tailored to give you the most
          authentic adventure.
        </p>
      </div>
      <Suspense fallback={<TourGridSkeleton />}>
        <AllTours />
      </Suspense>
    </div>
  );
}

async function AllTours() {
  const tours = await getPublishedTours();
  return <TourGrid tours={tours} />;
}