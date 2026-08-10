import { use, Suspense } from "react";
import type { Metadata } from "next";
import { getTourBySlug, getTourSlugs } from "@/features/tours/tours-queries";
import { TourDetail, TourDetailSkeleton } from "@/features/tours/components/tour-detail";
import { TouristTripJsonLd } from "@/components/seo/json-ld";

type Args = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  const title = tour.seo?.title || tour.title;
  const description = tour.seo?.description || tour.shortDescription;
  const imageUrl = tour.seo?.ogImage || tour.heroMedia?.url;
  const canonicalUrl = `/tours/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      siteName: "MiAfrica",
      title,
      description,
      url: canonicalUrl,
      images: imageUrl ? [{ url: imageUrl, alt: tour.heroMedia?.alt || title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
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
      <TourDetailContent params={params} />
    </Suspense>
  );
}

function TourDetailContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <TourDetailAsync slug={slug} />;
}

async function TourDetailAsync({ slug }: { slug: string }) {
  const tour = await getTourBySlug(slug);
  return (
    <>
      <TouristTripJsonLd tour={tour} />
      <TourDetail tour={tour} />
    </>
  );
}