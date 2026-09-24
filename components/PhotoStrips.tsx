"use client";

const STRIP_1 = [
  "/images/hero-maries.jpg",
  "/images/theme-mode.jpg",
  "/images/theme-portrait.jpg",
  "/images/wedding-dance.jpg",
  "/images/theme-gastronomie.jpg",
  "/images/hero-4k-7.jpg",
  "/images/wedding-couple.jpg",
  "/images/theme-evenement.jpg",
  "/images/hero-4k-4.jpg",
  "/images/A7409729.jpg",
];

const STRIP_2 = [
  "/images/theme-sport.jpg",
  "/images/hero-new.jpg",
  "/images/LOANE%202.jpg",
  "/images/theme-immobilier.jpg",
  "/images/wedding-rings.jpg",
  "/images/theme-vin.jpg",
  "/images/hero-maries4.jpg",
  "/images/DSC00306.jpg",
  "/images/hero-4k-3.jpg",
  "/images/photographer.jpg",
];

const IMG_W = "clamp(190px, 21vw, 300px)";
const IMG_H = "clamp(128px, 14vw, 200px)";
const GAP   = 14;

export default function PhotoStrips() {
  return (
    <div style={{ background: "#fff", paddingTop: 160, paddingBottom: 320, overflow: "hidden", position: "relative" }}>

      {/* Label */}
      <div style={{
        fontFamily: "var(--condensed)", fontSize: 9,
        letterSpacing: "0.42em", textTransform: "uppercase",
        color: "rgba(0,0,0,0.22)", textAlign: "center",
        marginBottom: 32,
      }}>— Mes travaux</div>

      {/* Strip 1 — vers la gauche */}
      <div style={{
        overflow: "hidden",
        marginBottom: GAP,
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}>
        <div style={{
          display: "flex",
          width: "max-content",
          gap: GAP,
          animation: "psLeft 38s linear infinite",
          willChange: "transform",
        }}>
          {[...STRIP_1, ...STRIP_1].map((src, i) => (
            <div key={i} style={{
              width: IMG_W, height: IMG_H,
              flexShrink: 0, overflow: "hidden", borderRadius: 18,
            }}>
              <img src={src} alt="" loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Strip 2 — vers la droite */}
      <div style={{
        overflow: "hidden",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}>
        <div style={{
          display: "flex",
          width: "max-content",
          gap: GAP,
          animation: "psRight 48s linear infinite",
          willChange: "transform",
        }}>
          {[...STRIP_2, ...STRIP_2].map((src, i) => (
            <div key={i} style={{
              width: IMG_W, height: IMG_H,
              flexShrink: 0, overflow: "hidden", borderRadius: 18,
            }}>
              <img src={src} alt="" loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes psLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes psRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
