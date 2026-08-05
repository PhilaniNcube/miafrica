import Image from "next/image";
import Link from "next/link";
import type { TourCard as TourCardType } from "@/types/tour";

export function TourCard({ tour }: { tour: TourCardType }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 transition-all hover:shadow-lg hover:ring-stone-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {tour.heroMedia?.url ? (
          <Image
            src={tour.heroMedia.url}
            alt={tour.heroMedia.alt || tour.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-stone-200" />
        )}
        {tour.tourType === "multi-day" && (
          <span className="absolute right-3 top-3 rounded-full bg-stone-900/80 px-3 py-1 text-xs font-semibold text-white">
            Multi-Day
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-stone-900">{tour.title}</h3>
        {tour.durationLabel && (
          <p className="mt-1 text-sm font-medium text-amber-700">{tour.durationLabel}</p>
        )}
        <p className="mt-2 text-sm line-clamp-3 text-stone-500">{tour.shortDescription}</p>
      </div>
    </Link>
  );
}

export function TourCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
      <div className="aspect-[4/3] animate-pulse bg-stone-200" />
      <div className="p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-stone-200" />
        <div className="mt-3 h-4 w-full animate-pulse rounded bg-stone-100" />
        <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-stone-100" />
      </div>
    </div>
  );
}

export function TourGrid({ tours }: { tours: TourCardType[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}

export function TourGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <TourCardSkeleton key={i} />
      ))}
    </div>
  );
}