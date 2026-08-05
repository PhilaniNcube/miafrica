"use client"

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Compass } from "lucide-react";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-[#F8F9FA]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <Compass className="h-5 w-5" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-primary">
            MiAfrica
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/tours" className="hover:text-primary transition-colors">
            Tours
          </Link>
          <Link href={"/contact" as any} className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/tours">
            <Button className="bg-secondary hover:bg-secondary/90 text-white font-medium tracking-wider uppercase rounded-md shadow-sm">
              Book Experience
            </Button>
          </Link>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger render={
            <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
              <Menu className="h-6 w-6 text-primary" />
            </Button>
          } />
          <SheetContent side="right" className="w-[300px] bg-background">
            <SheetHeader className="text-left border-b pb-4">
              <SheetTitle className="font-serif text-xl font-bold text-primary flex items-center gap-2">
                <Compass className="h-5 w-5" /> MiAfrica
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 py-6 font-semibold uppercase tracking-wider text-sm">
              <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/tours" onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">
                Tours
              </Link>
              <Link href={"/contact" as any} onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/tours" onClick={() => setIsOpen(false)}>
                <Button className="bg-secondary hover:bg-secondary/90 text-white w-full uppercase tracking-wider mt-4">
                  Book Experience
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}