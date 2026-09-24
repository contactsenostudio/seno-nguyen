"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const F1_BARS = [
  { flex: 2, delay: 0   },
  { flex: 1, delay: 55  },
  { flex: 3, delay: 110 },
  { flex: 1, delay: 165 },
  { flex: 2, delay: 220 },
];

const themes = [
  { title: "Portrait & Lifestyle",       img: "/images/theme-portrait.jpg",    id: "portrait"    },
  { title: "Mariage",                     img: "/images/hero-4k-6.jpg",         id: "mariage"     },
  { title: "Famille & Naissance",         img: "/images/theme-famille.jpg",     id: "famille"     },
  { title: "Gastronomie & Restauration",  img: "/images/theme-gastronomie.jpg", id: "gastronomie" },
  { title: "Immobilier & Architecture",   img: "/images/theme-immobilier.jpg",  id: "immobilier"  },
  { title: "Mode & Marque",               img: "/images/theme-mode.jpg",        id: "mode"        },
  { title: "Événementiel",                img: "/images/theme-evenement.jpg",   id: "evenement"   },
  { title: "Sport & Outdoor",             img: "/images/theme-sport.jpg",       id: "sport"       },
  { title: "Vin & Terroir",               img: "/images/theme-vin.jpg",         id: "vin"         },
];

interface Photo { src: string; theme: string; span: 1 | 2; }

const PHOTOS: Photo[] = [
  { src: "/images/theme-portrait.jpg",       theme: "portrait",    span: 1 },
  { src: "/images/photographer.jpg",         theme: "portrait",    span: 2 },
  { src: "/images/A7409729.jpg",             theme: "portrait",    span: 2 },
  { src: "/images/hero-4k-7.jpg",            theme: "portrait",    span: 1 },
  { src: "/images/hero-maries.jpg",          theme: "mariage",     span: 2 },
  { src: "/images/wedding-couple.jpg",       theme: "mariage",     span: 1 },
  { src: "/images/wedding-dance.jpg",        theme: "mariage",     span: 1 },
  { src: "/images/wedding-ceremony.jpg",     theme: "mariage",     span: 1 },
  { src: "/images/hero-maries2.jpg",         theme: "mariage",     span: 2 },
  { src: "/images/wedding-rings.jpg",        theme: "mariage",     span: 1 },
  { src: "/images/hero-maries4.jpg",         theme: "mariage",     span: 1 },
  { src: "/images/hero-4k-2.jpg",            theme: "mariage",     span: 2 },
  { src: "/images/theme-famille.jpg",        theme: "famille",     span: 2 },
  { src: "/images/theme-gastronomie.jpg",    theme: "gastronomie", span: 2 },
  { src: "/images/hero-4k-14.jpg",           theme: "gastronomie", span: 1 },
  { src: "/images/theme-immobilier.jpg",     theme: "immobilier",  span: 2 },
  { src: "/images/entreprise.jpg",           theme: "immobilier",  span: 1 },
  { src: "/images/hero-new.jpg",             theme: "immobilier",  span: 1 },
  { src: "/images/theme-mode.jpg",           theme: "mode",        span: 1 },
  { src: "/images/LOANE%202.jpg",            theme: "mode",        span: 2 },
  { src: "/images/hero-4k-4.jpg",            theme: "mode",        span: 1 },
  { src: "/images/theme-evenement.jpg",      theme: "evenement",   span: 2 },
  { src: "/images/DSC00306.jpg",             theme: "evenement",   span: 1 },
  { src: "/images/magazine.jpg",             theme: "evenement",   span: 2 },
  { src: "/images/A7409829.jpg",             theme: "evenement",   span: 1 },
  { src: "/images/theme-sport.jpg",          theme: "sport",       span: 2 },
  { src: "/images/hero-4k-3.jpg",            theme: "sport",       span: 1 },
  { src: "/images/hero-4k-10.jpg",           theme: "sport",       span: 1 },
  { src: "/images/theme-vin.jpg",            theme: "vin",         span: 2 },
  { src: "/images/hero-4k-6.jpg",            theme: "vin",         span: 1 },
];

export default function WorkSection() {
  const [hov, setHov]                   = useState<number | null>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [barsVisible,   setBarsVisible]   = useState(false);
  const [openTheme,     setOpenTheme]     = useState<string | null>(null);
  const [openTitle,     setOpenTitle]     = useState("");
  const [lightbox,      setLightbox]      = useState<number | null>(null);
  const [hovPhoto,      setHovPhoto]      = useState<number | null>(null);
  const [modalVisible,  setModalVisible]  = useState(false);

  const gridRef    = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const clipRef    = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const themePhotos = openTheme ? PHOTOS.filter(p => p.theme === openTheme) : [];

  const prevPhoto = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + themePhotos.length) % themePhotos.length);
  }, [lightbox, themePhotos.length]);

  const nextPhoto = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % themePhotos.length);
  }, [lightbox, themePhotos.length]);

  const openModal = (id: string, title: string) => {
    setOpenTheme(id);
    setOpenTitle(title);
    setLightbox(null);
    setModalVisible(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setModalVisible(true)));
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => { setOpenTheme(null); setLightbox(null); }, 380);
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox !== null) { setLightbox(null); return; }
        if (openTheme) closeModal();
      }
      if (lightbox !== null) {
        if (e.key === "ArrowLeft")  prevPhoto();
        if (e.key === "ArrowRight") nextPhoto();
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [prevPhoto, nextPhoto, lightbox, openTheme]);

  useEffect(() => {
    document.body.style.overflow = openTheme ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openTheme]);

  useEffect(() => {
    const clip    = clipRef.current;
    const section = sectionRef.current;
    if (!clip || !section) return;

    section.style.transition = "none";
    section.style.transform  = "translateX(100%)";

    const slideObs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      slideObs.disconnect();
      setBarsVisible(true);
      setTimeout(() => {
        requestAnimationFrame(() => {
          section.style.transition = "transform 1.1s cubic-bezier(0.16,1,0.3,1)";
          section.style.transform  = "translateX(0)";
        });
      }, 820);
      setTimeout(() => setBarsVisible(false), 1700);
    }, { threshold: 0.06 });
    slideObs.observe(clip);

    const headerObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHeaderVisible(true); headerObs.disconnect(); }
    }, { threshold: 0.2 });
    if (headerRef.current) headerObs.observe(headerRef.current);

    const wrappers = gridRef.current?.querySelectorAll<HTMLElement>("[data-cell]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx   = Number((e.target as HTMLElement).dataset.cell);
          const inner = (e.target as HTMLElement).querySelector<HTMLElement>("[data-inner]");
          if (!inner) return;
          setTimeout(() => {
            inner.style.transform = "translateX(0)";
            inner.style.opacity   = "1";
          }, idx * 90);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    if (wrappers) wrappers.forEach(el => obs.observe(el));

    return () => { slideObs.disconnect(); obs.disconnect(); headerObs.disconnect(); };
  }, []);

  return (
    <div ref={clipRef} style={{ overflow: "hidden", background: "#fff", position: "relative" }}>

      {/* Bandes F1 */}
      {barsVisible && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9000, pointerEvents: "none", overflow: "hidden", display: "flex", flexDirection: "column", gap: 7 }}>
          {F1_BARS.map((bar, i) => (
            <div key={i} style={{ flex: bar.flex, position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, bottom: 0, left: "-20%", width: "140%",
                background: "linear-gradient(to right, #5c1505, #b03010 12%, #e05a2b 35%, #ff7040 52%, #ffac7a 62%, #e05a2b 78%, #881e08 92%, #5c1505)",
                animation: `wsBarReveal 0.68s cubic-bezier(0.77,0,0.175,1) ${bar.delay}ms both`,
              }} />
            </div>
          ))}
        </div>
      )}

      <section ref={sectionRef} style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)", willChange: "transform" }}>

        {/* Header */}
        <div ref={headerRef} style={{ padding: "100px 80px 64px", position: "relative", overflow: "hidden" }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} aria-hidden>
            <filter id="grain-ws"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
            <rect width="100%" height="100%" filter="url(#grain-ws)" opacity="0.025" />
          </svg>
          <div style={{ position: "absolute", top: "-30%", left: "-10%", width: "55%", height: "80%", borderRadius: "50%", background: "radial-gradient(circle, rgba(224,90,43,0.06) 0%, transparent 65%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "absolute", top: 20, right: 80, fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(120px, 14vw, 200px)", fontWeight: 300, color: "#0a0a0a", opacity: 0.028, lineHeight: 1, userSelect: "none", pointerEvents: "none", zIndex: 0 }}>03</div>
          <div style={{ width: 3, height: 40, background: "#e05a2b", marginBottom: 28, opacity: headerVisible ? 1 : 0, transform: headerVisible ? "scaleY(1)" : "scaleY(0)", transformOrigin: "bottom", transition: "opacity 0.5s ease, transform 0.6s cubic-bezier(0.77,0,0.175,1)" }} />
          <p style={{ fontFamily: "var(--condensed)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,0,0,0.28)", marginBottom: 16, position: "relative", zIndex: 1, opacity: headerVisible ? 1 : 0, transition: "opacity 0.6s ease 0.1s" }}>— 03 · Mon Travail</p>
          <div style={{ overflow: "hidden", position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: "clamp(56px, 10vw, 155px)", letterSpacing: "0.02em", lineHeight: 0.9, color: "#0a0a0a", textTransform: "uppercase", margin: 0, whiteSpace: "nowrap" }}>
              {"MON TRAVAIL".split("").map((char, i) => (
                char === " "
                  ? <span key={i} style={{ display: "inline-block", width: "0.28em" }} />
                  : <span key={i} style={{ display: "inline-block", opacity: headerVisible ? 1 : 0, transform: headerVisible ? "translateY(0)" : "translateY(60px)", transition: `opacity 0.5s ease ${i * 45}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms` }}>{char}</span>
              ))}
            </h2>
          </div>
          <p style={{ fontFamily: "var(--serif)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(14px, 1.3vw, 18px)", color: "rgba(0,0,0,0.35)", marginTop: 28, position: "relative", zIndex: 1, opacity: headerVisible ? 1 : 0, transition: "opacity 0.8s ease 600ms" }}>
            Portrait · Mariage · Gastronomie · Sport · Immobilier · Mode
          </p>
        </div>

        {/* 3×3 grid */}
        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "#080808" }}>
          {themes.map((t, i) => (
            <div
              key={i}
              data-cell={i}
              onClick={() => openModal(t.id, t.title)}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                position: "relative",
                height: "clamp(240px, 28vw, 360px)",
                display: "block",
                background: "#080808",
                overflow: "hidden",
                borderRadius: 0,
                cursor: "pointer",
              }}
            >
              <div
                data-inner="1"
                style={{
                  position: "absolute", inset: 0,
                  transform: "translateX(80px)", opacity: 0,
                  transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "#f0f0f0",
                }}
              >
                <img src={t.img} alt={t.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: hov === i ? "scale(1.06)" : "scale(1)", transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.68)", clipPath: hov === i ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)", transition: hov === i ? "clip-path 0.45s cubic-bezier(0.77,0,0.175,1)" : "clip-path 0.35s cubic-bezier(0.77,0,0.175,1)", zIndex: 2 }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "55%", background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)", zIndex: 2, opacity: hov === i ? 0 : 1, transition: "opacity 0.3s ease" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, padding: "18px 20px", opacity: hov === i ? 0 : 1, transition: "opacity 0.2s ease" }}>
                  <div style={{ width: 20, height: 2, background: "#e05a2b", marginBottom: 8 }} />
                  <h3 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "clamp(15px, 1.5vw, 21px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", margin: 0, lineHeight: 1.1 }}>{t.title}</h3>
                </div>
                <div style={{ position: "absolute", inset: 0, zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", opacity: hov === i ? 1 : 0, transition: hov === i ? "opacity 0.2s ease 0.2s" : "opacity 0.15s ease" }}>
                  <h3 style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: "clamp(28px, 3vw, 46px)", letterSpacing: "0.02em", textTransform: "uppercase", color: "#fff", margin: 0, lineHeight: 1 }}>{t.title}</h3>
                  <div style={{ marginTop: 16, width: 40, height: 2, background: "#e05a2b" }} />
                  <span style={{ display: "block", marginTop: 16, fontFamily: "var(--sans)", fontWeight: 600, fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>Voir les projets →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: "72px 80px", display: "flex", alignItems: "center", justifyContent: "center", borderTop: "1px solid rgba(255,255,255,0.07)", background: "#080808" }}>
          <a href="/portfolio" className="btn-arrow">Voir tout le portfolio →</a>
        </div>
      </section>

      {/* ── POPUP THÈME ── */}
      {openTheme && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed", inset: 0, zIndex: 3000,
            background: "rgba(8,8,8,0.96)",
            backdropFilter: "blur(6px)",
            opacity: modalVisible ? 1 : 0,
            transition: "opacity 0.35s ease",
            overflowY: lightbox !== null ? "hidden" : "auto",
            overscrollBehavior: "contain",
          }}
        >
          {/* Header popup */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "sticky", top: 0, zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 clamp(20px, 4vw, 56px)",
              height: 64,
              background: "rgba(8,8,8,0.92)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 2, height: 16, background: "#e05a2b", borderRadius: 1 }} />
              <span style={{ fontFamily: "var(--sans)", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>
                {openTitle}
              </span>
              <span style={{ fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
                — {themePhotos.length} projet{themePhotos.length > 1 ? "s" : ""}
              </span>
            </div>
            <button
              onClick={closeModal}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}
            >
              <span style={{ fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Fermer</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: 16, color: "rgba(255,255,255,0.35)", lineHeight: 1 }}>×</span>
            </button>
          </div>

          {/* Grille photos */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ padding: "24px clamp(20px, 4vw, 56px) 100px" }}
          >
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "clamp(220px, 24vw, 380px)",
              gridAutoFlow: "dense",
              gap: 3,
            }}>
              {themePhotos.map((photo, i) => (
                <div
                  key={photo.src}
                  onClick={() => setLightbox(i)}
                  onMouseEnter={() => setHovPhoto(i)}
                  onMouseLeave={() => setHovPhoto(null)}
                  style={{
                    position: "relative",
                    gridColumn: photo.span === 2 ? "span 2" : "span 1",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#111",
                    borderRadius: 4,
                    animation: "popupFadeIn 0.4s ease both",
                    animationDelay: `${Math.min(i * 55, 440)}ms`,
                  }}
                >
                  <img
                    src={photo.src} alt="" loading="lazy"
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%", objectFit: "cover",
                      transform: hovPhoto === i ? "scale(1.05)" : "scale(1)",
                      transition: "transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "rgba(0,0,0,0.35)",
                    opacity: hovPhoto === i ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{ width: 28, height: 1, background: "#e05a2b" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer sticky CTA */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "sticky", bottom: 0, zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 clamp(20px, 4vw, 56px)",
              height: 68,
              background: "rgba(8,8,8,0.95)",
              backdropFilter: "blur(14px)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              gap: 20,
            }}
          >
            <p style={{
              fontFamily: "var(--sans)",
              fontSize: 13,
              fontWeight: 400,
              color: "rgba(255,255,255,0.35)",
              margin: 0,
              whiteSpace: "nowrap",
            }}>
              Un projet <span style={{ color: "rgba(255,255,255,0.6)" }}>{openTitle}</span> en tête ?
            </p>
            <a
              href="/contact"
              className="btn-arrow-sm btn-arrow-sm-orange"
              style={{ flexShrink: 0 }}
            >
              Travaillons ensemble →
            </a>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && openTheme && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: "fixed", inset: 0, zIndex: 4000, background: "rgba(0,0,0,0.97)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 28, right: 36, background: "none", border: "none", cursor: "pointer", fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            Fermer ×
          </button>
          <div style={{ position: "absolute", top: 32, left: 40, fontFamily: "var(--condensed)", fontSize: 10, letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)" }}>
            {String(lightbox + 1).padStart(2, "0")} / {String(themePhotos.length).padStart(2, "0")}
          </div>
          <img
            src={themePhotos[lightbox].src} alt=""
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: "88vh", maxWidth: "88vw", objectFit: "contain", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}
          />
          <button onClick={e => { e.stopPropagation(); prevPhoto(); }} style={{ position: "absolute", left: 32, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--condensed)", fontSize: 22, color: "rgba(255,255,255,0.3)", padding: "20px 16px", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#e05a2b")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>←</button>
          <button onClick={e => { e.stopPropagation(); nextPhoto(); }} style={{ position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--condensed)", fontSize: 22, color: "rgba(255,255,255,0.3)", padding: "20px 16px", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#e05a2b")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>→</button>
        </div>
      )}

      <style>{`
        @keyframes wsBarReveal {
          0%   { transform: skewX(-18deg) translateX(-92%); }
          44%  { transform: skewX(-18deg) translateX(0%);   }
          100% { transform: skewX(-18deg) translateX(92%);  }
        }
        @keyframes popupFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
