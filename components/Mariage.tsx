"use client";
import { useEffect, useRef } from "react";

const features = [
  "Reportage photo journée complète (300+ photos)",
  "Film cinématique 4K (3-5 minutes)",
  "Shooting engagement avant le mariage",
  "Magazine Box & animation invités",
  "Drone cinématique — plans aériens",
  "Album QR Code invités à vie",
  "Livraison galerie privée en ligne",
];

export default function Mariage() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="mariage" className="section" style={{ background: "var(--noir)" }}>
      <div className="section-inner">
        <div className="section-grid">
          <div className="section-img reveal">
            <img src="/images/mariage.jpg" alt="Photographie mariage Bordeaux" />
            <div className="section-img-border" />
          </div>
          <div className="section-text reveal reveal-delay-2">
            <p className="label">Mariage</p>
            <div className="divider" style={{ margin: "20px 0" }} />
            <h2 className="h2">Le jour le plus<br /><em>important.</em></h2>
            <p>
              Je capture l'émotion brute de votre mariage — les larmes, les rires, les regards. Pas des poses, des vrais moments. Un film cinématique et des photos qui racontent votre histoire.
            </p>
            <p>
              Basé à Bordeaux, disponible en Gironde. Discret, attentif, invisible quand il le faut — présent quand ça compte.
            </p>
            <ul className="section-features">
              {features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 8 }}>
              <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="btn btn-gold">
                Réserver un appel
              </button>
              <span style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span style={{ fontSize: 13, color: "var(--or)" }}>à partir de 1 600€</span>
                <span style={{ fontSize: 11, color: "var(--gris2)", marginTop: 2 }}>Devis personnalisé gratuit</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
