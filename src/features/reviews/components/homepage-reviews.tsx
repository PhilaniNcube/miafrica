import Link from 'next/link'
import { Star, Quote, MapPin, Sparkles, MessageSquarePlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getHomepageReviews } from '@/features/reviews/reviews-queries'
import type { ReviewCard } from '@/types/review'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating
            ? 'text-amber-400 fill-amber-400'
            : 'text-muted-foreground/30'
            }`}
        />
      ))}
    </div>
  )
}

function ReviewCardItem({ review }: { review: ReviewCard }) {
  return (
    <Card className="border border-border bg-card hover:border-secondary/40 transition-all duration-300 rounded-xl flex flex-col justify-between overflow-hidden group shadow-sm hover:shadow-md">
      <CardContent className="p-6 flex flex-col justify-between flex-1 gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <StarRating rating={review.rating} />
            <Quote className="h-5 w-5 text-secondary/30 group-hover:text-secondary/60 transition-colors shrink-0" />
          </div>

          {review.title && (
            <h3 className="font-serif text-base font-bold text-primary line-clamp-1">
              {review.title}
            </h3>
          )}

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4 italic">
            &ldquo;{review.content}&rdquo;
          </p>
        </div>

        <div className="pt-4 border-t border-border/60 space-y-2 mt-auto">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-xs text-primary truncate">
              {review.author}
            </span>
            {review.location && (
              <span className="text-[11px] text-muted-foreground text-wrap flex items-center gap-1 shrink-0">
                <MapPin className="h-3 w-3 text-secondary" />
                {review.location}
              </span>
            )}
          </div>

          {review.tourTitle && (
            <div className="pt-1">
              {review.tourSlug ? (
                <Link
                  href={`/tours/${review.tourSlug}`}
                  className="text-[11px] font-medium text-secondary hover:underline truncate block"
                >
                  Experience: {review.tourTitle}
                </Link>
              ) : (
                <span className="text-[11px] font-medium text-muted-foreground truncate block">
                  Experience: {review.tourTitle}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export async function HomepageReviews() {
  const reviews = await getHomepageReviews()

  if (reviews.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Badge className="bg-secondary/15 text-secondary border-secondary/20 uppercase tracking-widest px-3 py-1 mb-3 text-xs inline-flex items-center gap-1.5 font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Guest Testimonials
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              Stories From Our Explorers
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Read authentic feedback from travelers who experienced the magic of South Africa with our bespoke tours.
            </p>
          </div>

          <Link href="/review" className="shrink-0">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white uppercase tracking-wider text-xs font-semibold gap-2"
            >
              <MessageSquarePlus className="h-4 w-4" /> Share Your Story
            </Button>
          </Link>
        </div>

        {/* 8-Review Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <ReviewCardItem key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function HomepageReviewsSkeleton() {
  return (
    <section className="py-20 bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-9 w-72 rounded-md" />
            <Skeleton className="h-4 w-96 rounded-md" />
          </div>
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="border border-border p-6 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-12 w-full rounded" />
              <div className="pt-4 border-t border-border/60 flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
