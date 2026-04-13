"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    number: "01",
    title: "Reportage Photo",
    subtitle: "Mariage",
    description:
      "Depuis les préparatifs jusqu'aux dernières danses, je capture chaque moment avec discrétion et sensibilité. Mon approche documentaire mêlée à une esthétique cinématique produit des images intemporelles qui racontent votre histoire.",
    includes: [
      "Couverture complète de la journée (préparatifs → soirée)",
      "300+ photos retouchées avec soin",
      "Galerie privée en ligne sécurisée",
      "Livraison sous 4 semaines",
      "Droit d'impression inclus",
    ],
    image: "/images/A7409729.jpg",
    imageAlt: "Reportage photo mariage",
    tag: "Photo",
  },
  {
    number: "02",
    title: "Film Cinématique",
    subtitle: "Vidéo",
    description:
      "Bien plus qu'une simple captation vidéo, je réalise un vrai court-métrage de votre mariage. Chaque plan est pensé, chaque coupe est rythmée. Le résultat : un film de 3 à 5 minutes que vous allez regarder encore et encore.",
    includes: [
      "Film principal 3-5 minutes",
      "Teaser 60 secondes (format réseaux sociaux)",
      "Captation son : vœux, discours, ambiances",
      "Bande-son licenciée",
      "Livraison sous 6 semaines",
    ],
    image: "/images/A7409833.jpg",
    imageAlt: "Film cinématique mariage",
    tag: "Vidéo",
    reverse: true,
  },
  {
    number: "03",
    title: "Magazine Box",
    subtitle: "Animation · Location",
    description:
      "Un photobooth haut de gamme qui transforme l'ambiance de votre soirée. Vos invités se photographient et repartent avec des impressions format magazine personnalisées à votre image. Une animation originale et mémorable.",
    includes: [
      "Cabine premium installée sur place",
      "Impressions illimitées format magazine",
      "Personnalisation aux couleurs du mariage",
      "Animateur dédié inclus",
      "Galerie numérique de toutes les photos",
    ],
    image: "/images/Design rouge 6.png",
    imageAlt: "Magazine Box photobooth",
    tag: "Animation",
  },
  {
    number: "04",
    title: "Album QR Code",
    subtitle: "Innovation · Invités",
    description:
      "Vos invités scannent un QR code pendant ou après la soirée et accèdent instantanément à leur galerie photos privée. Un souvenir digital immédiat, partageable et accessible à vie. L'expérience invités réinventée.",
    includes: [
      "QR code personnalisé à votre mariage",
      "Galerie en ligne accessible à vie",
      "Photos téléchargeables en haute résolution",
      "Partage illimité entre invités",
      "Mise en ligne sous 48h après l'événement",
    ],
    image: null,
    imageAlt: "Album QR Code mariage",
    tag: "Digital",
    reverse: true,
    isQR: true,
  },
  {
    number: "05",
    title: "Shooting Engagement",
    subtitle: "Photo · Avant mariage",
    description:
      "Une séance photo en amoureux avant votre grand jour. On apprend à se connaître, vous vous sentez à l'aise devant l'objectif, et on crée des images magnifiques qui racontent déjà votre histoire.",
    includes: [
      "1h30 à 2h de shooting en extérieur",
      "Lieu au choix (Paris, Provence, etc.)",
      "50+ photos retouchées",
      "Livraison sous 3 semaines",
      "Idéal pour personnaliser faire-parts et site",
    ],
    image: "/images/A7409829.jpg",
    imageAlt: "Shooting engagement couple",
    tag: "Photo",
  },
  {
    number: "06",
    title: "Drone Cinématique",
    subtitle: "Aérien · Vidéo",
    description:
      "Des plans aériens époustouflants qui donnent une dimension cinématique à votre film. Le domaine, les jardins, les invités vus du ciel — des images qui donnent l'ampleur que mérite votre journée.",
    includes: [
      "Pilote drone certifié",
      "Séquences aériennes HD 4K",
      "Plans de lieu, de cérémonies, cocktail",
      "Intégration dans le film cinématique",
      "Autorisation de vol incluse",
    ],
    image: "/images/DSC00306.jpg",
    imageAlt: "Drone cinématique mariage",
    tag: "Aérien",
    reverse: true,
  },
];

const packs = [
  {
    name: "Essentiel",
    services: ["Reportage Photo"],
    cta: "Demander un devis",
  },
  {
    name: "Expérience",
    services: ["Reportage Photo", "Film Cinématique", "Magazine Box", "Album QR Code"],
    highlight: true,
    cta: "Réserver ce pack",
  },
  {
    name: "Premium",
    services: ["Tout le pack Expérience", "Shooting Engagement", "Drone Cinématique", "2 vidéastes"],
    cta: "Nous contacter",
  },
];

function QRVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D]">
      <div className="flex flex-col items-center gap-6">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-gold">
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
        <p className="text-xs tracking-[0.3em] uppercase text-gold/50">Scan &amp; accès instantané</p>
      </div>
    </div>
  );
}

function ServiceBlock({ service, index }: { service: typeof services[0]; index: number }) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    gsap.set(el, { y: 50, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
      },
    });
    return () => { st.kill(); };
  }, []);

  return (
    <div ref={blockRef} className="border-t border-cream/10 py-16 md:py-24">
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${service.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0D0D0D]">
          {service.isQR ? (
            <QRVisual />
          ) : service.image ? (
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : null}
          {/* Number overlay */}
          <div className="absolute top-4 left-4">
            <span className="text-xs tracking-[0.3em] text-gold/60 font-mono">{service.number}</span>
          </div>
          {/* Tag */}
          <div className="absolute bottom-4 right-4">
            <span className="px-3 py-1 border border-gold/30 text-gold text-[10px] tracking-[0.25em] uppercase">
              {service.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-gold/60 mb-3">
              {service.subtitle}
            </p>
            <h2
              className="font-display italic font-light text-cream leading-[0.95] mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {service.title}
            </h2>
            <p className="text-sm text-cream/50 leading-relaxed max-w-md">
              {service.description}
            </p>
          </div>

          {/* Includes */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-cream/30 mb-4">Ce qui est inclus</p>
            <ul className="flex flex-col gap-2.5">
              {service.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-cream/60">
                  <span className="text-gold mt-0.5 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/#booking"
            className="self-start inline-flex items-center gap-3 px-6 py-3 border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-300 mt-2"
          >
            Demander un devis
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const packsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    gsap.set(Array.from(hero.children), { y: 30, opacity: 0 });
    gsap.to(Array.from(hero.children), {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.3,
    });
  }, []);

  useEffect(() => {
    const packs = packsRef.current;
    if (!packs) return;
    gsap.set(Array.from(packs.children), { y: 40, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: packs,
      start: "top 80%",
      onEnter: () => {
        gsap.to(Array.from(packs.children), {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
        });
      },
    });
    return () => { st.kill(); };
  }, []);

  return (
    <main className="min-h-screen bg-[#080808]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[500] backdrop-blur-md bg-black/40 border-b border-cream/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <Link
            href="/"
            className="font-display italic text-xl md:text-2xl text-cream tracking-wide hover:text-gold transition-colors duration-300"
          >
            Seno Nguyen
          </Link>
          <Link
            href="/#booking"
            className="hidden md:inline-flex items-center px-5 py-2.5 border border-gold/70 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            Réserver un appel
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div ref={heroRef}>
          <p className="text-xs tracking-[0.35em] uppercase text-gold/60 mb-6">
            Nos prestations
          </p>
          <h1
            className="font-display italic font-light text-cream leading-[0.9] mb-8"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            <span className="block">Chaque service,</span>
            <span className="block text-gold">pensé pour vous.</span>
          </h1>
          <p className="text-sm md:text-base text-cream/50 max-w-lg leading-relaxed">
            Photo, vidéo, animation invités — tout ce dont vous avez besoin pour que votre mariage soit inoubliable, réuni en une seule équipe cohérente.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto">
        {services.map((service, i) => (
          <ServiceBlock key={i} service={service} index={i} />
        ))}
      </section>

      {/* Packs */}
      <section className="py-24 md:py-32 px-6 md:px-12" style={{ background: "linear-gradient(180deg, #080808 0%, #0D0D0D 100%)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-6">Formules</p>
            <h2
              className="font-display italic font-light text-cream leading-[0.95]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            >
              <span className="block">Combinez les services</span>
              <span className="block text-gold">en formule.</span>
            </h2>
          </div>

          <div ref={packsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {packs.map((pack, i) => (
              <div
                key={i}
                className={`relative flex flex-col p-8 md:p-10 border transition-all duration-500 hover:border-gold/40 ${
                  pack.highlight
                    ? "border-gold/50 bg-[#1A1507]"
                    : "border-cream/10 bg-[#111111]"
                }`}
              >
                {pack.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gold text-charcoal text-[10px] tracking-[0.2em] uppercase font-medium whitespace-nowrap">
                      Le plus populaire
                    </span>
                  </div>
                )}
                <h3 className="font-display italic text-2xl text-cream mb-6">{pack.name}</h3>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {pack.services.map((s, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-cream/60">
                      <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#booking"
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                    pack.highlight
                      ? "bg-gold text-charcoal hover:opacity-90 font-medium"
                      : "border border-gold/50 text-gold hover:bg-gold hover:text-charcoal"
                  }`}
                >
                  {pack.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6 md:px-12 border-t border-cream/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="font-display italic text-2xl md:text-3xl text-cream mb-2">
              Prêts à créer quelque chose d&apos;inoubliable ?
            </h3>
            <p className="text-sm text-cream/40">On réserve un appel pour discuter de votre projet.</p>
          </div>
          <Link
            href="/#booking"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-opacity duration-300"
          >
            Réserver un appel
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
