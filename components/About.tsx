"use client";
import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ref.current?.querySelectorAll<HTMLElement>(".a-fade").forEach((el, i) => {
          setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, i * 120);
        });
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      background: "var(--noir)",
      padding: "120px 0 100px",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "0 48px",
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 80,
        alignItems: "start",
      }}>

        {/* Left — category labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingTop: 10 }}>
          {[
            { top: "Bordeaux", bot: "France" },
            { top: "Photographe", bot: "Indépendant" },
            { top: "Shooting · Mariage", bot: "Entreprise" },
          ].map(({ top, bot }) => (
            <div key={top} className="a-fade" style={{
              opacity: 0,
              transform: "translateY(16px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}>
              <div style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--or)", marginBottom: 5 }}>{top}</div>
              <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gris2)" }}>{bot}</div>
            </div>
          ))}
        </div>

        {/* Right — editorial text */}
        <div>
          <p className="a-fade" style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(26px, 3.2vw, 46px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--blanc)",
            lineHeight: 1.35,
            letterSpacing: "-0.015em",
            marginBottom: 36,
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            Je capte ce que les yeux oublient trop vite —<br />
            le regard d&apos;un mari une seconde avant les larmes,<br />
            l&apos;assiette qui donne envie avant le premier mot.
          </p>

          <p className="a-fade" style={{
            fontSize: 14,
            lineHeight: 1.9,
            color: "var(--gris)",
            maxWidth: 540,
            marginBottom: 40,
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}>
            Basé à Bordeaux, disponible partout. Portrait, mariage,
            gastronomie, immobilier — chaque projet a son histoire.
            Mon travail, c&apos;est qu&apos;on la voit.
          </p>

          <a className="a-fade btn-arrow-white" href="/contact" style={{
            opacity: 0,
            transform: "translateY(16px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            Parler de votre projet →
          </a>
        </div>
      </div>
    </section>
  );
}
