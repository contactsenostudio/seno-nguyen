"use client";
import { useEffect, useRef, useState } from "react";
import ProjectQuiz from "./ProjectQuiz";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", tel: "", type: "", date: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"sent"|"error">("idle");
  const [quizDone, setQuizDone] = useState(false);
  const [quizSummary, setQuizSummary] = useState("");

  // Reveal animation
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Canvas particles — pause quand hors viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.4 + 0.08,
      });
    }

    let raf: number;
    let running = false;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.opacity})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.05 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) { running = true; draw(); }
      else if (!entry.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.05 });
    obs.observe(canvas);

    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); obs.disconnect(); window.removeEventListener("resize", resize); };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  // Load Calendly script when form is sent
  useEffect(() => {
    if (status !== "sent") return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quiz: quizSummary }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ prenom: "", nom: "", email: "", tel: "", type: "", date: "", message: "" });
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <>
    <section ref={ref} id="contact" className="contact-section" style={{ position: "relative", overflow: "hidden" }}>

      {/* Canvas particles en arrière-plan */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />

      {/* Cercles décoratifs animés */}
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.05)", animation: "spin-slow 25s linear infinite", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.04)", animation: "spin-slow 18s linear infinite reverse", pointerEvents: "none", zIndex: 0,
        marginTop: 50, marginRight: 50 }} />

      <div className="contact-inner" style={{ position: "relative", zIndex: 1 }}>
        {/* Left */}
        <div>
          <p className="label">Contact</p>
          <div className="divider" style={{ margin: "20px 0" }} />
          <h2 className="h2">Parlons de<br /><em>votre projet.</em></h2>
          <p className="contact-info" style={{ fontSize: 14, lineHeight: 1.85, color: "var(--gris)", margin: "24px 0 40px" }}>
            Un appel de 30 minutes suffit pour tout clarifier. Je réponds à chaque demande sous 48h et vous propose une offre adaptée à votre projet.
          </p>

          {[
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              ),
              label: "Zone", value: "Disponible en Gironde",
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              ),
              label: "Email", value: "contact.senostudio@gmail.com",
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                </svg>
              ),
              label: "Téléphone", value: "+33 7 68 86 85 05",
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              ),
              label: "Réponse", value: "Sous 48h · 7j/7",
            },
          ].map(d => (
            <div key={d.label} className="contact-detail">
              <div className="contact-detail-icon" style={{ color: "var(--or)" }}>{d.icon}</div>
              <div>
                <div className="contact-detail-label">{d.label}</div>
                <div className="contact-detail-value">{d.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div>
          {status === "sent" ? (
            <div>
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: "1px solid var(--or)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "var(--or)" }}>✓</div>
                  <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--or)" }}>Message envoyé</p>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--gris)" }}>
                  Parfait — plus qu&apos;une étape. Choisissez un créneau pour votre appel découverte de 30 min.
                </p>
              </div>
              <div
                className="calendly-inline-widget"
                data-url="https://calendly.com/contact-senostudio/30min?hide_gdpr_banner=1&background_color=0d0d0d&text_color=faf8f4&primary_color=c9a84c"
                style={{ minWidth: 320, height: 700 }}
              />
            </div>
          ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="field-prenom" className="form-label">Prénom *</label>
                <input id="field-prenom" type="text" name="prenom" required autoComplete="given-name" value={form.prenom} onChange={handleChange} placeholder="Emma" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="field-nom" className="form-label">Nom *</label>
                <input id="field-nom" type="text" name="nom" required autoComplete="family-name" value={form.nom} onChange={handleChange} placeholder="Martin" className="form-input" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="field-email" className="form-label">Email *</label>
                <input id="field-email" type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} placeholder="emma@email.com" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="field-tel" className="form-label">Téléphone</label>
                <input id="field-tel" type="tel" name="tel" autoComplete="tel" value={form.tel} onChange={handleChange} placeholder="+33 6 00 00 00 00" className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Type de projet</label>
              {!quizDone ? (
                <ProjectQuiz onComplete={(type, summary) => {
                  setQuizDone(true);
                  setQuizSummary(summary);
                  setForm(f => ({ ...f, type }));
                }} />
              ) : (
                <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", padding: "16px 20px", marginBottom: 8 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--or)", marginBottom: 8 }}>Récapitulatif</div>
                  <div style={{ fontSize: 12, lineHeight: 1.8, color: "var(--blanc2)" }}>{quizSummary.split(" · ").map((part, i) => (
                    <span key={i}>{i > 0 && <span style={{ color: "var(--or)", margin: "0 4px" }}>·</span>}{part}</span>
                  ))}</div>
                  <button type="button" onClick={() => { setQuizDone(false); setQuizSummary(""); setForm(f => ({ ...f, type: "", message: "" })); }}
                    style={{ marginTop: 12, background: "none", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gris2)", padding: 0 }}>
                    ← Modifier
                  </button>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="field-date" className="form-label">Date souhaitée</label>
              <input id="field-date" type="date" name="date" value={form.date} onChange={handleChange} className="form-input"
                onClick={e => (e.currentTarget as HTMLInputElement).showPicker?.()} />
            </div>
            <div className="form-group">
              <label htmlFor="field-message" className="form-label">Message</label>
              <textarea id="field-message" name="message" value={form.message} onChange={handleChange}
                placeholder="Parlez-moi de votre projet, vos envies, votre vision..." className="form-textarea" />
            </div>
            <button type="submit" disabled={status === "loading"}
              className={`form-submit${status === "loading" ? " loading" : status === "error" ? " error" : ""}`}>
              {status === "loading" ? "Envoi en cours..." : status === "error" ? "Erreur — réessayez" : "Envoyer ma demande"}
            </button>
          </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>

    {/* Banderole */}
    <div aria-hidden="true" style={{ overflow: "hidden", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)", padding: "13px 0", background: "var(--noir)" }}>
      <div style={{ display: "flex", width: "max-content", animation: "ticker-scroll 22s linear infinite" }}>
        {Array(10).fill("Réservez votre date · Réponse sous 48h · Bordeaux · Gironde · Mariage · Entreprise · Événement").map((text, i) => (
          <span key={i} style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--or)", opacity: 0.6, paddingRight: 80, whiteSpace: "nowrap" }}>
            {text}
          </span>
        ))}
      </div>
    </div>
    </>
  );
}
