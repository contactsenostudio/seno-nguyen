"use client";
import { useState, useRef } from "react";

const eventTypes = [
  "Portrait & Lifestyle",
  "Mariage",
  "Famille & Naissance",
  "Gastronomie & Restauration",
  "Immobilier & Architecture",
  "Mode & Marque",
  "Événementiel",
  "Sport & Outdoor",
  "Vin & Terroir",
  "Autre",
];

export default function Contact() {
  const [form, setForm]     = useState({ prenom: "", nom: "", email: "", tel: "", type: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const mountedAt = useRef(Date.now());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _hp: "", _ts: mountedAt.current }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ prenom: "", nom: "", email: "", tel: "", type: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error"); setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error"); setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inp: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    color: "#f5f0eb", fontFamily: "var(--sans)", fontSize: 16,
    fontWeight: 400, padding: "12px 0", outline: "none",
    transition: "border-color 0.22s", borderRadius: 0,
  };

  const lbl: React.CSSProperties = {
    display: "block", fontFamily: "var(--condensed)", fontSize: 9,
    letterSpacing: "0.4em", textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)", marginBottom: 6,
  };

  return (
    <section
      id="contact"
      style={{
        display: "grid",
        gridTemplateColumns: "42fr 58fr",
        minHeight: "100vh",
        background: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain global */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} aria-hidden>
        <filter id="grain-ct">
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-ct)" opacity="0.025" />
      </svg>

      {/* ── Panneau gauche ── */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "80px clamp(28px, 5vw, 72px)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
      }}>

        {/* Glow */}
        <div style={{ position: "absolute", bottom: "-20%", left: "-20%", width: "80%", height: "80%", borderRadius: "50%", background: "radial-gradient(circle, rgba(224,90,43,0.07) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />

        {/* Ghost number */}
        <div aria-hidden style={{
          position: "absolute", bottom: 24, right: 28,
          fontFamily: "var(--serif)", fontStyle: "italic",
          fontSize: "clamp(90px, 13vw, 180px)", fontWeight: 300,
          color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>05</div>

        <p style={{
          fontFamily: "var(--sans)", fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)", marginBottom: 28,
        }}>— Contact</p>

        <h2 style={{
          fontFamily: "var(--serif)", fontStyle: "italic",
          fontWeight: 300, fontSize: "clamp(44px, 6vw, 90px)",
          letterSpacing: "-0.02em", lineHeight: 0.93,
          color: "#fff", margin: "0 0 32px",
        }}>
          Parlons de<br />votre <span style={{ color: "#e05a2b" }}>projet.</span>
        </h2>

        <p style={{
          fontFamily: "var(--sans)", fontSize: 16, fontWeight: 400,
          color: "rgba(255,255,255,0.4)", lineHeight: 1.8,
          maxWidth: 340, marginBottom: 48,
        }}>
          Un échange de 30 minutes suffit pour tout clarifier. Je réponds sous 24h.
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { label: "Zone",    value: "Bordeaux · France entière" },
            { label: "Email",   value: "contact.senostudio@gmail.com" },
            { label: "Tél",     value: "+33 7 68 86 85 05" },
            { label: "Réponse", value: "Sous 24h · 7j/7" },
          ].map(d => (
            <div key={d.label} style={{
              display: "grid", gridTemplateColumns: "90px 1fr", gap: 16,
              padding: "16px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <span style={{ fontFamily: "var(--condensed)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", paddingTop: 2 }}>{d.label}</span>
              <span style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{d.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Panneau droit — formulaire éditorial ── */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "64px clamp(28px, 5vw, 72px)",
        overflowY: "auto",
      }}>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {/* Honeypot — invisible pour les humains, rempli par les bots */}
          <input name="_hp" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} />

          {/* Champ 01 — Prénom + Nom */}
          <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "0 20px", alignItems: "start", paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 36, fontWeight: 300, color: "#e05a2b", lineHeight: 1, paddingTop: 4 }}>01</span>
            <div>
              <p style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>Vous êtes…</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input type="text" name="prenom" required value={form.prenom} onChange={handleChange} placeholder="Prénom"
                  style={inp}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = "#e05a2b")}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")} />
                <input type="text" name="nom" required value={form.nom} onChange={handleChange} placeholder="Nom"
                  style={inp}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = "#e05a2b")}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")} />
              </div>
            </div>
          </div>

          {/* Champ 02 — Contact */}
          <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "0 20px", alignItems: "start", paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 36, fontWeight: 300, color: "rgba(224,90,43,0.4)", lineHeight: 1, paddingTop: 4 }}>02</span>
            <div>
              <p style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>Comment vous joindre ?</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="Email *"
                  style={inp}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = "#e05a2b")}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")} />
                <input type="tel" name="tel" value={form.tel} onChange={handleChange} placeholder="Téléphone"
                  style={inp}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = "#e05a2b")}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")} />
              </div>
            </div>
          </div>

          {/* Champ 03 — Type */}
          <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "0 20px", alignItems: "start", paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 36, fontWeight: 300, color: "rgba(224,90,43,0.4)", lineHeight: 1, paddingTop: 4 }}>03</span>
            <div>
              <p style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>Quel type de projet ?</p>
              <select name="type" value={form.type} onChange={handleChange}
                style={{ ...inp, color: form.type ? "#f5f0eb" : "rgba(255,255,255,0.25)", appearance: "none", cursor: "pointer" }}>
                <option value="" disabled style={{ background: "#111", color: "#f5f0eb" }}>Choisir…</option>
                {eventTypes.map(t => <option key={t} value={t} style={{ background: "#111", color: "#f5f0eb" }}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Champ 04 — Message */}
          <div style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: "0 20px", alignItems: "start", paddingBottom: 28, marginBottom: 32 }}>
            <span style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 36, fontWeight: 300, color: "rgba(224,90,43,0.4)", lineHeight: 1, paddingTop: 4 }}>04</span>
            <div>
              <p style={{ fontFamily: "var(--sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>Votre vision</p>
              <textarea name="message" value={form.message} onChange={handleChange}
                placeholder="Décrivez votre projet, vos envies, la date si vous la connaissez…"
                rows={3}
                style={{ ...inp, resize: "none", lineHeight: 1.75 }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = "#e05a2b")}
                onBlur={e => (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)")} />
            </div>
          </div>

          {/* Bouton */}
          <div style={{ paddingLeft: 64 }}>
            <button
              type="submit"
              disabled={status === "loading" || status === "sent"}
              className="btn-arrow btn-arrow-orange"
              style={{ cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.6 : 1, border: "none" }}
            >
              {status === "loading" ? "Envoi en cours…" : status === "sent" ? "✓ Message envoyé !" : status === "error" ? "Erreur — réessayez" : "Envoyer ma demande →"}
            </button>
          </div>

        </form>
      </div>

      <style>{`
        #contact input::placeholder,
        #contact textarea::placeholder { color: rgba(255,255,255,0.18); }
        #contact input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.35; filter: invert(1); }
        @media (max-width: 820px) {
          #contact { grid-template-columns: 1fr !important; }
          #contact > div:first-of-type { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); min-height: unset; padding-bottom: 48px; }
        }
      `}</style>
    </section>
  );
}
