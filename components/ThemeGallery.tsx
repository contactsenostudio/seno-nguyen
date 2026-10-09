"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { thumb, type Photo } from "@/lib/portfolio";

const ROW_H = 300; // hauteur de référence d'une rangée (px)

/* Galerie « justifiée » (rangées pleine largeur) + visionneuse plein écran */
export default function ThemeGallery({ photos, title }: { photos: Photo[]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(() => setLightbox(i => i === null ? null : (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setLightbox(i => i === null ? null : (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "Escape")     setLightbox(null);
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [lightbox, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      <div className="tg" style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {photos.map((p, i) => {
          const r = p.w / p.h;
          return (
            <button
              key={p.src}
              onClick={() => setLightbox(i)}
              className="tg-item"
              aria-label={`${title} — photo ${i + 1}`}
              style={{
                position: "relative", display: "block", padding: 0, border: "none",
                background: "linear-gradient(110deg, #141414 30%, #1e1e1e 50%, #141414 70%) 0 0 / 200% 100%",
                animation: "tgShimmer 1.6s linear infinite", cursor: "pointer", overflow: "hidden",
                flexGrow: r * 100, flexBasis: r * ROW_H, maxWidth: "100%",
              }}
            >
              <span style={{ display: "block", paddingBottom: `${(1 / r) * 100}%` }} />
              <Image
                src={thumb(p.src)} alt="" fill unoptimized
                loading={i < 6 ? "eager" : "lazy"} decoding="async"
                style={{ objectFit: "cover", transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease" }}
              />
            </button>
          );
        })}
        {/* Empêche la dernière rangée de s'étirer */}
        <div style={{ flexGrow: 1e6 }} />
      </div>

      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, zIndex: 4000, background: "rgba(0,0,0,0.96)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <button onClick={() => setLightbox(null)} aria-label="Fermer" style={{ position: "absolute", top: 20, right: 26, background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: 30, lineHeight: 1 }}>×</button>
          <div style={{ position: "absolute", top: 28, left: 32, fontFamily: "var(--sans)", fontSize: 12, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}>
            {String(lightbox + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </div>
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", width: "min(92vw, 1600px)", height: "88vh" }}>
            <Image src={photos[lightbox].src} alt="" fill unoptimized priority style={{ objectFit: "contain" }} />
          </div>
          <button onClick={e => { e.stopPropagation(); prev(); }} aria-label="Précédente" className="tg-arrow" style={{ left: 18 }}>←</button>
          <button onClick={e => { e.stopPropagation(); next(); }} aria-label="Suivante" className="tg-arrow" style={{ right: 18 }}>→</button>
        </div>
      )}

      <style>{`
        .tg-item:hover img { transform: scale(1.03); filter: brightness(1.08); }
        @keyframes tgShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        .tg-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7); width: 48px; height: 48px; border-radius: 50%;
          font-size: 18px; cursor: pointer; transition: background 0.2s, color 0.2s;
        }
        .tg-arrow:hover { background: #e05a2b; color: #fff; border-color: #e05a2b; }
        @media (max-width: 720px) {
          .tg-item { flex-basis: 100% !important; }
        }
      `}</style>
    </>
  );
}
