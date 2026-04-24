"use client";
import { useEffect, useRef, useState } from "react";

/* ── Effets hover uniques par lettre de STUDIO ── */
const STUDIO_HOVER: React.CSSProperties[] = [
  { WebkitTextFillColor: "rgba(201,168,76,0.9)", WebkitTextStroke: "1px rgba(201,168,76,1)", filter: "drop-shadow(0 0 14px rgba(201,168,76,0.5))" },
  { WebkitTextStroke: "1px rgba(255,255,255,0.95)", filter: "drop-shadow(0 0 22px rgba(255,255,255,0.55)) drop-shadow(0 0 6px rgba(255,255,255,0.4))" },
  { WebkitTextFillColor: "rgba(245,228,185,0.65)", WebkitTextStroke: "1px rgba(245,228,185,0.85)", filter: "drop-shadow(0 0 10px rgba(245,228,185,0.3))" },
  { WebkitTextStroke: "2px rgba(201,168,76,1)", filter: "drop-shadow(0 0 16px rgba(201,168,76,0.65))" },
  { WebkitTextFillColor: "rgba(255,252,238,0.92)", WebkitTextStroke: "0px transparent", filter: "drop-shadow(0 0 24px rgba(255,248,215,1)) drop-shadow(0 0 8px rgba(255,248,215,0.7))" },
  { WebkitTextFillColor: "rgba(201,168,76,0.78)", WebkitTextStroke: "1.5px rgba(230,195,100,1)", filter: "drop-shadow(0 0 20px rgba(201,168,76,0.7)) drop-shadow(0 0 40px rgba(201,168,76,0.25))" },
];

const BASE_LETTER: React.CSSProperties = {
  fontFamily: "'Cinzel', serif",
  fontSize: "clamp(80px, 17vw, 220px)",
  fontWeight: 400, lineHeight: 0.85, letterSpacing: "0.12em",
  WebkitTextStroke: "1px rgba(250,248,244,0.55)",
  WebkitTextFillColor: "transparent", color: "transparent",
  display: "inline-block", cursor: "none",
  willChange: "transform",
};

/* ── Helper : cache des positions relatives (1 reflow/frame au lieu de N) ── */
function useCachedOffsets(containerRef: React.RefObject<HTMLDivElement | null>, selector: string) {
  const offsets = useRef<{ cx: number; cy: number }[]>([]);
  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      offsets.current = Array.from(el.querySelectorAll<HTMLSpanElement>(selector)).map(s => ({
        cx: s.offsetLeft + s.offsetWidth / 2,
        cy: s.offsetTop + s.offsetHeight / 2,
      }));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [containerRef, selector]);
  return offsets;
}

/* ── STUDIO avec hover unique par lettre + magnétisme optimisé ── */
function StudioLetters({ mouseRef, visible, isLight }: {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  visible: boolean;
  isLight: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const offsets = useCachedOffsets(containerRef, ".sl");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(".sl"));
    const loop = () => {
      const { x, y } = mouseRef.current;
      const rect = el.getBoundingClientRect(); // 1 seul reflow par frame
      spans.forEach((span, i) => {
        const off = offsets.current[i];
        if (!off) return;
        const cx = rect.left + off.cx, cy = rect.top + off.cy;
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0.1) {
          const f = (1 - dist / 200) * 36;
          span.style.transform = `translate(${-dx / dist * f}px,${-dy / dist * f}px)`;
        } else {
          span.style.transform = "";
        }
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouseRef, offsets]);

  return (
    <div ref={containerRef} style={{
      display: "flex", justifyContent: "center",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: "opacity 0.9s 0.45s ease, transform 0.9s 0.45s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {"STUDIO".split("").map((char, i) => (
        <span key={i} className="sl"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...BASE_LETTER,
            WebkitTextStroke: isLight ? "1px rgba(28,26,23,0.7)" : "1px rgba(250,248,244,0.55)",
            transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.35s ease, -webkit-text-fill-color 0.35s ease, -webkit-text-stroke 0.35s ease",
            ...(hovered === i ? STUDIO_HOVER[i] : {}),
          }}
        >{char}</span>
      ))}
    </div>
  );
}

/* ── SENO magnétique optimisé ── */
function MagneticText({ text, mouseRef, style, letterStyle }: {
  text: string;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  style?: React.CSSProperties;
  letterStyle?: React.CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsets = useCachedOffsets(containerRef, ".ml");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(".ml"));
    const loop = () => {
      const { x, y } = mouseRef.current;
      const rect = el.getBoundingClientRect(); // 1 seul reflow par frame
      spans.forEach((span, i) => {
        const off = offsets.current[i];
        if (!off) return;
        const cx = rect.left + off.cx, cy = rect.top + off.cy;
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0.1) {
          const f = (1 - dist / 200) * 36;
          span.style.transform = `translate(${-dx / dist * f}px,${-dy / dist * f}px)`;
        } else {
          span.style.transform = "";
        }
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouseRef, offsets]);

  return (
    <div ref={containerRef} style={{ display: "flex", justifyContent: "center", ...style }}>
      {text.split("").map((char, i) => (
        <span key={i} className="ml" style={{
          display: "inline-block", willChange: "transform",
          transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
          ...letterStyle,
        }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

/* ── Composant principal ── */
export default function HeroCanvas() {
  const ring2Ref   = useRef<HTMLDivElement>(null);
  const dotRef     = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseRef   = useRef({ x: -500, y: -500 });
  const pos2       = useRef({ x: -200, y: -200 });
  const tilt       = useRef({ x: 0, y: 0 });
  const scrollProg = useRef(0);
  const rafRef     = useRef<number>(0);
  const lineRef    = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const skip = sessionStorage.getItem("skipPreloader");
    const t = setTimeout(() => setVisible(true), skip ? 200 : 4800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsLight(document.documentElement.dataset.theme === "light");
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  /* ── Canvas particules — optimisé perf ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    // Détection bas de gamme : réduit les effets si peu de cœurs
    const lowEnd = navigator.hardwareConcurrency <= 4;
    const MAX_P  = lowEnd ? 80 : 160;
    const AMB_N  = lowEnd ? 6  : 12;

    type P = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; type: "orb"|"star"|"dot"; rot?: number; rotSpeed?: number };
    const particles: P[] = [];

    // Ambiantes — pré-calculées
    const ambients = Array.from({ length: AMB_N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18, vy: -(0.08 + Math.random() * 0.15),
      life: Math.random() * 200, maxLife: 200 + Math.random() * 200,
      size: 0.6 + Math.random() * 1.2,
    }));

    const spawnAt = (x: number, y: number) => {
      if (particles.length >= MAX_P) return;
      if (Math.random() < 0.2) {
        particles.push({ x, y,
          vx: (Math.random() - 0.5) * 0.9, vy: -(0.5 + Math.random() * 1.0),
          life: 0, maxLife: 90 + Math.random() * 60, size: 4 + Math.random() * 3, type: "orb",
        });
      }
      const dc = lowEnd ? 2 : 3 + Math.floor(Math.random() * 2);
      for (let i = 0; i < dc && particles.length < MAX_P; i++) {
        const a = Math.random() * Math.PI * 2;
        particles.push({
          x: x + (Math.random() - 0.5) * 10, y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(a) * (0.3 + Math.random() * 0.6), vy: Math.sin(a) * 0.3 - (0.6 + Math.random() * 0.9),
          life: 0, maxLife: 50 + Math.random() * 40, size: 1 + Math.random() * 1.6, type: "dot",
        });
      }
      if (!lowEnd && Math.random() < 0.1 && particles.length < MAX_P) {
        particles.push({ x, y,
          vx: (Math.random() - 0.5) * 0.5, vy: -(0.3 + Math.random() * 0.5),
          life: 0, maxLife: 80 + Math.random() * 35, size: 5 + Math.random() * 4,
          type: "star", rot: Math.random() * Math.PI, rotSpeed: (Math.random() - 0.5) * 0.035,
        });
      }
    };

    // Étoile — dessin simplifié (pas de shadowBlur, gradient additive)
    const drawStar = (x: number, y: number, r: number, alpha: number, rot: number) => {
      ctx.save();
      ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = alpha;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 2.5);
      grad.addColorStop(0, "rgba(255,252,220,1)");
      grad.addColorStop(1, "rgba(201,168,76,0)");
      for (let a = 0; a < 4; a++) {
        ctx.save(); ctx.rotate(a * Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(0, -r * 2.8); ctx.lineTo(r * 0.1, 0);
        ctx.lineTo(0, r * 2.8); ctx.lineTo(-r * 0.1, 0);
        ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
        ctx.restore();
      }
      ctx.beginPath(); ctx.arc(0, 0, r * 0.32, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,252,235,1)"; ctx.fill();
      ctx.restore();
    };

    // Spawn piloté par mousemove uniquement (pas par RAF)
    let spawnX = -1, spawnY = -1;
    const handleMove = (e: MouseEvent) => {
      const mx = e.clientX, my = e.clientY;
      if (spawnX < 0) { spawnX = mx; spawnY = my; spawnAt(mx, my); return; }
      const dx = mx - spawnX, dy = my - spawnY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= 10) {
        const steps = Math.min(Math.floor(dist / 14), 4); // max 4 steps
        for (let s = 0; s < steps; s++) spawnAt(spawnX + dx * (s / steps), spawnY + dy * (s / steps));
        spawnX = mx; spawnY = my;
      }
    };
    window.addEventListener("mousemove", handleMove);

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      // Halo curseur — gradient simple, pas de shadowBlur
      if (mx > 0 && my > 0) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 100);
        glow.addColorStop(0, "rgba(201,168,76,0.06)");
        glow.addColorStop(1, "rgba(201,168,76,0)");
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(mx, my, 100, 0, Math.PI * 2); ctx.fill();
      }

      // Ambiantes
      for (const a of ambients) {
        a.life++; a.x += a.vx; a.y += a.vy;
        if (a.y < -10 || a.life >= a.maxLife) {
          a.x = Math.random() * W; a.y = H + 5; a.life = 0;
          a.maxLife = 200 + Math.random() * 200;
          a.vx = (Math.random() - 0.5) * 0.18; a.vy = -(0.08 + Math.random() * 0.15);
        }
        ctx.globalAlpha = Math.sin((a.life / a.maxLife) * Math.PI) * 0.14;
        ctx.fillStyle = "rgba(201,168,76,0.9)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Particules — mode 'lighter' = glow additif sans shadowBlur
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++; p.x += p.vx; p.y += p.vy; p.vy -= 0.018; p.vx *= 0.968;
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }
        const t  = p.life / p.maxLife;
        const al = t < 0.12 ? t / 0.12 : Math.pow(1 - t, 1.6);

        if (p.type === "star") {
          if (p.rot !== undefined && p.rotSpeed !== undefined) p.rot += p.rotSpeed;
          ctx.globalCompositeOperation = "source-over";
          drawStar(p.x, p.y, p.size * (1 - t * 0.25), al, p.rot ?? 0);
          ctx.globalCompositeOperation = "lighter";
        } else if (p.type === "orb") {
          const r = p.size * (1 - t * 0.35);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2);
          g.addColorStop(0, `rgba(255,245,200,${al})`);
          g.addColorStop(0.4, `rgba(201,168,76,${al * 0.5})`);
          g.addColorStop(1, "rgba(201,168,76,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, r * 2, 0, Math.PI * 2); ctx.fill();
        } else {
          const r = p.size * (1 - t * 0.5);
          const col = t < 0.25 ? `rgba(255,245,200,${al * 0.8})` : `rgba(210,175,80,${al * 0.7})`;
          ctx.fillStyle = col;
          ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.restore();

      requestAnimationFrame(loop);
    };
    const raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  /* ── Scroll progress ── */
  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight;
      scrollProg.current = Math.min(window.scrollY / h, 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Curseur + tilt 3D + scroll ── */
  useEffect(() => {
    const loop = () => {
      const { x: mx, y: my } = mouseRef.current;
      const sp = scrollProg.current; // 0 → 1

      // Curseur
      pos2.current.x += (mx - pos2.current.x) * 0.14;
      pos2.current.y += (my - pos2.current.y) * 0.14;
      if (ring2Ref.current) {
        ring2Ref.current.style.left = `${pos2.current.x}px`;
        ring2Ref.current.style.top  = `${pos2.current.y}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top  = `${my}px`;
      }

      // Tilt 3D — atténué quand on scroll
      const nx = (mx / window.innerWidth)  * 2 - 1;
      const ny = (my / window.innerHeight) * 2 - 1;
      tilt.current.x += (nx - tilt.current.x) * 0.04;
      tilt.current.y += (ny - tilt.current.y) * 0.04;

      if (contentRef.current) {
        const ry =  tilt.current.x * 14;
        const rx = -tilt.current.y *  7;
        const op =  Math.max(1 - sp * 2.2, 0); // fondu rapide
        const bl =  Math.max(0, sp - 0.45) * 11; // flou démarre à 45% du scroll
        const ty = -sp * 160;                  // monte vers le haut au scroll

        contentRef.current.style.transform = `perspective(1000px) rotateY(${ry}deg) rotateX(${rx}deg) translateY(${ty}px)`;
        contentRef.current.style.opacity   = String(op);
        contentRef.current.style.filter    = bl > 0.5 ? `blur(${bl}px)` : "";
      }

      // Section : voile sombre qui monte depuis le bas
      if (sectionRef.current) {
        const vignette = sp * 0.6;
        const isLight = document.documentElement.dataset.theme === "light";
        const base = isLight ? "#f8f5ef" : "#060606";
        sectionRef.current.style.background = `linear-gradient(to top, rgba(0,0,0,${isLight ? vignette * 0.3 : vignette}) 0%, ${base} 40%)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 9990, pointerEvents: "none", width: "100vw", height: "100vh" }} />

      <div ref={ring2Ref} style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        width: 20, height: 20,
        border: "1.5px solid rgba(201,168,76,0.9)",
        borderTopColor: "transparent", borderLeftColor: "transparent",
        borderRadius: "50%", transform: "translate(-50%,-50%)",
        left: 0, top: 0, animation: "cursorSpin 1.2s linear infinite",
      }} />
      <div ref={dotRef} style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        width: 4, height: 4, background: "#c9a84c", borderRadius: "50%",
        transform: "translate(-50%,-50%)", left: 0, top: 0,
        boxShadow: "0 0 6px rgba(201,168,76,0.9)",
      }} />

      <section ref={sectionRef} style={{
        position: "relative", height: "100dvh", background: "var(--noir)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden", cursor: "none",
      }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.045, pointerEvents: "none", zIndex: 1 }}>
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        <div style={{ position: "absolute", left: 60, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,transparent,rgba(201,168,76,0.12) 25%,rgba(201,168,76,0.12) 75%,transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 60, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,transparent,rgba(201,168,76,0.12) 25%,rgba(201,168,76,0.12) 75%,transparent)", zIndex: 2, pointerEvents: "none" }} />


        <div ref={contentRef} style={{ position: "relative", zIndex: 3, textAlign: "center", width: "100%", padding: "0 80px", transformStyle: "preserve-3d", willChange: "transform" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
            marginBottom: 48,
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 1s 0.1s ease, transform 1s 0.1s ease",
          }}>
            <div style={{ height: 1, width: 40, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.55))" }} />
            <p style={{
              fontFamily: "var(--serif)", fontSize: "clamp(13px, 1.2vw, 16px)",
              fontStyle: "italic", fontWeight: 300,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(201,168,76,0.85)", margin: 0,
            }}>Photographe &amp; Vidéaste</p>
            <div style={{ height: 1, width: 40, background: "linear-gradient(to left, transparent, rgba(201,168,76,0.55))" }} />
          </div>

          <div style={{ position: "relative", zIndex: 2, marginBottom: 0 }}>
            <MagneticText text="SENO" mouseRef={mouseRef}
              style={{
                opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.9s 0.25s ease, transform 0.9s 0.25s cubic-bezier(0.16,1,0.3,1)",
              }}
              letterStyle={{
                fontFamily: "'Cinzel', serif", fontSize: "clamp(80px, 17vw, 220px)",
                fontWeight: 600, lineHeight: 0.85, letterSpacing: "0.08em",
                background: "linear-gradient(90deg, #c9a84c 0%, #f5e6c0 30%, #e8c97a 50%, #f5e6c0 70%, #c9a84c 100%)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            />
          </div>

          <div style={{ position: "relative", zIndex: 1, height: 1, margin: "20px auto", maxWidth: 900 }}>
            <div ref={lineRef} style={{
              height: 1, background: "linear-gradient(to right, transparent, var(--or) 20%, var(--or) 80%, transparent)",
              width: visible ? "100%" : "0%",
              transition: "width 1.2s 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
            }} />
          </div>

          <div style={{ position: "relative", zIndex: 2, marginBottom: 0 }}>
            <StudioLetters mouseRef={mouseRef} visible={visible} isLight={isLight} />
          </div>

          <div style={{ width: visible ? 48 : 0, height: 1, background: "var(--or)", margin: "36px auto 28px", transition: "width 1s 1s ease" }} />

          <div style={{ overflow: "hidden" }}>
            <p style={{
              fontFamily: "var(--serif)", fontSize: "clamp(18px, 2.2vw, 30px)",
              fontWeight: 300, fontStyle: "italic", color: isLight ? "rgba(28,26,23,0.65)" : "rgba(250,248,244,0.62)", letterSpacing: "0.04em", margin: 0,
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1s 1.1s ease, transform 1s 1.1s ease",
            }}>Car vous ne le revivrez qu&apos;en image.</p>
          </div>

          <p style={{
            fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.35em",
            textTransform: "uppercase", color: "rgba(201,168,76,0.5)", marginTop: 16,
            opacity: visible ? 1 : 0, transition: "opacity 1s 1.3s ease",
          }}>Bordeaux · Gironde · France</p>
        </div>

        {/* Scroll indicator — bas gauche */}
        <div style={{
          position: "absolute", bottom: 36, left: 60,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          zIndex: 3, pointerEvents: "none",
          opacity: visible ? 1 : 0, transition: "opacity 1s 1.6s ease",
        }}>
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4))", animation: "scrollPulse 2.5s ease-in-out infinite" }} />
          <span style={{ fontFamily: "var(--sans)", fontSize: 8, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", writingMode: "vertical-rl" }}>Scroll</span>
        </div>

        {/* Bouton Voir la suite — bas droite */}
        <div style={{
          position: "absolute", bottom: 36, right: 60,
          zIndex: 3,
          opacity: visible ? 1 : 0, transition: "opacity 1s 1.6s ease",
        }}>
          <button
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "rgba(201,168,76,0.85)",
              fontFamily: "var(--sans)", fontSize: 10,
              letterSpacing: "0.35em", textTransform: "uppercase",
              padding: "12px 28px",
              cursor: "none",
              display: "flex", alignItems: "center", gap: 12,
              transition: "border-color 0.3s, color 0.3s, background 0.3s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.08)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.9)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(201,168,76,1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.4)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(201,168,76,0.85)";
            }}
          >
            Voir la suite
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ animation: "scrollPulse 2s ease-in-out infinite" }}>
              <path d="M6 1v10M1 7l5 5 5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <style>{`
          @keyframes shimmer { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
          @keyframes cursorSpin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
          @keyframes scrollPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }

          @media (max-width: 768px) { .ml, .sl { letter-spacing: 0.04em !important; } }
        `}</style>
      </section>
    </>
  );
}
