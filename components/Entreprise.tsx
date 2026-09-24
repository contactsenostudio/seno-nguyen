"use client";
import { useEffect, useRef } from "react";

const features = [
  "Film institutionnel & corporate (2-5 min)",
  "Photo corporate — portraits & équipes",
  "Couverture d'événements professionnels",
  "Contenu réseaux sociaux (Reels, Stories)",
  "Témoignages clients vidéo",
  "Photo produit & lifestyle",
  "Droits commerciaux inclus",
];

export default function Entreprise() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="entreprise" className="section" style={{ background: "var(--noir2)" }}>
      <div className="section-inner">
        <div className="section-grid" style={{ direction: "rtl" }}>
          <div style={{ direction: "ltr" }} className="section-img reveal">
            <img src="/images/entreprise.jpg" alt="Vidéo corporate entreprise Bordeaux" />
            <div className="section-img-border" style={{ left: -16, right: "auto", bottom: -16 }} />
          </div>
          <div style={{ direction: "ltr" }} className="section-text reveal reveal-delay-2">
            <p className="label">Entreprise</p>
            <div className="divider" style={{ margin: "20px 0" }} />
            <h2 className="h2">Votre image,<br /><em>votre impact.</em></h2>
            <p>
              Une vidéo de qualité cinématique multiplie par 3 l&apos;engagement sur vos réseaux. Un film institutionnel bien réalisé, c&apos;est votre meilleur commercial — disponible 24h/24.
            </p>
            <p>
              Je travaille avec des PME, startups et grands groupes qui veulent une image premium sans budget agence. Réactivité, professionnalisme, résultats.
            </p>
            <ul className="section-features">
              {features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 8 }}>
              <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="btn btn-gold">
                Demander un devis
              </button>
              <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="btn btn-ghost">
                Voir les tarifs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
