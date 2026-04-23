"use client";
import { useEffect, useRef } from "react";

export default function BookingCTA() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="booking-section">
      <div className="booking-inner reveal">
        <p className="label">Prêt à commencer ?</p>
        <div className="divider divider-center" style={{ margin: "20px auto" }} />
        <h2 className="h2">Un appel suffit<br /><em>pour tout clarifier.</em></h2>
        <p>
          30 minutes pour discuter de votre projet, vos envies, votre budget. Je vous propose une offre sur mesure sous 48h. Gratuit, sans engagement.
        </p>
        <div className="booking-actions">
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-gold"
            style={{ fontSize: 12, padding: "18px 48px" }}
          >
            Réserver mon appel gratuit
          </button>
          <a href="tel:+33768868505" className="btn btn-outline">
            +33 7 68 86 85 05
          </a>
        </div>
        <p style={{ fontSize: 12, color: "var(--gris2)", marginTop: 28 }}>
          Réponse garantie sous 48h · Disponible 7j/7
        </p>
      </div>
    </section>
  );
}
