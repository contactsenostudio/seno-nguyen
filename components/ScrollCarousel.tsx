"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const slides = [
  { src: "/images/wedding-hero.jpg",     label: "Les Mariés",        wide: true  },
  { src: "/images/wedding-ceremony.jpg", label: "La Cérémonie",      wide: false },
  { src: "/images/wedding-couple.jpg",   label: "Premier Regard",    wide: true  },
  { src: "/images/wedding-bride.jpg",    label: "La Mariée",         wide: false },
  { src: "/images/wedding-laugh.jpg",    label: "L'Émotion",         wide: true  },
  { src: "/images/wedding-portrait.jpg", label: "Regard Complice",   wide: false },
  { src: "/images/wedding-venue.jpg",    label: "Le Lieu",           wide: true  },
  { src: "/images/wedding-rings.jpg",    label: "Les Alliances",     wide: false },
];

export default function ScrollCarousel() {
  const sectionRef  = useRef<HTMLElement>(null);
  const stripRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const arrowRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section  = sectionRef.current;
    const strip    = stripRef.current;
    const progress = progressRef.current;
    const arrow    = arrowRef.current;
    if (!section || !strip || !progress || !arrow) return;

    const getX = () => -(strip.scrollWidth - window.innerWidth + 80);

    const tween = gsap.to(strip, {
      x: getX,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${strip.scrollWidth}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.style.transform = `scaleX(${self.progress})`;
          const opacity = self.progress > 0.75 ? (self.progress - 0.75) / 0.25 : 0;
          arrow.style.opacity = String(opacity);
        },
      },
    });

    gsap.to(arrow.querySelector(".arrow-icon"), {
      y: 7,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.65,
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--noir)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ padding: "48px 0 32px 64px", flexShrink: 0 }}>
        <p className="section-label">En images</p>
        <h2 className="section-title" style={{ marginTop: "12px" }}>
          Un aperçu de<br /><em>mon univers.</em>
        </h2>
      </div>

      {/* Strip — prend la hauteur restante */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div
          ref={stripRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingLeft: "64px",
            paddingRight: "80px",
            height: "100%",
            willChange: "transform",
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width:  slide.wide ? "380px" : "260px",
                height: "78%",
                borderRadius: "3px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={slide.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
                  pointerEvents: "none",
                }}
              />
              <p
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  color: "var(--blanc)",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                {slide.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Barre de progression */}
      <div
        style={{
          flexShrink: 0,
          height: "2px",
          background: "rgba(255,255,255,0.1)",
          margin: "0 64px",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "100%",
            background: "var(--or)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      </div>

      {/* Flèche "Suite" */}
      <div
        ref={arrowRef}
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          padding: "16px 0 20px",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--or)",
          }}
        >
          Suite
        </span>
        <svg
          className="arrow-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M8 2v12M3 9l5 5 5-5"
            stroke="var(--or)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
