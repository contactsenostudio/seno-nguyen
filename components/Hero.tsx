"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { val: "150", suffix: "+", label: "Mariages" },
  { val: "4",   suffix: "K",  label: "Cinéma" },
  { val: "98",  suffix: "%",  label: "Satisfaction" },
  { val: "24",  suffix: "h",  label: "Réponse" },
];

function AnimatedStat({ target, suffix, active, delay = 0 }: { target: number; suffix: string; active: boolean; delay?: number }) {
  const from = Math.floor(target * 0.82);
  const [count, setCount] = useState(from);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t0 = setTimeout(() => setRevealed(true), delay);
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
  }, [active, target, delay, from]);

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

export default function Hero() {
  const scroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const skip = sessionStorage.getItem("skipPreloader");
    const delay = skip ? 600 : 2900;
    const timer = setTimeout(() => setStatsActive(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 25%" }} />
      <div className="hero-overlay" />
      <div className="hero-bottom" />

      {/* Vertical line */}
      <div style={{ position: "absolute", left: 60, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.25) 70%, transparent)", zIndex: 2 }} />

      <div className="hero-content">
        <p className="hero-eyebrow">Bordeaux · Gironde · France</p>
        <h1 className="hero-title">
          L&apos;image qui<br /><em>restera.</em>
        </h1>
        <p className="hero-desc">
          Photo, film cinématique & Magazine Box — trois souvenirs, un seul artiste. Pour les mariés qui refusent de choisir entre la photo et la vidéo.
        </p>
        <div className="hero-actions">
          <button onClick={() => scroll("#contact")} className="btn btn-gold">
            Réserver un appel gratuit
          </button>
          <button onClick={() => scroll("#offres")} className="btn btn-outline">
            Découvrir les offres
          </button>
        </div>

        <div className="hero-stats" ref={statsRef}>
          {stats.map((s, i) => (
            <div key={s.label}>
              <div className="hero-stat-val">
                <AnimatedStat target={parseInt(s.val)} suffix={s.suffix} active={statsActive} delay={i * 120} />
              </div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 48, right: 60, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 1, height: 64, background: "linear-gradient(to bottom, var(--or), transparent)" }} />
        <span style={{ fontFamily: "var(--sans)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gris2)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Scroll</span>
      </div>
    </section>
  );
}
