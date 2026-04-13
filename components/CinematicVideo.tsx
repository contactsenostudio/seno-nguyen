"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const points = [
  "Drone aérien",
  "Ralentis cinématiques",
  "Musique sur mesure",
  "Montage émotionnel",
];

export default function CinematicVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const content = contentRef.current;
    const videoEl = videoRef.current;

    if (!section || !header || !content || !videoEl) return;

    gsap.set(header, { y: 30, opacity: 0 });
    gsap.set(content, { y: 30, opacity: 0 });
    gsap.set(videoEl, { clipPath: "inset(100% 0% 0% 0%)" });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      onEnter: () => {
        gsap.to(header, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
        gsap.to(content, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15 });
        gsap.to(videoEl, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power4.inOut",
          delay: 0.3,
        });
      },
    });

    return () => { st.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="video"
      className="py-24 md:py-32 bg-charcoal"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div>
            <div ref={headerRef}>
              <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-6">
                02 — Revivez votre mariage comme un film
              </p>
              <h2
                className="font-display italic font-light leading-[0.95] mb-8"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
              >
                <span className="block text-cream">Revivez votre</span>
                <span className="block text-cream">mariage comme</span>
                <span className="block text-gold">un film.</span>
              </h2>
            </div>

            <div ref={contentRef}>
              <p className="text-cream/55 leading-relaxed mb-8 text-sm md:text-base max-w-md">
                Notre approche cinématique transforme chaque moment de votre
                journée en une œuvre émotionnelle. Le résultat : un film de 3 à
                5 minutes que vous regarderez encore et encore, les larmes aux
                yeux.
              </p>

              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {points.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs tracking-wider text-cream/50">
                    <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Video placeholder */}
          <div
            ref={videoRef}
            className="relative aspect-video border border-gold/20 overflow-hidden"
            style={{ backgroundColor: "#111111" }}
          >
            {/* Play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-gold flex items-center justify-center group cursor-pointer hover:bg-gold/10 transition-colors duration-300">
                <div
                  className="w-0 h-0 ml-1"
                  style={{
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "18px solid #C9A84C",
                  }}
                />
              </div>
              <p className="text-xs tracking-[0.25em] uppercase text-cream/30">
                Bande démo bientôt disponible
              </p>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/40" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
