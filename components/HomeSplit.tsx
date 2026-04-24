"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const panels = [
  {
    num: "01",
    title: "Mariage",
    sub: "Photo · Film 4K · Magazine Box",
    cta: "Découvrir les formules",
    href: "/mariage",
    img: "/images/wedding-bride.jpg",
    position: "center 29%",
  },
  {
    num: "02",
    title: "Entreprise",
    sub: "Corporate · Événements · Branding",
    cta: "Voir les services",
    href: "/entreprise",
    img: "/images/business2.jpg",
    position: "center center",
  },
  {
    num: "03",
    title: "Particulier",
    sub: "Magazine Box · Portraits · Naissances",
    cta: "Explorer l'offre",
    href: "/particulier",
    img: "/images/prestations-hero1.jpg",
    position: "center center",
  },
];

export default function HomeSplit() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkTheme = () => setIsLight(document.documentElement.dataset.theme === "light");
    checkTheme();
    const obs = new MutationObserver(checkTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const check = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setVisible(rect.top < window.innerHeight - 60);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <div style={{ background: "var(--noir)", paddingTop: 60 }}>

      {/* En-tête */}
      <div style={{
        margin: "0 60px 40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <p style={{
          fontFamily: "var(--sans)", fontSize: 10,
          letterSpacing: "0.45em", textTransform: "uppercase",
          color: "rgba(201,168,76,0.6)", marginBottom: 12, margin: "0 0 12px",
        }}>Ce que je propose</p>
        <h2 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 300, fontStyle: "italic",
          color: "var(--blanc)",
          margin: 0, lineHeight: 1.1,
        }}>Choisissez votre univers.</h2>
      </div>

    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "75dvh",
        display: "flex",
        overflow: "hidden",
        margin: "0 60px",
        borderRadius: 2,
      }}
    >
      {panels.map((p, i) => {
        const isHovered = hovered === i;
        const isDimmed = hovered !== null && !isHovered;

        return (
          <Link
            key={p.num}
            href={p.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "48px 44px",
              textDecoration: "none",
              borderRight: i < 2 ? "1px solid rgba(201,168,76,0.15)" : "none",
              overflow: "hidden",
              cursor: "pointer",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(60px) scale(0.97)",
              transition: `opacity 0.9s ${i * 130}ms cubic-bezier(0.16,1,0.3,1), transform 1.1s ${i * 130}ms cubic-bezier(0.16,1,0.3,1)`,
            }}
          >
            {/* Image */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `url('${p.img}')`,
              backgroundSize: "cover",
              backgroundPosition: p.position,
              transform: isHovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)",
            }} />

            {/* Overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: isLight
                ? (isHovered
                  ? "linear-gradient(to top, rgba(245,240,225,0.5) 0%, rgba(245,240,225,0.15) 55%, rgba(245,240,225,0.05) 100%)"
                  : "linear-gradient(to top, rgba(245,240,225,0.3) 0%, rgba(245,240,225,0.08) 55%, rgba(245,240,225,0.02) 100%)")
                : (isHovered
                  ? "linear-gradient(to top, rgba(6,6,6,0.95) 0%, rgba(6,6,6,0.3) 55%, rgba(6,6,6,0.1) 100%)"
                  : "linear-gradient(to top, rgba(6,6,6,0.85) 0%, rgba(6,6,6,0.5) 55%, rgba(6,6,6,0.25) 100%)"),
              transition: "background 0.6s ease",
            }} />

            {/* Assombrissement si autre hover */}
            <div style={{
              position: "absolute", inset: 0,
              background: isLight ? "rgba(245,240,225,0.3)" : "rgba(6,6,6,0.45)",
              opacity: isDimmed ? 1 : 0,
              transition: "opacity 0.5s ease",
            }} />

            {/* Ligne dorée bas */}
            <div style={{
              position: "absolute", bottom: 0, left: 0,
              height: 2, background: "var(--or)",
              width: isHovered ? "100%" : "0%",
              transition: "width 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
            }} />

            {/* Numéro */}
            <div style={{
              position: "absolute", top: 36, right: 32,
              fontFamily: "var(--serif)", fontSize: 80, fontWeight: 300,
              color: isLight
                ? (isHovered ? "rgba(28,26,23,0.18)" : "rgba(28,26,23,0.08)")
                : (isHovered ? "rgba(201,168,76,0.2)" : "rgba(201,168,76,0.08)"),
              lineHeight: 1,
              transform: isHovered ? "translateY(-6px)" : "translateY(0)",
              transition: "color 0.5s, transform 0.5s",
            }}>{p.num}</div>

            {/* Contenu bas */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 2.8vw, 44px)",
                fontWeight: 300,
                color: isLight ? "#1c1a17" : "var(--blanc)",
                lineHeight: 1,
                marginBottom: 16,
                transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.5s ease",
              }}>{p.title}</div>

              <div style={{
                height: 1, background: "var(--or)",
                width: isHovered ? 56 : 28,
                marginBottom: 16,
                transition: "width 0.5s ease",
              }} />

              <p className="panel-sub" style={{
                fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: isLight ? "rgba(28,26,23,0.6)" : "rgba(250,248,244,0.5)",
                marginBottom: 24,
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.4s 0.08s ease, transform 0.4s 0.08s ease",
              }}>{p.sub}</p>

              <span className="panel-cta" style={{
                display: "inline-flex", alignItems: "center",
                gap: isHovered ? 16 : 8,
                fontFamily: "var(--sans)", fontSize: 10,
                letterSpacing: "0.35em", textTransform: "uppercase",
                color: isLight ? "#1c1a17" : "var(--or)",
                opacity: isHovered ? 1 : 0.6,
                transition: "gap 0.35s ease, opacity 0.4s ease",
              }}>{p.cta} →</span>
            </div>
          </Link>
        );
      })}

      <style>{`
        @media (max-width: 768px) {
          section { flex-direction: column; height: auto !important; }
          section > a { flex: none !important; height: 33dvh; min-height: 200px; border-right: none !important; border-bottom: 1px solid rgba(201,168,76,0.1); }
          .panel-sub { opacity: 1 !important; transform: translateY(0) !important; }
          .panel-cta { opacity: 1 !important; }
        }
      `}</style>
    </section>
    </div>
  );
}
