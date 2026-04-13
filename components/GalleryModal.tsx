"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const allPhotos = [
  { src: "/images/A7409729.jpg",   title: "Cérémonie",       category: "Mariage" },
  { src: "/images/A7409829.jpg",   title: "Les Mariés",      category: "Mariage" },
  { src: "/images/A7409833.jpg",   title: "Instant Précieux",category: "Mariage" },
  { src: "/images/DSC000941.jpg",  title: "Détails",         category: "Mariage" },
  { src: "/images/DSC00096.jpg",   title: "Émotion",         category: "Mariage" },
  { src: "/images/DSC00306.jpg",   title: "Préparatifs",     category: "Mariage" },
  { src: "/images/DSC00341.jpg",   title: "Premier Regard",  category: "Mariage" },
  { src: "/images/LOANE 2.jpg",    title: "Loane",           category: "Portrait" },
  { src: "/images/DSC02022.png",   title: "Soirée",          category: "Événement" },
  { src: "/images/Design rouge 6.png", title: "Magazine Box", category: "Magazine Box" },
];

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Open / close animation
  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(
        overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" }
      );
      const items = content.querySelectorAll(".gallery-item");
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.4 }
      );
    } else {
      gsap.to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          document.body.style.overflow = "";
        },
      });
    }
  }, [isOpen]);

  // Lightbox open/close
  useEffect(() => {
    const lb = lightboxRef.current;
    if (!lb) return;

    if (lightbox !== null) {
      gsap.fromTo(lb, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" });
    }
  }, [lightbox]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, onClose]);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => setLightbox((prev) => (prev !== null ? Math.max(0, prev - 1) : null));
  const nextPhoto = () => setLightbox((prev) => (prev !== null ? Math.min(allPhotos.length - 1, prev + 1) : null));

  return (
    <>
      {/* Main Gallery Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[200] bg-[#080808] flex-col"
        style={{ display: "none", clipPath: "inset(0 0 100% 0)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-cream/10 flex-shrink-0">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-1">Album complet</p>
            <h2 className="font-serif italic text-2xl text-cream">
              Toutes les photos
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-cream/30 tracking-widest">
              {allPhotos.length} photos
            </span>
            <button
              onClick={onClose}
              className="group flex items-center gap-2 px-5 py-2.5 border border-cream/20 hover:border-gold text-xs tracking-widest uppercase text-cream/50 hover:text-gold transition-all duration-300"
              aria-label="Fermer"
            >
              <span>Retour</span>
              <span className="text-lg leading-none group-hover:rotate-90 transition-transform duration-300">×</span>
            </button>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto px-6 md:px-12 py-10"
          data-lenis-prevent
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {allPhotos.map((photo, i) => (
              <div
                key={i}
                className="gallery-item group relative overflow-hidden cursor-none aspect-square"
                data-cursor-hover
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
                  <span className="text-xs tracking-widest uppercase text-gold mb-1">
                    {photo.category}
                  </span>
                  <p className="font-serif italic text-lg text-cream">{photo.title}</p>
                </div>
                {/* Expand icon */}
                <div className="absolute top-3 right-3 w-7 h-7 bg-black/50 border border-cream/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-cream/80 text-xs">⤢</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div
            ref={lightboxRef}
            className="relative w-full h-full flex items-center justify-center p-4 md:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative max-w-5xl max-h-full w-full h-full">
              <Image
                src={allPhotos[lightbox].src}
                alt={allPhotos[lightbox].title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Caption */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="font-serif italic text-cream/80 text-lg">
                {allPhotos[lightbox].title}
              </p>
              <p className="text-xs text-cream/30 tracking-widest mt-1">
                {lightbox + 1} / {allPhotos.length}
              </p>
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 border border-cream/20 hover:border-gold flex items-center justify-center text-cream/50 hover:text-gold transition-all duration-300 text-xl"
              aria-label="Fermer"
            >
              ×
            </button>

            {/* Prev */}
            {lightbox > 0 && (
              <button
                onClick={prevPhoto}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-cream/20 hover:border-gold flex items-center justify-center text-cream/50 hover:text-gold transition-all duration-300"
                aria-label="Photo précédente"
              >
                ←
              </button>
            )}

            {/* Next */}
            {lightbox < allPhotos.length - 1 && (
              <button
                onClick={nextPhoto}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 border border-cream/20 hover:border-gold flex items-center justify-center text-cream/50 hover:text-gold transition-all duration-300"
                aria-label="Photo suivante"
              >
                →
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
