"use client";
import { useEffect, useRef } from "react";

const steps = [
  { num: "1", title: "Prise de contact", desc: "Un appel de 30 min pour tout clarifier. Je réponds sous 48h. Sans engagement, sans pression." },
  { num: "2", title: "Préparation", desc: "On prépare ensemble votre projet — timing, lieux, musique, style. Je suis là à chaque étape." },
  { num: "3", title: "Shooting / Tournage", desc: "Discret et attentif. Vous vivez votre moment, je capture chaque instant qui compte vraiment." },
  { num: "4", title: "Livraison", desc: "Galerie privée et film livrés dans les délais. La première fois que vous regardez, les larmes aux yeux." },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="process" className="process-section">
      <div className="process-inner">
        <div className="reveal">
          <p className="label">Comment ça se passe</p>
          <div className="divider divider-center" style={{ margin: "20px auto" }} />
          <h2 className="h2">Simple,<br /><em>transparent.</em></h2>
          <p style={{ fontSize: 14, color: "var(--gris)", marginTop: 20, maxWidth: 500, margin: "20px auto 0" }}>
            De la prise de contact à la livraison — un process clair, sans surprise et sans stress.
          </p>
        </div>

        <div className="process-steps reveal reveal-delay-1">
          {steps.map((s, i) => (
            <div key={s.num} className={`process-step reveal reveal-delay-${i + 1}`}>
              <div className="process-step-num">{s.num}</div>
              <h3 className="process-step-title">{s.title}</h3>
              <p className="process-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
