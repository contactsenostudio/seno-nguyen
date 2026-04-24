"use client";
import { useEffect, useRef } from "react";

export default function ContactHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 55; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
      });

      // Lignes entre particules proches
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="page-px-md" style={{ position: "relative", paddingTop: 160, paddingBottom: 80, background: "var(--noir2)", overflow: "hidden", minHeight: 320 }}>

      {/* Canvas particles */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />

      {/* Ligne dorée top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)" }} />

      {/* Cercle décoratif animé */}
      <div className="contact-hero-deco" style={{
        position: "absolute", right: 120, top: "50%", transform: "translateY(-50%)",
        width: 280, height: 280, borderRadius: "50%",
        border: "1px solid rgba(201,168,76,0.08)",
        animation: "spin-slow 20s linear infinite",
      }} />
      <div className="contact-hero-deco" style={{
        position: "absolute", right: 160, top: "50%", transform: "translateY(-50%)",
        width: 200, height: 200, borderRadius: "50%",
        border: "1px solid rgba(201,168,76,0.05)",
        animation: "spin-slow 14s linear infinite reverse",
      }} />

      {/* Contenu */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <p className="label" style={{ marginBottom: 20, animation: "fadeUp 0.7s ease both" }}>Travaillons ensemble</p>
        <div style={{ width: 48, height: 1, background: "var(--or)", marginBottom: 28, animation: "fadeUp 0.7s 0.1s ease both" }} />
        <h1 className="h1" style={{ marginBottom: 20, animation: "fadeUp 0.7s 0.15s ease both" }}>
          Parlons de<br /><em>votre projet.</em>
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(250,248,244,0.55)", maxWidth: 460, animation: "fadeUp 0.7s 0.25s ease both" }}>
          Un appel de 30 minutes suffit pour tout clarifier.<br />Je réponds sous 48h et vous propose une offre sur-mesure.
        </p>

        {/* Badges */}
        <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap", animation: "fadeUp 0.7s 0.35s ease both" }}>
          {[
            { dot: "#4ade80", text: "Disponible 2025 & 2026" },
            { dot: "var(--or)", text: "Réponse sous 48h" },
            { dot: "rgba(201,168,76,0.6)", text: "Disponible en Gironde" },
          ].map(b => (
            <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "7px 14px" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: b.dot, display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--gris)", textTransform: "uppercase" }}>{b.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}
