import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedTours } from "@/features/tours/tours-queries";
import { TourGrid, TourGridSkeleton } from "@/features/tours/components/tour-grid";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Tours — MiAfrica",
  description:
    "Explore all MiAfrica tour offerings: Garden Route, City Tour, Winelands, Township, Goodhope Tour, Safari, Hiking and Whale Watching.",
};

export default function ToursPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header & Filter Bar */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-border">
        <div>
          <Badge className="bg-secondary text-white uppercase tracking-widest px-3 py-1 mb-3 text-xs border-none">
            Curated Catalog
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary mb-2">
            Explore Tours
          </h1>
          <p className="text-base text-muted-foreground max-w-xl">
            Discover hand-crafted South African experiences led by expert local guides.
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Badge className="px-4 py-2 rounded-full bg-primary text-white font-medium text-xs whitespace-nowrap cursor-pointer">
            All Tours
          </Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full border-border text-muted-foreground hover:bg-muted font-medium text-xs whitespace-nowrap cursor-pointer">
            Day Experiences
          </Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full border-border text-muted-foreground hover:bg-muted font-medium text-xs whitespace-nowrap cursor-pointer">
            Multi-Day Safaris
          </Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full border-border text-muted-foreground hover:bg-muted font-medium text-xs whitespace-nowrap cursor-pointer">
            Luxury Coastal
          </Badge>
        </div>
      </header>

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