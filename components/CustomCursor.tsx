"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const pathname  = usePathname();
  const ringRef   = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -500, y: -500 });
  const pos       = useRef({ x: -200, y: -200 });
  const isHome    = pathname === "/";

  /* ── Mouse tracking ── */
  useEffect(() => {
    if (isHome) return;
    const fn = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [isHome]);

  /* ── Ring + dot animation loop ── */
  useEffect(() => {
    if (isHome) return;
    let raf: number;
    const loop = () => {
      const { x: mx, y: my } = mouseRef.current;
      pos.current.x += (mx - pos.current.x) * 0.14;
      pos.current.y += (my - pos.current.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.left = `${pos.current.x}px`;
        ringRef.current.style.top  = `${pos.current.y}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top  = `${my}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isHome]);

  /* ── Canvas particules ── */
  useEffect(() => {
    if (isHome) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    const lowEnd = navigator.hardwareConcurrency <= 4;
    const MAX_P  = lowEnd ? 60 : 120;
    const AMB_N  = lowEnd ? 5  : 10;

    type P = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; type: "orb" | "dot" };
    const particles: P[] = [];

    const ambients = Array.from({ length: AMB_N }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18, vy: -(0.08 + Math.random() * 0.15),
      life: Math.random() * 200, maxLife: 200 + Math.random() * 200,
      size: 0.6 + Math.random() * 1.2,
    }));

    const spawnAt = (x: number, y: number) => {
      if (particles.length >= MAX_P) return;
      if (Math.random() < 0.2) {
        particles.push({ x, y, vx: (Math.random() - 0.5) * 0.9, vy: -(0.5 + Math.random() * 1.0), life: 0, maxLife: 90 + Math.random() * 60, size: 4 + Math.random() * 3, type: "orb" });
      }
      const dc = lowEnd ? 2 : 3 + Math.floor(Math.random() * 2);
      for (let i = 0; i < dc && particles.length < MAX_P; i++) {
        const a = Math.random() * Math.PI * 2;
        particles.push({ x: x + (Math.random() - 0.5) * 10, y: y + (Math.random() - 0.5) * 10, vx: Math.cos(a) * (0.3 + Math.random() * 0.6), vy: Math.sin(a) * 0.3 - (0.6 + Math.random() * 0.9), life: 0, maxLife: 50 + Math.random() * 40, size: 1 + Math.random() * 1.6, type: "dot" });
      }
    };

    let spawnX = -1, spawnY = -1;
    const handleMove = (e: MouseEvent) => {
      const mx = e.clientX, my = e.clientY;
      if (spawnX < 0) { spawnX = mx; spawnY = my; spawnAt(mx, my); return; }
      const dx = mx - spawnX, dy = my - spawnY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= 10) {
        const steps = Math.min(Math.floor(dist / 14), 4);
        for (let s = 0; s < steps; s++) spawnAt(spawnX + dx * (s / steps), spawnY + dy * (s / steps));
        spawnX = mx; spawnY = my;
      }
    };
    window.addEventListener("mousemove", handleMove);

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      // Halo curseur
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

      // Particules
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++; p.x += p.vx; p.y += p.vy; p.vy -= 0.018; p.vx *= 0.968;
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }
        const t  = p.life / p.maxLife;
        const al = t < 0.12 ? t / 0.12 : Math.pow(1 - t, 1.6);
        if (p.type === "orb") {
          const r = p.size * (1 - t * 0.35);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2);
          g.addColorStop(0, `rgba(255,245,200,${al})`);
          g.addColorStop(0.4, `rgba(201,168,76,${al * 0.5})`);
          g.addColorStop(1, "rgba(201,168,76,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, r * 2, 0, Math.PI * 2); ctx.fill();
        } else {
          const r = p.size * (1 - t * 0.5);
          ctx.fillStyle = t < 0.25 ? `rgba(255,245,200,${al * 0.8})` : `rgba(210,175,80,${al * 0.7})`;
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
  }, [isHome]);

  if (isHome) return null;

  return (
    <>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 9990 }} />
      <div ref={ringRef} style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        width: 20, height: 20,
        border: "1.5px solid rgba(201,168,76,0.9)",
        borderTopColor: "transparent", borderLeftColor: "transparent",
        borderRadius: "50%", transform: "translate(-50%,-50%)",
        left: 0, top: 0, animation: "ccSpin 1.2s linear infinite",
      }} />
      <div ref={dotRef} style={{
        position: "fixed", zIndex: 9999, pointerEvents: "none",
        width: 4, height: 4, background: "#c9a84c", borderRadius: "50%",
        transform: "translate(-50%,-50%)", left: 0, top: 0,
        boxShadow: "0 0 6px rgba(201,168,76,0.9)",
      }} />
      <style>{`
        @keyframes ccSpin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
      `}</style>
    </>
  );
}
