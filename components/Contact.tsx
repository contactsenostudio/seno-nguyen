"use client";

import { useEffect, useRef, useState } from "react";

const eventTypes = ["Mariage","Film de mariage","Pack Expérience","Magazine Box","Entreprise","Baptême / Communion","Anniversaire / Gala","Naissance & Famille","EVJF / EVG","Portrait / Branding","Autre"];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ prenom:"", nom:"", email:"", type:"", date:"", lieu:"", message:"" });
  const [status, setStatus] = useState<"idle"|"loading"|"sent"|"error">("idle");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    section.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ prenom:"", nom:"", email:"", type:"", date:"", lieu:"", message:"" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const details = [
    { icon: "◎", label: "Zone",      value: "Bordeaux · Gironde · France entière" },
    { icon: "✉", label: "Email",     value: "contact.senostudio@gmail.com" },
    { icon: "☏", label: "Téléphone", value: "+33 7 68 86 85 05" },
    { icon: "◷", label: "Réponse",   value: "Sous 24h" },
  ];

  return (
    <section ref={sectionRef} id="contact" className="contact">
      <div className="contact-inner">
        {/* Left */}
        <div className="reveal">
          <p className="section-label">Contact</p>
          <h2 className="section-title">
            Parlons de<br /><em>votre projet.</em>
          </h2>
          <p className="contact-text">
            Un appel de 30 minutes suffit pour tout clarifier. Je réponds à chaque demande sous 24h et vous propose une offre adaptée à votre projet.
          </p>
          <div className="contact-details">
            {details.map((d) => (
              <div key={d.label} className="contact-detail">
                <div className="detail-icon">{d.icon}</div>
                <div>
                  <p className="detail-label">{d.label}</p>
                  <p className="detail-value">{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="reveal reveal-delay-2">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Prénom *</label>
                <input type="text" name="prenom" required value={form.prenom} onChange={handleChange} placeholder="Emma" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Nom *</label>
                <input type="text" name="nom" required value={form.nom} onChange={handleChange} placeholder="Martin" className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="emma@email.com" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Type d&apos;événement</label>
              <select name="type" value={form.type} onChange={handleChange} className="form-select">
                <option value="">Sélectionner...</option>
                {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Lieu</label>
                <input type="text" name="lieu" value={form.lieu} onChange={handleChange} placeholder="Bordeaux, Gironde..." className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Parlez-moi de votre projet, vos envies, votre vision..." className="form-textarea" />
            </div>
            <button type="submit" disabled={status === "loading"} className={`form-submit${status === "sent" ? " sent" : status === "error" ? " error" : status === "loading" ? " loading" : ""}`}>
              {status === "loading" ? "Envoi en cours..." : status === "sent" ? "✓  Message envoyé !" : status === "error" ? "Erreur — réessayez" : "Réserver un appel gratuit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
