"use client";
import { useState } from "react";

const cells = [
  {
    img: "/images/photographer.jpg",
    href: "/prestations",
    service: "Portrait",
    sub: "& Lifestyle",
    gridArea: "1 / 1 / 4 / 2",
  },
  {
    img: "/images/hero-maries.jpg",
    href: "/mariage",
    service: "Mariage",
    sub: "Photo + Vidéo",
    gridArea: "1 / 2 / 3 / 3",
  },
  {
    img: "/images/entreprise.jpg",
    href: "/entreprise",
    service: "Gastronomie",
    sub: "Restaurants & Pubs",
    gridArea: "1 / 3 / 4 / 4",
  },
  {
    img: "/images/wedding-couple.jpg",
    href: "/prestations",
    service: "Plage",
    sub: "Bordeaux & Sud",
    gridArea: "3 / 2 / 4 / 3",
  },
  {
    img: "/images/wedding-couple.jpg",
    href: "/mariage",
    service: "Avant-Mariage",
    sub: "Robe & Costume",
    gridArea: "4 / 1 / 5 / 2",
  },
  {
    img: "/images/hero-maries.jpg",
    href: "/mariage",
    service: "Vidéo",
    sub: "Court-Métrage",
    gridArea: "4 / 2 / 5 / 3",
  },
  {
    img: "/images/entreprise.jpg",
    href: "/entreprise",
    service: "Immobilier",
    sub: "& Architecture",
    gridArea: "4 / 3 / 5 / 4",
  },
];

const tabs = [
  { label: "Shooting",   href: "/prestations" },
  { label: "Mariage",    href: "/mariage"     },
  { label: "Entreprise", href: "/entreprise"  },
];

export default function QuickChoice() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <section id="grille" style={{ background: "var(--noir)" }}>

      {/* Section header */}
      <div style={{
        padding: "80px 48px 48px",
        display: "flex", alignItems: "flex-end", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <h2 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(40px, 6vw, 80px)",
          fontWeight: 300,
          color: "var(--blanc)",
          letterSpacing: "-0.02em",
          lineHeight: 0.9,
          margin: 0,
        }}>
          Le travail.
        </h2>
        <p style={{
          fontFamily: "var(--sans)",
          fontSize: 9, letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--gris2)",
          paddingBottom: 4,
        }}>
          Tous les projets
        </p>
      </div>

      {/* 500px-style dense masonry grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr 1fr",
        gridTemplateRows: "220px 220px 220px 220px",
        gap: 3,
      }}>
        {cells.map((c, i) => (
          <a
            key={i}
            href={c.href}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
            style={{
              gridArea: c.gridArea,
              position: "relative",
              overflow: "hidden",
              textDecoration: "none",
              display: "block",
            }}
          >
            {/* Photo */}
            <img
              src={c.img}
              alt={c.service}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover",
                transform: hov === i ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
                display: "block",
              }}
            />

            {/* Dim overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: hov === i ? "rgba(8,8,8,0.6)" : "rgba(8,8,8,0.22)",
              transition: "background 0.4s",
            }} />

            {/* Permanent label */}
            <div style={{
              position: "absolute", bottom: 18, left: 20,
              zIndex: 2,
              opacity: hov === i ? 0 : 1,
              transition: "opacity 0.3s",
            }}>
              <span style={{
                fontFamily: "var(--sans)",
                fontSize: 9, letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(250,248,244,0.5)",
              }}>
                {c.service}
              </span>
            </div>

            {/* Hover content */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              opacity: hov === i ? 1 : 0,
              transition: "opacity 0.35s ease",
              zIndex: 2,
              gap: 6,
            }}>
              <h3 style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(22px, 2.8vw, 42px)",
                fontWeight: 300, fontStyle: "italic",
                color: "var(--blanc)", margin: 0,
                letterSpacing: "-0.01em",
                textAlign: "center",
              }}>
                {c.service}
              </h3>
              <div style={{
                fontFamily: "var(--sans)", fontSize: 9,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "var(--gris2)", textAlign: "center",
              }}>
                {c.sub}
              </div>
              <div style={{ width: 24, height: 1, background: "var(--or)", margin: "8px 0" }} />
              <span style={{
                fontFamily: "var(--sans)",
                fontSize: 9, letterSpacing: "0.35em",
                textTransform: "uppercase", color: "var(--or)",
              }}>
                Découvrir →
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom tab strip */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: "1px solid rgba(201,168,76,0.15)",
      }}>
        {tabs.map((t, i) => (
          <a
            key={t.href}
            href={t.href}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 12, padding: "22px 0",
              fontFamily: "var(--serif)",
              fontSize: "clamp(18px, 2vw, 26px)",
              fontWeight: 300,
              color: "var(--gris)",
              textDecoration: "none",
              borderRight: i < 2 ? "1px solid rgba(201,168,76,0.1)" : "none",
              transition: "color 0.25s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--or)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--gris)"; }}
          >
            {t.label}
            <span style={{
              fontFamily: "var(--sans)",
              fontSize: 9, letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--or)",
              opacity: 0.6,
            }}>→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
