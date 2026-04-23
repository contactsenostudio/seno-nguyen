"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { num: 150, suffix: "+", label: "Mariages réalisés" },
  { num: 4,   suffix: "K",  label: "Qualité cinéma" },
  { num: 98,  suffix: "%",  label: "Clients satisfaits" },
  { num: 5,   suffix: "★",  label: "Note moyenne", noCount: true },
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

function AnimatedStat({ target, suffix, active, delay = 0, noCount = false }: { target: number; suffix: string; active: boolean; delay?: number; noCount?: boolean }) {
  const from = noCount ? target : Math.floor(target * 0.82);
  const [count, setCount] = useState(from);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t0 = setTimeout(() => setRevealed(true), delay);
    if (noCount) return () => clearTimeout(t0);
    const t1 = setTimeout(() => {
      let start: number | null = null;
      const duration = 900;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setCount(Math.floor(from + eased * (target - from)));
        if (p < 1) requestAnimationFrame(step);
        else setCount(target);
      };
      requestAnimationFrame(step);
    }, delay + 100);
    return () => { clearTimeout(t0); clearTimeout(t1); };
  }, [active, target, delay, from, noCount]);

  return (
    <span style={{
      display: "inline-block",
      opacity: revealed ? 1 : 0,
      filter: revealed ? "blur(0px)" : "blur(6px)",
      transform: revealed ? "translateY(0)" : "translateY(10px)",
      transition: "opacity 0.7s ease, filter 0.7s ease, transform 0.7s ease",
    }}>
      {count}{suffix}
    </span>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          if ((e.target as HTMLElement).dataset.stats) setStatsActive(true);
          obs.unobserve(e.target);
        }
      });
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

        <div className="proof-stats reveal reveal-delay-1" data-stats="true">
          {stats.map((s, i) => (
            <div key={s.label} className="proof-stat">
              <div className="proof-stat-val">
                <AnimatedStat target={s.num} suffix={s.suffix} active={statsActive} delay={i * 120} noCount={s.noCount} />
              </div>
              <div className="proof-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className={`review reveal reveal-delay-${i + 1}`}>
              <div className="review-stars" aria-hidden="true">{r.stars}</div>
              <span className="sr-only">5 étoiles sur 5</span>
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
