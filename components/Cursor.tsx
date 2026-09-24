"use client";
import { useEffect, useRef } from "react";

interface Point { x: number; y: number; t: number; }

const MAX_AGE  = 1100;
const MAX_PTS  = 80;

export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("resize", onResize);

    const pts: Point[] = [];
    let mx = -500, my = -500;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      pts.push({ x: mx, y: my, t: performance.now() });
      if (pts.length > MAX_PTS) pts.shift();
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };
    document.addEventListener("mousemove", onMove);

    /* Dessine une courbe bézier lissée à travers les points (méthode midpoint) */
    const buildPath = () => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx2 = (pts[i].x + pts[i + 1].x) / 2;
        const my2 = (pts[i].y + pts[i + 1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx2, my2);
      }
      const last = pts[pts.length - 1];
      ctx.lineTo(last.x, last.y);
    };

    const loop = () => {
      const now = performance.now();

      /* purge les points trop vieux */
      while (pts.length > 2 && now - pts[0].t > MAX_AGE) pts.shift();

      ctx.clearRect(0, 0, W, H);

      if (pts.length >= 3) {
        const tail = pts[0];
        const head = pts[pts.length - 1];
        const headAge = Math.max(0, 1 - (now - head.t) / MAX_AGE);

        /* ── Passe 1 : halo extérieur flou ── */
        ctx.save();
        buildPath();
        const g1 = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        g1.addColorStop(0,   "rgba(255,100,30,0)");
        g1.addColorStop(0.5, "rgba(255,100,30,0.06)");
        g1.addColorStop(1,   "rgba(255,140,60,0.13)");
        ctx.strokeStyle = g1;
        ctx.lineWidth   = 26;
        ctx.lineCap     = "round";
        ctx.lineJoin    = "round";
        ctx.filter      = "blur(10px)";
        ctx.stroke();
        ctx.filter = "none";
        ctx.restore();

        /* ── Passe 2 : trait principal avec gradient ── */
        ctx.save();
        buildPath();
        const g2 = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        g2.addColorStop(0,    "rgba(200,70,20,0)");
        g2.addColorStop(0.25, "rgba(224,90,43,0.25)");
        g2.addColorStop(0.7,  "rgba(255,130,55,0.72)");
        g2.addColorStop(1,    `rgba(255,210,140,${headAge * 0.95})`);
        ctx.strokeStyle = g2;
        ctx.lineWidth   = 2.5;
        ctx.lineCap     = "round";
        ctx.lineJoin    = "round";
        ctx.shadowBlur  = 14;
        ctx.shadowColor = "rgba(255,100,40,0.6)";
        ctx.stroke();
        ctx.restore();

        /* ── Passe 3 : filet brillant au centre ── */
        ctx.save();
        buildPath();
        const g3 = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
        g3.addColorStop(0,   "rgba(255,200,120,0)");
        g3.addColorStop(0.5, "rgba(255,200,120,0.18)");
        g3.addColorStop(1,   `rgba(255,255,255,${headAge * 0.9})`);
        ctx.strokeStyle = g3;
        ctx.lineWidth   = 0.9;
        ctx.lineCap     = "round";
        ctx.lineJoin    = "round";
        ctx.shadowBlur  = 6;
        ctx.shadowColor = "#fff";
        ctx.stroke();
        ctx.restore();

        /* ── Tête : éclat blanc ── */
        ctx.save();
        ctx.globalAlpha = headAge * 0.88;
        ctx.shadowBlur  = 18;
        ctx.shadowColor = "#fff";
        ctx.fillStyle   = "#fff";
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{
        position: "fixed", inset: 0,
        pointerEvents: "none",
        zIndex: 9997,
      }} />

      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: 8, height: 8, borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 0 6px 2px rgba(255,255,255,0.9), 0 0 14px 4px rgba(224,90,43,0.6)",
        pointerEvents: "none",
        zIndex: 9999,
        willChange: "transform",
      }} />
    </>
  );
}
