"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "mariage-detail",
    number: "01",
    title: "Photographie\nde Mariage",
    description:
      "Un reportage complet de votre journée, de la préparation jusqu'aux dernières danses. Chaque émotion, chaque regard, capturés avec subtilité.",
    tags: ["Cérémonie", "Reportage", "Portraits"],
    image: "/images/A7409729.jpg",
    cta: "Découvrir",
  },
  {
    id: "shooting",
    number: "02",
    title: "Shooting\nPhoto",
    description:
      "Séances portraits, branding, lifestyle et couples. Des images soignées qui reflètent votre personnalité et subliment votre identité.",
    tags: ["Portrait", "Branding", "Lifestyle"],
    image: "/images/LOANE 2.jpg",
    cta: "Découvrir",
  },
  {
    id: "magazine-box",
    number: "03",
    title: "Magazine\nBox",
    description:
      "Notre photobooth haut de gamme transforme vos événements en expériences mémorables. Impressions magazine personnalisées pour vos invités.",
    tags: ["Événement", "Location", "Premium"],
    image: "/images/Design rouge 6.png",
    cta: "Découvrir",
  },
];

export default function MarriageHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const lines = header.querySelectorAll(".reveal-line");
    gsap.set(lines, { y: 70, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(lines, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
        });
      },
    });

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, { y: 60, opacity: 0 });
      ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.12,
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mariage"
      className="py-24 md:py-36 bg-[#0D0D0D] overflow-hidden"
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-24">
          <div className="overflow-hidden mb-3">
            <p className="reveal-line text-xs tracking-[0.3em] uppercase text-gold/70">
              02 — Services
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="overflow-hidden">
                <h2 className="reveal-line font-serif italic text-display-lg text-cream leading-none">
                  L&apos;univers
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="reveal-line font-serif italic text-display-lg text-gold leading-none ml-8 md:ml-20">
                  Seno Nguyen
                </h2>
              </div>
            </div>
            <p className="reveal-line text-sm text-cream/40 max-w-xs leading-relaxed font-light">
              Trois expertises au service de vos moments les plus précieux.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative overflow-hidden cursor-none"
              data-cursor-hover
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 transition-opacity duration-500" />

                {/* Number */}
                <div className="absolute top-5 left-5">
                  <span className="font-serif text-6xl text-white/10 font-light leading-none select-none">
                    {service.number}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs tracking-widest uppercase text-gold/60 border border-gold/20 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif italic text-2xl md:text-3xl text-cream leading-tight mb-3 whitespace-pre-line">
                    {service.title}
                  </h3>

                  {/* Description — visible on hover */}
                  <div className="overflow-hidden">
                    <p className="text-sm text-cream/50 leading-relaxed font-light mb-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      {service.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => scrollTo(service.id)}
                    className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-300 group/btn"
                  >
                    {service.cta}
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Separator line */}
        <div className="mt-20 flex items-center gap-6">
          <div className="flex-1 h-px bg-cream/10" />
          <span className="text-xs tracking-[0.3em] uppercase text-cream/20">
            Faites défiler pour explorer
          </span>
          <div className="flex-1 h-px bg-cream/10" />
        </div>
      </div>
    </section>
  );
}
