import Link from "next/link";
import { Compass, Mail, Phone, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground w-full py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary text-white">
              <Compass className="h-5 w-5" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">MiAfrica</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            Curated South African tour experiences. Merging raw wilderness beauty with bespoke luxury service.
          </p>
          <p className="text-xs text-white/60 pt-2">
            &copy; 2026 MiAfrica. All rights reserved.
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="font-serif text-lg font-semibold text-white mb-4">Explore</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li><Link href="/" className="hover:text-secondary transition-colors uppercase tracking-wider text-xs font-semibold">Home</Link></li>
            <li><Link href="/tours" className="hover:text-secondary transition-colors uppercase tracking-wider text-xs font-semibold">Tours</Link></li>
            <li><Link href={"/contact" as any} className="hover:text-secondary transition-colors uppercase tracking-wider text-xs font-semibold">Contact</Link></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-serif text-lg font-semibold text-white mb-4">Contact HQ</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-secondary shrink-0" />
              <span>V&A Waterfront, Cape Town, 8001</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-secondary shrink-0" />
              <span>+27 (0) 21 555 0123</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-secondary shrink-0" />
              <span>info@miafrica.co.za</span>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-serif text-lg font-semibold text-white mb-4">Experience</h4>
          <p className="text-xs text-white/80 leading-relaxed mb-4">
            Join our mailing list to receive hand-crafted safari and coastal excursion offers.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border border-white/20 rounded px-3 py-2 text-xs text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-secondary w-full"
            />
            <button className="bg-secondary hover:bg-secondary/90 text-white text-xs px-3 py-2 rounded font-semibold uppercase tracking-wider transition-colors shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}