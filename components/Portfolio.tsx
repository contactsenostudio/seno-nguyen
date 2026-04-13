"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import GalleryModal from "@/components/GalleryModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = ["Tous", "Mariage", "Portrait", "Événement"];

const portfolioItems = [
  {
    id: 1,
    category: "Mariage",
    title: "Cérémonie",
    location: "France",
    image: "/images/A7409829.jpg",
    size: "large",
  },
  {
    id: 2,
    category: "Portrait",
    title: "Loane",
    location: "France",
    image: "/images/LOANE 2.jpg",
    size: "small",
  },
  {
    id: 3,
    category: "Mariage",
    title: "Les Mariés",
    location: "France",
    image: "/images/DSC00096.jpg",
    size: "small",
  },
  {
    id: 4,
    category: "Mariage",
    title: "Instant Précieux",
    location: "France",
    image: "/images/A7409833.jpg",
    size: "large",
  },
  {
    id: 5,
    category: "Événement",
    title: "Soirée",
    location: "France",
    image: "/images/DSC02022.png",
    size: "medium",
  },
  {
    id: 6,
    category: "Mariage",
    title: "Préparatifs",
    location: "France",
    image: "/images/DSC00306.jpg",
    size: "medium",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [galleryOpen, setGalleryOpen] = useState(false);

  const filteredItems =
    activeFilter === "Tous"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  useEffect(() => {
    const title = titleRef.current;
    const filters = filtersRef.current;
    const grid = gridRef.current;
    if (!title || !grid) return;

    const titleLines = title.querySelectorAll(".reveal-line");
    gsap.set(titleLines, { y: 80, opacity: 0 });
    if (filters) gsap.set(filters, { y: 20, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(titleLines, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
        });
        if (filters) {
          gsap.to(filters, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.3,
          });
        }
      },
    });
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll(".portfolio-item");
    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-24 md:py-36 px-6 md:px-12 bg-[#0D0D0D]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-8">
          <div ref={titleRef}>
            <div className="overflow-hidden mb-2">
              <p className="reveal-line text-xs tracking-[0.3em] uppercase text-gold/70">
                02 — Portfolio
              </p>
            </div>
            <div className="overflow-hidden">
              <h2 className="reveal-line font-serif italic text-display-md text-cream">
                Mes Travaux
              </h2>
            </div>
          </div>

          {/* Filters */}
          <div ref={filtersRef} className="flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-gold text-charcoal"
                    : "text-cream/40 hover:text-cream border border-transparent hover:border-cream/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5"
        >
          {filteredItems.map((item, index) => {
            const colSpan =
              item.size === "large"
                ? "md:col-span-7"
                : item.size === "medium"
                ? "md:col-span-5"
                : "md:col-span-5";

            const aspectRatio =
              item.size === "large"
                ? "aspect-[3/2]"
                : item.size === "medium"
                ? "aspect-[4/3]"
                : "aspect-square";

            return (
              <div
                key={`${item.id}-${activeFilter}`}
                className={`portfolio-item ${colSpan} ${aspectRatio} relative overflow-hidden group cursor-none`}
                data-cursor-hover
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Overlay */}
                <div className="overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs tracking-widest uppercase text-gold mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-serif italic text-2xl text-cream mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-cream/50 tracking-wider">
                    {item.location}
                  </p>
                </div>

                {/* Border reveal on hover */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* View more */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => setGalleryOpen(true)}
            className="group flex items-center gap-3 px-8 py-4 border border-cream/20 text-xs tracking-widest uppercase text-cream/50 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Voir plus
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>

      <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </section>
  );
}
