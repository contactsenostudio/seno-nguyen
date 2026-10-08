import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import BackToTop from "@/components/BackToTop";
import Cursor from "@/components/Cursor";
import { THEMES } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Mon travail — Seno Nguyen · Photographe Bordeaux",
  description: "Portfolio photo de Seno Studio : mariage, portrait, mode, gastronomie, immobilier, événementiel, sport. Photographe indépendant à Bordeaux.",
};

export default function PortfolioPage() {
  return (
    <div style={{ background: "#1c1c1c", minHeight: "100vh", color: "#fff" }}>
      <Cursor />
      <TopBar />

      <main className="pf-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6,
        padding: "0 0 6px",
      }}>
        {THEMES.map((t, i) => (
          <Link key={t.id} href={`/portfolio/${t.id}`} className="pf-tile" style={{
            position: "relative", display: "block", overflow: "hidden",
            aspectRatio: "4 / 3", background: "#111", textDecoration: "none",
          }}>
            <Image
              src={t.cover} alt={t.title} fill
              sizes="(max-width: 720px) 100vw, 50vw"
              priority={i < 4}
              style={{ objectFit: "cover", objectPosition: t.coverPos ?? "center", transition: "transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94)" }}
            />
            <div className="pf-tile-veil" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)",
              opacity: 0, transition: "opacity 0.4s ease",
            }} />
            <div className="pf-tile-title" style={{
              position: "absolute", left: 28, bottom: 24, right: 28,
              fontFamily: "var(--sans)", fontWeight: 700, fontSize: "clamp(18px, 1.6vw, 24px)",
              color: "#fff", letterSpacing: "0.01em",
              opacity: 0, transform: "translateY(8px)",
              transition: "opacity 0.4s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}>
              {t.title}
              <span style={{ display: "block", marginTop: 4, fontSize: 12, fontWeight: 400, color: "rgba(255,255,255,0.65)" }}>
                {t.photos.length} photo{t.photos.length > 1 ? "s" : ""}
              </span>
            </div>
          </Link>
        ))}
      </main>

      <footer style={{ padding: "56px 24px 72px", textAlign: "center", fontFamily: "var(--sans)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
        © 2026 Seno Studio · Photographe &amp; Vidéaste · Bordeaux
      </footer>

      <BackToTop />

      <style>{`
        .pf-tile:hover img { transform: scale(1.04); }
        .pf-tile:hover .pf-tile-veil { opacity: 1 !important; }
        .pf-tile:hover .pf-tile-title { opacity: 1 !important; transform: translateY(0) !important; }
        @media (hover: none) {
          .pf-tile .pf-tile-veil, .pf-tile .pf-tile-title { opacity: 1 !important; transform: none !important; }
        }
        @media (max-width: 720px) {
          .pf-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
