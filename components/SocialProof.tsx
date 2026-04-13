"use client";

import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote: "On a pleuré en regardant le film pour la première fois. Seno a capturé exactement ce qu'on voulait garder à jamais. Un talent rare.",
    name: "Laura & Mathieu",
    detail: "Mariage Château de Vayres, Gironde",
    initials: "LM",
  },
  {
    quote: "Le pack Expérience a tout changé. La Magazine Box a enflammé la soirée, et le QR Code a rendu nos invités fous de joie. On ne regrette pas un centime.",
    name: "Sophie & Kévin",
    detail: "Pack Expérience — Bordeaux 2024",
    initials: "SK",
  },
  {
    quote: "Seno a su créer des visuels qui reflètent vraiment l'âme de notre entreprise. Un résultat au-delà de nos attentes, réactif et professionnel.",
    name: "Alexia Courmont",
    detail: "Film institutionnel — Corporate",
    initials: "AC",
  },
];

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    section.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="avis" className="testimonials">
      <div className="testimonials-header reveal">
        <p className="section-label" style={{ justifyContent: "center" }}>Ils me font confiance</p>
        <h2 className="section-title">
          Ce qu&apos;ils<br /><em>en disent.</em>
        </h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className={`testimonial reveal reveal-delay-${i + 1}`}>
            <p className="testimonial-text">&ldquo;{t.quote}&rdquo;</p>
            <div className="testimonial-author">
              <div className="author-initials">{t.initials}</div>
              <div>
                <p className="author-name">{t.name}</p>
                <p className="author-detail">{t.detail}</p>
                <p className="stars">★★★★★</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
