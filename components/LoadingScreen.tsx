"use client";
import { useEffect, useState } from "react";

type Phase = "showcase" | "expanding" | "bars" | "fading" | "done";

const BARS = [
  { flex: 2, delay: 0   }, { flex: 1, delay: 55  }, { flex: 3, delay: 110 },
  { flex: 1, delay: 165 }, { flex: 2, delay: 220 },
];

interface Photo { src: string; left?: string; right?: string; top?: string; bottom?: string; rot: number; w: string; h: string; }
interface Slide { lines: string[]; size: string; photos: Photo[]; }
interface PhraseGroup { text: string; size: string; orange?: boolean; condensed?: boolean; }

/* ─── Groupes phrase ─── */
const PHRASE_GROUPS: PhraseGroup[] = [
  { text: "Vous cherchez un",  size: "clamp(44px,5.5vw,78px)" },
  { text: "photographe",       size: "clamp(96px,14.5vw,196px)" },
  { text: "ou",                size: "clamp(32px,4.0vw,56px)" },
  { text: "un vidéaste",       size: "clamp(88px,13.5vw,182px)", orange: true },
];

const G_IN_MS    = 280;
const G_HOLD_MS  = 360;
const G_OUT_MS   = 170;
const G_GAP_MS   = 40;
const G_SLOT_MS  = G_IN_MS + G_HOLD_MS + G_OUT_MS + G_GAP_MS; // 850ms
const PHRASE_TOTAL = PHRASE_GROUPS.length * G_SLOT_MS;          // 3400ms

/* ─── Cycle spécialités ─── */
const SHOW_MS   = 420;
const FADE_MS   = 160;
const STEP_MS   = SHOW_MS + FADE_MS * 2; // 740ms
const CYCLE_MS  = STEP_MS * 10;          // 7400ms
const BV_MS     = 640;
const EXPAND_AT = PHRASE_TOTAL + 80 + CYCLE_MS + FADE_MS + BV_MS; // ~9590ms

const SLIDES: Slide[] = [
  { lines: ["Mariage"], size: "clamp(62px,11vw,148px)", photos: [
    { src: "/images/hero-maries.jpg",    left:  "0%",  top:    "8%",  rot: -7, w: "25vw", h: "36vh" },
    { src: "/images/wedding-dance.jpg",  right: "0%",  top:    "22%", rot:  5, w: "20vw", h: "28vh" },
    { src: "/images/hero-4k-2.jpg",      right: "21%", bottom: "8%",  rot: -4, w: "14vw", h: "19vh" },
  ]},
  { lines: ["Entreprise"], size: "clamp(56px,10vw,132px)", photos: [
    { src: "/images/entreprise.jpg",     right: "0%",  top:    "14%", rot:  4, w: "26vw", h: "36vh" },
    { src: "/images/hero-4k-14.jpg",     left:  "1%",  top:    "26%", rot: -6, w: "19vw", h: "27vh" },
  ]},
  { lines: ["Restauration","& Gastronomie"], size: "clamp(42px,7.5vw,100px)", photos: [
    { src: "/images/theme-gastronomie.jpg", left: "0%", top: "12%",   rot: -5, w: "25vw", h: "34vh" },
    { src: "/images/hero-4k-1.jpg",      right: "1%",  top:    "26%", rot:  6, w: "19vw", h: "27vh" },
  ]},
  { lines: ["Immobilier","& Architecture"], size: "clamp(42px,7.5vw,100px)", photos: [
    { src: "/images/theme-immobilier.jpg", right: "0%", top: "10%",   rot:  6, w: "25vw", h: "35vh" },
    { src: "/images/hero-new.jpg",       left:  "1%",  top:    "22%", rot: -5, w: "20vw", h: "28vh" },
    { src: "/images/A7409829.jpg",       left:  "22%", bottom: "8%",  rot:  4, w: "14vw", h: "19vh" },
  ]},
  { lines: ["Marque & Mode"], size: "clamp(52px,9.5vw,124px)", photos: [
    { src: "/images/theme-mode.jpg",     left:  "0%",  top:    "12%", rot: -6, w: "25vw", h: "35vh" },
    { src: "/images/hero-4k-4.jpg",      right: "1%",  top:    "20%", rot:  5, w: "19vw", h: "27vh" },
    { src: "/images/LOANE%202.jpg",      right: "21%", bottom: "8%",  rot: -3, w: "14vw", h: "19vh" },
  ]},
  { lines: ["Événementiel"], size: "clamp(50px,9vw,116px)", photos: [
    { src: "/images/theme-evenement.jpg", right: "0%", bottom: "14%", rot: 5, w: "25vw", h: "34vh" },
    { src: "/images/DSC00306.jpg",       left:  "0%",  top:    "16%", rot: -5, w: "20vw", h: "29vh" },
    { src: "/images/hero-maries2.jpg",   left:  "21%", bottom: "8%",  rot:  4, w: "14vw", h: "19vh" },
  ]},
  { lines: ["Sport & Outdoor"], size: "clamp(46px,8.5vw,110px)", photos: [
    { src: "/images/theme-sport.jpg",    left:  "0%",  top:    "6%",  rot: -4, w: "25vw", h: "37vh" },
    { src: "/images/hero-4k-3.jpg",      right: "0%",  top:    "22%", rot:  6, w: "19vw", h: "27vh" },
    { src: "/images/hero-4k-10.jpg",     right: "20%", bottom: "8%",  rot: -5, w: "14vw", h: "19vh" },
  ]},
  { lines: ["Vin & Terroir"], size: "clamp(54px,10vw,128px)", photos: [
    { src: "/images/theme-vin.jpg",      right: "0%",  top:    "16%", rot:  7, w: "25vw", h: "34vh" },
    { src: "/images/hero-4k-6.jpg",      left:  "1%",  top:    "22%", rot: -5, w: "19vw", h: "27vh" },
  ]},
  { lines: ["Portrait","& Lifestyle"], size: "clamp(46px,8.5vw,110px)", photos: [
    { src: "/images/theme-portrait.jpg", left:  "0%",  top:    "12%", rot: -5, w: "24vw", h: "33vh" },
    { src: "/images/hero-4k-7.jpg",      right: "1%",  top:    "18%", rot:  6, w: "19vw", h: "27vh" },
    { src: "/images/hero-maries4.jpg",   right: "20%", bottom: "8%",  rot: -6, w: "14vw", h: "19vh" },
  ]},
  { lines: ["Famille","& Naissance"], size: "clamp(42px,7.5vw,100px)", photos: [
    { src: "/images/theme-famille.jpg",  right: "0%",  top:    "14%", rot:  4, w: "25vw", h: "36vh" },
    { src: "/images/wedding-ceremony.jpg", left: "0%", top:    "20%", rot: -6, w: "20vw", h: "28vh" },
    { src: "/images/magazine.jpg",       left:  "21%", bottom: "8%",  rot:  5, w: "14vw", h: "19vh" },
  ]},
];

export default function LoadingScreen() {
  const [hasMounted, setHasMounted] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    const already = !!sessionStorage.getItem("seno-intro-shown");
    if (!already) sessionStorage.setItem("seno-intro-shown", "1");
    setSkip(already);
    setHasMounted(true);
  }, []);

  const handleSkip = () => { setSkip(true); };

  const [phase,    setPhase]    = useState<Phase>("showcase");
  const [groupIdx, setGroupIdx] = useState(-1);
  const [groupIn,  setGroupIn]  = useState(false);
  const [groupOut, setGroupOut] = useState(false);
  const [cycling,  setCycling]  = useState(false);
  const [step,     setStep]     = useState(0);
  const [visible,  setVisible]  = useState(false);

  /* Global phases */
  useEffect(() => {
    if (skip) return;
    const t1 = setTimeout(() => setPhase("expanding"), EXPAND_AT);
    const t2 = setTimeout(() => setPhase("bars"),      EXPAND_AT + 950);
    const t3 = setTimeout(() => setPhase("fading"),    EXPAND_AT + 1800);
    const t4 = setTimeout(() => setPhase("done"),      EXPAND_AT + 1970);
    return () => { [t1, t2, t3, t4].forEach(clearTimeout); };
  }, [skip]);

  /* Phrase groupée */
  useEffect(() => {
    if (skip) return;
    const ts: ReturnType<typeof setTimeout>[] = [];
    PHRASE_GROUPS.forEach((_, i) => {
      const s = i * G_SLOT_MS;
      ts.push(setTimeout(() => { setGroupIdx(i); setGroupIn(false); setGroupOut(false); }, s));
      ts.push(setTimeout(() => setGroupIn(true), s + 20));
      ts.push(setTimeout(() => { setGroupIn(false); setGroupOut(true); }, s + G_IN_MS + G_HOLD_MS));
    });
    ts.push(setTimeout(() => { setGroupIdx(-1); setCycling(true); }, PHRASE_TOTAL));
    return () => ts.forEach(clearTimeout);
  }, [skip]);

  /* Cycle spécialités */
  useEffect(() => {
    if (!cycling) return;
    setVisible(false);
    const fi = setTimeout(() => setVisible(true), 60);
    let s = 0;
    const cycle = () => {
      setVisible(false);
      setTimeout(() => { s++; setStep(s); setVisible(true); }, FADE_MS);
    };
    const iv   = setInterval(cycle, STEP_MS);
    const stop = setTimeout(() => clearInterval(iv), CYCLE_MS + FADE_MS);
    return () => { clearTimeout(fi); clearInterval(iv); clearTimeout(stop); };
  }, [cycling]);

  if (!hasMounted || skip || phase === "done") return null;

  const isOpen    = phase !== "showcase";
  const bienvenue = step >= SLIDES.length;
  const slide     = bienvenue ? null : SLIDES[step];
  const curGroup  = groupIdx >= 0 ? PHRASE_GROUPS[groupIdx] : null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#0a0a0a", overflow: "hidden",
      opacity: phase === "fading" ? 0 : 1,
      transition: phase === "fading" ? "opacity 0.17s ease" : "none",
      pointerEvents: phase === "fading" ? "none" : "all",
    }}>

      {/* Préchargement silencieux */}
      <div style={{ display: "none" }} aria-hidden>
        {SLIDES.flatMap(s => s.photos).map((p, i) => <img key={i} src={p.src} alt="" />)}
      </div>

      {/* Grain */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} aria-hidden>
        <filter id="grain-load">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-load)" opacity="0.06" />
      </svg>

      {/* Ovale */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: "100vmax", height: "100vmax",
        marginTop: "-50vmax", marginLeft: "-50vmax",
        borderRadius: "50%", background: "#fff",
        transform: isOpen ? "scale(3.2)" : "scale(0.001) scaleY(0.18)",
        transition: phase === "expanding" ? "transform 0.92s cubic-bezier(0.77,0,0.175,1)" : "none",
        willChange: "transform", zIndex: 1,
      }} />

      {/* ═══ SHOWCASE ═══ */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        opacity: phase === "showcase" ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: "none",
      }}>

        {/* ── PHRASE GROUPÉE ── */}
        {!cycling && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {curGroup && (
              <div
                key={groupIdx}
                style={{
                  fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300,
                  fontSize: curGroup.size,
                  color: curGroup.orange ? "#e05a2b" : "#f5f0eb",
                  letterSpacing: "-0.03em",
                  textAlign: "center", lineHeight: 1.05,
                  opacity: groupIn ? 1 : 0,
                  transform: groupIn
                    ? "translateY(0px) scale(1)"
                    : groupOut
                      ? "translateY(-22px) scale(0.92)"
                      : "translateY(44px) scale(1.14)",
                  filter: groupIn ? "blur(0px)" : groupOut ? "blur(5px)" : "blur(9px)",
                  transition: groupOut
                    ? `opacity ${G_OUT_MS}ms cubic-bezier(0.4,0,1,1), transform ${G_OUT_MS}ms cubic-bezier(0.4,0,1,1), filter ${G_OUT_MS}ms ease`
                    : `opacity ${G_IN_MS}ms cubic-bezier(0.22,1,0.36,1), transform ${G_IN_MS}ms cubic-bezier(0.22,1,0.36,1), filter ${G_IN_MS}ms ease`,
                  willChange: "opacity, transform, filter",
                }}
              >
                {curGroup.text}
              </div>
            )}
          </div>
        )}

        {/* ── PHASE CYCLE ── */}
        {cycling && (
          <>
            {/* Photos */}
            <div style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease` }}>
              {slide?.photos.map((p, i) => (
                <div key={i} className="ls-photo" style={{
                  position: "absolute",
                  ...(p.left   ? { left:   p.left   } : {}),
                  ...(p.right  ? { right:  p.right  } : {}),
                  ...(p.top    ? { top:    p.top    } : {}),
                  ...(p.bottom ? { bottom: p.bottom } : {}),
                  width: p.w, height: p.h,
                  transform: `rotate(${p.rot}deg)`,
                  overflow: "hidden", borderRadius: 18,
                  boxShadow: "0 32px 80px rgba(0,0,0,0.75), 0 8px 24px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}>
                  <img src={p.src} alt="" loading="eager"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>

            {/* Vignette */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 52% 60% at center, transparent 28%, rgba(0,0,0,0.55) 100%)",
              pointerEvents: "none", zIndex: 1,
            }} />

            {/* Texte spécialité */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: visible ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease`,
              pointerEvents: "none",
            }}>
              {bienvenue ? (
                <div style={{
                  fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300,
                  fontSize: "clamp(62px,11vw,148px)", color: "#f5f0eb",
                  letterSpacing: "-0.03em", lineHeight: 1,
                }}>Bienvenue.</div>
              ) : slide && (
                <div style={{ textAlign: "center" }}>
                  {slide.lines.map((line, li) => (
                    <div key={li} style={{
                      fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300,
                      fontSize: slide.size, color: "#f5f0eb",
                      letterSpacing: "-0.025em",
                      lineHeight: slide.lines.length > 1 ? 0.92 : 1, display: "block",
                    }}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Brand — toujours visible */}
        <div style={{
          position: "absolute", bottom: 28, left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center", whiteSpace: "nowrap", zIndex: 3,
        }}>
          <div style={{ width: 1, height: 26, background: "linear-gradient(to bottom, transparent, #e05a2b)", margin: "0 auto 12px" }} />
          <div style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "clamp(19px,1.9vw,26px)", fontWeight: 300, color: "#f5f0eb", letterSpacing: "-0.02em", lineHeight: 1 }}>Seno</div>
          <div style={{ fontFamily: "var(--condensed)", fontSize: 9, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", color: "#e05a2b", marginTop: 4 }}>Studio</div>
          <div style={{ width: 20, height: 1, background: "#e05a2b", margin: "8px auto", opacity: 0.55 }} />
          <div style={{ fontFamily: "var(--condensed)", fontSize: 7, letterSpacing: "0.42em", textTransform: "uppercase", color: "rgba(245,240,235,0.18)" }}>Photographe ou Vidéaste · Bordeaux</div>
        </div>
      </div>

      {/* Bouton skip */}
      <button
        onClick={handleSkip}
        style={{
          position: "absolute", bottom: 32, right: 36, zIndex: 10,
          background: "none", border: "1px solid rgba(255,255,255,0.15)",
          cursor: "pointer", borderRadius: 100,
          fontFamily: "var(--condensed)", fontSize: 9,
          letterSpacing: "0.35em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)", padding: "8px 18px",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.4)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)";
        }}
      >
        Passer →
      </button>

      {/* F1 bars */}
      {phase === "bars" && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          pointerEvents: "none", overflow: "hidden",
          display: "flex", flexDirection: "column", gap: 7,
        }}>
          {BARS.map((bar, i) => (
            <div key={i} style={{ flex: bar.flex, position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, bottom: 0, left: "-20%", width: "140%",
                background: "linear-gradient(to right, #5c1505, #b03010 12%, #e05a2b 35%, #ff7040 52%, #ffac7a 62%, #e05a2b 78%, #881e08 92%, #5c1505)",
                animation: `lsBar 0.68s cubic-bezier(0.77,0,0.175,1) ${bar.delay}ms both`,
              }} />
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes lsBar {
          0%   { transform: skewX(-18deg) translateX(-92%); }
          44%  { transform: skewX(-18deg) translateX(0%);   }
          100% { transform: skewX(-18deg) translateX(92%);  }
        }
        @media (max-width: 900px) { .ls-photo { display: none !important; } }
      `}</style>
    </div>
  );
}
