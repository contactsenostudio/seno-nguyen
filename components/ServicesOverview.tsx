"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "photo",
    number: "01",
    title: "Reportage Photo",
    description: "Couverture complète de votre journée, des préparatifs aux dernières danses. 300+ photos retouchées livrées dans une galerie privée.",
    image: "/images/A7409829.jpg",
    tag: "Photo",
  },
  {
    id: "video",
    number: "02",
    title: "Film Cinématique",
    description: "Un vrai court-métrage de votre mariage. 3 à 5 minutes d'émotions pures, montées comme un film, avec une bande-son sur mesure.",
    image: "/images/A7409833.jpg",
    tag: "Vidéo",
  },
  {
    id: "magazine-box",
    number: "03",
    title: "Magazine Box",
    description: "Un photobooth haut de gamme qui imprime vos photos au format magazine. Vos invités repartent avec un souvenir physique unique.",
    image: "/images/Design rouge 6.png",
    tag: "Animation",
  },
  {
    id: "qr-code",
    number: "04",
    title: "Album QR Code",
    description: "Vos invités scannent un QR code et accèdent instantanément à leur galerie photos. Un souvenir digital accessible à vie.",
    image: "/images/DSC02022.png",
    tag: "Digital",
  },
  {
    id: "engagement",
    number: "05",
    title: "Shooting Engagement",
    description: "Une séance photo en amoureux avant le mariage. On apprend à se connaître, vous êtes à l'aise le jour J, et on crée de belles images.",
    image: "/images/LOANE 2.jpg",
    tag: "Photo",
  },
  {
    id: "drone",
    number: "06",
    title: "Drone Cinématique",
    description: "Des plans aériens 4K qui donnent une dimension épique à votre film. Le domaine, les jardins, les moments vus du ciel.",
    image: "/images/DSC00306.jpg",
    tag: "Aérien",
  },
];

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!section || !header || !grid) return;

    gsap.set(header, { y: 25, opacity: 0 });
    gsap.set(Array.from(grid.children), { y: 40, opacity: 0 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 80%",
      onEnter: () => {
        gsap.to(header, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
        gsap.to(Array.from(grid.children), {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.2,
        });
      },
    });

    return () => { st.kill(); };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 md:py-28 bg-[#080808]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-gold/60 mb-4">Ce que je propose</p>
            <h2
              className="font-display italic font-light text-cream leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)" }}
            >
              <span className="block">6 prestations,</span>
              <span className="block text-gold">une seule équipe.</span>
            </h2>
          </div>
          <Link
            href="/offres"
            className="self-start md:self-auto flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-gold/50 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Voir toutes les offres
            <span>→</span>
          </Link>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/offres#${service.id}`}
              className="group relative overflow-hidden border border-cream/8 hover:border-gold/30 transition-all duration-500 block"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                {/* Tag */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-black/60 text-gold text-[10px] tracking-[0.2em] uppercase border border-gold/20">
                    {service.tag}
                  </span>
                </div>
                {/* Number */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] text-cream/40 font-mono tracking-widest">{service.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h3 className="font-display italic text-lg md:text-xl text-cream mb-2 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-xs text-cream/45 leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-gold/60 group-hover:text-gold transition-colors duration-300">
                  <span className="text-[10px] tracking-[0.2em] uppercase">En savoir plus</span>
                  <span className="text-xs group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
