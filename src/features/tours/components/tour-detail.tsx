import Image from "next/image";
import type { Tour } from "@/types/tour";
import { InquiryForm } from "@/features/inquiries/components/inquiry-form";

export function TourDetail({ tour }: { tour: Tour }) {
  return (
    <article>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-stone-900">
        {tour.heroMedia?.url && (
          <Image
            src={tour.heroMedia.url}
            alt={tour.heroMedia.alt || tour.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-4xl px-6 pb-10">
            {tour.tourType === "multi-day" && (
              <span className="inline-block rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white">
                Multi-Day Tour
              </span>
            )}
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">{tour.title}</h1>
            {tour.durationLabel && (
              <p className="mt-2 text-lg text-stone-200">{tour.durationLabel}</p>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Short description */}
        <p className="text-xl leading-relaxed text-stone-700">{tour.shortDescription}</p>

        {/* Overview */}
        {tour.overview && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-stone-900">Overview</h2>
            <div
              className="mt-4 prose max-w-none text-stone-600"
              dangerouslySetInnerHTML={{ __html: tour.overview }}
            />
          </section>
        )}

        {/* Itinerary */}
        {tour.itinerary.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-stone-900">
              {tour.tourType === "multi-day" ? "Itinerary" : "What to Expect"}
            </h2>
            <div className="mt-6 space-y-6">
              {tour.itinerary.map((item, idx) => (
                <div key={item.id ?? idx} className="rounded-xl border border-stone-200 p-6">
                  {item.type === "day" && item.dayNumber && (
                    <span className="text-sm font-semibold text-amber-700">
                      Day {item.dayNumber}
                    </span>
                  )}
                  <h3 className="mt-1 text-lg font-semibold text-stone-900">{item.title}</h3>
                  {item.summary && (
                    <div
                      className="mt-2 prose max-w-none text-sm text-stone-600"
                      dangerouslySetInnerHTML={{ __html: item.summary }}
                    />
                  )}
                  {item.activities && item.activities.length > 0 && (
                    <ul className="mt-3 list-disc pl-5 text-sm text-stone-600">
                      {item.activities.map((a, i) => (
                        <li key={i}>{a.activity}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Highlights */}
        {tour.highlights.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-stone-900">Highlights</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {tour.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-600">
                  <span className="mt-1 text-amber-600">&#9733;</span>
                  <span>{h.highlight}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Included / Not Included */}
        {(tour.included.length > 0 || tour.notIncluded.length > 0) && (
          <section className="mt-10 grid gap-8 sm:grid-cols-2">
            {tour.included.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold text-stone-900">Included</h2>
                <ul className="space-y-2">
                  {tour.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-600">
                      <span className="mt-0.5 text-green-600">&#10003;</span>
                      <span>{item.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tour.notIncluded.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold text-stone-900">Not Included</h2>
                <ul className="space-y-2">
                  {tour.notIncluded.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-stone-600">
                      <span className="mt-0.5 text-red-500">&#10007;</span>
                      <span>{item.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Optional Extras */}
        {tour.optionalExtras.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-stone-900">Optional Extras</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {tour.optionalExtras.map((extra, i) => (
                <div key={extra.id ?? i} className="rounded-xl border border-stone-200 p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-semibold text-stone-900">{extra.title}</h3>
                    {extra.type && (
                      <span className="text-xs font-medium text-amber-700 capitalize">
                        {extra.type}
                      </span>
                    )}
                  </div>
                  {extra.description && (
                    <div
                      className="prose-sm text-sm text-stone-600"
                      dangerouslySetInnerHTML={{ __html: extra.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {tour.gallery && tour.gallery.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-stone-900">Gallery</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {tour.gallery.map((g, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg bg-stone-100"
                >
                  {g.media?.url && (
                    <Image
                      src={g.media.url}
                      alt={g.media.alt || g.caption || tour.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Inquiry */}
        <section id="inquire" className="mt-12 scroll-mt-20 rounded-2xl bg-stone-50 p-8">
          <h2 className="text-2xl font-bold text-stone-900">Enquire About This Tour</h2>
          <p className="mt-2 text-stone-500">
            Fill in your details below and we&apos;ll get back to you with more information.
          </p>
          <InquiryForm tourId={tour.id} tourTitle={tour.title} />
        </section>
      </div>
    </article>
  );
}

export function TourDetailSkeleton() {
  return (
    <div>
      <div className="h-[50vh] min-h-[400px] w-full animate-pulse bg-stone-200" />
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="h-7 w-3/4 animate-pulse rounded bg-stone-200" />
        <div className="mt-6 h-4 w-full animate-pulse rounded bg-stone-100" />
        <div className="mt-3 h-4 w-5/6 animate-pulse rounded bg-stone-100" />
        <div className="mt-10 h-6 w-1/4 animate-pulse rounded bg-stone-200" />
        <div className="mt-4 space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-stone-100" />
          ))}
        </div>
      </div>
    </div>
  );
}