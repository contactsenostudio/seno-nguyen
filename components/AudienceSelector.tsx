"use client";

import { useEffect, useRef } from "react";

const audiences = [
  {
    id: "Mariage",
    symbol: "♡",
    title: "Mariage",
    subtitle: "Vous préparez votre grand jour",
    desc: "Reportage photo, film cinématique, shooting engagement, Magazine Box, drone...",
    cta: "Voir les offres mariage",
  },
  {
    id: "Entreprise",
    symbol: "◈",
    title: "Entreprise",
    subtitle: "Vous représentez une société",
    desc: "Photo corporate, film institutionnel, contenu réseaux sociaux, témoignages...",
    cta: "Voir les offres entreprise",
  },
  {
    id: "Événements",
    symbol: "◆",
    title: "Événement",
    subtitle: "C'est pour une autre occasion",
    desc: "Baptême, anniversaire, gala, EVJF, portrait, conférence, naissance...",
    cta: "Voir les offres événements",
  },
];

export default function AudienceSelector() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>(".audience-card");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? "0";
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, Number(delay));
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cards.forEach((card) => obs.observe(card));

    return () => obs.disconnect();
  }, []);

  const handleSelect = (id: string) => {
    window.dispatchEvent(new CustomEvent("switch-service-tab", { detail: { tab: id } }));
    document.querySelector("#prestations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} style={{ background: "var(--noir)", padding: "80px 0 60px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{
            fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.35em",
            textTransform: "uppercase", color: "rgba(201,168,76,0.6)", marginBottom: 16,
          }}>
            Vous êtes ici pour
          </p>
          <h2 style={{
            fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--blanc)", lineHeight: 1,
          }}>
            Qu&apos;est-ce qui vous amène ?
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {audiences.map((a, i) => (
            <button
              key={a.id}
              className="audience-card"
              data-delay={i * 150}
              onClick={() => handleSelect(a.id)}
              style={{
                opacity: 0,
                transform: "translateY(30px)",
                transition: "opacity 0.7s ease, transform 0.7s ease, border-color 0.3s, background 0.3s",
                background: "var(--noir2)",
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "36px 32px",
                textAlign: "left",
                cursor: "none",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.45)";
                (e.currentTarget as HTMLElement).style.background = "var(--noir3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)";
                (e.currentTarget as HTMLElement).style.background = "var(--noir2)";
              }}
            >
              <span style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--or)", lineHeight: 1 }}>
                {a.symbol}
              </span>
              <h3 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: "1.5rem", fontWeight: 300, color: "var(--blanc)", lineHeight: 1 }}>
                {a.title}
              </h3>
              <p style={{ fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.1em", color: "rgba(201,168,76,0.7)", textTransform: "uppercase" }}>
                {a.subtitle}
              </p>
              <p style={{ fontFamily: "var(--sans)", fontSize: 12, color: "rgba(248,245,239,0.45)", lineHeight: 1.7, marginTop: 4 }}>
                {a.desc}
              </p>
              <div style={{ marginTop: "auto", paddingTop: 20, display: "flex", alignItems: "center", gap: 8, color: "rgba(201,168,76,0.6)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "var(--sans)" }}>
                <span>{a.cta}</span>
                <span style={{ fontSize: 12 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
