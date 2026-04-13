"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
      </svg>
    ),
    title: "Photo + Vidéo + Animation",
    description: "Une seule équipe pour tout gérer. Cohérence visuelle et organisation simplifiée.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-.125a1.125 1.125 0 0 1 1.125-1.125H15m-12 1.25h.375m11.625-.375v.375m0 0H3.375M15 18.375h3.75m-3.75 0a1.125 1.125 0 0 0 1.125 1.125m2.625-1.125a1.125 1.125 0 0 0-1.125-1.125m0 0h-.375m-12 0h.375m11.25 0h.375M15 13.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    title: "Rendu cinématique",
    description: "Chaque image raconte une histoire. Un style élaboré, émotionnel et intemporel.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    title: "Expérience invités unique",
    description: "Magazine Box + QR code instantané. Vos invités repartent avec un souvenir.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: "Accompagnement complet",
    description: "De la prise de contact jusqu'à la livraison. On vous guide à chaque étape.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: "Disponible partout en France",
    description: "On se déplace pour votre mariage, de Paris à la Provence en passant par Bordeaux.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: "Souvenir à vie",
    description: "Des images et des films que vous allez revivre 20 ans après votre mariage.",
  },
];

export default function WhyMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    gsap.set(header, { y: 30, opacity: 0 });
    gsap.set(Array.from(grid.children), { y: 30, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      onEnter: () => {
        gsap.to(header, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
        gsap.to(Array.from(grid.children), {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.2,
        });
      },
    });

    return () => { st.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why"
      className="py-24 md:py-32 bg-charcoal"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-6">
            07 — Pourquoi nous choisir
          </p>
          <h2
            className="font-display italic font-light leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
          >
            <span className="block text-cream">Une approche</span>
            <span className="block text-gold">différente.</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="group p-6 md:p-8 border border-cream/8 hover:border-gold/25 transition-all duration-400"
            >
              <div className="text-gold/70 mb-5 group-hover:text-gold transition-colors duration-300">
                {reason.icon}
              </div>
              <h3 className="font-display italic text-lg md:text-xl text-cream mb-3">
                {reason.title}
              </h3>
              <p className="text-sm text-cream/40 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
