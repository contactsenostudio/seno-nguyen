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
        <h2 className="h2">Un appel suffit<br /><span style={{ fontFamily: "var(--serif)", fontWeight: 300, fontStyle: "italic", textTransform: "none", fontSize: "0.88em", color: "#e05a2b" }}>pour tout clarifier.</span></h2>
        <p>
          30 minutes pour discuter de votre projet, vos envies, votre budget. Je vous propose une offre sur mesure sous 24h. Gratuit, sans engagement.
        </p>
        <div className="booking-actions">
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-arrow btn-arrow-orange"
          >
            → Réserver mon appel gratuit
          </button>
          <a href="tel:+33768868505" className="btn-arrow">
            → +33 7 68 86 85 05
          </a>
        </div>
        <p style={{ fontSize: 12, color: "var(--gris2)", marginTop: 28 }}>
          Réponse garantie sous 24h · Disponible 7j/7
        </p>
      </div>
    </section>
  );
}
