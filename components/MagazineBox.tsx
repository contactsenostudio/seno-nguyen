"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  { num: "01", title: "On installe la cabine", desc: "Setup discret et élégant en 30 min." },
  { num: "02", title: "Vos invités posent", desc: "Props, backdrops, ambiance fun. Tout le monde veut y passer." },
  { num: "03", title: "Impression immédiate", desc: "Format magazine personnalisé. Un souvenir physique unique." },
  { num: "04", title: "Galerie digitale", desc: "Toutes les photos en ligne sous 48h. Accès à vie." },
];

export default function MagazineBox() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="magazine" style={{ background: "var(--noir)", padding: "140px 0", overflow: "hidden" }}>

      {/* Ticker */}
      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(201,168,76,0.15)", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "14px 0", marginBottom: 100, background: "rgba(201,168,76,0.03)" }}>
        <div style={{
          display: "flex", gap: 60, whiteSpace: "nowrap",
          animation: "ticker 18s linear infinite",
        }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i} style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--or)", opacity: 0.7, flexShrink: 0 }}>
              Magazine Box &nbsp;·&nbsp; Photobooth Premium &nbsp;·&nbsp; Impressions Illimitées &nbsp;·&nbsp; Animation Événementielle
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>

        {/* Left — content */}
        <div>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)",
            padding: "6px 16px", marginBottom: 28,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--or)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
            <span style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--or)" }}>En vogue</span>
          </div>

          <p className="label" style={{
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease",
          }}>Magazine Box</p>
          <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px 0" }} />

          <h2 className="h2" style={{
            marginBottom: 24,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.15s ease, transform 0.7s 0.15s ease",
          }}>
            L&apos;animation qui<br /><em>fait le buzz.</em>
          </h2>

          <p style={{
            fontSize: 15, lineHeight: 1.9, color: "var(--gris)", marginBottom: 16,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease",
          }}>
            Un photobooth premium avec impressions format magazine personnalisées. Vos invités repartent avec un souvenir physique unique — et parlent de vous pendant des semaines.
          </p>

          <p style={{
            fontSize: 15, lineHeight: 1.9, color: "var(--gris)", marginBottom: 40,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.25s ease, transform 0.7s 0.25s ease",
          }}>
            Disponible en option mariage ou en location indépendante pour galas, EVJF, anniversaires.
          </p>

          {/* Steps */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 20, marginBottom: 44,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease",
          }}>
            {steps.map(s => (
              <div key={s.num} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 12, color: "var(--or)", opacity: 0.5, flexShrink: 0, paddingTop: 2 }}>{s.num}</div>
                <div style={{ flex: 1, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--blanc)", marginBottom: 3 }}>{s.title}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.6, color: "var(--gris)" }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 40, marginBottom: 44,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.35s ease, transform 0.7s 0.35s ease",
          }}>
            {[{ val: "∞", label: "Impressions" }, { val: "100%", label: "Personnalisé" }, { val: "48h", label: "Galerie" }].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--serif)", fontSize: 30, color: "var(--or)", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gris)", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.4s ease, transform 0.7s 0.4s ease",
          }}>
            <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="btn btn-gold">
              Demander un devis
            </button>
          </div>
        </div>

        {/* Right — image stylisée */}
        <div style={{
          position: "relative",
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(40px)",
          transition: "opacity 0.9s 0.2s ease, transform 0.9s 0.2s ease",
        }}>
          {/* Image principale */}
          <div style={{ position: "relative", overflow: "hidden", height: 580 }}>
            <img
              src="/images/magazine.jpg"
              alt="Magazine Box"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                transform: visible ? "scale(1)" : "scale(1.08)",
                transition: "transform 1.2s 0.2s ease",
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.4) 0%, transparent 50%)" }} />
          </div>

          {/* Cadre doré décalé */}
          <div style={{ position: "absolute", top: 20, left: 20, right: -20, bottom: -20, border: "1px solid rgba(201,168,76,0.2)", zIndex: -1, pointerEvents: "none" }} />

          {/* Floating card */}
          <div style={{
            position: "absolute", bottom: 32, left: -40,
            background: "var(--noir2)", border: "1px solid rgba(201,168,76,0.2)",
            padding: "20px 28px", backdropFilter: "blur(10px)",
            animation: visible ? "float 4s ease-in-out infinite" : "none",
          }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gris2)", marginBottom: 6 }}>Inclus dans chaque prestation</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--blanc)" }}>Impressions <em style={{ color: "var(--or)" }}>illimitées</em></div>
          </div>

          {/* Second image petite */}
          <div style={{ position: "absolute", top: -30, right: -50, width: 160, height: 200, overflow: "hidden", border: "3px solid var(--noir)" }}>
            <img src="/images/choice-magazine.jpg" alt="Magazine Box ambiance" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>

      </div>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
      `}</style>
    </section>
  );
}
