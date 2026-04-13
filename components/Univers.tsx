"use client";

import { useEffect, useRef } from "react";

export default function Univers() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    section.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 120;
    type Particle = {
      x: number; y: number;
      ox: number; oy: number;
      size: number;
      opacity: number;
      speed: number;
    };

    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return { x, y, ox: x, oy: y, size: Math.random() * 4 + 1, opacity: Math.random() * 0.4 + 0.6, speed: Math.random() * 0.4 + 0.15 };
    });

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const RADIUS = 140;
      const STRENGTH = 55;

      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS && mx > 0) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          p.x -= (dx / dist) * force * 0.04;
          p.y -= (dy / dist) * force * 0.04;
        }

        // drift back to origin
        p.x += (p.ox - p.x) * 0.035;
        p.y += (p.oy - p.y) * 0.035;

        ctx.beginPath();
        ctx.rect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
      }

      // faint lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.45 * (1 - d / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id="univers" className="univers" style={{ background: "var(--noir)", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
      />

      <div className="univers-text reveal" style={{ position: "relative", zIndex: 1 }}>
        <p className="section-label">Qui je suis</p>
        <h2 className="section-title">
          Seno<br />
          <em>Nguyen.</em>
        </h2>
        <p>
          Photographe et vidéaste de mariage basé à Bordeaux. Passionné d&apos;image depuis toujours, j&apos;ai construit mon regard à travers le cinéma, le reportage et une obsession pour la lumière naturelle.
        </p>
        <p>
          Ce que j&apos;aime par-dessus tout, c&apos;est l&apos;humain. Les sourires spontanés, les éclats de rire, ces instants de joie pure qu&apos;on ne voit même pas venir. C&apos;est ça que je traque, c&apos;est ça que je veux vous rendre.
        </p>
        <p>
          Je crois que les plus beaux clichés naissent dans l&apos;authenticité — pas dans la pose. Mon rôle n&apos;est pas de diriger une scène, mais d&apos;être là, discret et attentif, pour figer ce qui ne se répètera jamais.
        </p>
      </div>

      <div className="univers-visual reveal reveal-delay-2" style={{ position: "relative", zIndex: 1 }}>
        <div className="univers-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/photographer.jpg" alt="Univers Seno Nguyen" />
          <div className="photo-overlay" />
        </div>
        <div className="univers-accent">
          <p className="univers-quote">
            &ldquo;Chaque mariage est un film qui n&apos;existe qu&apos;une seule fois.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
