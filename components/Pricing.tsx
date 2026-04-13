"use client";

import { useEffect, useRef } from "react";

const packs = [
  {
    name: "Essentiel",
    eyebrow: "La photo complète",
    price: "à partir de 1 600€",
    features: ["Reportage photo journée complète", "300+ photos retouchées", "Galerie privée en ligne", "Droit d'impression inclus", "Livraison sous 4 semaines"],
    cta: "Demander un devis",
    popular: false,
  },
  {
    name: "Expérience",
    eyebrow: "Photo + Vidéo + Animation invités",
    price: "à partir de 3 200€",
    features: ["Tout le pack Essentiel", "Film cinématique 4K (3-5 min)", "Magazine Box + impressions", "Album QR Code invités", "Teaser 60s réseaux sociaux"],
    cta: "Réserver ce pack",
    popular: true,
    badge: "Le plus populaire",
  },
  {
    name: "Premium",
    eyebrow: "L'expérience complète",
    price: "à partir de 5 000€",
    features: ["Tout le pack Expérience", "Shooting engagement inclus", "Drone cinématique 4K", "2 vidéastes sur place", "Accompagnement complet"],
    cta: "Nous contacter",
    popular: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    section.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="formules" className="packs">
      <div className="packs-header reveal">
        <p className="section-label" style={{ justifyContent: "center" }}>Formules mariage</p>
        <h2 className="section-title">
          Choisissez votre<br /><em>expérience.</em>
        </h2>
        <p style={{ fontSize: "13px", color: "var(--gris)", marginTop: "16px" }}>
          Tarifs sur devis · Disponible partout en France · Déplacement selon zone
        </p>
      </div>

      <div className="packs-grid">
        {packs.map((pack, i) => (
          <div key={i} className={`pack-card reveal reveal-delay-${i + 1}${pack.popular ? " popular" : ""}`}>
            {pack.badge && <div className="popular-badge">{pack.badge}</div>}
            <p className="pack-eyebrow">{pack.eyebrow}</p>
            <h3 className="pack-name">{pack.name}</h3>
            <p className="pack-price">{pack.price}</p>
            <ul className="pack-items">
              {pack.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a
              href="#contact"
              className={`pack-cta${pack.popular ? " pack-cta-solid" : " pack-cta-ghost"}`}
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              {pack.cta}
            </a>
            <p style={{ fontSize: "11px", color: "var(--gris)", marginTop: "12px", textAlign: "center", lineHeight: "1.6" }}>
              Formule adaptable · Devis personnalisé sur{" "}
              <a href="tel:+33768868505" style={{ color: "var(--or)", textDecoration: "none" }}>appel</a>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
