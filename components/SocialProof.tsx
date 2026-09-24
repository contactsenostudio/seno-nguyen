"use client";
import { useEffect, useRef } from "react";

const stats = [
  { val: "150+", label: "Mariages réalisés" },
  { val: "4K", label: "Qualité cinéma" },
  { val: "98%", label: "Clients satisfaits" },
  { val: "5★", label: "Note moyenne" },
];

const reviews = [
  {
    stars: "★★★★★",
    quote: "On a pleuré en regardant le film pour la première fois. Seno a capturé exactement ce qu'on voulait garder à jamais. Un talent rare et une personne exceptionnelle.",
    author: "Laura & Mathieu",
    detail: "Mariage Château de Vayres · Gironde",
  },
  {
    stars: "★★★★★",
    quote: "La Magazine Box a rendu nos invités fous de joie. Le film est à couper le souffle. On ne regrette pas un centime du Pack Expérience.",
    author: "Sophie & Kévin",
    detail: "Pack Expérience · Bordeaux 2024",
  },
  {
    stars: "★★★★★",
    quote: "Seno a créé des visuels qui reflètent vraiment l'âme de notre entreprise. Réactif, professionnel, créatif. Résultat bien au-delà de nos attentes.",
    author: "Alexia Courmont",
    detail: "Film institutionnel · Corporate",
  },
];

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="avis" className="proof-section">
      <div className="proof-inner">
        <div className="reveal" style={{ textAlign: "center" }}>
          <p className="label">Ils me font confiance</p>
          <div className="divider divider-center" style={{ margin: "20px auto" }} />
          <h2 className="h2">Ce qu&apos;ils<br /><em>en disent.</em></h2>
        </div>

        <div className="proof-stats reveal reveal-delay-1">
          {stats.map(s => (
            <div key={s.val} className="proof-stat">
              <div className="proof-stat-val">{s.val}</div>
              <div className="proof-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className={`review reveal reveal-delay-${i + 1}`}>
              <div className="review-stars">{r.stars}</div>
              <p className="review-quote">&ldquo;{r.quote}&rdquo;</p>
              <div className="review-author">{r.author}</div>
              <div className="review-detail">{r.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
