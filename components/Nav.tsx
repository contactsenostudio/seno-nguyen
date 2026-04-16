"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Mariage", href: "/mariage" },
  { label: "Entreprise", href: "/entreprise" },
  { label: "Prestations", href: "/prestations" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/")) return;
    e.preventDefault();
    setOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), open ? 300 : 0);
  };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="/" className="nav-logo">
          Seno <span>Studio</span>
        </a>

        <ul className="nav-links">
          {links.map(l => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <a href={l.href} onClick={e => go(e, l.href)} style={{ color: active ? "var(--or)" : undefined, position: "relative" }}>
                  {l.label}
                  {active && <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 1, background: "var(--or)", display: "block" }} />}
                </a>
              </li>
            );
          })}
        </ul>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="/contact" className="btn btn-gold" style={{ padding: "12px 28px" }}>
            Réserver un appel
          </a>
          <button className="menu-toggle" onClick={() => setOpen(v => !v)} aria-label="Menu">
            <span style={{ transform: open ? "rotate(45deg) translateY(6px)" : "none", transition: "all .3s" }} />
            <span style={{ opacity: open ? 0 : 1, transition: "all .3s" }} />
            <span style={{ transform: open ? "rotate(-45deg) translateY(-6px)" : "none", transition: "all .3s" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 99,
        background: "var(--noir2)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
        transform: open ? "translateY(0)" : "translateY(-100%)",
        transition: "transform .5s cubic-bezier(.77,0,.175,1)",
      }}>
        {links.map(l => {
          const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
          return (
            <a key={l.href} href={l.href} onClick={e => go(e, l.href)}
              style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 300, fontStyle: "italic", color: active ? "var(--or)" : "var(--blanc)", textDecoration: "none" }}>
              {l.label}
            </a>
          );
        })}
        <a href="/contact" className="btn btn-gold" style={{ marginTop: 16 }}>
          Réserver un appel
        </a>
      </div>
    </>
  );
}
