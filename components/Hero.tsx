"use client";
export default function Hero() {
  const scroll = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="hero">
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 25%" }} />
      <div className="hero-overlay" />
      <div className="hero-bottom" />

      {/* Vertical line */}
      <div style={{ position: "absolute", left: 60, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.25) 30%, rgba(201,168,76,0.25) 70%, transparent)", zIndex: 2 }} />

      <div className="hero-content">
        <p className="hero-eyebrow">Bordeaux · Gironde · France</p>
        <h1 className="hero-title">
          L&apos;image qui<br /><em>restera.</em>
        </h1>
        <p className="hero-desc">
          Photographe & vidéaste premium. Mariage, entreprise, événements — je transforme chaque moment en souvenir cinématique inoubliable.
        </p>
        <div className="hero-actions">
          <button onClick={() => scroll("#contact")} className="btn btn-gold">
            Réserver un appel gratuit
          </button>
          <button onClick={() => scroll("#offres")} className="btn btn-outline">
            Découvrir les offres
          </button>
        </div>

        <div className="hero-stats">
          {[
            { val: "150+", label: "Mariages" },
            { val: "4K", label: "Cinéma" },
            { val: "98%", label: "Satisfaction" },
            { val: "24h", label: "Réponse" },
          ].map(s => (
            <div key={s.val}>
              <div className="hero-stat-val">{s.val}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: "absolute", bottom: 48, right: 60, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 1, height: 64, background: "linear-gradient(to bottom, var(--or), transparent)" }} />
        <span style={{ fontFamily: "var(--sans)", fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gris2)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Scroll</span>
      </div>
    </section>
  );
}
