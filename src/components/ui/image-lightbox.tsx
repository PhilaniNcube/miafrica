"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  url: string;
  alt?: string;
  caption?: string;
  title?: string;
  width?: number;
  height?: number;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  open,
  onOpenChange,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const hasMultiple = images.length > 1;
  const currentImage = images[currentIndex] || images[0];

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handlePrev, handleNext]);

  if (!currentImage?.url) return null;

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md transition-all duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup className="fixed inset-0 z-50 flex flex-col justify-between p-4 sm:p-6 outline-none focus:outline-none select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between z-20 text-white/90">
            <div className="text-sm font-medium tracking-wider px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
              {hasMultiple ? `${currentIndex + 1} / ${images.length}` : "Photo View"}
            </div>
            
            <DialogPrimitive.Close className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all cursor-pointer backdrop-blur-md border border-white/15">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          {/* Main Image Container */}
          <div className="relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center my-auto min-h-0 py-2">
            {hasMultiple && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition-all duration-150 hover:scale-105 cursor-pointer shadow-lg"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <div className="relative flex items-center justify-center w-full h-full max-h-[75vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={currentImage.url}
                src={currentImage.url}
                alt={currentImage.alt || currentImage.caption || currentImage.title || "Tour image"}
                className="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-md shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                style={{
                  aspectRatio:
                    currentImage.width && currentImage.height
                      ? `${currentImage.width} / ${currentImage.height}`
                      : "auto",
                }}
              />
            </div>

            {hasMultiple && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition-all duration-150 hover:scale-105 cursor-pointer shadow-lg"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar / Caption & Thumbnails */}
          <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-3 z-20">
            {(currentImage.caption || currentImage.alt || currentImage.title) && (
              <div className="text-center px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 max-w-xl">
                <p className="text-white font-medium text-sm sm:text-base">
                  {currentImage.caption || currentImage.alt || currentImage.title}
                </p>
              </div>
            )}

            {hasMultiple && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "relative h-12 w-16 sm:h-14 sm:w-20 rounded-md overflow-hidden shrink-0 border-2 transition-all cursor-pointer opacity-60 hover:opacity-100",
                      currentIndex === idx
                        ? "border-secondary ring-2 ring-secondary/50 opacity-100 scale-105"
                        : "border-transparent"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || img.caption || `Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
