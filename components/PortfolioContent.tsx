"use client";
import { useState, useCallback, useEffect } from "react";

interface GalleryPhoto { src: string; theme: string; span: 1 | 2; }

const FILTERS = [
  { id: "tout",         label: "Tout" },
  { id: "portrait",     label: "Portrait & Lifestyle" },
  { id: "mariage",      label: "Mariage" },
  { id: "famille",      label: "Famille & Naissance" },
  { id: "gastronomie",  label: "Gastronomie & Restauration" },
  { id: "immobilier",   label: "Immobilier & Architecture" },
  { id: "mode",         label: "Mode & Marque" },
  { id: "evenement",    label: "Événementiel" },
  { id: "sport",        label: "Sport & Outdoor" },
  { id: "vin",          label: "Vin & Terroir" },
];

const PHOTOS: GalleryPhoto[] = [
  // Portrait & Lifestyle
  { src: "/images/theme-portrait.jpg",       theme: "portrait",    span: 1 },
  { src: "/images/photographer.jpg",         theme: "portrait",    span: 2 },
  { src: "/images/A7409729.jpg",             theme: "portrait",    span: 2 },
  { src: "/images/hero-4k-7.jpg",            theme: "portrait",    span: 1 },
  // Mariage
  { src: "/images/hero-maries.jpg",          theme: "mariage",     span: 2 },
  { src: "/images/wedding-couple.jpg",       theme: "mariage",     span: 1 },
  { src: "/images/wedding-dance.jpg",        theme: "mariage",     span: 1 },
  { src: "/images/wedding-ceremony.jpg",     theme: "mariage",     span: 1 },
  { src: "/images/hero-maries2.jpg",         theme: "mariage",     span: 2 },
  { src: "/images/wedding-rings.jpg",        theme: "mariage",     span: 1 },
  { src: "/images/hero-maries4.jpg",         theme: "mariage",     span: 1 },
  { src: "/images/hero-4k-2.jpg",            theme: "mariage",     span: 2 },
  // Famille & Naissance
  { src: "/images/theme-famille.jpg",        theme: "famille",     span: 2 },
  // Gastronomie & Restauration
  { src: "/images/theme-gastronomie.jpg",    theme: "gastronomie", span: 2 },
  { src: "/images/hero-4k-14.jpg",           theme: "gastronomie", span: 1 },
  // Immobilier & Architecture
  { src: "/images/theme-immobilier.jpg",     theme: "immobilier",  span: 2 },
  { src: "/images/entreprise.jpg",           theme: "immobilier",  span: 1 },
  { src: "/images/hero-new.jpg",             theme: "immobilier",  span: 1 },
  // Mode & Marque
  { src: "/images/theme-mode.jpg",           theme: "mode",        span: 1 },
  { src: "/images/LOANE%202.jpg",            theme: "mode",        span: 2 },
  { src: "/images/hero-4k-4.jpg",            theme: "mode",        span: 1 },
  // Événementiel
  { src: "/images/theme-evenement.jpg",      theme: "evenement",   span: 2 },
  { src: "/images/DSC00306.jpg",             theme: "evenement",   span: 1 },
  { src: "/images/magazine.jpg",             theme: "evenement",   span: 2 },
  { src: "/images/A7409829.jpg",             theme: "evenement",   span: 1 },
  // Sport & Outdoor
  { src: "/images/theme-sport.jpg",          theme: "sport",       span: 2 },
  { src: "/images/hero-4k-3.jpg",            theme: "sport",       span: 1 },
  { src: "/images/hero-4k-10.jpg",           theme: "sport",       span: 1 },
  // Vin & Terroir
  { src: "/images/theme-vin.jpg",            theme: "vin",         span: 2 },
  { src: "/images/hero-4k-6.jpg",            theme: "vin",         span: 1 },
];

export default function PortfolioContent() {
  const [activeTheme, setActiveTheme] = useState("tout");
  const [lightbox,    setLightbox]    = useState<number | null>(null);
  const [hov,         setHov]         = useState<number | null>(null);

  const displayed = activeTheme === "tout"
    ? PHOTOS
    : PHOTOS.filter(p => p.theme === activeTheme);

  const prevPhoto = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + displayed.length) % displayed.length);
  }, [lightbox, displayed.length]);

  const nextPhoto = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % displayed.length);
  }, [lightbox, displayed.length]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lightbox !== null) setLightbox(null);
      if (lightbox !== null) {
        if (e.key === "ArrowLeft")  prevPhoto();
        if (e.key === "ArrowRight") nextPhoto();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [prevPhoto, nextPhoto, lightbox]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => { setLightbox(null); setHov(null); }, [activeTheme]);

  return (
    <>
      <div style={{ background: "#fff" }}>

        {/* ══ CONTENU PRINCIPAL ══ */}
        <div style={{ marginRight: 180 }}>

          {/* Header */}
          <section style={{
            background: "#fff",
            paddingTop: 130, paddingBottom: 48,
            paddingLeft: "clamp(24px,4vw,64px)",
            paddingRight: "clamp(24px,4vw,40px)",
          }}>
            <div style={{
              fontFamily: "var(--condensed)", fontSize: 9,
              letterSpacing: "0.45em", textTransform: "uppercase",
              color: "rgba(0,0,0,0.25)", marginBottom: 18,
            }}>— Seno Studio · Portfolio</div>

            <h1 style={{
              fontFamily: "var(--serif)", fontStyle: "italic",
              fontWeight: 300, fontSize: "clamp(52px,7vw,112px)",
              letterSpacing: "-0.025em", lineHeight: 0.9,
              color: "#0a0a0a", margin: 0,
            }}>
              Portfolio<span style={{ color: "#e05a2b" }}>.</span>
            </h1>
          </section>

          {/* Grille */}
          <section style={{ background: "#fff", padding: "0 14px 14px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "clamp(300px,30vw,460px)",
              gridAutoFlow: "dense",
              gap: 14,
            }}>
              {displayed.map((photo, i) => (
                <div
                  key={`${activeTheme}-${photo.src}`}
                  onClick={() => setLightbox(i)}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{
                    position: "relative",
                    gridColumn: photo.span === 2 ? "span 2" : "span 1",
                    overflow: "hidden",
                    cursor: "none",
                    background: "#e8e8e8", borderRadius: 18,
                    animation: "gridFadeIn 0.4s ease both",
                    animationDelay: `${Math.min(i * 45, 480)}ms`,
                  }}
                >
                  <img
                    src={photo.src} alt="" loading="lazy"
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%", objectFit: "cover",
                      transform: hov === i ? "scale(1.05)" : "scale(1)",
                      transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(0,0,0,0.4)",
                    clipPath: hov === i ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                    transition: "clip-path 0.38s cubic-bezier(0.77,0,0.175,1)",
                    zIndex: 2,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: 30, height: 1, background: "#e05a2b" }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{
            background: "#0a0a0a",
            padding: "64px clamp(24px,4vw,64px) 72px",
            display: "flex", flexDirection: "column", alignItems: "flex-start",
            gap: 28,
          }}>
            <div>
              <p style={{ fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.22)", marginBottom: 10 }}>Votre projet</p>
              <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px,4vw,64px)", fontWeight: 400, color: "#fff", margin: 0 }}>TRAVAILLONS ENSEMBLE</h3>
            </div>
            <a href="/contact" className="btn-arrow-white">Démarrer →</a>
          </section>
        </div>

        {/* ══ SIDEBAR FILTRES ══ */}
        <div style={{
          position: "fixed",
          right: 0, top: 0, bottom: 0,
          width: 180,
          height: "100vh",
          borderLeft: "1px solid rgba(0,0,0,0.07)",
          background: "transparent",
          backdropFilter: "blur(0px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 32px 40px",
          gap: 2,
          zIndex: 10,
        }}>
          {/* Label */}
          <div style={{
            fontFamily: "var(--condensed)", fontSize: 8,
            letterSpacing: "0.45em", textTransform: "uppercase",
            color: "rgba(0,0,0,0.2)", marginBottom: 20,
          }}>Thèmes</div>

          {FILTERS.map(f => {
            const isActive = activeTheme === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveTheme(f.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: "none", border: "none",
                  cursor: "none", padding: "9px 0", textAlign: "left",
                }}
                onMouseEnter={e => {
                  if (!isActive) (e.currentTarget.querySelector(".pf-label") as HTMLElement).style.color = "#0a0a0a";
                }}
                onMouseLeave={e => {
                  if (!isActive) (e.currentTarget.querySelector(".pf-label") as HTMLElement).style.color = "rgba(0,0,0,0.32)";
                }}
              >
                {/* Barre active */}
                <div style={{
                  width: 2, height: 18, flexShrink: 0,
                  background: isActive ? "#e05a2b" : "transparent",
                  transition: "background 0.25s ease",
                }} />
                <span className="pf-label" style={{
                  fontFamily: "var(--condensed)", fontSize: 10,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: isActive ? "#0a0a0a" : "rgba(0,0,0,0.32)",
                  fontWeight: isActive ? 700 : 400,
                  transition: "color 0.22s ease",
                  lineHeight: 1.25,
                }}>{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 28, right: 36, background: "none", border: "none", cursor: "none", fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            Fermer ×
          </button>
          <div style={{ position: "absolute", top: 32, left: 40, fontFamily: "var(--condensed)", fontSize: 10, letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)" }}>
            {String(lightbox + 1).padStart(2, "0")} / {String(displayed.length).padStart(2, "0")}
          </div>
          <img
            src={displayed[lightbox].src} alt=""
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: "88vh", maxWidth: "88vw", objectFit: "contain", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
          />
          <button
            onClick={e => { e.stopPropagation(); prevPhoto(); }}
            style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "none", fontFamily: "var(--condensed)", fontSize: 22, color: "rgba(255,255,255,0.3)", padding: "20px 16px", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#e05a2b")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >←</button>
          <button
            onClick={e => { e.stopPropagation(); nextPhoto(); }}
            style={{ position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "none", fontFamily: "var(--condensed)", fontSize: 22, color: "rgba(255,255,255,0.3)", padding: "20px 16px", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#e05a2b")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >→</button>
        </div>
      )}

      <style>{`
        @keyframes gridFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }
        @media (max-width: 768px) {
          .pf-sidebar { display: none !important; }
        }
      `}</style>
    </>
  );
}
