"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { label: "Accueil", href: "/" },
  { label: "Mariage", href: "/mariage" },
  { label: "Entreprise", href: "/entreprise" },
  { label: "Particulier", href: "/particulier" },
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
        <Link href="/" className="nav-logo" onClick={() => sessionStorage.removeItem("skipPreloader")}>
          Seno <span>Studio</span>
        </Link>

        <ul className="nav-links">
          {links.map(l => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link href={l.href} onClick={() => { if (l.href === "/") sessionStorage.setItem("skipPreloader", "1"); }} style={{ color: active ? "var(--or)" : undefined, position: "relative" }}>
                  {l.label}
                  {active && <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 1, background: "var(--or)", display: "block" }} />}
                </Link>
              </li>
            );
          })}
        </ul>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/contact" className="btn btn-gold" style={{ padding: "12px 28px" }}>
            Réserver un appel
          </Link>
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
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{ fontFamily: "var(--serif)", fontSize: 32, fontWeight: 300, fontStyle: "italic", color: active ? "var(--or)" : "var(--blanc)", textDecoration: "none" }}>
              {l.label}
            </Link>
          );
        })}
        <Link href="/contact" className="btn btn-gold" style={{ marginTop: 16 }} onClick={() => setOpen(false)}>
          Réserver un appel
        </Link>
      </div>
    </>
  );
}
