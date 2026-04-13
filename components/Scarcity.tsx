"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Scarcity() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    gsap.set(content, { y: 30, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 78%",
      onEnter: () => {
        gsap.to(content, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
      },
    });

    return () => { st.kill(); };
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="scarcity"
      className="py-16 md:py-24"
      style={{
        background: "linear-gradient(180deg, #0D0D0D 0%, #080808 100%)",
      }}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <div ref={contentRef}>
          {/* Decorative line */}
          <div className="w-16 h-px bg-gold/40 mx-auto mb-10" />

          {/* Title */}
          <h2
            className="font-display italic font-light text-cream leading-[0.95] mb-6"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)" }}
          >
            Seulement quelques dates disponibles par saison.
          </h2>

          {/* Sub */}
          <p className="text-sm md:text-base text-cream/50 leading-relaxed mb-10 max-w-lg mx-auto">
            Pour garantir une qualité d&apos;accompagnement irréprochable, nous
            limitons le nombre de mariages par an.
          </p>

          {/* CTA */}
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); scrollTo("#booking"); }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-colors duration-300"
          >
            Vérifier les disponibilités
            <span>→</span>
          </a>

          {/* Small text */}
          <p className="mt-6 text-[10px] tracking-[0.25em] uppercase text-cream/25">
            Saison 2025-2026 · Places limitées
          </p>

          {/* Decorative line */}
          <div className="w-16 h-px bg-gold/40 mx-auto mt-10" />
        </div>
      </div>
    </section>
  );
}
