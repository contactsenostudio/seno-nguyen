"use client";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="footer" style={{ flexWrap: "wrap", gap: 24 }}>
      <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="footer-logo">
        Seno <span>Studio</span>
      </a>
      <nav aria-label="Liens footer" style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/mariage" className="footer-social">Mariage</Link>
        <Link href="/entreprise" className="footer-social">Entreprise</Link>
        <Link href="/prestations" className="footer-social">Prestations</Link>
        <Link href="/contact" className="footer-social">Contact</Link>
      </nav>
      <p className="footer-copy">© 2026 Seno Studio · Bordeaux · France</p>
      <div className="footer-socials">
        <a href="https://www.instagram.com/seno_std/" target="_blank" rel="noopener noreferrer" className="footer-social">Instagram</a>
        <Link href="/mentions-legales" className="footer-social">Mentions légales</Link>
        <Link href="/politique-de-confidentialite" className="footer-social">Confidentialité</Link>
        <Link href="/cgv" className="footer-social">CGV</Link>
      </div>
    </footer>
  );
}
