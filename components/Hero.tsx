"use client";
import { useEffect, useRef, useState } from "react";

/* ── Particules hero luxe — réactives souris ── */
function HeroParticles() {
  const ref   = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };
    resize();

    const FINE: [number,number,number][] = [
      [224, 90,  43], [224, 90,  43],
      [255, 160, 80], [255, 160, 80],
      [255, 215, 130],[255, 215, 130],
      [201, 168, 76], [201, 168, 76],
      [255, 240, 180],
      [10,  10,  10],
    ];

    const ORBS: [number,number,number][] = [
      [224, 90, 43], [201, 140, 60], [255, 130, 60],
    ];

    const fine = Array.from({ length: 130 }, (_, i) => ({
      x:  Math.random() * (W || window.innerWidth),
      y:  Math.random() * (H || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.32,
      r:  Math.random() * 1.8 + 0.25,
      a:  Math.random() * 0.45 + 0.04,
      c:  FINE[i % FINE.length],
      isGold: i % 4 === 0,
    }));

    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x:  Math.random() * (W || window.innerWidth),
      y:  Math.random() * (H || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.10,
      r:  Math.random() * 55 + 30,
      a:  Math.random() * 0.035 + 0.008,
      c:  ORBS[i % ORBS.length],
    }));

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouse.current;

      for (const o of orbs) {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = W + o.r; else if (o.x > W + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = H + o.r; else if (o.y > H + o.r) o.y = -o.r;
        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        grad.addColorStop(0, `rgba(${o.c[0]},${o.c[1]},${o.c[2]},${o.a})`);
        grad.addColorStop(1, `rgba(${o.c[0]},${o.c[1]},${o.c[2]},0)`);
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      for (const p of fine) {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const force = (1 - dist / 160) * 1.8;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.06;
          p.vy += Math.sin(angle) * force * 0.06;
        }
        p.vx *= 0.972; p.vy *= 0.972;
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd < 0.14) { p.vx += (Math.random() - 0.5) * 0.08; p.vy += (Math.random() - 0.5) * 0.08; }
        else if (spd > 3.2) { p.vx *= 0.9; p.vy *= 0.9; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -6) p.x = W + 6; else if (p.x > W + 6) p.x = -6;
        if (p.y < -6) p.y = H + 6; else if (p.y > H + 6) p.y = -6;

        const glow = p.isGold ? p.r * 14 : p.r * 8;
        ctx.save();
        ctx.shadowBlur  = glow;
        ctx.shadowColor = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${p.a * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${p.a})`;
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const ob = new ResizeObserver(resize);
    ob.observe(canvas);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); ob.disconnect(); };
  }, []);

  return (
    <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />
  );
}

const lines = [
  { text: "Un regard", delay: 300 },
  { text: "suffit.",   delay: 500, orange: true },
];

const PHOTOS = [
  { src: "/images/hero-maries.jpg"       },
  { src: "/images/theme-portrait.jpg"   },
  { src: "/images/theme-gastronomie.jpg" },
  { src: "/images/theme-mode.jpg"       },
];

const SETTLED = [
  { txVw: -33, ty: -100, rot: -7,  floatDelay: "0s"   },
  { txVw: -28, ty: 124,  rot:  5,  floatDelay: "0.9s" },
  { txVw:  33, ty: -100, rot:  7,  floatDelay: "1.8s" },
  { txVw:  28, ty: 124,  rot: -5,  floatDelay: "2.7s" },
];

const F1_BARS = [
  { flex: 2, delay: 0   },
  { flex: 1, delay: 55  },
  { flex: 3, delay: 110 },
  { flex: 1, delay: 165 },
  { flex: 2, delay: 220 },
];

type Phase = "idle" | "orbiting" | "settling" | "floating";

export default function Hero() {
  const [loaded,    setLoaded]    = useState(false);
  const [lineW,     setLineW]     = useState(0);
  const [phase,     setPhase]     = useState<Phase>("idle");
  const [introGone, setIntroGone] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const photoRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const txCache    = useRef<number[]>([]);

  /* ── timers ── */
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true),       200);
    const t2 = setTimeout(() => setLineW(100),          300);
    const t3 = setTimeout(() => setIntroGone(true),    930);
    const t4 = setTimeout(() => setPhase("orbiting"),  980);
    const t5 = setTimeout(() => setPhase("settling"),  2480);
    const t6 = setTimeout(() => setPhase("floating"),  4280);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
    };
  }, []);

  /* ── orbit rAF ── */
  useEffect(() => {
    if (phase !== "orbiting") return;
    let frameId: number;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (t0 === null) t0 = ts;
      const elapsed = ts - t0;
      const t = elapsed / 1000;
      PHOTOS.forEach((_, i) => {
        const el = photoRefs.current[i];
        if (!el) return;
        const angle  = (i * Math.PI / 2) + t * 1.1;
        const rx     = Math.min(300, window.innerWidth * 0.22);
        const ry     = 75;
        const x      = Math.cos(angle) * rx;
        const y      = Math.sin(angle) * ry;
        const depth  = Math.sin(angle);
        const scale  = 0.78 + (depth + 1) * 0.13;
        const fadeIn = Math.min(1, elapsed / 750);
        el.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${scale})`;
        el.style.opacity   = String(fadeIn);
        el.style.zIndex    = depth > 0 ? "5" : "2";
      });
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [phase]);

  /* ── settling ── */
  useEffect(() => {
    if (phase !== "settling") return;
    const vw = window.innerWidth;
    PHOTOS.forEach((_, i) => {
      const el = photoRefs.current[i];
      if (!el) return;
      const cfg = SETTLED[i];
      const tx  = Math.round(vw * cfg.txVw / 100);
      txCache.current[i] = tx;
      el.style.zIndex     = "5";
      el.style.transition = `transform 1.35s cubic-bezier(0.16,1,0.3,1) ${i * 65}ms, opacity 0.3s ease`;
      el.style.transform  = `translate(-50%,-50%) translate(${tx}px,${cfg.ty}px) rotate(${cfg.rot}deg)`;
      el.style.opacity    = "1";
    });
  }, [phase]);

  /* ── floating ── */
  useEffect(() => {
    if (phase !== "floating") return;
    const vw = window.innerWidth;
    PHOTOS.forEach((_, i) => {
      const el = photoRefs.current[i];
      if (!el) return;
      const cfg = SETTLED[i];
      const tx  = txCache.current[i] ?? Math.round(vw * cfg.txVw / 100);
      el.style.setProperty("--ftx",  `${tx}px`);
      el.style.setProperty("--fty",  `${cfg.ty}px`);
      el.style.setProperty("--frot", `${cfg.rot}deg`);
      el.style.setProperty("--nx",   "0px");
      el.style.setProperty("--ny",   "0px");
      el.style.zIndex     = "5";
      el.style.transition = "none";
      el.style.transform  = `translate(-50%,-50%) translate(${tx}px,${cfg.ty}px) rotate(${cfg.rot}deg)`;
      el.style.opacity    = "1";
      el.style.animation  = `heroFloat 3.6s ease-in-out ${cfg.floatDelay} infinite`;
    });
  }, [phase]);

  /* ── mouse proximity on floating photos ── */
  useEffect(() => {
    if (phase !== "floating") return;
    const nx = [0,0,0,0], ny = [0,0,0,0], tnx = [0,0,0,0], tny = [0,0,0,0];
    const onMove = (e: MouseEvent) => {
      photoRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 22;
          const angle = Math.atan2(dy, dx);
          tnx[i] = -Math.cos(angle) * force;
          tny[i] = -Math.sin(angle) * force;
        } else { tnx[i] = 0; tny[i] = 0; }
      });
    };
    window.addEventListener("mousemove", onMove);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    let rafId: number;
    const tick = () => {
      photoRefs.current.forEach((el, i) => {
        if (!el) return;
        nx[i] = lerp(nx[i], tnx[i], 0.08);
        ny[i] = lerp(ny[i], tny[i], 0.08);
        el.style.setProperty("--nx", `${nx[i].toFixed(2)}px`);
        el.style.setProperty("--ny", `${ny[i].toFixed(2)}px`);
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafId); };
  }, [phase]);

  /* ── scroll parallax ── */
  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (contentRef.current) {
        const p = Math.min(y / (window.innerHeight * 0.65), 1);
        contentRef.current.style.transform = `translateY(-${y * 0.38}px)`;
        contentRef.current.style.opacity   = String(Math.max(0, 1 - p * 1.4));
      }
      const p2      = Math.min(y / (window.innerHeight * 0.5), 1);
      const opacity = String(Math.max(0, 1 - p2 * 1.9));
      photoRefs.current.forEach(el => { if (el) el.style.opacity = opacity; });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section style={{
      position: "relative", background: "#fff", minHeight: "100vh",
      overflow: "hidden", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", paddingTop: 80,
    }}>

      {/* ── Intro F1 bars ── */}
      {!introGone && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 20,
          pointerEvents: "none", overflow: "hidden",
          display: "flex", flexDirection: "column", gap: 7,
        }}>
          {F1_BARS.map((bar, i) => (
            <div key={i} style={{ flex: bar.flex, position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, bottom: 0, left: "-20%", width: "140%",
                background: "linear-gradient(to right, #5c1505, #b03010 12%, #e05a2b 35%, #ff7040 52%, #ffac7a 62%, #e05a2b 78%, #881e08 92%, #5c1505)",
                animation: `barRevealH 0.60s cubic-bezier(0.77,0,0.175,1) ${bar.delay}ms both`,
              }} />
            </div>
          ))}
        </div>
      )}

      {/* Grain */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 6 }} aria-hidden>
        <filter id="grain-hero">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-hero)" opacity="0.04" />
      </svg>

      {/* Particules réactives souris */}
      <HeroParticles />

      {/* Orange line */}
      <div style={{
        position: "absolute", top: 80, left: 0, height: 1,
        background: "#e05a2b", width: lineW + "%",
        transition: "width 1.5s ease", zIndex: 8,
      }} />

      {/* ── Orbes atmosphériques — dérivent lentement, aucun tracking ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "5%", left: "-8%",
          width: "58vw", height: "58vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(224,90,43,0.09) 0%, rgba(224,90,43,0.04) 40%, transparent 68%)",
          filter: "blur(55px)",
          animation: "orbDrift1 24s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "-8%", right: "-2%",
          width: "46vw", height: "46vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,130,50,0.07) 0%, rgba(224,90,43,0.03) 45%, transparent 70%)",
          filter: "blur(50px)",
          animation: "orbDrift2 32s ease-in-out infinite",
          animationDelay: "-14s",
        }} />
        <div style={{
          position: "absolute", top: "30%", right: "5%",
          width: "26vw", height: "26vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,200,130,0.06) 0%, transparent 65%)",
          filter: "blur(38px)",
          animation: "orbDrift3 19s ease-in-out infinite",
          animationDelay: "-7s",
        }} />

        {/* ── Grosses bulles orange visibles ── */}
        <div style={{
          position: "absolute", top: "8%", left: "4%",
          width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(224,90,43,0.55) 0%, rgba(224,90,43,0.3) 50%, rgba(224,90,43,0.05) 80%)",
          filter: "blur(12px)",
          animation: "bubble1 18s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "8%",
          width: 310, height: 310, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,80,20,0.48) 0%, rgba(224,90,43,0.25) 50%, rgba(224,90,43,0.04) 80%)",
          filter: "blur(10px)",
          animation: "bubble2 23s ease-in-out infinite",
          animationDelay: "-9s",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "58%",
          width: 240, height: 240, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,120,45,0.42) 0%, rgba(224,90,43,0.2) 50%, transparent 80%)",
          filter: "blur(9px)",
          animation: "bubble3 15s ease-in-out infinite",
          animationDelay: "-5s",
        }} />
        <div style={{
          position: "absolute", top: "16%", right: "24%",
          width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,65,15,0.36) 0%, rgba(224,90,43,0.16) 55%, transparent 80%)",
          filter: "blur(8px)",
          animation: "bubble1 27s ease-in-out infinite",
          animationDelay: "-12s",
        }} />
      </div>

      {/* Photos */}
      {PHOTOS.map(({ src }, i) => (
        <div
          key={i}
          ref={el => { photoRefs.current[i] = el; }}
          className="hero-photo"
          style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%,-50%)",
            width: 264, height: 356, opacity: 0,
            overflow: "hidden", borderRadius: 18,
            boxShadow: "0 20px 56px rgba(0,0,0,0.22), 0 4px 14px rgba(0,0,0,0.1)",
            willChange: "transform, opacity",
          }}
        >
          <img src={src} alt="" draggable={false} style={{
            width: "100%", height: "100%", objectFit: "cover",
            display: "block", pointerEvents: "none",
          }} />
        </div>
      ))}

      {/* Texte — zIndex 4 */}
      <div ref={contentRef} style={{
        position: "relative", zIndex: 4,
        textAlign: "center", padding: "0.2em 40px 0",
        userSelect: "none", pointerEvents: "none",
        willChange: "transform, opacity",
      }}>
        <div style={{ animation: "titleRock 14s ease-in-out infinite", display: "inline-block" }}>
          {lines.map((line, li) => (
            <div key={li} style={{ display: "block", overflow: "visible", paddingBottom: li === lines.length - 1 ? "0.55em" : "0.04em" }}>
              <h1
                style={{
                  fontFamily: "var(--serif)",
                  fontWeight: 300, fontStyle: "italic",
                  fontSize: li === 0 ? "clamp(72px, 11vw, 180px)" : "clamp(56px, 8.5vw, 140px)",
                  color: line.orange ? "#e05a2b" : "#0a0a0a",
                  letterSpacing: "-0.03em", lineHeight: line.orange ? 1.05 : 0.88,
                  margin: 0, display: "block",
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(110%)",
                  transition: `opacity 0.01s, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${line.delay}ms`,
                  textShadow: line.orange
                    ? "0 2px 20px rgba(224,90,43,0.22), 0 8px 32px rgba(224,90,43,0.1)"
                    : "0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.05)",
                }}
              >
                {line.orange ? line.text : line.text.split("").map((char, ci) => (
                  <span
                    key={ci}
                    className="hero-letter-dark"
                    style={{ display: "inline-block", pointerEvents: "auto", cursor: "none" }}
                  >
                    {char === " " ? " " : char}
                  </span>
                ))}
              </h1>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "var(--condensed)", fontSize: 11,
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: "#888", marginTop: 40,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s ease 700ms, transform 0.9s ease 700ms",
        }}>
          Photographe indépendant · Bordeaux · France entière
        </p>

        <div style={{
          marginTop: 52, display: "flex", gap: 24,
          justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s ease 900ms, transform 0.9s ease 900ms",
          pointerEvents: "auto",
        }}>
          <a href="/prestations" className="btn-arrow btn-arrow-orange">Portfolio →</a>
          <a href="/contact" className="btn-arrow">Prendre contact →</a>
        </div>
      </div>

      {/* Fondu bas — transition vers PhotoStrips */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "32vh", pointerEvents: "none", zIndex: 1,
        background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 60%, #fff 100%)",
      }} />

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 36, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        opacity: loaded ? 1 : 0,
        transition: "opacity 1s ease 1200ms", zIndex: 9,
      }}>
        <div style={{
          width: 1, height: 48,
          background: "linear-gradient(to bottom, #e05a2b, transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes barRevealH {
          0%   { transform: skewX(-18deg) translateX(-92%); }
          44%  { transform: skewX(-18deg) translateX(0%);   }
          100% { transform: skewX(-18deg) translateX(92%);  }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
        }
        @keyframes titleRock {
          0%   { transform: perspective(900px) rotateX(3deg)   rotateY(-1.5deg); }
          25%  { transform: perspective(900px) rotateX(0.5deg) rotateY(2deg);    }
          50%  { transform: perspective(900px) rotateX(-2deg)  rotateY(0.5deg);  }
          75%  { transform: perspective(900px) rotateX(1deg)   rotateY(-2deg);   }
          100% { transform: perspective(900px) rotateX(3deg)   rotateY(-1.5deg); }
        }
        .title-shimmer {
          background: linear-gradient(105deg, #e05a2b 20%, #ff7a45 40%, #ffc8a0 50%, #ff7a45 60%, #e05a2b 80%);
          background-size: 220% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleShimmer 6s linear infinite;
        }
        @keyframes titleShimmer {
          0%   { background-position: 100% center; }
          100% { background-position: -100% center; }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translate(-50%,-50%) translate(calc(var(--ftx) + var(--nx,0px)), calc(var(--fty) + var(--ny,0px))) rotate(var(--frot)); }
          50%       { transform: translate(-50%,-50%) translate(calc(var(--ftx) + var(--nx,0px)), calc(var(--fty) - 12px + var(--ny,0px))) rotate(var(--frot)); }
        }
        /* Orbes atmosphériques */
        @keyframes orbDrift1 {
          0%   { transform: translate(0, 0) scale(1); }
          20%  { transform: translate(70px, -50px) scale(1.04); }
          50%  { transform: translate(140px, 35px) scale(0.96); }
          75%  { transform: translate(50px, 90px) scale(1.02); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes orbDrift2 {
          0%   { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(-110px, 70px) scale(1.05); }
          60%  { transform: translate(-190px, -30px) scale(0.95); }
          85%  { transform: translate(-70px, -100px) scale(1.02); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes orbDrift3 {
          0%   { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(55px, 95px) scale(1.06); }
          66%  { transform: translate(-75px, 65px) scale(0.94); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes bubble1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          20%  { transform: translate(80px, -60px) scale(1.08); }
          45%  { transform: translate(150px, 40px) scale(0.92); }
          70%  { transform: translate(60px, 110px) scale(1.05); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes bubble2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          30%  { transform: translate(-120px, -80px) scale(1.1); }
          55%  { transform: translate(-60px, 90px) scale(0.9); }
          80%  { transform: translate(-160px, 30px) scale(1.04); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes bubble3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          25%  { transform: translate(-90px, -70px) scale(1.12); }
          60%  { transform: translate(70px, -40px) scale(0.88); }
          85%  { transform: translate(40px, 80px) scale(1.06); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        /* Lettres interactives */
        .hero-letter-dark {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.22s ease;
        }
        .hero-letter-dark:hover {
          transform: translateY(-10px) rotate(-2deg) !important;
          color: #e05a2b !important;
        }
        .hero-letter-shimmer {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hero-letter-shimmer:hover {
          transform: translateY(-8px) scale(1.12) rotate(1.5deg) !important;
        }
        @media (max-width: 900px) { .hero-photo { display: none !important; } }
      `}</style>
    </section>
  );
}
