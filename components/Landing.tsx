"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7.5 12 13l8.5-5.5" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);

export default function Landing() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t1);
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.9s ease ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <main className="ld" style={{
      minHeight: "100vh", background: "#0b0b0b", color: "#f4efe7",
      display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative", overflow: "hidden",
    }}>

      {/* ── Colonne gauche ── */}
      <section className="ld-left" style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "56px clamp(24px, 5vw, 72px)",
      }}>
        <div style={{
          fontFamily: "var(--sans)", fontSize: 11, fontWeight: 500,
          letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(244,239,231,0.45)",
          paddingLeft: "0.4em", ...reveal(150),
        }}>
          Photographe &amp; Vidéaste · Bordeaux
        </div>

        <h1 style={{
          margin: "22px 0 0", fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(58px, 6.2vw, 92px)", lineHeight: 1, letterSpacing: "-0.025em", color: "#f4efe7",
          ...reveal(300),
        }}>
          Seno Studio<span style={{ color: "#e05a2b" }}>.</span>
        </h1>

        <p style={{
          marginTop: 30, maxWidth: 440, fontFamily: "var(--sans)", fontWeight: 400,
          fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.7, color: "rgba(244,239,231,0.72)",
          ...reveal(450),
        }}>
          Bienvenue sur mon site où vous pourrez retrouver mon portfolio ainsi que l&rsquo;ensemble des prestations que je propose.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 44, ...reveal(600) }}>
          <Link href="/portfolio" className="btn-pill">Mon travail</Link>
          <Link href="/a-propos"  className="btn-pill btn-pill-outline">À propos</Link>
          <Link href="/contact"   className="btn-pill btn-pill-outline">Contact</Link>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 48, ...reveal(800) }}>
          <a href="https://www.instagram.com/seno_std/" target="_blank" rel="noopener noreferrer" className="social-round" aria-label="Instagram"><IconInstagram /></a>
          <a href="mailto:contact.senostudio@gmail.com" className="social-round" aria-label="Envoyer un e-mail"><IconMail /></a>
          <a href="tel:+33768868505" className="social-round" aria-label="Appeler"><IconPhone /></a>
        </div>
      </section>

      {/* ── Colonne droite : photo (StockSnap, licence CC0 : libre d'utilisation, y compris commerciale) ── */}
      <section className="ld-right" style={{ position: "relative", minHeight: "100vh", background: "#000" }}>
        <Image
          src="/images/accueil-appareil.jpg" unoptimized
          alt="Appareil photo suspendu à sa sangle"
          fill priority
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{
            objectFit: "cover", objectPosition: "center 55%",
            opacity: loaded ? 1 : 0, transform: loaded ? "scale(1)" : "scale(1.05)",
            transition: "opacity 1.3s ease 150ms, transform 2.2s cubic-bezier(0.16,1,0.3,1) 150ms",
          }}
        />
      </section>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ld, .ld * { transition: none !important; animation: none !important; }
        }
        @media (max-width: 900px) {
          .ld { grid-template-columns: 1fr !important; }
          .ld-right { order: -1; min-height: 50vh !important; }
          .ld-left  { padding: 48px 24px 56px !important; }
        }
      `}</style>
    </main>
  );
}
