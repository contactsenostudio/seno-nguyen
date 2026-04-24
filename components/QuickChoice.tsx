"use client";
import { useEffect, useRef, useState } from "react";

const offers = [
  {
    num: "01",
    title: "Mariage",
    desc: "Photo + Film 4K + Magazine Box — un univers visuel complet capturé par un seul artiste. Cohérence totale, zéro coordination.",
    cta: "Voir les formules",
    href: "/mariage",
    img: "/images/choice-mariage.jpg",
  },
  {
    num: "02",
    title: "Entreprise",
    desc: "Films corporate, événements, branding. Une image professionnelle qui inspire confiance.",
    cta: "Voir les services",
    href: "/entreprise",
    img: "/images/choice-corpo.jpg",
  },
  {
    num: "03",
    title: "Particulier",
    desc: "Magazine Box, portraits, événements, naissance — une expérience premium pour chaque occasion.",
    cta: "Découvrir les offres",
    href: "/particulier",
    img: "/images/choice-entreprise.jpg",
  },
];

export default function QuickChoice() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="offres" className="page-px-md" style={{ background: "var(--noir2)", paddingTop: 100, paddingBottom: 100 }}>

      {/* Header */}
      <div style={{
        maxWidth: 1300, margin: "0 auto 64px",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}>
        <div>
          <p className="label" style={{ marginBottom: 16 }}>Ce que je propose</p>
          <h2 className="h2">Choisissez votre<br /><em>univers.</em></h2>
        </div>
        <div style={{ width: 48, height: 1, background: "var(--or)", marginBottom: 12 }} />
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {offers.map((o, i) => (
          <a
            key={o.num}
            href={o.href}
            style={{
              position: "relative", overflow: "hidden", textDecoration: "none",
              display: "block", height: "65vh", minHeight: 480,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.7s ${0.1 + i * 0.12}s ease, transform 0.7s ${0.1 + i * 0.12}s ease`,
            }}
            className="qc-card"
          >
            {/* Image */}
            <div
              className="qc-img"
              style={{
                position: "absolute", inset: 0,
                backgroundImage: `url('${o.img}')`,
                backgroundSize: "cover", backgroundPosition: "center",
                transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            />

            {/* Overlay gradient */}
            <div className="qc-overlay" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.5) 55%, rgba(8,8,8,0.15) 100%)",
              transition: "background 0.5s",
            }} />

            {/* Gold line bottom — animates in on hover */}
            <div className="qc-line" style={{
              position: "absolute", bottom: 0, left: 0,
              height: 2, width: 0, background: "var(--or)",
              transition: "width 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
            }} />

            {/* Content */}
            <div style={{ position: "absolute", inset: 0, padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2 }}>

              {/* Number top */}
              <div className="qc-num" style={{
                position: "absolute", top: 32, right: 28,
                fontFamily: "var(--serif)", fontSize: 80, fontWeight: 300,
                color: "rgba(201,168,76,0.08)", lineHeight: 1,
                transition: "color 0.4s, transform 0.4s",
              }}>{o.num}</div>

              <div className="qc-title" style={{
                fontFamily: "var(--serif)", fontSize: 42, fontWeight: 300,
                color: "var(--blanc)", lineHeight: 1, marginBottom: 0,
                transition: "transform 0.4s ease",
              }}>{o.title}</div>

              <div className="qc-divider" style={{
                width: 32, height: 1, background: "var(--or)",
                margin: "18px 0", transition: "width 0.4s ease",
              }} />

              <p className="qc-desc" style={{
                fontSize: 13, lineHeight: 1.75,
                color: "rgba(250,248,244,0.55)", maxWidth: 260,
                marginBottom: 24,
                opacity: 0, transform: "translateY(8px)",
                transition: "opacity 0.4s 0.05s ease, transform 0.4s 0.05s ease",
              }}>{o.desc}</p>

              <span className="qc-cta" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
                color: "var(--or)", transition: "gap 0.3s",
              }}>{o.cta} →</span>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .qc-card:hover .qc-img { transform: scale(1.07); }
        .qc-card:hover .qc-overlay { background: linear-gradient(to top, rgba(8,8,8,0.99) 0%, rgba(8,8,8,0.65) 55%, rgba(8,8,8,0.3) 100%); }
        .qc-card:hover .qc-line { width: 100%; }
        .qc-card:hover .qc-num { color: rgba(201,168,76,0.18); transform: translateY(-4px); }
        .qc-card:hover .qc-title { transform: translateY(-4px); }
        .qc-card:hover .qc-divider { width: 56px; }
        .qc-card:hover .qc-desc { opacity: 1; transform: translateY(0); }
        .qc-card:hover .qc-cta { gap: 18px; }
        @media (max-width: 768px) {
          .qc-card { height: 50vh !important; min-height: 360px !important; }
        }
      `}</style>
    </section>
  );
}
