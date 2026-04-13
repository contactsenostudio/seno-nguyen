"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const shootingTypes = [
  {
    title: "Portrait",
    desc: "Des portraits authentiques qui capturent votre personnalité profonde. En studio ou en extérieur, chaque séance est une rencontre unique.",
    image: "/images/LOANE 2.jpg",
  },
  {
    title: "Branding",
    desc: "Des visuels professionnels pour votre marque et votre identité. Photos corporate, headshots, contenus réseaux sociaux.",
    image: "/images/DSC02022.png",
  },
  {
    title: "Couple & Lifestyle",
    desc: "Séances engagement, anniversaire ou simplement pour immortaliser votre histoire. Dans des lieux qui vous ressemblent.",
    image: "/images/DSC00341.jpg",
  },
];

export default function ShootingPhoto() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const grid = gridRef.current;
    const process = processRef.current;
    const cta = ctaRef.current;

    if (!header) return;

    // Header
    const lines = header.querySelectorAll(".reveal-line");
    gsap.set(lines, { y: 80, opacity: 0 });
    ScrollTrigger.create({
      trigger: header,
      start: "top 75%",
      onEnter: () => {
        gsap.to(lines, { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.1 });
      },
    });

    // Grid cards
    if (grid) {
      const cards = grid.querySelectorAll(".shooting-card");
      gsap.set(cards, { y: 50, opacity: 0 });
      ScrollTrigger.create({
        trigger: grid,
        start: "top 78%",
        onEnter: () => {
          gsap.to(cards, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.15 });
        },
      });
    }

    // Process steps
    if (process) {
      const steps = process.querySelectorAll(".process-step");
      gsap.set(steps, { x: -30, opacity: 0 });
      ScrollTrigger.create({
        trigger: process,
        start: "top 80%",
        onEnter: () => {
          gsap.to(steps, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12 });
        },
      });
    }

    // CTA
    if (cta) {
      gsap.set(cta, { y: 30, opacity: 0 });
      ScrollTrigger.create({
        trigger: cta,
        start: "top 85%",
        onEnter: () => {
          gsap.to(cta, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="shooting"
      className="py-24 md:py-36 bg-[#0D0D0D] overflow-hidden"
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-24">
          <div className="overflow-hidden mb-3">
            <p className="reveal-line text-xs tracking-[0.3em] uppercase text-gold/70">
              04 — Shooting Photo
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="overflow-hidden">
                <h2 className="reveal-line font-serif italic text-display-lg text-cream leading-none">
                  Révéler
                </h2>
              </div>
              <div className="overflow-hidden">
                <h2 className="reveal-line font-serif italic text-display-lg text-gold leading-none ml-8 md:ml-20">
                  votre essence
                </h2>
              </div>
            </div>
            <p className="reveal-line text-sm text-cream/40 max-w-xs leading-relaxed font-light">
              Des séances photos sur mesure, pensées pour vous ressembler et raconter votre histoire.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-24">
          {shootingTypes.map((type) => (
            <div
              key={type.title}
              className="shooting-card group relative overflow-hidden cursor-none"
              data-cursor-hover
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif italic text-2xl text-cream mb-3">{type.title}</h3>
                  <p className="text-sm text-cream/50 leading-relaxed font-light opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                    {type.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="overflow-hidden mb-8">
              <h3 className="font-serif italic text-3xl md:text-4xl text-cream">
                Comment ça se passe ?
              </h3>
            </div>
            <div ref={processRef} className="space-y-6">
              {[
                { step: "01", label: "Prise de contact", desc: "On échange sur vos envies, votre style et vos attentes lors d'un appel découverte." },
                { step: "02", label: "Préparation", desc: "Je vous guide sur la tenue, le lieu, et l'ambiance pour un résultat qui vous correspond." },
                { step: "03", label: "La séance", desc: "Une session détendue, naturelle et fun. Je mets tout en œuvre pour vous mettre à l'aise." },
                { step: "04", label: "Livraison", desc: "Vos photos retouchées livrées sous 3 semaines via une galerie privée en ligne." },
              ].map((item) => (
                <div key={item.step} className="process-step flex gap-5 group">
                  <span className="font-serif text-3xl text-gold/20 font-light flex-shrink-0 group-hover:text-gold/50 transition-colors duration-300 leading-none mt-0.5">
                    {item.step}
                  </span>
                  <div className="border-t border-cream/10 pt-4 flex-1 group-hover:border-gold/20 transition-colors duration-300">
                    <h4 className="text-sm font-medium text-cream mb-1">{item.label}</h4>
                    <p className="text-xs text-cream/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tarifs */}
          <div className="space-y-3">
            <p className="text-xs tracking-[0.3em] uppercase text-cream/30 mb-6">Tarifs indicatifs</p>
            {[
              { label: "Séance Portrait", duration: "1h", price: "à partir de 150€" },
              { label: "Séance Couple", duration: "1h30", price: "à partir de 200€" },
              { label: "Séance Branding", duration: "2h", price: "à partir de 280€" },
              { label: "Séance Lifestyle", duration: "2h+", price: "sur devis" },
            ].map((tarif) => (
              <div
                key={tarif.label}
                className="flex items-center justify-between py-4 border-b border-cream/8 group hover:border-gold/20 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors duration-300" />
                  <span className="text-sm text-cream/70">{tarif.label}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-xs text-cream/30">{tarif.duration}</span>
                  <span className="text-sm text-gold font-light">{tarif.price}</span>
                </div>
              </div>
            ))}
            <p className="text-xs text-cream/25 mt-4 font-light">
              * Déplacement inclus dans un rayon de 30km. Au-delà, forfait kilométrique.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 px-10 py-5 bg-gold text-charcoal text-xs tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
          >
            Réserver une séance
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs tracking-widest uppercase text-cream/40 hover:text-cream border-b border-cream/20 pb-0.5 transition-colors duration-300"
          >
            Voir le portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
