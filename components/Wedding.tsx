"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Toutes les photos, certaines répétées pour allonger la bande
const weddingImages = [
  { src: "/images/A7409729.jpg",      caption: "L'échange des vœux",    w: 320, h: 420, mt: 0   },
  { src: "/images/A7409829.jpg",      caption: "Les Mariés",            w: 260, h: 340, mt: 80  },
  { src: "/images/DSC00341.jpg",      caption: "Premier regard",        w: 380, h: 460, mt: 20  },
  { src: "/images/A7409833.jpg",      caption: "Instant précieux",      w: 280, h: 360, mt: 120 },
  { src: "/images/DSC000941.jpg",     caption: "Les détails précieux",  w: 340, h: 440, mt: 40  },
  { src: "/images/DSC00306.jpg",      caption: "Préparatifs",           w: 250, h: 320, mt: 100 },
  { src: "/images/DSC00096.jpg",      caption: "Émotion pure",          w: 360, h: 450, mt: 10  },
  { src: "/images/DSC02022.png",      caption: "Soirée",                w: 270, h: 350, mt: 90  },
  { src: "/images/LOANE 2.jpg",       caption: "Portrait",              w: 300, h: 400, mt: 30  },
  { src: "/images/A7409729.jpg",      caption: "La cérémonie",          w: 350, h: 430, mt: 60  },
  { src: "/images/DSC00341.jpg",      caption: "Regards complices",     w: 260, h: 340, mt: 110 },
  { src: "/images/A7409829.jpg",      caption: "Un jour unique",        w: 330, h: 420, mt: 20  },
];

export default function Wedding() {
  const sectionRef  = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const storyRef    = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky  = stickyRef.current;
    const track   = trackRef.current;
    const header  = headerRef.current;
    const story   = storyRef.current;
    const stats   = statsRef.current;

    if (!section || !sticky || !track || !header) return;

    // ── Header reveal ──────────────────────────────────
    const headerLines = header.querySelectorAll(".reveal-line");
    gsap.set(headerLines, { y: 80, opacity: 0 });
    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        gsap.to(headerLines, {
          y: 0, opacity: 1, duration: 1.1,
          ease: "power3.out", stagger: 0.12,
        });
      },
    });

    // ── Story text ─────────────────────────────────────
    if (story) {
      const paras = story.querySelectorAll("p");
      gsap.set(paras, { y: 30, opacity: 0 });
      ScrollTrigger.create({
        trigger: story,
        start: "top 75%",
        onEnter: () => {
          gsap.to(paras, {
            y: 0, opacity: 1, duration: 0.9,
            ease: "power3.out", stagger: 0.15,
          });
        },
      });
    }

    // ── Horizontal scroll on scroll ───────────────────
    // La section est haute (définie en inline style).
    // Le sticky wrapper reste collé en haut pendant qu'on scrolle.
    // On calcule la distance de déplacement horizontal.

    const updateScroll = () => {
      const trackWidth  = track.scrollWidth;
      const viewWidth   = window.innerWidth;
      const scrollDist  = trackWidth - viewWidth + 120;

      ScrollTrigger.create({
        id: "h-scroll",
        trigger: section,
        start: "top top",
        end: () => `+=${scrollDist}`,
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.set(track, { x: -scrollDist * self.progress });
        },
      });
    };

    // Wait for images to load so scrollWidth is accurate
    const timer = setTimeout(updateScroll, 200);

    // ── Stats counter ──────────────────────────────────
    if (stats) {
      const numbers = stats.querySelectorAll(".stat-number");
      ScrollTrigger.create({
        trigger: stats,
        start: "top 80%",
        onEnter: () => {
          numbers.forEach((numEl) => {
            const target = parseInt(numEl.getAttribute("data-value") || "0");
            gsap.fromTo(
              numEl,
              { textContent: "0" },
              {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function () {
                  (numEl as HTMLElement).textContent = Math.ceil(
                    parseFloat((numEl as HTMLElement).textContent || "0")
                  ).toString();
                },
              }
            );
          });
        },
      });
    }

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getById("h-scroll")?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mariage"
      className="bg-[#0F0F0D]"
      // Hauteur = hauteur de la fenêtre + distance de scroll horizontal
      style={{ height: "400vh" }}
    >
      {/* Sticky wrapper — reste collé en haut pendant le scroll horizontal */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 md:px-12 pt-20 md:pt-28 pb-10 flex-shrink-0">
          <div ref={headerRef}>
            <div className="overflow-hidden mb-2">
              <p className="reveal-line text-xs tracking-[0.3em] uppercase text-gold/70">
                03 — Mariage
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="overflow-hidden">
                  <h2 className="reveal-line font-serif italic text-display-lg text-cream leading-none">
                    L&apos;art de raconter
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <h2 className="reveal-line font-serif italic text-display-lg text-gold leading-none ml-6 md:ml-16">
                    votre jour
                  </h2>
                </div>
              </div>
              <div ref={storyRef} className="max-w-xs">
                <p className="text-cream/50 text-sm leading-relaxed mb-3 font-light">
                  Chaque mariage est une histoire unique. Je capture les émotions
                  authentiques, les regards complices, les moments spontanés.
                </p>
                <p className="text-cream/25 text-xs leading-relaxed font-light">
                  ← Scroll pour explorer
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo strip */}
        <div className="relative flex-1 overflow-hidden">
          {/* Fade left */}
          <div
            className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #0F0F0D 20%, transparent)" }}
          />
          {/* Fade right */}
          <div
            className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0F0F0D 20%, transparent)" }}
          />

          {/* Track — se déplace horizontalement */}
          <div
            ref={trackRef}
            className="absolute top-0 left-0 flex items-start gap-5 px-16 will-change-transform"
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
          >
            {weddingImages.map((img, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 overflow-hidden group"
                style={{
                  width:       img.w,
                  height:      img.h,
                  marginTop:   img.mt,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="400px"
                />
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <span className="text-xs tracking-widest uppercase text-cream/80">
                    {img.caption}
                  </span>
                </div>
                {/* Numéro */}
                <span className="absolute top-3 right-3 font-serif text-2xl text-white/10 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Barre de progression */}
        <div className="flex-shrink-0 px-12 pb-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-cream/10">
            <div
              className="h-full bg-gold/50 origin-left"
              id="wedding-progress"
              style={{ transform: "scaleX(0)", transition: "transform 0.1s ease" }}
            />
          </div>
          <span className="text-xs text-cream/20 tracking-widest">
            {weddingImages.length} photos
          </span>
        </div>
      </div>

      {/* Stats + CTA — en dehors du sticky, après le scroll horizontal */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto py-24">
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-b border-cream/10"
        >
          {[
            { value: 180, label: "Mariages",            suffix: "+" },
            { value: 8,   label: "Années d'expérience", suffix: ""  },
            { value: 15,  label: "Prix reçus",           suffix: ""  },
            { value: 98,  label: "Clients satisfaits",  suffix: "%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-end justify-center gap-1 mb-2">
                <span
                  className="stat-number font-serif text-5xl md:text-6xl text-gold font-light"
                  data-value={stat.value}
                >
                  0
                </span>
                <span className="font-serif text-3xl text-gold/70 mb-1">{stat.suffix}</span>
              </div>
              <p className="text-xs tracking-widest uppercase text-cream/40">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center gap-3 px-10 py-5 bg-gold text-charcoal text-xs tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
          >
            Réserver votre date
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
