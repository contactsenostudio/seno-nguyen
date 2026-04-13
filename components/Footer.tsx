"use client";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/senonguyen" },
  { label: "TikTok",    href: "#" },
  { label: "LinkedIn",  href: "#" },
];

export default function Footer() {
  return (
    <footer className="main-footer">
      <div>
        <a
          href="#"
          className="footer-logo"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          Seno <span>Nguyen</span>
        </a>
        <p style={{ fontSize: "11px", color: "var(--gris2)", marginTop: "8px" }}>
          Photographe & Vidéaste · Bordeaux
        </p>
      </div>

      <div className="footer-center">
        <p>© 2026 Seno Nguyen · Bordeaux · Gironde · France</p>
      </div>

      <div className="footer-socials">
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social">
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
