"use client";
import { useEffect, useRef } from "react";

const WORDS = ["Donner", "vie", "à", "votre", "vision."];
const LAST_WORD_IDX = WORDS.length - 1;
const WORD_STARTS = WORDS.reduce<number[]>((acc, _w, i) =>
  [...acc, i === 0 ? 0 : acc[i - 1] + WORDS[i - 1].length], []);
const TOTAL_CHARS = WORDS.reduce((s, w) => s + w.length, 0);

const RANGE = 1000;


interface SideImgCfg {
  src: string;
  l?: string; r?: string; top: string;
  rot: number; w: string; h: string;
  pTrigger: number;
  delay: number;
}

/* Photos grandes, positionnées pour ne jamais déborder du container */
const SIDE_IMGS: SideImgCfg[] = [
  // GAUCHE
  { src: "/images/theme-portrait.jpg",  l: "2vw",  top: "3%",  rot: -4,  w: "17vw", h: "48vh", pTrigger: 0.52, delay: 0   },
  { src: "/images/wedding-rings.jpg",   l: "16vw", top: "14%", rot: -12, w: "10vw", h: "24vh", pTrigger: 0.65, delay: 120 },
  { src: "/images/theme-mode.jpg",      l: "2vw",  top: "46%", rot: -7,  w: "13vw", h: "24vh", pTrigger: 0.77, delay: 60  },
  // DROITE
  { src: "/images/wedding-dance.jpg",   r: "2vw",  top: "3%",  rot: 4,   w: "17vw", h: "48vh", pTrigger: 0.56, delay: 80  },
  { src: "/images/wedding-couple.jpg",  r: "16vw", top: "12%", rot: 11,  w: "10vw", h: "22vh", pTrigger: 0.69, delay: 200 },
  { src: "/images/hero-4k-6.jpg",       r: "2vw",  top: "44%", rot: 5,   w: "13vw", h: "26vh", pTrigger: 0.81, delay: 140 },
];

export default function ScrollPhrase() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const charRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const accentRef   = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);
  const imgRefs     = useRef<(HTMLDivElement | null)[]>([]);
  // track which photos have already been triggered
  const triggered   = useRef<boolean[]>(SIDE_IMGS.map(() => false));

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let innerH = window.innerHeight;
    const onResize2 = () => { innerH = window.innerHeight; update(); };

    const update = () => {
      const top = wrapper.getBoundingClientRect().top;
      const OFFSET = Math.round(innerH * 0.95);
      const p = Math.max(0, Math.min(1, (OFFSET - top) / RANGE));

      // Chars
      charRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = (i / TOTAL_CHARS) * 0.88;
        const end   = ((i + 1) / TOTAL_CHARS) * 0.88;
        const lp    = Math.max(0, Math.min(1, (p - start) / (end - start)));
        el.style.opacity   = String(0.06 + lp * 0.94);
        el.style.transform = `translateY(${(1 - lp) * 22}px)`;
        el.style.filter    = lp < 0.6 ? `blur(${(1 - lp / 0.6) * 3}px)` : "";
      });

      if (accentRef.current)
        accentRef.current.style.width = p > 0.9 ? "72px" : "0px";
      if (hintRef.current)
        hintRef.current.style.opacity = p < 0.08 ? "1" : "0";

      // Photos — déclenche la CSS transition une seule fois par photo
      SIDE_IMGS.forEach((cfg, i) => {
        if (triggered.current[i]) return;
        if (p < cfg.pTrigger) return;
        triggered.current[i] = true;
        const el = imgRefs.current[i];
        if (!el) return;
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.clipPath = cfg.l
            ? "polygon(-5% 0, 120% 0, 112% 100%, -5% 100%)"
            : "polygon(-20% 0, 105% 0, 100% 100%, -12% 100%)";
        }, cfg.delay);
      });
    };

    update();
    window.addEventListener("scroll",  update,    { passive: true });
    window.addEventListener("resize",  onResize2, { passive: true });
    document.fonts?.ready.then(() => { innerH = window.innerHeight; update(); });

    return () => {
      window.removeEventListener("scroll",  update);
      window.removeEventListener("resize",  onResize2);
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: "calc(55vh + 1000px)", background: "#fff", position: "relative", isolation: "isolate" }}>

      <div style={{
        position: "sticky", top: 0, height: "55vh",
        background: "#fff", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Grain */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} aria-hidden>
          <filter id="grain-scroll">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-scroll)" opacity="0.04" />
        </svg>

        {/* Photos — wipe F1 déclenché une seule fois au bon moment */}
        {SIDE_IMGS.map((img, i) => (
          <div
            key={i}
            ref={el => { imgRefs.current[i] = el; }}
            className="sp-img"
            style={{
              position: "absolute",
              ...(img.l ? { left: img.l } : {}),
              ...(img.r ? { right: img.r } : {}),
              top: img.top,
              width: img.w,
              height: img.h,
              opacity: 0,
              transform: `rotate(${img.rot}deg)`,
              clipPath: img.l
                ? "polygon(0 0, 9% 0, 0 100%, 0 100%)"
                : "polygon(91% 0, 100% 0, 100% 100%, 100% 100%)",
              overflow: "hidden",
              borderRadius: 18,
              boxShadow: "0 16px 48px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.14)",
              zIndex: 1,
              pointerEvents: "none",
              /* Transition CSS fluide — pas frame-by-frame */
              transition: "clip-path 1.1s cubic-bezier(0.77,0,0.175,1), opacity 0.45s ease",
            }}
          >
            <img
              src={img.src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}

        {/* Hint */}
        <div ref={hintRef} style={{
          position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          transition: "opacity 0.6s", zIndex: 3,
        }}>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #e05a2b, transparent)", animation: "spulse 2.2s ease-in-out infinite" }} />
        </div>

        {/* Label */}
        <div style={{ position: "absolute", top: 20, left: 36, zIndex: 3, fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(0,0,0,0.18)" }}>— Vision</div>

        {/* Phrase — z-index au-dessus des photos */}
        <div style={{ position: "relative", zIndex: 4, textAlign: "center", width: "min(52vw, 800px)" }}>
          <h2 style={{
            fontFamily: "var(--serif)", fontStyle: "italic",
            fontSize: "clamp(28px, 5vw, 78px)",
            fontWeight: 300, lineHeight: 1.15,
            letterSpacing: "-0.02em", margin: 0, textAlign: "center",
          }}>
            {WORDS.map((word, wi) => (
              <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: wi < WORDS.length - 1 ? "0.25em" : 0 }}>
                {word.split("").map((char, ci) => {
                  const idx = WORD_STARTS[wi] + ci;
                  return (
                    <span
                      key={ci}
                      ref={el => { charRefs.current[idx] = el; }}
                      style={{
                        display: "inline-block", opacity: 0.06,
                        color: wi === LAST_WORD_IDX ? "#e05a2b" : "#0a0a0a",
                        willChange: "opacity, transform, filter",
                      }}
                    >{char}</span>
                  );
                })}
              </span>
            ))}
          </h2>
          <div ref={accentRef} style={{ height: 1, background: "#e05a2b", width: 0, margin: "32px auto 0", transition: "width 0.95s cubic-bezier(0.77,0,0.175,1)" }} />
        </div>
      </div>

      {/* Fondu blanc → beige WhoAmI */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 140,
        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)",
        pointerEvents: "none",
        zIndex: 10,
      }} />

      <style>{`
        @keyframes spulse {
          0%,100% { opacity:.2; transform:scaleY(.6); transform-origin:top; }
          50%      { opacity:.8; transform:scaleY(1);  transform-origin:top; }
        }
        @media (max-width: 900px) { .sp-img { display: none !important; } }
      `}</style>
    </div>
  );
}
