"use client";
import LiensLocaux from "@/components/LiensLocaux";
export default function Footer() {
  return (
    <footer className="footer">
      <a
        href="#"
        onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        style={{
          fontFamily: "var(--serif)",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: 22,
          color: "#f5f0eb",
          textDecoration: "none",
          letterSpacing: "0.02em",
        }}
      >
        Seno Studio
      </a>
      <LiensLocaux />
      <p className="footer-copy">Bordeaux · France entière · © 2026</p>
      <div className="footer-socials">
        <a
          href="https://www.instagram.com/seno_std/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social"
        >
          Instagram
        </a>
        <a href="/contact" className="footer-social">
          Contact
        </a>
      </div>
    </footer>
  );
}
