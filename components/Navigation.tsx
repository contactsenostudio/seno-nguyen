"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Prestations", href: "#prestations" },
  { label: "Formules",    href: "#formules" },
  { label: "Galerie",     href: "#galerie" },
  { label: "Avis",        href: "#avis" },
  { label: "Contact",     href: "#contact" },
];

export default function Navigation() {
  const navRef  = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href)).filter(Boolean) as Element[];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), open ? 300 : 0);
  };

  return (
    <>
      <nav ref={navRef} className={`main-nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="nav-logo">
          Seno <span>Nguyen</span>
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={(e) => go(e, l.href)} className={active === l.href ? "nav-active" : ""}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a href="#contact" onClick={(e) => go(e, "#contact")} className="nav-cta">
            Réserver un appel
          </a>
          <button
            className="menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer" : "Menu"}
          >
            <span style={{ transform: open ? "rotate(45deg) translateY(6px)" : "none", transition: "all .3s" }} />
            <span style={{ opacity: open ? 0 : 1, transition: "all .3s" }} />
            <span style={{ transform: open ? "rotate(-45deg) translateY(-6px)" : "none", transition: "all .3s" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "var(--noir2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform .5s cubic-bezier(.77,0,.175,1)",
        }}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={(e) => go(e, l.href)}
            style={{
              fontFamily: "var(--serif)",
              fontSize: "32px",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--blanc)",
              textDecoration: "none",
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => go(e, "#contact")}
          className="nav-cta"
          style={{ marginTop: "16px" }}
        >
          Réserver un appel
        </a>
      </div>
    </>
  );
}
