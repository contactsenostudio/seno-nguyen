"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const offres = [
  {
    id: "photo",
    number: "01",
    tag: "Photo",
    title: "Reportage Photo",
    subtitle: "La couverture complète de votre journée",
    description:
      "Depuis les préparatifs jusqu'aux dernières danses, je capture chaque moment avec discrétion et sensibilité. Mon œil cinématique produit des images émotionnelles et intemporelles qui racontent votre histoire comme elle mérite de l'être.",
    includes: [
      "Couverture complète — préparatifs jusqu'à la soirée",
      "300+ photos retouchées avec soin",
      "Galerie privée en ligne sécurisée",
      "Téléchargement haute résolution inclus",
      "Droit d'impression inclus",
      "Livraison sous 4 semaines",
    ],
    image: "/images/A7409729.jpg",
  },
  {
    id: "video",
    number: "02",
    tag: "Vidéo",
    title: "Film Cinématique",
    subtitle: "Revivez votre mariage comme un film",
    description:
      "Ce n'est pas une simple captation vidéo. C'est un vrai court-métrage de votre journée — chaque plan pensé, chaque coupe rythmée, une bande-son qui vous donne des frissons. Le résultat : un film de 3 à 5 minutes que vous regarderez pendant des années.",
    includes: [
      "Film principal 3-5 minutes",
      "Teaser 60 secondes (format réseaux sociaux)",
      "Captation des vœux, discours et ambiances",
      "Bande-son licenciée sur mesure",
      "Ralentis cinématiques",
      "Livraison sous 6 semaines",
    ],
    image: "/images/A7409833.jpg",
    reverse: true,
  },
  {
    id: "magazine-box",
    number: "03",
    tag: "Animation",
    title: "Magazine Box",
    subtitle: "L'animation qui marque les esprits",
    description:
      "Un photobooth haut de gamme qui transforme la soirée. Vos invités se photographient et repartent avec des impressions format magazine personnalisées à votre image. Une animation originale, élégante et mémorable — les invités en parlent encore après.",
    includes: [
      "Cabine premium installée et configurée sur place",
      "Impressions format magazine personnalisées",
      "Thème graphique aux couleurs de votre mariage",
      "Animateur dédié inclus pendant toute la soirée",
      "Galerie numérique de toutes les photos",
      "Impressions illimitées",
    ],
    image: "/images/Design rouge 6.png",
  },
  {
    id: "qr-code",
    number: "04",
    tag: "Digital",
    title: "Album QR Code",
    subtitle: "Les souvenirs de vos invités, instantanément",
    description:
      "Vos invités scannent un QR code pendant ou après la soirée et accèdent instantanément à leur galerie photos privée. Pas d'attente, pas d'application à installer. Un souvenir digital immédiat, partageable et accessible à vie.",
    includes: [
      "QR code personnalisé à votre mariage",
      "Galerie en ligne sécurisée et accessible à vie",
      "Photos téléchargeables en haute résolution",
      "Partage illimité entre invités",
      "Compatible tous appareils (iPhone, Android)",
      "Mise en ligne sous 48h après l'événement",
    ],
    image: "/images/DSC02022.png",
    reverse: true,
    isQR: true,
  },
  {
    id: "engagement",
    number: "05",
    tag: "Photo",
    title: "Shooting Engagement",
    subtitle: "Une séance photo avant votre grand jour",
    description:
      "On se retrouve en amont du mariage pour une séance photo en amoureux. L'objectif : qu'on apprenne à se connaître, que vous soyez complètement à l'aise devant mon objectif — et qu'on crée des images magnifiques que vous pourrez garder à vie.",
    includes: [
      "1h30 à 2h de shooting en extérieur",
      "Lieu de votre choix (Paris, Provence, Côte d'Azur...)",
      "50+ photos retouchées",
      "Livraison sous 3 semaines",
      "Idéal pour faire-parts et site de mariage",
      "Disponible partout en France",
    ],
    image: "/images/LOANE 2.jpg",
  },
  {
    id: "drone",
    number: "06",
    tag: "Aérien",
    title: "Drone Cinématique",
    subtitle: "Votre mariage vu du ciel",
    description:
      "Des plans aériens époustouflants qui donnent une dimension cinématique à votre film. Le domaine, les jardins, la cérémonie, le cocktail vus du ciel — des images grand format qui vous donnent la mesure de ce qu'était votre journée.",
    includes: [
      "Pilote certifié DGAC",
      "Séquences aériennes 4K",
      "Plans du lieu, cérémonie, cocktail",
      "Intégration dans le film cinématique",
      "Autorisation de vol gérée",
      "Disponible selon zones autorisées",
    ],
    image: "/images/DSC00306.jpg",
    reverse: true,
  },
];

const packs = [
  {
    name: "Essentiel",
    tagline: "La photo, l'essentiel",
    services: ["Reportage Photo mariage complet", "300+ photos retouchées", "Galerie privée en ligne", "Livraison sous 4 semaines"],
    cta: "Demander un devis",
    featured: false,
  },
  {
    name: "Expérience",
    tagline: "Photo + Vidéo + Animation invités",
    services: ["Tout le pack Essentiel", "Film cinématique 3-5 min", "Magazine Box incluse", "Album QR Code pour vos invités"],
    cta: "Réserver ce pack",
    featured: true,
  },
  {
    name: "Premium",
    tagline: "L'expérience complète",
    services: ["Tout le pack Expérience", "Shooting engagement", "Drone cinématique 4K", "2 vidéastes sur place"],
    cta: "Nous contacter",
    featured: false,
  },
];

function QRVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D]">
      <div className="flex flex-col items-center gap-5">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gold">
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
          <rect x="57" y="73" width="4" height="4" fill="currentColor" />
          <rect x="65" y="73" width="14" height="4" fill="currentColor" />
          <rect x="57" y="81" width="4" height="14" fill="currentColor" />
          <rect x="81" y="81" width="4" height="14" fill="currentColor" />
        </svg>
        <p className="text-[10px] tracking-[0.3em] uppercase text-gold/50">Scan &amp; accès instantané</p>
      </div>
    </div>
  );
}

function OffreBlock({ offre }: { offre: typeof offres[0] }) {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    gsap.set(el, { y: 40, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      onEnter: () => {
        gsap.to(el, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
      },
    });
    return () => { st.kill(); };
  }, []);

  return (
    <div id={offre.id} ref={blockRef} className="border-t border-cream/8 py-16 md:py-24 scroll-mt-24">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center ${offre.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0D0D0D]">
          {offre.isQR ? (
            <QRVisual />
          ) : (
            <Image
              src={offre.image}
              alt={offre.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="font-mono text-[10px] text-cream/30 tracking-widest">{offre.number}</span>
          </div>
          <div className="absolute bottom-4 right-4">
            <span className="px-3 py-1 border border-gold/30 text-gold text-[10px] tracking-[0.25em] uppercase bg-black/40">
              {offre.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-3">{offre.subtitle}</p>
            <h2
              className="font-display italic font-light text-cream leading-[0.93] mb-4"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
            >
              {offre.title}
            </h2>
            <p className="text-sm text-cream/50 leading-relaxed max-w-[480px]">
              {offre.description}
            </p>
          </div>

          {/* Includes */}
          <div className="border-t border-cream/8 pt-5">
            <p className="text-[10px] tracking-[0.35em] uppercase text-cream/25 mb-4">Inclus dans cette prestation</p>
            <ul className="flex flex-col gap-2.5">
              {offre.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-cream/60">
                  <span className="text-gold mt-0.5 flex-shrink-0 text-base leading-none">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/#booking"
            className="self-start inline-flex items-center gap-3 px-6 py-3.5 border border-gold/40 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-300 mt-1"
          >
            Demander un devis
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OffresPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const packsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    gsap.set(Array.from(hero.children), { y: 25, opacity: 0 });
    gsap.to(Array.from(hero.children), {
      y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.15, delay: 0.2,
    });
  }, []);

  useEffect(() => {
    const packs = packsRef.current;
    if (!packs) return;
    gsap.set(Array.from(packs.children), { y: 35, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: packs,
      start: "top 80%",
      onEnter: () => {
        gsap.to(Array.from(packs.children), {
          y: 0, opacity: 1, duration: 0.85, ease: "power3.out", stagger: 0.12,
        });
      },
    });
    return () => { st.kill(); };
  }, []);

  return (
    <main className="min-h-screen bg-[#080808]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[500] backdrop-blur-md bg-black/50 border-b border-cream/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <Link href="/" className="font-display italic text-xl md:text-2xl text-cream hover:text-gold transition-colors duration-300">
            Seno Nguyen
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hidden md:block text-xs tracking-[0.2em] uppercase text-cream/40 hover:text-cream transition-colors duration-300">
              ← Accueil
            </Link>
            <Link
              href="/#booking"
              className="inline-flex items-center px-5 py-2.5 border border-gold/70 text-gold text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-300"
            >
              Réserver un appel
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-8 md:pt-44 md:pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div ref={heroRef}>
          <p className="text-xs tracking-[0.4em] uppercase text-gold/60 mb-5">Mes offres</p>
          <h1
            className="font-display italic font-light text-cream leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            <span className="block">Tout ce que</span>
            <span className="block text-gold">je propose.</span>
          </h1>
          <p className="text-sm md:text-base text-cream/50 max-w-xl leading-relaxed">
            6 prestations distinctes. Choisissez celles qui correspondent à votre vision — ou combinez-les dans une formule complète. Tout est disponible sur devis, selon votre lieu et votre date.
          </p>
        </div>

        {/* Quick nav */}
        <div className="flex flex-wrap gap-3 mt-10">
          {offres.map((o) => (
            <a
              key={o.id}
              href={`#${o.id}`}
              className="px-3 py-2 border border-cream/10 text-cream/40 text-[11px] tracking-widest hover:border-gold/40 hover:text-gold transition-all duration-300"
            >
              {o.number} {o.title}
            </a>
          ))}
        </div>
      </section>

      {/* Offres */}
      <section className="px-6 md:px-12 max-w-[1400px] mx-auto">
        {offres.map((offre) => (
          <OffreBlock key={offre.id} offre={offre} />
        ))}
      </section>

      {/* Packs */}
      <section className="py-20 md:py-28 px-6 md:px-12 mt-8" style={{ background: "linear-gradient(180deg, #080808 0%, #0D0D0D 100%)" }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-xs tracking-[0.35em] uppercase text-gold/60 mb-5">Formules combinées</p>
            <h2
              className="font-display italic font-light text-cream leading-[0.95]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)" }}
            >
              <span className="block">Tout regroupé</span>
              <span className="block text-gold">en une formule.</span>
            </h2>
            <p className="text-sm text-cream/40 mt-4 max-w-md">
              Plus simple de tout gérer avec une seule équipe. Tous les tarifs sont sur devis selon votre lieu et votre date.
            </p>
          </div>

          <div ref={packsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
            {packs.map((pack, i) => (
              <div
                key={i}
                className={`relative flex flex-col p-8 md:p-10 border transition-all duration-500 hover:border-gold/40 ${
                  pack.featured ? "border-gold/50 bg-[#1A1507]" : "border-cream/10 bg-[#111111]"
                }`}
              >
                {pack.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gold text-charcoal text-[10px] tracking-[0.2em] uppercase font-medium whitespace-nowrap">
                      Le plus populaire
                    </span>
                  </div>
                )}
                <p className="text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-3">{pack.tagline}</p>
                <h3 className="font-display italic text-2xl md:text-3xl text-cream mb-6">{pack.name}</h3>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {pack.services.map((s, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-cream/60">
                      <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-cream/8 pt-6">
                  <p className="text-xs text-cream/30 mb-4">Tarif sur devis · Disponible partout en France</p>
                  <Link
                    href="/#booking"
                    className={`inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                      pack.featured
                        ? "bg-gold text-charcoal hover:opacity-90 font-medium"
                        : "border border-gold/50 text-gold hover:bg-gold hover:text-charcoal"
                    }`}
                  >
                    {pack.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6 md:px-12 border-t border-cream/8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="font-display italic text-2xl md:text-3xl text-cream mb-2">
              Une question sur une prestation ?
            </h3>
            <p className="text-sm text-cream/40">30 minutes d&apos;appel gratuit pour tout clarifier.</p>
          </div>
          <Link
            href="/#booking"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-medium hover:opacity-90 transition-opacity duration-300"
          >
            Réserver un appel gratuit
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
