"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Retour en haut"
      style={{
        position: "fixed", right: 28, bottom: 28, zIndex: 60,
        width: 52, height: 52, borderRadius: "50%",
        background: "rgba(40,40,40,0.85)", border: "1px solid rgba(255,255,255,0.1)",
        color: "#fff", fontSize: 18, cursor: "pointer",
        opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
        transform: show ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        backdropFilter: "blur(6px)",
      }}
    >↑</button>
  );
}
