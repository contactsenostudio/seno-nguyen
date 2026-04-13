"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote:
      "Seno a su capturer chaque émotion de notre mariage avec une sensibilité extraordinaire. Nos photos sont comme un film — elles racontent exactement notre histoire.",
    author: "Emma & Lucas Moreau",
    event: "Mariage • Provence 2024",
    rating: 5,
  },
  {
    quote:
      "Un professionnel d'exception. Il se fait oublier pendant l'événement mais les résultats sont absolument magiques. Je recommande sans hésitation.",
    author: "Claire Dubois",
    event: "Portrait Branding • Paris 2024",
    rating: 5,
  },
  {
    quote:
      "La Magazine Box a été la star de notre soirée ! Nos invités sont encore impressionnés par la qualité des impressions. Merci Seno pour cette touche de luxe.",
    author: "Antoine & Sophie Laurent",
    event: "Magazine Box • Gala Annuel 2024",
    rating: 5,
  },
  {
    quote:
      "Des photos qui dépassent toutes nos attentes. Seno possède un vrai talent pour sublimer les moments simples et en faire des souvenirs inoubliables.",
    author: "Marie & Pierre Fontaine",
    event: "Mariage • Côte d'Azur 2023",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const lines = header.querySelectorAll(".reveal-line");
    gsap.set(lines, { y: 60, opacity: 0 });

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

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    gsap.to(track, {
      x: `-${index * 100}%`,
      duration: 0.8,
      ease: "power3.inOut",
    });
    setCurrent(index);
  };

  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(testimonials.length - 1, current + 1));

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-24 md:py-36 bg-[#0F0F0D] overflow-hidden"
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="overflow-hidden mb-3">
              <p className="reveal-line text-xs tracking-[0.3em] uppercase text-gold/70">
                06 — Témoignages
              </p>
            </div>
            <div className="overflow-hidden">
              <h2 className="reveal-line font-serif italic text-display-md text-cream">
                Ce qu&apos;ils disent
              </h2>
            </div>
          </div>

          {/* Navigation */}
          <div className="reveal-line flex items-center gap-4">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/50 hover:border-gold hover:text-gold disabled:opacity-20 transition-all duration-300"
              aria-label="Précédent"
            >
              ←
            </button>
            <span className="text-xs text-cream/30 tracking-widest">
              {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <button
              onClick={next}
              disabled={current === testimonials.length - 1}
              className="w-12 h-12 border border-cream/20 flex items-center justify-center text-cream/50 hover:border-gold hover:text-gold disabled:opacity-20 transition-all duration-300"
              aria-label="Suivant"
            >
              →
            </button>
          </div>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex"
            style={{ width: `${testimonials.length * 100}%` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div className="pr-0 md:pr-24">
                  {/* Stars */}
                  <div className="flex gap-1 mb-8">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-gold text-sm">★</span>
                    ))}
                  </div>

                  {/* Quote mark */}
                  <div className="font-serif text-8xl text-gold/10 leading-none mb-0 -mb-8 select-none">
                    "
                  </div>

                  <blockquote className="font-serif italic text-xl md:text-2xl lg:text-3xl text-cream/80 leading-relaxed mb-10 relative">
                    {t.quote}
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-8 h-px bg-gold/40" />
                    <div>
                      <p className="text-sm font-medium text-cream">{t.author}</p>
                      <p className="text-xs text-cream/40 tracking-wide mt-0.5">{t.event}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-px transition-all duration-300 ${
                i === current ? "w-8 bg-gold" : "w-4 bg-cream/20 hover:bg-cream/40"
              }`}
              aria-label={`Témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
