import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import TopBar from "@/components/TopBar";
import BackToTop from "@/components/BackToTop";
import Cursor from "@/components/Cursor";
import ThemeGallery from "@/components/ThemeGallery";
import { THEMES, getTheme, thumb } from "@/lib/portfolio";

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
      <TopBar back={{ href: "/portfolio", label: "Retour au portfolio" }} />

      <main>
        <h1 style={{
          textAlign: "center", fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(38px, 4vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1,
          margin: 0, padding: "52px 24px 44px", color: "#fff",
        }}>{t.title}<span style={{ color: "#d92323" }}>.</span></h1>

        <div style={{ padding: "0 clamp(16px, 9vw, 160px)" }}>
          <ThemeGallery photos={t.photos} title={t.title} />
        </div>

        {/* Autres catégories */}
        <section style={{ padding: "96px clamp(16px, 3vw, 44px) 0" }}>
          <h2 style={{ textAlign: "center", fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: 30, margin: "0 0 36px" }}>
            Vous aimerez aussi
          </h2>
          <div className="pf-also" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {also.map(a => (
              <Link key={a.id} href={`/portfolio/${a.id}`} className="pf-tile" style={{ position: "relative", display: "block", aspectRatio: "4 / 3", overflow: "hidden", background: "#111", textDecoration: "none" }}>
                <Image src={thumb(a.cover)} alt={a.title} fill unoptimized
                  style={{ objectFit: "cover", objectPosition: a.coverPos ?? "center", filter: a.coverFilter, transition: "transform 1s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.2) 40%, transparent 65%)" }} />
                <div className="pf-tile-title" style={{ position: "absolute", left: 22, bottom: 18, fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 26, lineHeight: 1, color: "#fff", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}>{a.title}</div>
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
        .pf-tile:hover .pf-tile-title { transform: translateX(6px); }
        @media (max-width: 720px) { .pf-also { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
