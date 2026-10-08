import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import BackToTop from "@/components/BackToTop";
import Cursor from "@/components/Cursor";
import ThemeGallery from "@/components/ThemeGallery";
import { THEMES, getTheme } from "@/lib/portfolio";

type Params = Promise<{ theme: string }>;

export function generateStaticParams() {
  return THEMES.map(t => ({ theme: t.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const t = getTheme((await params).theme);
  if (!t) return {};
  return {
    title: `${t.title} — Seno Nguyen · Photographe Bordeaux`,
    description: `Photos ${t.title.toLowerCase()} par Seno Studio, photographe indépendant à Bordeaux et partout en France.`,
  };
}

export default async function ThemePage({ params }: { params: Params }) {
  const t = getTheme((await params).theme);
  if (!t) notFound();

  const idx = THEMES.findIndex(x => x.id === t.id);
  const also = [1, 2, 3].map(k => THEMES[(idx + k) % THEMES.length]);

  return (
    <div style={{ background: "#1c1c1c", minHeight: "100vh", color: "#fff" }}>
      <Cursor />
      <TopBar />

      <main>
        <h1 style={{
          textAlign: "center", fontFamily: "var(--sans)", fontWeight: 700,
          fontSize: "clamp(22px, 2.2vw, 30px)", letterSpacing: "0.01em",
          margin: 0, padding: "56px 24px 48px", color: "#fff",
        }}>{t.title}</h1>

        <ThemeGallery photos={t.photos} title={t.title} />

        {/* Autres catégories */}
        <section style={{ padding: "96px 0 0" }}>
          <h2 style={{ textAlign: "center", fontFamily: "var(--sans)", fontWeight: 700, fontSize: 18, margin: "0 0 40px" }}>
            Vous aimerez aussi
          </h2>
          <div className="pf-also" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
            {also.map(a => (
              <Link key={a.id} href={`/portfolio/${a.id}`} className="pf-tile" style={{ position: "relative", display: "block", aspectRatio: "4 / 3", overflow: "hidden", background: "#111" }}>
                <Image src={a.cover} alt={a.title} fill sizes="(max-width: 720px) 100vw, 33vw"
                  style={{ objectFit: "cover", objectPosition: a.coverPos ?? "center", transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
                <div className="pf-tile-veil" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)", opacity: 0, transition: "opacity 0.4s ease" }} />
                <div className="pf-tile-title" style={{ position: "absolute", left: 20, bottom: 18, fontFamily: "var(--sans)", fontWeight: 700, fontSize: 18, color: "#fff", opacity: 0, transition: "opacity 0.4s ease" }}>{a.title}</div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ padding: "56px 24px 72px", textAlign: "center", fontFamily: "var(--sans)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
        <Link href="/portfolio" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>← Toutes les catégories</Link>
        <div style={{ marginTop: 18 }}>© 2026 Seno Studio · Photographe &amp; Vidéaste · Bordeaux</div>
      </footer>

      <BackToTop />

      <style>{`
        .pf-tile:hover img { transform: scale(1.04); }
        .pf-tile:hover .pf-tile-veil { opacity: 1 !important; }
        .pf-tile:hover .pf-tile-title { opacity: 1 !important; }
        @media (hover: none) { .pf-tile .pf-tile-veil, .pf-tile .pf-tile-title { opacity: 1 !important; } }
        @media (max-width: 720px) { .pf-also { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
