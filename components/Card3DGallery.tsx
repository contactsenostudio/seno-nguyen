"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CARDS = [
  {
    category: "Mariage",
    desc: "Photo · Film 4K · Magazine Box",
    cta: "Voir les formules",
    href: "/mariage",
    images: [
      "/images/wedding-new1.jpg",
      "/images/wedding-couple.jpg",
      "/images/wedding-bride.jpg",
    ],
  },
  {
    category: "Entreprise",
    desc: "Corporate · Branding · Événements",
    cta: "Découvrir",
    href: "/entreprise",
    images: [
      "/images/business1.jpg",
      "/images/corporate-portrait.jpg",
      "/images/business3.jpg",
    ],
  },
  {
    category: "Magazine Box",
    desc: "L'album qui raconte votre histoire",
    cta: "En savoir plus",
    href: "/prestations",
    images: [
      "/images/magazine-box1.jpg",
      "/images/magazine-box2.jpg",
      "/images/magazine-box3.jpg",
    ],
  },
];

type CardState = { rx: number; ry: number; sx: number; sy: number; active: boolean };

function Card3D({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [s, setS] = useState<CardState>({ rx: 0, ry: 0, sx: 50, sy: 50, active: false });
  const [imgIdx, setImgIdx] = useState(0);
  const raf = useRef<number>(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setS({ rx: (y - 0.5) * -24, ry: (x - 0.5) * 24, sx: x * 100, sy: y * 100, active: true });
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    setS({ rx: 0, ry: 0, sx: 50, sy: 50, active: false });
  };

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault();
    setImgIdx(i => (i + 1) % card.images.length);
  };

  return (
    <div style={{ perspective: "1100px", flex: "1 1 0", minWidth: 0 }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          position: "relative",
          height: "clamp(420px, 55vh, 580px)",
          borderRadius: 2,
          overflow: "hidden",
          transform: `rotateX(${s.rx}deg) rotateY(${s.ry}deg) scale(${s.active ? 1.03 : 1})`,
          transition: s.active
            ? "transform 0.08s ease"
            : "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
          boxShadow: s.active
            ? "0 32px 80px rgba(0,0,0,0.65), 0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.35)"
            : "0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.15)",
          cursor: "pointer",
          willChange: "transform",
        }}
        onClick={nextImg}
      >
        {/* Images avec crossfade */}
        {card.images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={card.category}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              opacity: i === imgIdx ? 1 : 0,
              transition: "opacity 0.7s ease",
              transform: s.active
                ? `scale(1.08) translate(${s.ry * -0.3}px, ${s.rx * 0.3}px)`
                : "scale(1) translate(0,0)",
              transitionProperty: "opacity, transform",
              transitionDuration: s.active ? "0.08s, 0.08s" : "0.7s, 0.65s",
            }}
            priority={index === 0 && i === 0}
          />
        ))}

        {/* Overlay sombre */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)",
        }} />

        {/* Reflet lumineux qui suit la souris */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: `radial-gradient(circle at ${s.sx}% ${s.sy}%, rgba(255,245,210,0.18) 0%, rgba(201,168,76,0.06) 40%, transparent 70%)`,
          opacity: s.active ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }} />

        {/* Liseret doré en haut */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 3,
          background: "linear-gradient(90deg, transparent, var(--or), transparent)",
          opacity: s.active ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }} />

        {/* Label catégorie */}
        <div style={{
          position: "absolute", top: 24, left: 24, zIndex: 4,
          fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.35em",
          textTransform: "uppercase", color: "var(--or)",
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
          padding: "6px 12px",
        }}>
          {card.category}
        </div>

        {/* Indicateur images */}
        <div style={{
          position: "absolute", top: 24, right: 24, zIndex: 4,
          display: "flex", gap: 5,
        }}>
          {card.images.map((_, i) => (
            <div key={i} style={{
              width: i === imgIdx ? 16 : 5, height: 5, borderRadius: 3,
              background: i === imgIdx ? "var(--or)" : "rgba(255,255,255,0.35)",
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>

        {/* Contenu bas */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
          padding: "28px 28px 32px",
          transform: `translateZ(${s.active ? 20 : 0}px)`,
          transition: s.active ? "transform 0.08s ease" : "transform 0.65s ease",
        }}>
          <h3 style={{
            fontFamily: "var(--serif)", fontSize: "clamp(28px, 3vw, 38px)",
            fontWeight: 300, color: "var(--blanc)", lineHeight: 1, marginBottom: 8,
          }}>
            {card.category}
          </h3>
          <p style={{
            fontFamily: "var(--sans)", fontSize: 12, color: "rgba(250,248,244,0.6)",
            letterSpacing: "0.08em", marginBottom: 20,
          }}>
            {card.desc}
          </p>
          <Link
            href={card.href}
            onClick={e => e.stopPropagation()}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "var(--or)", textDecoration: "none",
              transition: "gap 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.gap = "14px")}
            onMouseLeave={e => (e.currentTarget.style.gap = "8px")}
          >
            {card.cta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Hint clic */}
      <p style={{
        textAlign: "center", marginTop: 12,
        fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.2em",
        textTransform: "uppercase", color: "var(--gris2)",
        opacity: 0.6,
      }}>
        Cliquer pour changer
      </p>
    </div>
  );
}

export default function Card3DGallery() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section ref={ref} style={{
      padding: "120px 60px",
      background: "var(--noir)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p className="label" style={{ marginBottom: 16 }}>Portfolio</p>
          <h2 className="h2">
            Trois univers,<br /><em>une seule vision.</em>
          </h2>
          <div className="divider divider-center" style={{ marginTop: 28 }} />
        </div>

        {/* Cards */}
        <div style={{
          display: "flex",
          gap: "clamp(16px, 2.5vw, 32px)",
          alignItems: "stretch",
        }}>
          {CARDS.map((card, i) => (
            <Card3D key={card.category} card={card} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
