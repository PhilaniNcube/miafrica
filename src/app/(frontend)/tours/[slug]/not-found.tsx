import Link from "next/link";

export default function TourNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-stone-900">Tour Not Found</h1>
      <p className="mt-4 text-stone-500">
        The tour you&apos;re looking for doesn&apos;t exist or hasn&apos;t been
        published yet.
      </p>
      <Link
        href="/tours"
        className="mt-8 inline-block rounded-full bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
      >
        Browse All Tours
      </Link>
    </div>
  );
}