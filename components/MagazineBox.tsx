"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const steps = [
  { num: "01", title: "Installation sur place", desc: "Je pose et habille la box aux couleurs de votre événement. Prête en quelques minutes, sans intervention pendant la soirée." },
  { num: "02", title: "Les invités entrent", desc: "Ils poussent la porte, s'installent à l'intérieur et composent leur propre mise en scène." },
  { num: "03", title: "Ils posent comme en couverture", desc: "Face à la vitre, chaque invité se prend en photo — avec le titre de votre événement affiché en grand, style magazine." },
  { num: "04", title: "Le souvenir sur leur téléphone", desc: "Les photos restent directement sur leur téléphone. Rien à imprimer, rien à attendre." },
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
      <div aria-hidden="true" style={{ overflow: "hidden", borderTop: "1px solid rgba(201,168,76,0.15)", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "14px 0", marginBottom: 100, background: "rgba(201,168,76,0.03)" }}>
        <div style={{
          display: "flex", gap: 60, whiteSpace: "nowrap",
          animation: "ticker 18s linear infinite",
        }}>
          {Array(6).fill(null).map((_, i) => (
            <span key={i} style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--or)", opacity: 0.7, flexShrink: 0 }}>
              Magazine Box &nbsp;·&nbsp; Souvenir Signature &nbsp;·&nbsp; Photo + Film + Magazine &nbsp;·&nbsp; Un Seul Artiste
            </span>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }}>

        {/* Left — content */}
        <div>
          {/* Magazine Box + Badge sur la même ligne */}
          <div style={{
            display: "flex", alignItems: "center", gap: 40, marginBottom: 0,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <p className="label" style={{ margin: 0 }}>Magazine Box</p>

            {/* Badge — animé */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              position: "relative", overflow: "hidden",
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.35)",
              padding: "6px 16px",
              animation: visible ? "badge-glow 2.5s ease-in-out infinite" : "none",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                background: "linear-gradient(105deg, transparent 30%, rgba(201,168,76,0.18) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: visible ? "badge-sweep 2.2s ease-in-out infinite" : "none",
                pointerEvents: "none",
              }} />
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--or)", display: "inline-block", flexShrink: 0, animation: "pulse-dot 1.6s ease-in-out infinite", boxShadow: "0 0 8px rgba(201,168,76,0.6)" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--or)", fontWeight: 400, position: "relative" }}>En vogue</span>
            </div>
          </div>
          <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px 0" }} />

          <h2 className="h2" style={{
            marginBottom: 24,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.15s ease, transform 0.7s 0.15s ease",
          }}>
            Une animation qui fait<br /><em>parler d&apos;elle.</em>
          </h2>

          <p style={{
            fontSize: 15, lineHeight: 1.9, color: "var(--gris)", marginBottom: 40,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s 0.2s ease, transform 0.7s 0.2s ease",
          }}>
            Une cabine blanche fermée, habillée aux couleurs de votre événement — votre titre affiché en grand, style couverture de magazine. Vos invités entrent, posent, repartent avec leur photo sur le téléphone. Entièrement autonome.
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
            {[{ val: "∞", label: "Invités" }, { val: "100%", label: "Sur-mesure" }, { val: "0", label: "Contrainte" }].map(s => (
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
            <Image
              src="/images/magbox-ref2.png"
              alt="Magazine Box — cabine photo sur-mesure"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover",
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
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gris2)", marginBottom: 6 }}>Mariages · Entreprises · Tout Événement</div>
            <div style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--blanc)" }}>Entre. Pose. <em style={{ color: "var(--or)" }}>Deviens la une.</em></div>
          </div>

          {/* Second image petite */}
          <div style={{ position: "absolute", top: -30, right: -50, width: 160, height: 200, overflow: "hidden", border: "3px solid var(--noir)" }}>
            <Image src="/images/magbox-ref1.png" alt="Magazine Box ambiance soirée" fill sizes="160px" style={{ objectFit: "cover" }} />
          </div>
        </div>

      </div>

      {/* Galerie magazine */}
      <div style={{
        maxWidth: 1300, margin: "80px auto 0", padding: "0 60px",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8,
        opacity: visible ? 1 : 0, transition: "opacity 1s 0.6s ease",
      }}>
        {["/images/magbox-gallery1.jpg", "/images/magbox-gallery2.jpg", "/images/magbox-gallery3.jpg"].map((src, i) => (
          <div key={i} style={{ position: "relative", overflow: "hidden", height: 200 }}>
            <Image
              src={src}
              alt={`Magazine Box — photo invités ${i + 2}`}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.7); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 0px rgba(201,168,76,0); border-color: rgba(201,168,76,0.35); }
          50% { box-shadow: 0 0 18px rgba(201,168,76,0.25); border-color: rgba(201,168,76,0.7); }
        }
        @keyframes badge-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
