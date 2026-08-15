"use client";

import { useActionState, useState } from "react";
import { createReview } from "@/features/reviews/reviews-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle, Send, Star, Compass } from "lucide-react";

export interface ReviewFormTourOption {
  id: string;
  title: string;
}

export function ReviewForm({
  tours,
  initialTourId,
}: {
  tours: ReviewFormTourOption[];
  initialTourId?: string;
}) {
  const [state, formAction, pending] = useActionState(createReview, null);
  const [rating, setRating] = useState<number>(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  if (state && state.ok) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-8 sm:p-10 text-center shadow-sm">
        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-emerald-900 mb-2">
          Thank You for Your Review!
        </h3>
        <p className="text-sm sm:text-base text-emerald-800/90 max-w-md mx-auto leading-relaxed">
          Your feedback is immensely valuable to us and helps our Cape Town concierge team continue crafting unforgettable African journeys.
        </p>
      </div>
    );
  }

  const activeRating = hoveredRating !== null ? hoveredRating : rating;

  return (
    <form action={formAction} className="space-y-6">
      {/* Star Rating Section */}
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
          Overall Experience Rating *
        </Label>
        <div className="flex items-center gap-1.5 pt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              className="p-1 rounded transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary cursor-pointer"
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
            >
              <Star
                className={`h-8 w-8 transition-colors ${
                  star <= activeRating
                    ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                    : "text-slate-300 fill-transparent"
                }`}
              />
            </button>
          ))}
          <span className="ml-3 text-sm font-semibold text-primary">
            {activeRating === 5 && "Exceptional (5 / 5)"}
            {activeRating === 4 && "Great (4 / 5)"}
            {activeRating === 3 && "Good (3 / 5)"}
            {activeRating === 2 && "Fair (2 / 5)"}
            {activeRating === 1 && "Poor (1 / 5)"}
          </span>
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>

      {/* Tour Selection (Optional) */}
      <div className="space-y-1.5">
        <Label htmlFor="tourId" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Tour / Trip Experience (Optional)
        </Label>
        <div className="relative">
          <select
            id="tourId"
            name="tourId"
            defaultValue={initialTourId || ""}
            className="w-full h-11 px-3 py-2 bg-white border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">General / Bespoke Journey (No specific tour)</option>
            {tours.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          <Compass className="absolute right-3.5 top-3.5 h-4 w-4 pointer-events-none text-muted-foreground" />
        </div>
      </div>

      {/* Name and Location */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="author" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your Name *
          </Label>
          <Input
            id="author"
            name="author"
            type="text"
            required
            placeholder="e.g. Sarah & Michael"
            className="h-11 bg-white border-border focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="location" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your Location / Country
          </Label>
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. London, UK"
            className="h-11 bg-white border-border focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Headline / Title & Travel Date */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Review Title / Headline
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Truly an unforgettable Cape experience!"
            className="h-11 bg-white border-border focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="reviewDate" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Date of Travel / Experience
          </Label>
          <Input
            id="reviewDate"
            name="reviewDate"
            type="date"
            className="h-11 bg-white border-border focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-1.5">
        <Label htmlFor="content" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Your Review &amp; Experience *
        </Label>
        <Textarea
          id="content"
          name="content"
          required
          rows={5}
          placeholder="Share your highlights, impressions of the guide, destinations visited, and overall journey..."
          className="bg-white border-border focus:ring-2 focus:ring-primary leading-relaxed"
        />
      </div>

      {state && !state.ok && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold uppercase tracking-wider py-6 rounded-md shadow-md gap-2 cursor-pointer transition-all"
      >
        {pending ? "Submitting Review..." : <>Submit Review <Send className="h-4 w-4" /></>}
      </Button>
    </form>
  );
}
