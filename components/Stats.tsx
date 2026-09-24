"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 80,  suffix: "+",    label: "Projets livrés"   },
  { value: 5,   suffix: " ans", label: "D'expérience"      },
  { value: 100, suffix: "%",    label: "Satisfaction"      },
  { value: 3,   suffix: "",     label: "Bordeaux · FR · EU" },
];

function useCountUp(target: number, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame: number;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);
  return val;
}

function StatItem({ value, suffix, label, delay, started, isLast }: {
  value: number; suffix: string; label: string;
  delay: number; started: boolean; isLast: boolean;
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (started) {
      const t = setTimeout(() => setActive(true), delay);
      return () => clearTimeout(t);
    }
  }, [started, delay]);
  const displayed = useCountUp(value, active);

  return (
    <div style={{
      textAlign: "center",
      padding: "72px 20px 64px",
      borderRight: isLast ? "none" : "1px solid rgba(0,0,0,0.06)",
      opacity: active ? 1 : 0,
      transform: active ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.9s ease, transform 0.9s ease",
    }}>
      {/* Tiret décoratif */}
      <div style={{
        width: 24, height: 1,
        background: "#e05a2b",
        margin: "0 auto 24px",
        opacity: active ? 1 : 0,
        transition: "opacity 0.6s ease 0.2s",
      }} />
      {/* Chiffre en Cormorant italic */}
      <div style={{
        fontFamily: "var(--serif)",
        fontSize: "clamp(52px, 5.5vw, 80px)",
        fontWeight: 300,
        fontStyle: "italic",
        color: "#0a0a0a",
        lineHeight: 1,
        letterSpacing: "-0.02em",
      }}>
        {displayed}{suffix}
      </div>
      {/* Label */}
      <div style={{
        fontFamily: "var(--condensed)",
        fontSize: 10,
        letterSpacing: "0.35em",
        textTransform: "uppercase",
        color: "#bbb",
        marginTop: 16,
      }}>
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      background: "#fff",
    }}>
      <div style={{
        position: "absolute", top: 18, left: 36, zIndex: 2,
        fontFamily: "var(--condensed)", fontSize: 9,
        letterSpacing: "0.42em", textTransform: "uppercase",
        color: "rgba(0,0,0,0.18)",
      }}>— 02 · En chiffres</div>
      {stats.map((s, i) => (
        <StatItem key={i} {...s} delay={i * 150} started={started} isLast={i === stats.length - 1} />
      ))}
      <style>{`
        @media (max-width: 768px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
