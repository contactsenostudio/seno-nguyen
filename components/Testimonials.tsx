"use client";

const reviews = [
  {
    num: "01",
    quote: "Seno a su capturer des émotions que je n'aurais jamais pensé voir en photo. Chaque image raconte une histoire vraie.",
    author: "Léa & Maxime",
    detail: "Mariage · Château de Cérons",
    year: "2025",
    tag: "Reportage mariage",
  },
  {
    num: "02",
    quote: "Un regard unique, une discrétion totale, et des images d'une beauté rare. Nos souvenirs sont entre les meilleures mains.",
    author: "Claire & Thomas",
    detail: "Mariage · Saint-Émilion",
    year: "2025",
    tag: "Reportage mariage",
  },
  {
    num: "03",
    quote: "Seno a transformé notre vision en images. Le film de mariage dépasse tout ce qu'on imaginait. Merci mille fois.",
    author: "Inès & Baptiste",
    detail: "Film cinématique · Médoc",
    year: "2024",
    tag: "Film cinématique",
  },
];

const STARS = "★★★★★";

export default function Testimonials() {
  return (
    <section style={{
      background: "#080808",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Grain */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} aria-hidden>
        <filter id="grain-testi"><feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#grain-testi)" opacity="0.04" />
      </svg>

      {/* Glow orange */}
      <div style={{ position: "absolute", top: "0%", left: "-20%", width: "60%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(224,90,43,0.10) 0%, transparent 65%)", filter: "blur(100px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "0%", right: "-15%", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle, rgba(224,90,43,0.07) 0%, transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      {/* ── TITRE MASSIF ── */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "64px 7vw 52px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 32 }}>— 04 · Témoignages</div>
        <h2 style={{
          fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300,
          fontSize: "clamp(42px, 6vw, 96px)",
          lineHeight: 0.92, letterSpacing: "-0.03em",
          color: "#fff", margin: 0,
        }}>
          Ils me font<br />
          <span style={{ color: "#e05a2b" }}>confiance.</span>
        </h2>
      </div>

      {/* ── TÉMOIGNAGES ── */}
      {reviews.map((r, i) => (
        <div
          key={i}
          style={{
            position: "relative", zIndex: 1,
            padding: "48px 7vw",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Numéro fantôme */}
          <div aria-hidden style={{
            position: "absolute", top: 40, right: "7vw",
            fontFamily: "var(--serif)", fontStyle: "italic",
            fontSize: "clamp(70px, 10vw, 150px)", fontWeight: 300,
            color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.05)",
            lineHeight: 1, userSelect: "none", pointerEvents: "none",
          }}>{r.num}</div>

          <div style={{ maxWidth: 1000, position: "relative" }}>

            {/* Guillemet déco */}
            <div aria-hidden style={{
              fontFamily: "var(--serif)", fontStyle: "italic",
              fontSize: "clamp(70px, 8vw, 120px)",
              color: "#e05a2b", lineHeight: 0.6,
              opacity: 0.18,
              marginBottom: 8,
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}>"</div>

            {/* Citation */}
            <blockquote style={{
              fontFamily: "var(--serif)", fontStyle: "italic",
              fontSize: "clamp(20px, 2.4vw, 36px)",
              fontWeight: 300, lineHeight: 1.35,
              color: "#f5f0eb",
              margin: 0,
              letterSpacing: "-0.02em",
            }}>
              {r.quote}
            </blockquote>

            {/* Séparateur */}
            <div style={{ width: 48, height: 2, background: "#e05a2b", margin: "40px 0 28px" }} />

            {/* Infos auteur */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "var(--condensed)", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 5 }}>{r.author}</div>
                <div style={{ fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{r.detail} · {r.year}</div>
              </div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 14, color: "#e05a2b", letterSpacing: "0.1em", opacity: 0.8 }}>{STARS}</div>
              <div style={{
                fontFamily: "var(--condensed)", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "5px 10px",
              }}>{r.tag}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Footer photos */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "40px 0 0",
        display: "flex",
        gap: 3,
        overflow: "hidden",
      }}>
        {[
          { src: "/images/hero-maries.jpg",       label: "Mariage"          },
          { src: "/images/wedding-dance.jpg",      label: "Film"             },
          { src: "/images/theme-portrait.jpg",     label: "Portrait"         },
          { src: "/images/theme-evenement.jpg",    label: "Événementiel"     },
          { src: "/images/magazine.jpg",           label: "Magazine Box"     },
          { src: "/images/theme-mode.jpg",         label: "Mode"             },
          { src: "/images/theme-gastronomie.jpg",  label: "Gastronomie"      },
        ].map((p, i) => (
          <div key={i} style={{
            flex: 1,
            position: "relative",
            height: "clamp(90px, 11vw, 160px)",
            overflow: "hidden",
            minWidth: 0,
          }}>
            <img src={p.src} alt={p.label} style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              filter: "brightness(0.55) saturate(0.7)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
            }} />
            <span style={{
              position: "absolute", bottom: 8, left: 10,
              fontFamily: "var(--condensed)", fontSize: 8,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}>{p.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
}
