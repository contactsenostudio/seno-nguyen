"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const F1_BARS = [
  { flex: 2, delay: 0   },
  { flex: 1, delay: 55  },
  { flex: 3, delay: 110 },
  { flex: 1, delay: 165 },
  { flex: 2, delay: 220 },
];

/* Symbole du logo Seno Studio (pentagone + fenêtre orange) */
const Mark = ({ height = 170 }: { height?: number }) => (
  <svg width={height * 0.505} height={height} viewBox="0 0 50.5 100" fill="none" aria-hidden>
    <rect x="27.1" y="6.3" width="19.5" height="44.3" fill="#e05a2b" />
    <path fillRule="evenodd" fill="#f4efe7"
      d="M 23.7,0 L 50.5,0 L 50.5,100 L 0,100 L 0,44.7 Z M 27.1,6.3 L 46.6,6.3 L 46.6,50.6 L 27.1,50.6 Z" />
  </svg>
);

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
  const [bars,   setBars]   = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 150);
    const t2 = setTimeout(() => setBars(false), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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

      {/* Barres orange d'entrée */}
      {bars && (
        <div style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: "none", overflow: "hidden", display: "flex", flexDirection: "column", gap: 7 }}>
          {F1_BARS.map((bar, i) => (
            <div key={i} style={{ flex: bar.flex, position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, bottom: 0, left: "-20%", width: "140%",
                background: "linear-gradient(to right, #5c1505, #b03010 12%, #e05a2b 35%, #ff7040 52%, #ffac7a 62%, #e05a2b 78%, #881e08 92%, #5c1505)",
                animation: `ldBar 0.60s cubic-bezier(0.77,0,0.175,1) ${bar.delay}ms both`,
              }} />
            </div>
          ))}
        </div>
      )}

      {/* ── Colonne gauche ── */}
      <section className="ld-left" style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "56px clamp(24px, 5vw, 72px)",
      }}>
        <div className="ld-mark" style={reveal(150)}>
          <Mark height={170} />
        </div>

        <div style={{
          marginTop: 26, fontFamily: "var(--sans)", fontSize: 13, fontWeight: 300,
          letterSpacing: "0.62em", textTransform: "uppercase", color: "#cfc7b6",
          paddingLeft: "0.62em", ...reveal(300),
        }}>
          Seno Studio
        </div>

        <p style={{
          marginTop: 44, maxWidth: 520, fontFamily: "var(--serif)", fontWeight: 400,
          fontSize: "clamp(17px, 1.3vw, 20px)", lineHeight: 1.45, color: "#ebe6dc",
          ...reveal(450),
        }}>
          Bienvenue sur mon site où vous pourrez retrouver mon portfolio ainsi que l&rsquo;ensemble des prestations que je propose.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, marginTop: 44, ...reveal(600) }}>
          <Link href="/portfolio" className="btn-pill">Mon travail</Link>
          <Link href="/a-propos"  className="btn-pill">À propos</Link>
          <Link href="/contact"   className="btn-pill">Contact</Link>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 50, ...reveal(800) }}>
          <a href="https://www.instagram.com/seno_std/" target="_blank" rel="noopener noreferrer" className="social-round" aria-label="Instagram"><IconInstagram /></a>
          <a href="mailto:contact.senostudio@gmail.com" className="social-round" aria-label="Envoyer un e-mail"><IconMail /></a>
          <a href="tel:+33768868505" className="social-round" aria-label="Appeler"><IconPhone /></a>
        </div>
      </section>

      {/* ── Colonne droite : photo ── */}
      <section className="ld-right" style={{ position: "relative", minHeight: "100vh", background: "#000" }}>
        <Image
          src="/images/A7409729.jpg"
          alt="Seno Nguyen, photographe à Bordeaux"
          fill priority
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{
            objectFit: "cover", objectPosition: "36% center",
            opacity: loaded ? 1 : 0, transform: loaded ? "scale(1)" : "scale(1.05)",
            transition: "opacity 1.3s ease 150ms, transform 2.2s cubic-bezier(0.16,1,0.3,1) 150ms",
          }}
        />
      </section>

      <style>{`
        @keyframes ldBar {
          0%   { transform: skewX(-18deg) translateX(-92%); }
          44%  { transform: skewX(-18deg) translateX(0%);   }
          100% { transform: skewX(-18deg) translateX(92%);  }
        }
        @media (prefers-reduced-motion: reduce) {
          .ld, .ld * { transition: none !important; animation: none !important; }
        }
        @media (max-width: 900px) {
          .ld { grid-template-columns: 1fr !important; }
          .ld-right { order: -1; min-height: 50vh !important; }
          .ld-left  { padding: 48px 24px 56px !important; }
          .ld-mark svg { height: 120px; width: 60.6px; }
        }
      `}</style>
    </main>
  );
}
