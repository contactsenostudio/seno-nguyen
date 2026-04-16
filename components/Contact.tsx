"use client";
import { useEffect, useRef, useState } from "react";

const eventTypes = ["Mariage","Film de mariage","Magazine Box","Corporate / Entreprise","Événement","Portrait / Branding","Autre"];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", tel: "", type: "", date: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"sent"|"error">("idle");

  // Reveal animation
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Canvas particles
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
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
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
        setForm({ prenom: "", nom: "", email: "", tel: "", type: "", date: "", message: "" });
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
            Un appel de 30 minutes suffit pour tout clarifier. Je réponds à chaque demande sous 24h et vous propose une offre adaptée à votre projet.
          </p>

          {[
            { icon: "◎", label: "Zone", value: "Bordeaux · Gironde · France entière" },
            { icon: "✉", label: "Email", value: "contact.senostudio@gmail.com" },
            { icon: "☏", label: "Téléphone", value: "+33 7 68 86 85 05" },
            { icon: "◷", label: "Réponse", value: "Sous 24h · 7j/7" },
          ].map(d => (
            <div key={d.label} className="contact-detail">
              <div className="contact-detail-icon">{d.icon}</div>
              <div>
                <div className="contact-detail-label">{d.label}</div>
                <div className="contact-detail-value">{d.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div>
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
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="emma@email.com" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Téléphone</label>
                <input type="tel" name="tel" value={form.tel} onChange={handleChange} placeholder="+33 6 00 00 00 00" className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Type de projet</label>
              <select name="type" value={form.type} onChange={handleChange} className="form-select">
                <option value="">Sélectionner...</option>
                {eventTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date souhaitée</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="form-input"
                onClick={e => (e.currentTarget as HTMLInputElement).showPicker?.()} />
            </div>
            <div className="form-group">
              <label className="form-label">Votre projet</label>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Parlez-moi de votre projet, vos envies, votre vision..." className="form-textarea" />
            </div>
            <button type="submit" disabled={status === "loading"}
              className={`form-submit${status === "loading" ? " loading" : status === "sent" ? " sent" : status === "error" ? " error" : ""}`}>
              {status === "loading" ? "Envoi en cours..." : status === "sent" ? "✓ Message envoyé !" : status === "error" ? "Erreur — réessayez" : "Envoyer ma demande"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>

    {/* Banderole */}
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)", padding: "13px 0", background: "var(--noir)" }}>
      <div style={{ display: "flex", width: "max-content", animation: "ticker-scroll 22s linear infinite" }}>
        {Array(10).fill("Réservez votre date · Réponse sous 24h · Bordeaux & France entière · Mariage · Entreprise · Événement").map((text, i) => (
          <span key={i} style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--or)", opacity: 0.6, paddingRight: 80, whiteSpace: "nowrap" }}>
            {text}
          </span>
        ))}
      </div>
    </div>
    </>
  );
}
