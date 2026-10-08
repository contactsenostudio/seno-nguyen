"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Accueil",     href: "/" },
  { label: "Mon travail", href: "/portfolio" },
  { label: "À propos",    href: "/a-propos" },
  { label: "Contact",     href: "/contact" },
];

/* Barre de menu fine, façon Adobe Portfolio : liens à gauche, nom au centre */
export default function TopBar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="tb" style={{
      position: "relative", zIndex: 50,
      background: "#1c1c1c",
      padding: "16px clamp(16px, 3vw, 44px) 14px",
      display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
      minHeight: 64,
    }}>
      <nav className="tb-links" style={{ display: "flex", flexWrap: "wrap", columnGap: 26, rowGap: 4, maxWidth: 360 }}>
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} className="tb-link" style={{
            fontFamily: "var(--sans)", fontSize: 14, fontWeight: isActive(l.href) ? 700 : 400,
            color: isActive(l.href) ? "#fff" : "rgba(255,255,255,0.78)",
            textDecoration: "none", letterSpacing: "0.01em", whiteSpace: "nowrap",
          }}>{l.label}</Link>
        ))}
      </nav>

      <Link href="/" className="tb-brand" style={{
        fontFamily: "var(--font-nunito, var(--sans))", fontWeight: 900, fontSize: 19,
        color: "#fff", textDecoration: "none", letterSpacing: "-0.01em", justifySelf: "center",
      }}>
        Seno <span style={{ color: "#e05a2b" }}>studio</span>
      </Link>

      <div />

      <style>{`
        .tb-link:hover { color: #fff !important; }
        @media (max-width: 720px) {
          .tb { grid-template-columns: 1fr !important; justify-items: center; row-gap: 10px; padding-top: 14px !important; }
          .tb-brand { order: -1; }
          .tb-links { justify-content: center; max-width: 100% !important; column-gap: 18px !important; }
          .tb-links a { font-size: 13px !important; }
        }
      `}</style>
    </header>
  );
}
