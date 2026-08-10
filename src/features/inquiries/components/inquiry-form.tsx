"use client";

import { useActionState, useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { createInquiry } from "@/features/inquiries/inquiries-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle, Send, Compass } from "lucide-react";

export function InquiryForm({
  tourId,
  tourTitle,
}: {
  tourId?: string;
  tourTitle?: string;
}) {
  const [state, formAction, pending] = useActionState(createInquiry, null);

  useEffect(() => {
    if (state?.ok) {
      sendGTMEvent({
        event: "form_submission",
        form_id: "inquiry_form",
        form_name: "Tour Inquiry Form",
        tour_id: tourId || "general",
        tour_title: tourTitle || "General Inquiry",
      });
    }
  }, [state, tourId, tourTitle]);

  if (state && state.ok) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 mb-2" />
        <p className="text-lg font-serif font-bold text-emerald-900">Thank you! Your inquiry has been received.</p>
        <p className="mt-2 text-sm text-emerald-700">
          Our Cape Town travel specialists will be in touch shortly {tourTitle ? `about ${tourTitle}` : "regarding your journey"}.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {tourId && <input type="hidden" name="tourId" value={tourId} />}

      {tourTitle && (
        <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg text-primary text-xs font-semibold uppercase tracking-wider">
          <Compass className="h-4 w-4 shrink-0 text-secondary" />
          <span>Inquiring for: {tourTitle}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full Name *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="bg-white border-border focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email Address *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane.doe@example.com"
            className="bg-white border-border focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+27 82 123 4567"
            className="bg-white border-border focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="travellerCount" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Number of Travellers
          </Label>
          <Input
            id="travellerCount"
            name="travellerCount"
            type="number"
            min={1}
            defaultValue={2}
            className="bg-white border-border focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="preferredDate" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Preferred Travel Date
        </Label>
        <Input
          id="preferredDate"
          name="preferredDate"
          type="date"
          className="bg-white border-border focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Special Requests / Message
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your preferences, dietary requirements, or target destinations..."
          className="bg-white border-border focus:ring-2 focus:ring-primary"
        />
      </div>

      {state && !state.ok && (
        <div className="flex items-center gap-2 p-3 rounded bg-destructive/10 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold uppercase tracking-wider py-6 rounded-md shadow-md gap-2"
      >
        {pending ? "Submitting Inquiry..." : <>Send Inquiry <Send className="h-4 w-4" /></>}
      </Button>
    </form>
  );
}