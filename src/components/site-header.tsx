import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-stone-900">
          MiAfrica
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-stone-600">
          <li>
            <Link href="/" className="hover:text-stone-900 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tours" className="hover:text-stone-900 transition-colors">
              Tours
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="hover:text-stone-900 transition-colors">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}