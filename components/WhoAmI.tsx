"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const STATS = [
  { num: "+80",   label: "Projets" },
  { num: "5 ans", label: "Expérience" },
  { num: "FR·EU", label: "Disponible" },
];

export default function WhoAmI() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.delay ?? 0);
        setTimeout(() => {
          el.style.opacity   = "1";
          el.style.transform = "none";
        }, delay);
        observer.unobserve(el);
      });
    }, { threshold: 0.07 });

    section.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => {
      el.style.opacity   = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)";
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="whoami-split"
      style={{
        display: "grid",
        gridTemplateColumns: "38fr 62fr",
        overflow: "hidden",
        position: "relative",
        marginTop: -880,
      }}
    >

      {/* ══ PANNEAU GAUCHE ══ */}
      <div style={{
        position: "relative",
        background: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "32px 28px",
        minHeight: 500,
      }}>

        {/* Grain */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }} aria-hidden>
          <filter id="grain-ap"><feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#grain-ap)" opacity="0.04" />
        </svg>

        {/* Portrait centré */}
        <div style={{
          position: "absolute",
          top: "42%", left: "50%",
          transform: "translate(-50%, -50%)",
          width:  "clamp(130px, 15vw, 195px)",
          height: "clamp(175px, 20vw, 260px)",
          zIndex: 3, overflow: "hidden", borderRadius: 18,
        }}>
          <Image
            src="/images/A7409729.jpg"
            alt="Seno Nguyen"
            fill quality={100} priority
            style={{ objectFit: "cover", objectPosition: "center 20%" }}
            sizes="(max-width: 900px) 100vw, 195px"
          />
          {/* Accents coins */}
          <div style={{ position: "absolute", top: 8, right: 8, width: 14, height: 14, zIndex: 2 }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "100%", height: 2, background: "#e05a2b" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: 2, height: "100%", background: "#e05a2b" }} />
          </div>
          <div style={{ position: "absolute", bottom: 8, left: 8, width: 14, height: 14, zIndex: 2 }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 2, background: "rgba(0,0,0,0.18)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: 2, height: "100%", background: "rgba(0,0,0,0.18)" }} />
          </div>
        </div>

        {/* Label haut */}
        <div style={{
          position: "absolute", top: 24, left: 28, zIndex: 4,
          fontFamily: "var(--condensed)", fontSize: 9,
          letterSpacing: "0.45em", textTransform: "uppercase",
          color: "rgba(0,0,0,0.28)",
        }}>— 01 · Portrait</div>

        {/* Ghost year */}
        <span aria-hidden style={{
          position: "absolute", top: "4%", right: 14,
          fontFamily: "var(--serif)", fontStyle: "italic",
          fontSize: "clamp(80px, 10vw, 130px)", fontWeight: 300,
          color: "#0a0a0a", opacity: 0.05, lineHeight: 1,
          userSelect: "none", pointerEvents: "none", zIndex: 1,
          letterSpacing: "-0.05em",
        }}>23</span>

        {/* Nom en bas */}
        <div style={{ position: "relative", zIndex: 4 }}>
          <div style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(16px, 2vw, 24px)",
            letterSpacing: "0.1em", color: "#0a0a0a", lineHeight: 1,
          }}>SENO <span style={{ color: "#e05a2b" }}>NGUYEN</span></div>
          <div style={{
            fontFamily: "var(--condensed)", fontSize: 9,
            letterSpacing: "0.42em", textTransform: "uppercase",
            color: "rgba(0,0,0,0.38)", marginTop: 6,
          }}>Photographe · Bordeaux</div>
          <div style={{ width: 28, height: 1.5, background: "#e05a2b", marginTop: 14 }} />
        </div>
      </div>

      {/* ══ PANNEAU DROIT ══ */}
      <div style={{
        background: "#fff",
        padding: "clamp(40px, 5vw, 68px) clamp(28px, 4.5vw, 62px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        borderLeft: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}>

        {/* Ghost "II" fond */}
        <span aria-hidden style={{
          position: "absolute", right: 24, bottom: 24,
          fontFamily: "var(--serif)", fontStyle: "italic",
          fontSize: "clamp(100px, 13vw, 180px)", fontWeight: 300,
          color: "#0a0a0a", opacity: 0.022, lineHeight: 1,
          userSelect: "none", pointerEvents: "none", letterSpacing: "-0.04em",
        }}>II</span>

        {/* Titre */}
        <div data-reveal data-delay="0" style={{ position: "relative", zIndex: 1, marginBottom: 20 }}>
          <div style={{
            fontFamily: "var(--condensed)", fontSize: 9,
            letterSpacing: "0.45em", textTransform: "uppercase",
            color: "rgba(0,0,0,0.3)", marginBottom: 6,
          }}>— 01 · Portrait</div>
          <div className="about-title-anim" style={{ display: "flex", flexDirection: "column", gap: "0.08em" }}>
            <div style={{
              fontFamily: "var(--serif)", fontStyle: "italic",
              fontSize: "clamp(50px, 7vw, 104px)",
              letterSpacing: "-0.02em", lineHeight: 0.92,
              color: "#0a0a0a", fontWeight: 300,
            }}>À propos</div>
            <div style={{
              fontFamily: "var(--serif)", fontStyle: "italic",
              fontSize: "clamp(50px, 7vw, 104px)",
              letterSpacing: "-0.03em", lineHeight: 0.92,
              color: "#e05a2b", fontWeight: 300,
            }}>de moi.</div>
          </div>
        </div>

        {/* Citation */}
        <div data-reveal data-delay="60" style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "var(--sans)", fontStyle: "normal",
            fontSize: "clamp(18px, 2.1vw, 30px)", fontWeight: 600,
            color: "#0a0a0a", lineHeight: 1.45, letterSpacing: "-0.01em",
            maxWidth: "92%", marginBottom: 24,
          }}>
            Je ne pose pas mes sujets — je les observe jusqu&rsquo;à ce que la vraie version d&rsquo;eux apparaisse.
          </p>
        </div>

        {/* Bio */}
        <div data-reveal data-delay="140" style={{ position: "relative", zIndex: 1 }}>
          <p style={{
            fontSize: 17, lineHeight: 1.85,
            color: "#2a2a2a", marginBottom: 10,
            fontFamily: "var(--sans)", fontWeight: 600,
          }}>
            À 23 ans, j&rsquo;ai accompagné plus de 80 projets — mariages, portraits, corporate. Pas parce que j&rsquo;ai fait une grande école — mais parce que depuis mes 18 ans, j&rsquo;ai appris à observer les gens, à disparaître, à attendre le bon moment.
          </p>
          <p style={{
            fontSize: 15, lineHeight: 1.8,
            color: "#999", fontFamily: "var(--sans)", fontWeight: 600,
          }}>
            La jeunesse m&rsquo;a appris l&rsquo;instinct. Ces 5 ans m&rsquo;ont appris la maîtrise. Bordeaux, France entière, Europe.
          </p>
        </div>

        {/* Stats */}
        <div data-reveal data-delay="220" style={{
          display: "flex", marginTop: 24, position: "relative", zIndex: 1,
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: 1, paddingTop: 16,
              borderRight: i < STATS.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              paddingRight: i < STATS.length - 1 ? 18 : 0,
              paddingLeft: i > 0 ? 18 : 0,
            }}>
              <div style={{
                fontFamily: "var(--serif)", fontStyle: "italic",
                fontSize: "clamp(17px, 1.7vw, 23px)", color: "#0a0a0a", lineHeight: 1,
              }}>{s.num}</div>
              <div style={{
                fontFamily: "var(--condensed)", fontSize: 9,
                letterSpacing: "0.38em", textTransform: "uppercase",
                color: "#c0c0c0", marginTop: 5,
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div data-reveal data-delay="300" style={{ marginTop: 26, position: "relative", zIndex: 1, display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
          <a href="/portfolio" className="btn-arrow btn-arrow-orange">
            Voir mon portfolio →
          </a>
          <a href="/contact" className="btn-arrow">
            Me contacter →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .whoami-split { grid-template-columns: 1fr !important; }
          .whoami-split > div:first-child { min-height: 320px !important; }
        }
        @keyframes aboutFloat {
          0%   { transform: perspective(800px) rotateX(2deg) rotateY(-1deg) translateY(0px); }
          25%  { transform: perspective(800px) rotateX(-1deg) rotateY(2deg) translateY(-5px); }
          50%  { transform: perspective(800px) rotateX(1.5deg) rotateY(0.5deg) translateY(-9px); }
          75%  { transform: perspective(800px) rotateX(-0.5deg) rotateY(-2deg) translateY(-3px); }
          100% { transform: perspective(800px) rotateX(2deg) rotateY(-1deg) translateY(0px); }
        }
        .about-title-anim { animation: aboutFloat 8s ease-in-out infinite; will-change: transform; }
      `}</style>
    </section>
  );
}
