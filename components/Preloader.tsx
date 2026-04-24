"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"line" | "text" | "sub" | "quote" | "exit" | "done">("line");

  useEffect(() => {
    if (sessionStorage.getItem("skipPreloader")) {
      setPhase("done");
      return;
    }
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("text"),  400);
    const t2 = setTimeout(() => setPhase("sub"),   900);
    const t3 = setTimeout(() => setPhase("quote"), 1600);
    const t4 = setTimeout(() => setPhase("exit"),  4200);
    const t5 = setTimeout(() => {
      sessionStorage.setItem("skipPreloader", "1");
      setPhase("done");
    }, 4900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); document.documentElement.style.overflow = ""; document.body.style.overflow = ""; };
  }, []);

  if (phase === "done") { document.documentElement.style.overflow = ""; document.body.style.overflow = ""; return null; }

  const exiting = phase === "exit";
  const quoting = phase === "quote" || phase === "exit";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#080808",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: exiting ? 0 : 1,
      transform: exiting ? "scale(1.03)" : "scale(1)",
      transition: exiting ? "opacity 0.7s cubic-bezier(0.4,0,1,1), transform 0.7s cubic-bezier(0.4,0,1,1)" : "none",
      pointerEvents: exiting ? "none" : "all",
    }}>

      {/* Bloc logo */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        opacity: quoting ? 0 : 1,
        transform: quoting ? "translateY(-20px)" : "translateY(0)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        pointerEvents: quoting ? "none" : "all",
      }}>
        <div style={{
          width: 120, height: 1,
          background: "linear-gradient(to right, transparent, #c9a84c, transparent)",
          marginBottom: 16,
          opacity: phase === "line" ? 0 : 1, transition: "opacity 0.5s ease",
        }} />
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: "clamp(32px, 5vw, 52px)",
          fontWeight: 400, letterSpacing: "0.35em", color: "#faf8f4",
          textTransform: "uppercase", lineHeight: 1, marginBottom: 6,
          clipPath: phase === "line" ? "inset(0 100% 0 0)" : "inset(0 0% 0 0)",
          transition: "clip-path 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}>Seno</div>
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: "clamp(10px, 1.4vw, 14px)",
          fontWeight: 500, letterSpacing: "0.55em", color: "#c9a84c",
          textTransform: "uppercase", marginBottom: 24,
          clipPath: phase === "line" || phase === "text" ? "inset(0 100% 0 0)" : "inset(0 0% 0 0)",
          transition: "clip-path 0.5s 0.05s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}>Studio</div>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: "0.3em",
          color: "rgba(154,154,146,0.6)", textTransform: "uppercase",
          opacity: phase === "sub" || quoting ? 1 : 0,
          transform: phase === "sub" || quoting ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>Photographe · Vidéaste · Bordeaux</div>
      </div>

      {/* Phrase signature */}
      <div style={{
        position: "absolute", textAlign: "center", padding: "0 48px", pointerEvents: "none",
      }}>
        {/* Lignes dorées haut */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 36,
          opacity: quoting && !exiting ? 1 : 0,
          transition: "opacity 0.6s 0.2s ease",
        }}>
          <div style={{
            height: 1, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.6))",
            width: quoting && !exiting ? 80 : 0,
            transition: "width 0.9s 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
          }} />
          <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(201,168,76,0.7)", flexShrink: 0 }} />
          <div style={{
            height: 1, background: "linear-gradient(to left, transparent, rgba(201,168,76,0.6))",
            width: quoting && !exiting ? 80 : 0,
            transition: "width 0.9s 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",
          }} />
        </div>

        {/* Ligne 1 */}
        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 4.5vw, 58px)",
            fontStyle: "italic", fontWeight: 300,
            letterSpacing: "0.01em", lineHeight: 1.2,
            color: "rgba(250,248,244,0.92)", margin: 0,
            transform: quoting && !exiting ? "translateY(0)" : "translateY(110%)",
            transition: "transform 0.9s 0.2s cubic-bezier(0.16,1,0.3,1)",
          }}>
            Car certains instants
          </p>
        </div>

        {/* Ligne 2 — en or */}
        <div style={{ overflow: "hidden", marginBottom: 36 }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 4.5vw, 58px)",
            fontStyle: "italic", fontWeight: 300,
            letterSpacing: "0.01em", lineHeight: 1.2,
            color: "rgba(201,168,76,0.85)", margin: 0,
            transform: quoting && !exiting ? "translateY(0)" : "translateY(110%)",
            transition: "transform 0.9s 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}>
            méritent mieux qu&apos;un souvenir flou.
          </p>
        </div>

        {/* Lignes dorées bas */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 20,
          opacity: quoting && !exiting ? 1 : 0,
          transition: "opacity 0.6s 0.8s ease",
        }}>
          <div style={{
            height: 1, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4))",
            width: quoting && !exiting ? 48 : 0,
            transition: "width 0.9s 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
          }} />
          <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(201,168,76,0.5)", flexShrink: 0 }} />
          <div style={{
            height: 1, background: "linear-gradient(to left, transparent, rgba(201,168,76,0.4))",
            width: quoting && !exiting ? 48 : 0,
            transition: "width 0.9s 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
          }} />
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{
        position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)",
        width: 80, height: 1, background: "rgba(201,168,76,0.15)", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", background: "#c9a84c",
          width: phase === "line" ? "15%" : phase === "text" ? "40%" : phase === "sub" ? "65%" : phase === "quote" ? "90%" : "100%",
          transition: "width 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
        }} />
      </div>

      {/* Bouton Skip */}
      {quoting && !exiting && (
        <button
          onClick={() => {
            sessionStorage.setItem("skipPreloader", "1");
            setPhase("done");
          }}
          style={{
            position: "absolute", bottom: 44, right: 48,
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontSize: 10,
            letterSpacing: "0.25em", textTransform: "uppercase",
            color: "rgba(154,154,146,0.5)", padding: "8px 0",
            transition: "color 0.3s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "rgba(201,168,76,0.7)")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(154,154,146,0.5)")}
          aria-label="Passer l'introduction"
        >
          Passer
        </button>
      )}
    </div>
  );
}
