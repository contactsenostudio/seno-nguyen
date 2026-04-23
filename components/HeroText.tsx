"use client";
import { useEffect, useState } from "react";

const words = ["L'image", "qui", "restera."];

export default function HeroText() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const skip = sessionStorage.getItem("skipPreloader");
    const delay = skip ? 200 : 2800;
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      position: "relative",
      height: "100dvh",
      background: "var(--noir)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    }}>

      {/* Grain texture subtle */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
        opacity: 0.6,
        pointerEvents: "none",
      }} />

      {/* Lignes dorées décoratives */}
      <div style={{ position: "absolute", left: 60, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 60, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.18) 30%, rgba(201,168,76,0.18) 70%, transparent)", pointerEvents: "none" }} />

      {/* Contenu central */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>

        {/* Label */}
        <p style={{
          fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.55em",
          textTransform: "uppercase", color: "var(--or)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1s 0.1s ease, transform 1s 0.1s ease",
          marginBottom: 48,
        }}>
          Bordeaux · Gironde · France
        </p>

        {/* Titre — mots animés */}
        <h1 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(64px, 9vw, 130px)",
          fontWeight: 300,
          lineHeight: 0.88,
          letterSpacing: "-0.02em",
          color: "var(--blanc)",
          margin: 0,
        }}>
          {words.map((word, i) => (
            <span key={word} style={{ display: "inline-block", overflow: "hidden", marginRight: i < words.length - 1 ? "0.28em" : 0 }}>
              <span style={{
                display: "inline-block",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(110%)",
                transition: `opacity 0.9s ${0.3 + i * 0.14}s cubic-bezier(0.16,1,0.3,1), transform 0.9s ${0.3 + i * 0.14}s cubic-bezier(0.16,1,0.3,1)`,
                fontStyle: word === "restera." ? "italic" : "normal",
                color: word === "restera." ? "var(--or-light)" : "var(--blanc)",
              }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        {/* Ligne dorée */}
        <div style={{
          width: visible ? 80 : 0,
          height: 1,
          background: "var(--or)",
          margin: "40px auto",
          transition: "width 1s 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
        }} />

        {/* Sous-titre */}
        <p style={{
          fontFamily: "var(--sans)", fontSize: 12, letterSpacing: "0.22em",
          textTransform: "uppercase", color: "rgba(250,248,244,0.38)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 1s 1s ease, transform 1s 1s ease",
        }}>
          Photographe &amp; Vidéaste Mariage
        </p>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute", bottom: 44, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
        opacity: visible ? 1 : 0,
        transition: "opacity 1s 1.4s ease",
      }}>
        <div style={{
          width: 1, height: 60,
          background: "linear-gradient(to bottom, transparent, var(--or))",
          animation: "scrollPulse 2s 2s infinite",
        }} />
        <span style={{
          fontFamily: "var(--sans)", fontSize: 9, letterSpacing: "0.4em",
          textTransform: "uppercase", color: "var(--gris2)",
        }}>Scroll</span>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
        @media (max-width: 768px) {
          section { padding: 0 24px; }
        }
      `}</style>
    </section>
  );
}
