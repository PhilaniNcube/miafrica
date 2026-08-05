import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xl font-bold text-stone-900">MiAfrica</p>
            <p className="mt-1 text-sm text-stone-500">
              Curated tour experiences across South Africa
            </p>
          </div>
          <nav className="flex gap-6 text-sm text-stone-500">
            <Link href="/tours" className="hover:text-stone-900 transition-colors">
              Tours
            </Link>
            <Link href="/#contact" className="hover:text-stone-900 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-stone-400">
          &copy; 2026 MiAfrica. All rights reserved.
        </p>
      </div>
    </footer>
  );
}