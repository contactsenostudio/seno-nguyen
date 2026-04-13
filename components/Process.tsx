"use client";

import { useEffect, useRef } from "react";

const steps = [
  { num: "01", title: "L'appel découverte", desc: "30 minutes pour tout vous expliquer, répondre à vos questions et comprendre votre vision. Sans engagement, sans pression." },
  { num: "02", title: "La proposition sur mesure", desc: "Je vous envoie une proposition personnalisée selon votre projet, votre lieu et votre date. Tarif clair, prestations détaillées." },
  { num: "03", title: "La préparation ensemble", desc: "On prépare votre journée ensemble — timing, lieux de photos, musique du film. Je suis là à chaque étape avant le grand jour." },
  { num: "04", title: "Le grand jour", desc: "Je suis là dès les préparatifs. Discret, attentif, présent. Vous vivez votre mariage, je capture chaque moment qui compte." },
  { num: "05", title: "La livraison & l'émotion", desc: "Votre galerie et votre film livrés dans les délais convenus. La première fois que vous regardez votre film, les larmes aux yeux." },
];

export default function Process() {
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
    <section ref={sectionRef} id="processus" className="processus" style={{ background: "var(--noir)" }}>
      <div className="processus-inner">
        <div className="reveal">
          <p className="section-label">Comment ça se passe</p>
          <h2 className="section-title">
            Un processus<br /><em>simple & clair.</em>
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.8, color: "var(--gris)", marginTop: "32px" }}>
            De la prise de contact jusqu&apos;à la livraison, je vous accompagne à chaque étape. Pas de surprise, pas de stress — juste de la confiance.
          </p>
        </div>

        <div className="processus-steps reveal reveal-delay-2">
          {steps.map((step) => (
            <div key={step.num} className="step">
              <div className="step-num">{step.num}</div>
              <div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
