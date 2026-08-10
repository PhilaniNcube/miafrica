"use client";

import Image from "next/image";
import type { Tour } from "@/types/tour";
import { InquiryForm } from "@/features/inquiries/components/inquiry-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle, Clock, MapPin, Sparkles, Users, Calendar } from "lucide-react";

export function TourDetail({ tour }: { tour: Tour }) {
  return (
    <article className="w-full bg-background pb-20">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-end pb-12 px-4 sm:px-6 lg:px-8 bg-stone-900 overflow-hidden">
        {typeof tour.heroMedia?.url === "string" && tour.heroMedia.url ? (
          <Image
            src={tour.heroMedia.url}
            alt={typeof tour.heroMedia.alt === "string" ? tour.heroMedia.alt : tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-75"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent z-10" />
        
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-start gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary text-white border-none uppercase tracking-widest text-xs px-3 py-1">
              {tour.tourType === "multi-day" ? "Multi-Day Safari" : "Day Tour"}
            </Badge>
            <Badge className="bg-secondary text-white border-none uppercase tracking-widest text-xs px-3 py-1">
              Premium Experience
            </Badge>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-4xl leading-tight">
            {tour.title}
          </h1>
          
          {tour.durationLabel && (
            <p className="text-lg sm:text-xl text-white/90 font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-secondary" />
              <span>{tour.durationLabel}</span>
            </p>
          )}

          <Button 
            size="lg" 
            className="mt-4 bg-secondary hover:bg-secondary/90 text-white uppercase tracking-wider font-semibold shadow-xl"
            onClick={() => {
              const el = document.getElementById("inquire");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Inquire About This Tour
          </Button>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Short description & Overview */}
            <section className="space-y-6">
              <p className="font-serif text-xl sm:text-2xl text-primary font-medium leading-relaxed italic border-l-4 border-secondary pl-6 py-1">
                {tour.shortDescription}
              </p>

              {tour.overview && (
                <div className="space-y-4 pt-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Overview</h2>
                  <div
                    className="prose prose-stone max-w-none text-muted-foreground leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: tour.overview }}
                  />
                </div>
              )}
            </section>

            {/* Highlights & Quick Details Bento */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tour.highlights.length > 0 && (
                <Card className="border border-border bg-card p-6 rounded-xl shadow-sm">
                  <CardContent className="p-0 space-y-4">
                    <h3 className="font-serif text-xl font-bold text-primary border-b border-border pb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-secondary" /> Highlights
                    </h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {tour.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{h.highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              <Card className="border border-border bg-card p-6 rounded-xl shadow-sm">
                <CardContent className="p-0 space-y-4">
                  <h3 className="font-serif text-xl font-bold text-primary border-b border-border pb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Trip Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Duration</span>
                      <span className="font-medium text-foreground">{tour.durationLabel || "Full Day"}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Group Size</span>
                      <span className="font-medium text-foreground">Bespoke / Private</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Type</span>
                      <span className="font-medium text-foreground capitalize">{tour.tourType}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Location</span>
                      <span className="font-medium text-foreground">South Africa</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Itinerary Timeline */}
            {tour.itinerary.length > 0 && (
              <section className="space-y-6 pt-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                  {tour.tourType === "multi-day" ? "Day-by-Day Itinerary" : "Tour Experience Schedule"}
                </h2>
                <div className="space-y-6 border-l-2 border-primary/20 ml-3 pl-6 sm:pl-8">
                  {tour.itinerary.map((item, idx) => (
                    <div key={item.id ?? idx} className="relative group">
                      <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background group-hover:bg-secondary transition-colors" />
                      
                      <Card className="border border-border bg-card p-6 rounded-xl shadow-sm group-hover:border-primary/40 transition-colors">
                        <CardContent className="p-0 space-y-3">
                          {item.type === "day" && item.dayNumber && (
                            <Badge variant="outline" className="text-secondary border-secondary uppercase tracking-widest text-[10px]">
                              Day {item.dayNumber}
                            </Badge>
                          )}
                          <h3 className="font-serif text-xl font-bold text-primary">{item.title}</h3>
                          
                          {item.summary && (
                            <div
                              className="text-sm text-muted-foreground leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: item.summary }}
                            />
                          )}

                          {item.activities && item.activities.length > 0 && (
                            <div className="pt-2">
                              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">Key Activities</span>
                              <div className="flex flex-wrap gap-2">
                                {item.activities.map((a, i) => (
                                  <Badge key={i} variant="secondary" className="bg-muted text-foreground text-xs font-normal">
                                    {a.activity}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Included / Not Included */}
            {(tour.included.length > 0 || tour.notIncluded.length > 0) && (
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {tour.included.length > 0 && (
                  <Card className="border border-border bg-emerald-50/50 p-6 rounded-xl">
                    <CardContent className="p-0 space-y-4">
                      <h3 className="font-serif text-xl font-bold text-emerald-900 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-700" /> What&apos;s Included
                      </h3>
                      <ul className="space-y-2.5 text-sm text-emerald-950">
                        {tour.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-700 font-bold">•</span>
                            <span>{item.item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {tour.notIncluded.length > 0 && (
                  <Card className="border border-border bg-rose-50/50 p-6 rounded-xl">
                    <CardContent className="p-0 space-y-4">
                      <h3 className="font-serif text-xl font-bold text-rose-900 flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-rose-700" /> Not Included
                      </h3>
                      <ul className="space-y-2.5 text-sm text-rose-950">
                        {tour.notIncluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-rose-700 font-bold">•</span>
                            <span>{item.item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </section>
            )}

            {/* Media Gallery */}
            {tour.gallery && tour.gallery.length > 0 && (
              <section className="space-y-6 pt-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">Experience Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {tour.gallery.map((g, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted group">
                      {typeof g.media?.url === "string" && g.media.url ? (
                        <Image
                          src={g.media.url}
                          alt={typeof g.media.alt === "string" ? g.media.alt : g.caption || tour.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column / Sticky Inquiry Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <Card id="inquire" className="border border-border bg-card p-6 sm:p-8 rounded-xl shadow-lg">
              <CardContent className="p-0 space-y-4">
                <Badge className="bg-secondary text-white uppercase tracking-widest text-[10px] border-none">
                  Book Your Tour
                </Badge>
                <h2 className="font-serif text-2xl font-bold text-primary">Send An Inquiry</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Provide your preferred travel dates and guest count. Our concierge will curate your experience.
                </p>
                
                <InquiryForm tourId={tour.id} tourTitle={tour.title} />
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </article>
  );
}

export function TourDetailSkeleton() {
  return (
    <div>
      <Skeleton className="h-[60vh] w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-32 w-full rounded-xl mt-8" />
        </div>
        <div className="lg:col-span-4">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}