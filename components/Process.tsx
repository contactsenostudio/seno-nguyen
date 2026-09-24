"use client";
import { useEffect, useRef } from "react";

const steps = [
  { num: "1", title: "Prise de contact", desc: "Un appel de 30 min pour tout clarifier. Je réponds sous 24h. Sans engagement, sans pression." },
  { num: "2", title: "Préparation", desc: "On prépare ensemble votre projet — timing, lieux, musique, style. Je suis là à chaque étape." },
  { num: "3", title: "Shooting / Tournage", desc: "Discret et attentif. Vous vivez votre moment, je capture chaque instant qui compte vraiment." },
  { num: "4", title: "Livraison", desc: "Galerie privée et film livrés dans les délais. La première fois que vous regardez, les larmes aux yeux." },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = "1";
          (e.target as HTMLElement).style.transform = "translateY(0)";
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".proc-item").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "120px 60px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--condensed)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#999", marginBottom: 20 }}>
          Comment ça se passe
        </p>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 4vw, 68px)", fontWeight: 300, lineHeight: 1, letterSpacing: "-0.01em", color: "#0a0a0a" }}>
          Simple,<br /><em>transparent.</em>
        </h2>
        <p style={{ fontSize: 14, color: "#666", marginTop: 20, maxWidth: 500, margin: "20px auto 0", lineHeight: 1.75 }}>
          De la prise de contact à la livraison — un process clair, sans surprise et sans stress.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 72, position: "relative" }}>
          {/* Connector line */}
          <div style={{
            position: "absolute", top: 32, left: "12.5%", right: "12.5%", height: 1,
            background: "linear-gradient(to right, transparent, rgba(0,0,0,0.12), transparent)",
          }} />

          {steps.map((s, i) => (
            <div
              key={s.num}
              className="proc-item"
              style={{
                padding: "0 20px",
                opacity: 0,
                transform: "translateY(20px)",
                transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s ease ${i * 120}ms`,
              }}
              onMouseEnter={e => {
                const num = e.currentTarget.querySelector(".proc-num") as HTMLElement;
                if (num) { num.style.background = "#0a0a0a"; num.style.color = "#fff"; num.style.borderColor = "#0a0a0a"; }
              }}
              onMouseLeave={e => {
                const num = e.currentTarget.querySelector(".proc-num") as HTMLElement;
                if (num) { num.style.background = "#fff"; num.style.color = "#0a0a0a"; num.style.borderColor = "rgba(0,0,0,0.15)"; }
              }}
            >
              <div
                className="proc-num"
                style={{
                  width: 64, height: 64,
                  border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--serif)", fontSize: 22, color: "#0a0a0a",
                  margin: "0 auto 28px",
                  background: "#fff",
                  position: "relative", zIndex: 1,
                  transition: "all 0.3s",
                }}
              >
                {s.num}
              </div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "#0a0a0a", marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#666" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
