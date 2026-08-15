"use client";

import { useState, useMemo } from "react";
import type { TourCard as TourCardType } from "@/types/tour";
import { TourCard, TourGridSkeleton } from "./tour-grid";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type FilterType = "all" | "day" | "multi-day";

interface FilterOption {
  label: string;
  value: FilterType;
}

const FILTER_OPTIONS: FilterOption[] = [
  { label: "All Tours", value: "all" },
  { label: "Day Experiences", value: "day" },
  { label: "Multi-Day Safaris", value: "multi-day" },
];

export function TourFilterableGrid({ tours }: { tours: TourCardType[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredTours = useMemo(() => {
    if (activeFilter === "all") return tours;
    if (activeFilter === "day") {
      return tours.filter((tour) => tour.tourType === "day" || (tour.tourType as string) === "day-tour");
    }
    if (activeFilter === "multi-day") {
      return tours.filter((tour) => tour.tourType === "multi-day");
    }
    return tours;
  }, [tours, activeFilter]);

  return (
    <div>
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

        <div
          className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar"
          role="tablist"
          aria-label="Tour filters"
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(option.value)}
                className={`px-4 py-2 rounded-full font-medium text-xs whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </header>

      {filteredTours.length > 0 ? (
        <div id="tour-grid" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border rounded-xl bg-card/50">
          <p className="text-muted-foreground text-sm mb-4">
            No tours found in this category.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className="px-4 py-2 rounded-full bg-primary text-white font-medium text-xs hover:bg-primary/90 transition-colors"
          >
            Show All Tours
          </button>
        </div>
      )}
    </div>
  );
}

export function TourFilterableGridSkeleton() {
  return (
    <div>
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
          {FILTER_OPTIONS.map((option) => (
            <Skeleton key={option.value} className="h-8 w-28 rounded-full" />
          ))}
        </div>
      </header>

      <TourGridSkeleton />
    </div>
  );
}
