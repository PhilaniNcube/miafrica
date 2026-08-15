import type { Metadata } from "next";
import { getPublishedTours } from "@/features/tours/tours-queries";
import { ReviewForm } from "@/features/reviews/components/review-form";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquareHeart, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Share Your Experience | MiAfrica",
  description: "Share your travel feedback and experience with the MiAfrica concierge team.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ReviewPage({
  searchParams,
}: {
  searchParams: Promise<{ tourId?: string; tour?: string }>;
}) {
  const params = await searchParams;
  const tours = await getPublishedTours();

  const tourOptions = tours.map((t) => ({
    id: t.id,
    title: t.title,
  }));

  const initialTourId =
    params.tourId ||
    (params.tour
      ? tours.find(
          (t) =>
            t.slug.toLowerCase() === params.tour?.toLowerCase() ||
            t.id === params.tour
        )?.id
      : undefined);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <Badge className="bg-secondary text-white uppercase tracking-widest px-3 py-1 mb-3 text-xs border-none inline-flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" /> Guest Feedback
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 tracking-tight">
          Share Your Journey
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          We hope your time in South Africa was nothing short of remarkable. Please take a moment to share your experience with us.
        </p>
      </div>

      {/* Main Review Card */}
      <Card className="border border-border bg-card p-6 sm:p-10 rounded-2xl shadow-sm">
        <CardContent className="p-0 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border text-primary">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MessageSquareHeart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-primary">
                Your Review
              </h2>
              <p className="text-xs text-muted-foreground">
                Your feedback helps us continually elevate our private luxury tours.
              </p>
            </div>
          </div>

          <ReviewForm tours={tourOptions} initialTourId={initialTourId} />

          <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-secondary" />
            <span>Reviews are moderated by our Cape Town concierge team before publication.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
