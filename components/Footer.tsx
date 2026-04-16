"use client";
export default function Footer() {
  return (
    <footer className="footer">
      <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="footer-logo">
        Seno <span>Studio</span>
      </a>
      <p className="footer-copy">© 2026 Seno Studio · Bordeaux · France</p>
      <div className="footer-socials">
        <a href="https://www.instagram.com/seno_std/" target="_blank" rel="noopener noreferrer" className="footer-social">Instagram</a>
        <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }} className="footer-social">Contact</a>
      </div>
    </footer>
  );
}
