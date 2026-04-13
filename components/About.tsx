"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    const content = contentRef.current;
    const signature = signatureRef.current;
    const line = lineRef.current;

    if (!image || !content) return;

    // Image reveal
    gsap.set(image, { clipPath: "inset(0 100% 0 0)" });
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(image, {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
        });
      },
    });

    // Content reveal
    const contentEls = content.querySelectorAll(".reveal-el");
    gsap.set(contentEls, { y: 40, opacity: 0 });
    ScrollTrigger.create({
      trigger: content,
      start: "top 75%",
      onEnter: () => {
        gsap.to(contentEls, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
        });
      },
    });

    // Signature draw
    if (signature) {
      gsap.set(signature, { opacity: 0, scale: 0.8 });
      ScrollTrigger.create({
        trigger: signature,
        start: "top 85%",
        onEnter: () => {
          gsap.to(signature, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          });
        },
      });
    }

    // Line expand
    if (line) {
      gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      ScrollTrigger.create({
        trigger: line,
        start: "top 80%",
        onEnter: () => {
          gsap.to(line, { scaleX: 1, duration: 1.2, ease: "power3.inOut" });
        },
      });
    }

    // Parallax on image inner
    const imgEl = image.querySelector("img");
    if (imgEl) {
      gsap.set(imgEl, { scale: 1.1 });
      ScrollTrigger.create({
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(imgEl, { y: self.progress * 40 - 20 });
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36 bg-[#0D0D0D] overflow-hidden"
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] overflow-hidden"
          >
            <Image
              src="/images/DSC02022.png"
              alt="Seno Nguyen photographe"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Artistic border */}
            <div className="absolute inset-4 border border-gold/20 pointer-events-none" />

            {/* Camera badge */}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-sm border border-cream/10 px-4 py-3">
              <span className="text-xs tracking-[0.2em] uppercase text-cream/60">
                Depuis 2016
              </span>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <div className="reveal-el overflow-hidden mb-3">
              <p className="text-xs tracking-[0.3em] uppercase text-gold/70">
                05 — À Propos
              </p>
            </div>

            <div className="reveal-el overflow-hidden mb-2">
              <h2 className="font-serif italic text-display-md text-cream leading-none">
                Seno
              </h2>
            </div>
            <div className="reveal-el overflow-hidden mb-10">
              <h2 className="font-serif italic text-display-md text-cream leading-none ml-8">
                Nguyen
              </h2>
            </div>

            <div ref={lineRef} className="reveal-el w-full h-px bg-cream/10 mb-10" />

            <p className="reveal-el text-cream/60 text-base leading-relaxed mb-6 font-light">
              Photographe professionnel basé en France, je consacre mon art à
              capturer les moments qui comptent vraiment. Ma vision : chaque
              image doit être ressentie avant d&apos;être vue.
            </p>
            <p className="reveal-el text-cream/40 text-sm leading-relaxed mb-10 font-light">
              Formé aux arts visuels et passionné par la lumière naturelle, je
              développe un style à la fois cinématographique et intimiste.
              Chaque reportage est une collaboration unique avec vous.
            </p>

            {/* Skills */}
            <div className="reveal-el grid grid-cols-2 gap-4 mb-10">
              {[
                "Photographie de mariage",
                "Portraits & Branding",
                "Événements & Corporate",
                "Direction artistique",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-gold" />
                  <span className="text-xs text-cream/50 tracking-wide">{skill}</span>
                </div>
              ))}
            </div>

            {/* Signature */}
            <div ref={signatureRef} className="inline-block">
              <p
                className="font-serif italic text-3xl text-gold/80"
                style={{ fontStyle: "italic" }}
              >
                Seno Nguyen
              </p>
              <div className="w-full h-px bg-gold/30 mt-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
