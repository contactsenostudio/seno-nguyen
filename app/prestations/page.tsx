import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TopBar from "@/components/TopBar";
import BackToTop from "@/components/BackToTop";
import Cursor from "@/components/Cursor";
import LiensLocaux from "@/components/LiensLocaux";
import { thumb } from "@/lib/portfolio";

/* Page « Prestations » (17/11/2026) : une vignette par prestation, chacune mène à sa page détaillée (référencement local) */
export const metadata: Metadata = {
  title: { absolute: "Prestations · Photographe à Bordeaux | Seno Studio" },
  description: "Toutes les prestations de Seno Studio, photographe et vidéaste à Bordeaux : mariage, famille, couple, shooting entre amis, mode et book, portrait pro, produits, événements.",
  alternates: { canonical: "/prestations" },
};

const P = "/images/portfolio/";
const PRESTATIONS = [
  { href: "/photographe-mariage-bordeaux", titre: "Mariage", ligne: "Photo et vidéo, des préparatifs à la soirée", cover: P + "mariage/dsc05235.jpg", pos: "center 40%" },
  { href: "/photographe-famille-bordeaux", titre: "Famille", ligne: "Parents, enfants, grands-parents", cover: P + "mariage/dsc05362.jpg", pos: "center 60%" },
  { href: "/shooting-photo-couple-bordeaux", titre: "Couple & love session", ligne: "Fiançailles, save the date, anniversaire", cover: P + "mariage/dsc05045-edit.jpg", pos: "center 35%" },
  { href: "/shooting-photo-entre-amis-bordeaux", titre: "Seul(e) ou entre amis", ligne: "Un shooting fun, en studio ou en ville", cover: P + "studio/dsc02431-2.jpg", pos: "center 30%" },
  { href: "/photographe-mode-book-bordeaux", titre: "Mode & book", ligne: "Book mannequin, polas, comédiens, artistes", cover: P + "studio/dsc02555-edit.jpg", pos: "center 25%" },
  { href: "/photographe-portrait-bordeaux", titre: "Portrait pro", ligne: "Photo CV, LinkedIn, équipes", cover: P + "entreprise/dsc06800.jpg", pos: "center 20%" },
  { href: "/shooting-photo-bordeaux", titre: "Shooting studio", ligne: "Lumière maîtrisée, rendu magazine", cover: P + "studio/dsc02133.jpg", pos: "center 25%" },
  { href: "/photographe-evenementiel-bordeaux", titre: "Événements", ligne: "Soirées, séminaires, anniversaires", cover: P + "mariage/dsc06103.jpg", pos: "center" },
  { href: "/photographe-produit-packshot-bordeaux", titre: "Produits & packshot", ligne: "E-commerce, réseaux, catalogues", cover: P + "mariage/dsc05812.jpg", pos: "center" },
  { href: "/photographe-bordeaux", titre: "Entreprise & immobilier", ligne: "Vos locaux, votre activité, vos biens", cover: P + "immobilier/dsc06929-hdr.jpg", pos: "center" },
];

export default function PrestationsPage() {
  return (
    <div style={{ background: "#1c1c1c", minHeight: "100vh", color: "#fff" }}>
      <Cursor />
      <TopBar />

      <header style={{ textAlign: "center", padding: "48px 24px 34px" }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(244,239,231,0.45)" }}>
          Photographe &amp; Vidéaste · Bordeaux
        </div>
        <h1 style={{ margin: "16px 0 0", fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(38px, 4.4vw, 62px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "#f4efe7" }}>
          Mes prestations<span style={{ color: "#d92323" }}>.</span>
        </h1>
      </header>

      <main className="pr-grid" style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6,
        padding: "0 clamp(16px, 9vw, 160px) 10px",
      }}>
        {PRESTATIONS.map((t, i) => (
          <Link key={t.href} href={t.href} className="pf-tile" style={{
            position: "relative", display: "block", overflow: "hidden",
            aspectRatio: "4 / 3", background: "#111", textDecoration: "none",
          }}>
            <Image
              src={thumb(t.cover)} alt={"Photographe " + t.titre.toLowerCase() + " Bordeaux"} fill unoptimized
              priority={i < 4}
              style={{ objectFit: "cover", objectPosition: t.pos, transition: "transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94)" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 42%, transparent 65%)",
            }} />
            <div className="pf-tile-title" style={{
              position: "absolute", left: 28, bottom: 24, right: 28,
              fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(26px, 2.4vw, 38px)", lineHeight: 1,
              color: "#fff", letterSpacing: "-0.01em",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}>
              {t.titre}
              <span style={{ display: "block", marginTop: 8, fontFamily: "var(--sans)", fontStyle: "normal", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
                {t.ligne}
              </span>
            </div>
          </Link>
        ))}
      </main>

      <section style={{ textAlign: "center", padding: "64px 24px 0" }}>
        <p style={{ fontFamily: "var(--sans)", fontSize: 16, lineHeight: 1.7, color: "rgba(244,239,231,0.72)", margin: 0 }}>
          Un autre projet en tête ? Écrivez-moi, je vous réponds sous 24 h.
        </p>
        <div style={{ marginTop: 24 }}><Link href="/contact" className="btn-pill">Demander un devis</Link></div>
      </section>

      <footer style={{ padding: "64px 24px 72px", textAlign: "center", fontFamily: "var(--sans)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
        <LiensLocaux />
        <div style={{ marginTop: 18 }}>© 2026 Seno Studio · Photographe &amp; Vidéaste · Bordeaux</div>
      </footer>

      <BackToTop />

      <style>{`
        .pf-tile:hover img { transform: scale(1.04); }
        .pf-tile:hover .pf-tile-title { transform: translateX(6px); }
        @media (max-width: 720px) {
          .pr-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
