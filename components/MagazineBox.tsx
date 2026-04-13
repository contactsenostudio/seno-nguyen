"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  { icon: "◈", label: "Photo instantanée", desc: "Impressions haute qualité en quelques secondes" },
  { icon: "◉", label: "Livre d'or digital", desc: "Souvenirs numérisés et partagés instantanément" },
  { icon: "◐", label: "Props & décors", desc: "Accessoires soigneusement sélectionnés" },
  { icon: "◑", label: "Personnalisation", desc: "Branding custom pour votre événement" },
];

export default function MagazineBox() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const floatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const box = boxRef.current;
    const features = featuresRef.current;
    const bg = bgRef.current;

    if (!header) return;

    // Background parallax
    if (bg) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(bg, { y: self.progress * 60 - 30 });
        },
      });
    }

    // Header reveal
    const headerLines = header.querySelectorAll(".reveal-line");
    gsap.set(headerLines, { y: 80, opacity: 0 });
    ScrollTrigger.create({
      trigger: header,
      start: "top 75%",
      onEnter: () => {
        gsap.to(headerLines, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.1,
        });
      },
    });

    // Box entrance
    if (box) {
      gsap.set(box, { y: 60, opacity: 0, rotateY: -5 });
      ScrollTrigger.create({
        trigger: box,
        start: "top 75%",
        onEnter: () => {
          gsap.to(box, {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out",
          });
        },
      });
    }

    // Features stagger
    if (features) {
      const featureItems = features.querySelectorAll(".feature-item");
      gsap.set(featureItems, { y: 40, opacity: 0 });
      ScrollTrigger.create({
        trigger: features,
        start: "top 80%",
        onEnter: () => {
          gsap.to(featureItems, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          });
        },
      });
    }

    // Floating elements
    floatRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: -15,
        duration: 2 + i * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
      });
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="magazine-box"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0F0F0D 0%, #141210 50%, #0F0F0D 100%)" }}
    >
      {/* Background texture */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(201, 168, 76, 0.3) 40px,
            rgba(201, 168, 76, 0.3) 41px
          )`,
        }}
      />

      <div className="relative px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <div className="overflow-hidden mb-3">
            <p className="reveal-line text-xs tracking-[0.3em] uppercase text-gold/70">
              04 — Magazine Box
            </p>
          </div>
          <div className="overflow-hidden">
            <h2 className="reveal-line font-serif italic text-display-lg text-cream">
              L&apos;expérience
            </h2>
          </div>
          <div className="overflow-hidden flex items-center gap-6">
            <h2 className="reveal-line font-serif italic text-display-lg text-gold">
              photo booth
            </h2>
            <div className="reveal-line hidden md:block h-px flex-1 bg-gold/20 mt-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Box visual */}
          <div ref={boxRef} className="relative perspective-1000" style={{ perspective: "1000px" }}>
            {/* Main box card */}
            <div className="magazine-card relative rounded-sm overflow-hidden aspect-[3/4] group cursor-none" data-cursor-hover>
              <Image
                src="/images/Design rouge 6.png"
                alt="Magazine Box photo booth"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-px bg-gold" />
                  <span className="text-xs tracking-[0.3em] uppercase text-gold">
                    Premium
                  </span>
                </div>
                <h3 className="font-serif italic text-3xl text-cream mb-2">
                  Magazine Box
                </h3>
                <p className="text-sm text-cream/60">
                  Photobooth haut de gamme pour vos événements
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div
              ref={(el) => { floatRefs.current[0] = el; }}
              className="absolute -top-6 -right-6 md:-right-10 bg-gold text-charcoal px-5 py-4 z-10"
            >
              <p className="text-xs tracking-widest uppercase font-medium">Disponible</p>
              <p className="font-serif text-lg italic">à la location</p>
            </div>

            {/* Floating stat */}
            <div
              ref={(el) => { floatRefs.current[1] = el; }}
              className="absolute -bottom-4 -left-4 md:-left-8 bg-[#1A1A1A] border border-gold/20 px-5 py-4 z-10"
            >
              <p className="font-serif text-3xl text-gold">500+</p>
              <p className="text-xs text-cream/40 tracking-wider mt-1">événements</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-cream/60 text-base leading-relaxed mb-10 font-light max-w-md">
              Sublimez votre événement avec notre photobooth premium. Un concept
              élégant qui transforme chaque instant en souvenir d&apos;exception.
              Vos invités repartent avec une impression magazine personnalisée.
            </p>

            {/* Features */}
            <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {features.map((feature) => (
                <div key={feature.label} className="feature-item group">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl text-gold/60 group-hover:text-gold transition-colors duration-300 mt-0.5">
                      {feature.icon}
                    </span>
                    <div>
                      <h4 className="text-sm font-medium text-cream mb-1">
                        {feature.label}
                      </h4>
                      <p className="text-xs text-cream/40 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing teaser */}
            <div className="border border-gold/20 p-6 mb-8 relative">
              <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs tracking-widest uppercase text-cream/40">
                  À partir de
                </span>
                <span className="text-xs tracking-widest uppercase text-gold/60">
                  Sur devis
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="font-serif text-5xl text-cream font-light">299</span>
                <span className="text-cream/40 mb-2">€ / soirée</span>
              </div>
              <p className="text-xs text-cream/30 mt-1">
                Installation, opérateur & impressions illimitées inclus
              </p>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal text-xs tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
            >
              Louer la box
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
