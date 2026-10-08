"use client";
import { useEffect, useRef, useState } from "react";

/* ── Spécialités : chaque ligne change la photo de fond ── */
const SPECIALTIES = [
  { label: "Mariage",       theme: "mariage",     img: "/images/wedding-couple.jpg",    pos: "center 30%" },
  { label: "Portrait",      theme: "portrait",    img: "/images/theme-portrait.jpg",    pos: "center 20%" },
  { label: "Entreprise",    theme: "evenement",   img: "/images/theme-evenement.jpg",   pos: "center 40%" },
  { label: "Immobilier",    theme: "immobilier",  img: "/images/theme-immobilier.jpg",  pos: "center 60%" },
  { label: "Gastronomie",   theme: "gastronomie", img: "/images/theme-gastronomie.jpg", pos: "center 50%" },
  { label: "Mode",          theme: "mode",        img: "/images/theme-mode.jpg",        pos: "center 30%" },
  { label: "Sport",         theme: "sport",       img: "/images/theme-sport.jpg",       pos: "center 45%" },
  { label: "Famille",       theme: "famille",     img: "/images/theme-famille.jpg",     pos: "center 40%" },
];

const F1_BARS = [
  { flex: 2, delay: 0   },
  { flex: 1, delay: 55  },
  { flex: 3, delay: 110 },
  { flex: 1, delay: 165 },
  { flex: 2, delay: 220 },
];

const AUTO_MS = 4200;

export default function Landing() {
  const [active,  setActive]  = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [loaded,  setLoaded]  = useState(false);
  const [bars,    setBars]    = useState(true);
  const [tick,    setTick]    = useState(0);          // relance la barre de progression
  const mouse = useRef({ x: 0, y: 0 });
  const bgRef = useRef<HTMLDivElement>(null);

  const current = hovered ?? active;

  /* ── Entrée ── */
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 120);
    const t2 = setTimeout(() => setBars(false), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ── Défilement automatique, en pause au survol ── */
  useEffect(() => {
    if (hovered !== null) return;
    const id = setInterval(() => {
      setActive(a => (a + 1) % SPECIALTIES.length);
      setTick(t => t + 1);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [hovered]);

  /* ── Parallaxe douce de la photo avec la souris ── */
  useEffect(() => {
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const loop = () => {
      cur.x += (mouse.current.x - cur.x) * 0.05;
      cur.y += (mouse.current.y - cur.y) * 0.05;
      if (bgRef.current)
        bgRef.current.style.transform = `translate(${(-cur.x * 14).toFixed(2)}px, ${(-cur.y * 10).toFixed(2)}px) scale(1.06)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 1s ease ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section className="ld" style={{
      position: "relative", minHeight: "100vh", background: "#070707",
      overflow: "hidden", color: "#f5f0eb",
      display: "flex", flexDirection: "column",
    }}>

      {/* ── Barres orange d'entrée ── */}
      {bars && (
        <div style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none", overflow: "hidden", display: "flex", flexDirection: "column", gap: 7 }}>
          {F1_BARS.map((bar, i) => (
            <div key={i} style={{ flex: bar.flex, position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, bottom: 0, left: "-20%", width: "140%",
                background: "linear-gradient(to right, #5c1505, #b03010 12%, #e05a2b 35%, #ff7040 52%, #ffac7a 62%, #e05a2b 78%, #881e08 92%, #5c1505)",
                animation: `ldBar 0.60s cubic-bezier(0.77,0,0.175,1) ${bar.delay}ms both`,
              }} />
            </div>
          ))}
        </div>
      )}

      {/* ── Photos de fond (fondu enchaîné) ── */}
      <div ref={bgRef} style={{ position: "absolute", inset: 0, zIndex: 0, willChange: "transform", transform: "scale(1.06)" }}>
        {SPECIALTIES.map((s, i) => (
          <div key={s.img} style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${s.img})`,
            backgroundSize: "cover", backgroundPosition: s.pos,
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.04)",
            transition: "opacity 1.1s cubic-bezier(0.4,0,0.2,1), transform 6s ease-out",
          }} />
        ))}
      </div>

      {/* ── Voiles sombres ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(90deg, rgba(7,7,7,0.92) 0%, rgba(7,7,7,0.72) 38%, rgba(7,7,7,0.35) 70%, rgba(7,7,7,0.55) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(7,7,7,0.55) 0%, transparent 30%, transparent 60%, rgba(7,7,7,0.9) 100%)" }} />

      {/* ── Grain ── */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2, opacity: 0.07, mixBlendMode: "overlay" }} aria-hidden>
        <filter id="grain-ld"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#grain-ld)" />
      </svg>

      {/* ── Lueur orange ── */}
      <div style={{ position: "absolute", left: "-10%", bottom: "-20%", width: "55vw", height: "55vw", zIndex: 1, pointerEvents: "none", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(224,90,43,0.22) 0%, rgba(224,90,43,0.06) 40%, transparent 68%)", filter: "blur(40px)" }} />

      {/* ── Label vertical ── */}
      <div className="ld-vert" style={{
        position: "absolute", left: 28, top: "50%", zIndex: 5,
        transform: "translateY(-50%) rotate(180deg)", writingMode: "vertical-rl",
        fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase",
        color: "rgba(245,240,235,0.3)", whiteSpace: "nowrap",
        ...reveal(900),
      }}>
        Seno Studio — Photographe &amp; Vidéaste — Bordeaux
      </div>

      {/* ── Contenu principal ── */}
      <div className="ld-grid" style={{
        position: "relative", zIndex: 5, flex: 1,
        display: "grid", gridTemplateColumns: "minmax(0, 1.25fr) minmax(0, 0.75fr)",
        alignItems: "end", gap: 48,
        padding: "132px clamp(28px, 6vw, 96px) 40px clamp(64px, 8vw, 128px)",
      }}>

        {/* Colonne gauche */}
        <div style={{ maxWidth: 760 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 14, marginBottom: 30,
            fontFamily: "var(--condensed)", fontSize: 10, fontWeight: 600,
            letterSpacing: "0.42em", textTransform: "uppercase", color: "#e05a2b",
            ...reveal(300),
          }}>
            <span style={{ width: 36, height: 1, background: "#e05a2b", display: "inline-block" }} />
            Photographe &amp; Vidéaste · Bordeaux
          </div>

          <h1 style={{ margin: 0, lineHeight: 0.9, letterSpacing: "-0.035em", fontWeight: 300 }}>
            <span className="ld-line" style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
              <span style={{
                display: "block", fontFamily: "var(--serif)", fontStyle: "italic",
                fontSize: "clamp(64px, 10.5vw, 176px)", color: "#f5f0eb",
                transform: loaded ? "translateY(0)" : "translateY(110%)",
                transition: "transform 1.3s cubic-bezier(0.16,1,0.3,1) 350ms",
              }}>Un regard</span>
            </span>
            <span className="ld-line" style={{ display: "block", overflow: "hidden", paddingBottom: "0.12em" }}>
              <span style={{
                display: "block", fontFamily: "var(--serif)", fontStyle: "italic",
                fontSize: "clamp(64px, 10.5vw, 176px)", color: "#e05a2b",
                transform: loaded ? "translateY(0)" : "translateY(110%)",
                transition: "transform 1.3s cubic-bezier(0.16,1,0.3,1) 500ms",
              }}>suffit.</span>
            </span>
          </h1>

          <p style={{
            fontFamily: "var(--sans)", fontSize: "clamp(15px, 1.15vw, 18px)", fontWeight: 400,
            lineHeight: 1.7, color: "rgba(245,240,235,0.72)", maxWidth: 520,
            margin: "26px 0 0", ...reveal(750),
          }}>
            Bienvenue sur mon site. Vous y trouverez mon portfolio ainsi que l&rsquo;ensemble des prestations que je propose, à Bordeaux et partout en France.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap", marginTop: 40, ...reveal(900) }}>
            <a href="/portfolio" className="btn-arrow btn-arrow-orange">Mon travail →</a>
            <a href="/a-propos" className="ld-link">À propos</a>
            <a href="/contact" className="ld-link">Contact</a>
          </div>
        </div>

        {/* Colonne droite : spécialités */}
        <nav className="ld-list" aria-label="Spécialités" style={{ justifySelf: "end", width: "100%", maxWidth: 360, ...reveal(600) }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.45em",
            textTransform: "uppercase", color: "rgba(245,240,235,0.35)",
            paddingBottom: 14, marginBottom: 6, borderBottom: "1px solid rgba(245,240,235,0.12)",
          }}>
            <span>Mes spécialités</span>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 13, letterSpacing: "0.1em", color: "#e05a2b" }}>
              {String(current + 1).padStart(2, "0")} / {String(SPECIALTIES.length).padStart(2, "0")}
            </span>
          </div>

          {SPECIALTIES.map((s, i) => {
            const on = i === current;
            return (
              <a
                key={s.label}
                href={`/portfolio?theme=${s.theme}`}
                className="ld-item"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => { setHovered(null); setActive(i); setTick(t => t + 1); }}
                style={{
                  display: "flex", alignItems: "center", gap: 18,
                  padding: "9px 0", textDecoration: "none",
                  borderBottom: "1px solid rgba(245,240,235,0.07)",
                  color: on ? "#f5f0eb" : "rgba(245,240,235,0.38)",
                  transition: "color 0.35s ease",
                }}
              >
                <span style={{
                  fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.3em",
                  color: on ? "#e05a2b" : "rgba(245,240,235,0.25)", width: 22, flexShrink: 0,
                  transition: "color 0.35s ease",
                }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{
                  fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300,
                  fontSize: "clamp(22px, 2.1vw, 32px)", lineHeight: 1.1, letterSpacing: "-0.02em",
                  transform: on ? "translateX(10px)" : "translateX(0)",
                  transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                }}>{s.label}</span>
                <span style={{
                  marginLeft: "auto", fontSize: 14, color: "#e05a2b",
                  opacity: on ? 1 : 0, transform: on ? "translateX(0)" : "translateX(-8px)",
                  transition: "opacity 0.3s ease, transform 0.4s ease",
                }}>→</span>
              </a>
            );
          })}

          {/* Barre de progression du défilement auto */}
          <div style={{ height: 1, background: "rgba(245,240,235,0.1)", marginTop: 14, overflow: "hidden" }}>
            <div key={tick} style={{
              height: "100%", background: "#e05a2b", transformOrigin: "left",
              animation: hovered === null ? `ldProgress ${AUTO_MS}ms linear both` : "none",
              transform: hovered === null ? undefined : "scaleX(1)",
            }} />
          </div>
        </nav>
      </div>

      {/* ── Spécialité en cours (mobile uniquement, la liste y est masquée) ── */}
      <a href={`/portfolio?theme=${SPECIALTIES[current].theme}`} className="ld-mobile-spec" style={{
        position: "relative", zIndex: 5, display: "none",
        alignItems: "center", gap: 12, textDecoration: "none",
        margin: "0 clamp(24px, 6vw, 64px) 22px",
        paddingTop: 14, borderTop: "1px solid rgba(245,240,235,0.12)",
        ...reveal(1000),
      }}>
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 12, letterSpacing: "0.1em", color: "#e05a2b" }}>
          {String(current + 1).padStart(2, "0")} / {String(SPECIALTIES.length).padStart(2, "0")}
        </span>
        <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 24, color: "#f5f0eb", letterSpacing: "-0.02em" }}>
          {SPECIALTIES[current].label}
        </span>
        <span style={{ marginLeft: "auto", color: "#e05a2b", fontSize: 14 }}>→</span>
      </a>

      {/* ── Barre du bas ── */}
      <div className="ld-foot" style={{
        position: "relative", zIndex: 5,
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap",
        padding: "0 clamp(28px, 6vw, 96px) 30px clamp(64px, 8vw, 128px)",
        ...reveal(1100),
      }}>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          <a href="https://www.instagram.com/seno_std/" target="_blank" rel="noopener noreferrer" className="ld-social">Instagram</a>
          <a href="mailto:contact.senostudio@gmail.com" className="ld-social">contact.senostudio@gmail.com</a>
          <a href="tel:+33768868505" className="ld-social">07 68 86 85 05</a>
        </div>
        <div style={{ fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,240,235,0.3)" }}>
          Bordeaux · France entière · <span style={{ color: "#e05a2b" }}>Disponible</span>
        </div>
      </div>

      <style>{`
        @keyframes ldBar {
          0%   { transform: skewX(-18deg) translateX(-92%); }
          44%  { transform: skewX(-18deg) translateX(0%);   }
          100% { transform: skewX(-18deg) translateX(92%);  }
        }
        @keyframes ldProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .ld-link {
          font-family: var(--condensed); font-size: 11px; font-weight: 700;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(245,240,235,0.75); text-decoration: none;
          position: relative; padding-bottom: 6px; transition: color 0.25s ease;
        }
        .ld-link::after {
          content: ''; position: absolute; left: 0; bottom: 0; height: 1px; width: 100%;
          background: rgba(245,240,235,0.25);
          transition: background 0.3s ease, transform 0.4s cubic-bezier(0.77,0,0.175,1);
        }
        .ld-link:hover { color: #fff; }
        .ld-link:hover::after { background: #e05a2b; transform: scaleX(1.15); }

        .ld-social {
          font-family: var(--condensed); font-size: 9px; font-weight: 600;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: rgba(245,240,235,0.45); text-decoration: none;
          position: relative; padding-bottom: 3px; transition: color 0.25s ease;
        }
        .ld-social::after {
          content: ''; position: absolute; left: 0; bottom: 0; width: 0; height: 1px;
          background: #e05a2b; transition: width 0.35s cubic-bezier(0.77,0,0.175,1);
        }
        .ld-social:hover { color: #fff; }
        .ld-social:hover::after { width: 100%; }

        .ld-item:hover { color: #f5f0eb !important; }

        @media (prefers-reduced-motion: reduce) {
          .ld, .ld * { transition: none !important; animation: none !important; }
        }
        @media (max-width: 1024px) {
          .ld-grid { grid-template-columns: 1fr !important; align-items: start !important; gap: 36px !important; padding-left: clamp(24px, 6vw, 64px) !important; padding-top: 110px !important; }
          .ld-list { justify-self: start !important; max-width: 100% !important; }
          .ld-vert { display: none !important; }
          .ld-foot { padding-left: clamp(24px, 6vw, 64px) !important; }
        }
        @media (max-width: 640px) {
          .ld-list { display: none !important; }
          .ld-mobile-spec { display: flex !important; }
          .ld-foot { flex-direction: column; align-items: flex-start !important; gap: 14px !important; padding-bottom: 24px !important; }
        }
      `}</style>
    </section>
  );
}
