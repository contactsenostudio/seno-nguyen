"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LogoSVG from "./LogoSVG";

const themes = [
  { label: "Portrait & Lifestyle",       href: "/portfolio" },
  { label: "Mariage",                    href: "/portfolio" },
  { label: "Famille & Naissance",        href: "/portfolio" },
  { label: "Gastronomie & Restauration", href: "/portfolio" },
  { label: "Immobilier & Architecture",  href: "/portfolio" },
  { label: "Mode & Marque",              href: "/portfolio" },
  { label: "Événementiel",               href: "/portfolio" },
  { label: "Sport & Outdoor",            href: "/portfolio" },
  { label: "Vin & Terroir",              href: "/portfolio" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Barre nav ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: scrolled ? 56 : 68,
        padding: "0 clamp(24px, 4vw, 56px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(255,255,255,0.94)" : "#fff",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        transition: "height 0.35s ease, background 0.35s ease",
      }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", lineHeight: 0 }}>
          <img
            src="/images/logo-seno.jpg"
            alt="Seno Studio"
            style={{
              height: scrolled ? 34 : 42,
              display: "block",
              objectFit: "contain",
              filter: "invert(1) hue-rotate(180deg) brightness(1.5)",
            }}
          />
        </a>

        {/* Droite */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>

          {/* Accueil */}
          <a href="/" className="nav-link" style={{
            fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: pathname === "/" ? 600 : 400,
            letterSpacing: "0.22em", textTransform: "uppercase",
            textDecoration: "none",
            color: pathname === "/" ? "#0a0a0a" : "rgba(0,0,0,0.45)",
            position: "relative", paddingBottom: 2,
            transition: "color 0.2s ease",
          }}>
            Accueil
            {pathname === "/" && (
              <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 1.5, background: "#e05a2b", borderRadius: 1 }} />
            )}
          </a>

          {/* Portfolio */}
          <a href="/portfolio" className="nav-link" style={{
            fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: pathname === "/portfolio" ? 600 : 400,
            letterSpacing: "0.22em", textTransform: "uppercase",
            textDecoration: "none",
            color: pathname === "/portfolio" ? "#0a0a0a" : "rgba(0,0,0,0.45)",
            position: "relative", paddingBottom: 2,
            transition: "color 0.2s ease",
          }}>
            Portfolio
            {pathname === "/portfolio" && (
              <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 1.5, background: "#e05a2b", borderRadius: 1 }} />
            )}
          </a>

          {/* Réserver */}
          <a href="/contact" className="btn-arrow-sm">Réserver</a>

          {/* Burger */}
          <button onClick={() => setOpen(v => !v)} aria-label="Menu"
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
            <span style={{
              display: "block", width: 22, height: 1.5, background: "#0a0a0a", borderRadius: 2,
              transition: "all .35s cubic-bezier(.77,0,.175,1)",
              transform: open ? "rotate(45deg) translateY(6.5px)" : "none",
            }} />
            <span style={{
              display: "block", width: 22, height: 1.5, background: "#0a0a0a", borderRadius: 2,
              transition: "all .35s cubic-bezier(.77,0,.175,1)",
              opacity: open ? 0 : 1, transform: open ? "scaleX(0)" : "none",
            }} />
            <span style={{
              display: "block", width: 22, height: 1.5, background: "#0a0a0a", borderRadius: 2,
              transition: "all .35s cubic-bezier(.77,0,.175,1)",
              transform: open ? "rotate(-45deg) translateY(-6.5px)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* ── Menu plein écran ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "#0a0a0a",
        display: "flex",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.45s ease",
        overflow: "hidden",
      }}>

        {/* Colonne gauche — navigation */}
        <div style={{
          flex: "0 0 clamp(280px, 38vw, 480px)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "80px clamp(32px, 5vw, 72px)",
          gap: 8,
        }}>
          <div style={{ fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 32 }}>Navigation</div>

          {[
            { label: "Accueil",   href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Contact",   href: "/contact" },
          ].map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300,
              fontSize: "clamp(32px, 4.5vw, 56px)",
              color: pathname === l.href ? "#e05a2b" : "#fff",
              textDecoration: "none", letterSpacing: "-0.02em", lineHeight: 1.15,
              transition: "color 0.2s ease, transform 0.2s ease",
              display: "block",
            }} className="menu-link">
              {l.label}
            </a>
          ))}

          <a href="/contact" onClick={() => setOpen(false)} style={{
            marginTop: 32,
            display: "inline-flex", alignItems: "center", gap: 12,
            fontFamily: "var(--sans)", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.28em", textTransform: "uppercase",
            textDecoration: "none", color: "#fff",
            background: "#e05a2b", padding: "13px 28px", borderRadius: 100,
            alignSelf: "flex-start",
          }}>
            Réserver un appel →
          </a>
        </div>

        {/* Colonne droite — thèmes */}
        <div style={{
          flex: 1,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "80px clamp(32px, 5vw, 72px)",
          gap: 4,
        }}>
          <div style={{ fontFamily: "var(--condensed)", fontSize: 9, letterSpacing: "0.45em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 28 }}>Thèmes</div>

          {themes.map((t, i) => (
            <a key={i} href={t.href} onClick={() => setOpen(false)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              fontFamily: "var(--sans)", fontSize: "clamp(13px, 1.4vw, 17px)",
              fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)", textDecoration: "none",
              padding: "11px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              transition: "color 0.2s ease",
            }} className="theme-link">
              <span>{t.label}</span>
              <span style={{ fontSize: 12, opacity: 0, transition: "opacity 0.2s ease" }} className="theme-arr">→</span>
            </a>
          ))}
        </div>

        {/* Filigrane */}
        <div aria-hidden style={{
          position: "absolute", bottom: -20, right: 40,
          fontFamily: "var(--serif)", fontStyle: "italic",
          fontSize: "clamp(120px, 18vw, 260px)", fontWeight: 300,
          color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          lineHeight: 1, userSelect: "none", pointerEvents: "none",
        }}>S</div>
      </div>

      <style>{`
        .nav-link:hover { color: #0a0a0a !important; }
        .nav-cta:hover { background: #e05a2b !important; transform: translateY(-1px); }
        .menu-link:hover { color: #e05a2b !important; transform: translateX(6px); }
        .theme-link:hover { color: #fff !important; }
        .theme-link:hover .theme-arr { opacity: 1 !important; }
      `}</style>
    </>
  );
}
