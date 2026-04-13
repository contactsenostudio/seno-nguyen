"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const blocks = [
  {
    image: "/images/Design rouge 6.png",
    title: "Magazine Box",
    tag: "Location · Animation",
    description:
      "Un photobooth haut de gamme avec impressions magazine personnalisées. Une animation originale et mémorable qui enchante vos invités et crée une atmosphère unique.",
  },
  {
    image: "/images/DSC02022.png",
    title: "Shooting pendant l'événement",
    tag: "Prestation · Shooting",
    description:
      "Un temps dédié pendant votre soirée pour des photos stylées et mémorables avec vos invités. Des portraits spontanés et élégants qui capturent la magie du moment.",
  },
  {
    image: null,
    title: "Album photos instantané",
    tag: "QR Code · Innovation",
    description:
      "Vos invités scannent un QR code et accèdent instantanément à leur galerie photos privée. Un souvenir digital immédiat, partageable et accessible à vie.",
    isQR: true,
  },
];

function QRIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-20 h-20 text-gold"
    >
      <rect x="5" y="5" width="38" height="38" rx="3" stroke="currentColor" strokeWidth="4" />
      <rect x="15" y="15" width="18" height="18" fill="currentColor" />
      <rect x="57" y="5" width="38" height="38" rx="3" stroke="currentColor" strokeWidth="4" />
      <rect x="67" y="15" width="18" height="18" fill="currentColor" />
      <rect x="5" y="57" width="38" height="38" rx="3" stroke="currentColor" strokeWidth="4" />
      <rect x="15" y="67" width="18" height="18" fill="currentColor" />
      <rect x="57" y="57" width="4" height="4" fill="currentColor" />
      <rect x="65" y="57" width="4" height="4" fill="currentColor" />
      <rect x="73" y="57" width="4" height="4" fill="currentColor" />
      <rect x="81" y="57" width="14" height="4" fill="currentColor" />
      <rect x="57" y="65" width="14" height="4" fill="currentColor" />
      <rect x="75" y="65" width="4" height="4" fill="currentColor" />
      <rect x="57" y="73" width="4" height="4" fill="currentColor" />
      <rect x="65" y="73" width="14" height="4" fill="currentColor" />
      <rect x="83" y="73" width="12" height="4" fill="currentColor" />
      <rect x="57" y="81" width="4" height="14" fill="currentColor" />
      <rect x="65" y="85" width="4" height="4" fill="currentColor" />
      <rect x="73" y="81" width="4" height="4" fill="currentColor" />
      <rect x="81" y="81" width="4" height="14" fill="currentColor" />
      <rect x="89" y="81" width="6" height="4" fill="currentColor" />
    </svg>
  );
}

export default function GuestExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;

    if (!section || !header || !cards) return;

    gsap.set(header, { y: 30, opacity: 0 });
    gsap.set(Array.from(cards.children), { y: 50, opacity: 0 });
    if (cta) gsap.set(cta, { y: 20, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      onEnter: () => {
        gsap.to(header, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
        gsap.to(Array.from(cards.children), {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
        });
        if (cta) {
          gsap.to(cta, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.6 });
        }
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
      id="experience"
      className="py-24 md:py-32 bg-charcoal"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-6">
            04 — Une expérience pour tous vos invités
          </p>
          <h2
            className="font-display italic font-light leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
          >
            <span className="block text-cream">Plus qu&apos;un photographe,</span>
            <span className="block text-gold">une expérience complète.</span>
          </h2>
        </div>

        {/* Blocks */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {blocks.map((block, i) => (
            <div
              key={i}
              className="group relative border border-cream/8 hover:border-gold/30 transition-all duration-500 hover:scale-[1.02] overflow-hidden"
            >
              {/* Image / Icon area */}
              <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: "#111111" }}>
                {block.isQR ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-surface">
                    <QRIcon />
                  </div>
                ) : (
                  block.image && (
                    <Image
                      src={block.image}
                      alt={block.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-3">
                  {block.tag}
                </p>
                <h3 className="font-display italic text-xl md:text-2xl text-cream mb-3">
                  {block.title}
                </h3>
                <p className="text-sm text-cream/45 leading-relaxed">
                  {block.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12 text-center">
          <a
            href="#pricing"
            onClick={(e) => { e.preventDefault(); scrollTo("#pricing"); }}
            className="inline-flex items-center gap-3 px-8 py-4 border border-gold/50 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Découvrir les formules
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
