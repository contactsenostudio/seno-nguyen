"use client";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Background photo */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/hero-4k-6.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
      }} />

      {/* Dark overlay — gauche sombre pour le texte, droite claire pour l'image */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.15) 100%)",
      }} />
      {/* Dégradé bas pour les chiffres */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(10,10,10,0.5) 0%, transparent 35%)",
      }} />

      <div className="hero-bg" />
      <div className="hero-grain" />
      <div className="hero-line-left" />

      <div className="hero-content">
        <p className="hero-eyebrow">Bordeaux · Gironde · France</p>
        <h1 className="hero-title">
          Capturer<em>l&apos;irremplaçable.</em>
        </h1>
        <p className="hero-desc">
          Photographe et vidéaste mariage à Bordeaux. Je transforme chaque moment de votre journée en un souvenir cinématique que vous revivrez toute une vie.
        </p>
        <div className="hero-actions">
          <a
            href="#formules"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.querySelector("#formules")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Voir les formules
          </a>
          <a
            href="#galerie"
            className="btn-ghost"
            onClick={(e) => { e.preventDefault(); document.querySelector("#galerie")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            Découvrir le travail
          </a>
        </div>
      </div>

      <div
        className="hero-scroll"
        style={{ cursor: "none" }}
        onClick={() => document.querySelector("#univers")?.scrollIntoView({ behavior: "smooth" })}
      >
        <div className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: "220px",
        background: "linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.6) 50%, #0a0a0a 100%)",
        pointerEvents: "none",
        zIndex: 3,
      }} />

      <div className="hero-numbers">
        {[
          { val: "100+", label: "Mariages" },
          { val: "4K",   label: "Cinéma" },
          { val: "∞",    label: "Souvenirs" },
        ].map((n) => (
          <div key={n.val} className="hero-num">
            <div className="hero-num-val">{n.val}</div>
            <div className="hero-num-label">{n.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
