import Image from "next/image";
import Link from "next/link";
import type { TourCard as TourCardType } from "@/types/tour";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, ArrowRight } from "lucide-react";

export function TourCard({ tour }: { tour: TourCardType }) {
  return (
    <Card className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:border-primary/50 transition-all duration-300 flex flex-col h-full p-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {tour.heroMedia?.url ? (
          <Image
            src={tour.heroMedia.url}
            alt={tour.heroMedia.alt || tour.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
            No Image
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={tour.tourType === "multi-day" ? "bg-primary text-white hover:bg-primary" : "bg-white/90 text-primary hover:bg-white border border-border"}>
            {tour.tourType === "multi-day" ? "Multi-Day Safari" : "Day Experience"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {tour.durationLabel && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-secondary uppercase tracking-wider mb-2">
              <Clock className="h-3.5 w-3.5" />
              <span>{tour.durationLabel}</span>
            </div>
          )}
          <h3 className="font-serif text-xl font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
            {tour.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {tour.shortDescription}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {tour.featured ? "Featured Experience" : "Bespoke Tour"}
          </span>
          <Link href={`/tours/${tour.slug}` as any} prefetch={true}>
            <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors gap-1 text-xs">
              View Tour <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export function TourCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-xl border border-border bg-card p-0">
      <Skeleton className="aspect-[16/10] w-full" />
      <CardContent className="p-6">
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />
        <div className="pt-4 border-t border-border flex justify-between items-center">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export function TourGrid({ tours }: { tours: TourCardType[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}

export function TourGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <TourCardSkeleton key={i} />
      ))}
    </div>
  );
}