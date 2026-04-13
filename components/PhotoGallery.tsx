"use client";

import { useEffect, useRef, useState } from "react";
import GalleryModal from "@/components/GalleryModal";

const images = [
  { src: "/images/wedding-hero.jpg",     label: "Les Mariés" },
  { src: "/images/wedding-ceremony.jpg", label: "La Cérémonie" },
  { src: "/images/wedding-couple.jpg",   label: "Premier Regard" },
  { src: "/images/wedding-bride.jpg",    label: "La Mariée" },
  { src: "/images/wedding-dance.jpg",    label: "Première Danse" },
];

export default function PhotoGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    section.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="galerie" className="galerie" style={{ background: "var(--noir2)" }}>
      <div className="galerie-header reveal">
        <div>
          <p className="section-label">Galerie</p>
          <h2 className="section-title">
            Chaque instant<br /><em>mérite d&apos;être immortalisé.</em>
          </h2>
        </div>
        <button
          className="nav-cta"
          onClick={() => setGalleryOpen(true)}
        >
          Voir tout le portfolio
        </button>
      </div>

      <div className="galerie-grid reveal reveal-delay-1">
        {images.map((img) => (
          <div key={img.src} className="galerie-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.label} />
            <div className="galerie-overlay" />
            <p className="galerie-label">{img.label}</p>
          </div>
        ))}
      </div>

      <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </section>
  );
}
