import { Suspense } from "react";
import type { Metadata } from "next";
import { getTourBySlug, getTourSlugs } from "@/features/tours/tours-queries";
import { TourDetail, TourDetailSkeleton } from "@/features/tours/components/tour-detail";

type Args = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  return {
    title: tour.seo?.title || `${tour.title} — MiAfrica`,
    description: tour.seo?.description || tour.shortDescription,
    openGraph: {
      images: tour.seo?.ogImage ? [tour.seo.ogImage] : tour.heroMedia?.url ? [tour.heroMedia.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function TourPage({ params }: Args) {
  return (
    <Suspense fallback={<TourDetailSkeleton />}>
      {params.then(({ slug }) => (
        <TourDetailAsync slug={slug} />
      ))}
    </Suspense>
  );
}

async function TourDetailAsync({ slug }: { slug: string }) {
  const tour = await getTourBySlug(slug);
  return <TourDetail tour={tour} />;
}