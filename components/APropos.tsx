import Image from "next/image";
import Link from "next/link";
import { thumb } from "@/lib/portfolio";

/* Page « À propos » courte : un portrait, quelques lignes, deux boutons. */
export default function APropos() {
  return (
    <section className="apropos" style={{
      minHeight: "calc(100vh - 64px)", background: "#1c1c1c", color: "#f4efe7",
      display: "grid", gridTemplateColumns: "5fr 7fr", alignItems: "center",
      gap: "clamp(32px, 6vw, 96px)", padding: "clamp(40px, 8vh, 96px) clamp(24px, 6vw, 96px)",
    }}>
      <div className="apropos-photo" style={{ position: "relative", aspectRatio: "4 / 5", maxWidth: 460, width: "100%", justifySelf: "end", overflow: "hidden", borderRadius: 6 }}>
        <Image
          src={thumb("/images/portfolio/divers/a7409766-portrait.jpg")} unoptimized
          alt="Seno Nguyen, photographe à Bordeaux"
          fill priority sizes="(max-width: 900px) 100vw, 40vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div style={{ maxWidth: 560 }}>
        <div style={{ fontFamily: "var(--sans)", fontSize: 11, fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(244,239,231,0.45)" }}>
          À propos
        </div>
        <h1 style={{ margin: "18px 0 0", fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(44px, 5vw, 72px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
          Seno Nguyen<span style={{ color: "#d92323" }}>.</span>
        </h1>
        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 22 }}>
          <div>
            <div className="ap-titre">Comment je vois les choses</div>
            <p className="ap-texte">
              Une bonne photo ne se remarque pas par ses effets, elle se remarque parce qu&rsquo;on y reconnaît
              quelqu&rsquo;un. Je préfère une lumière vraie, un moment qui existe, à une mise en scène qui fait catalogue.
              Mes images sont sombres, contrastées, et laissent de la place aux gens.
            </p>
          </div>
          <div>
            <div className="ap-titre">Mon objectif</div>
            <p className="ap-texte">
              Construire, autour de Bordeaux, un studio qu&rsquo;on rappelle : des commerces, des entreprises et des
              couples qui reviennent parce que le travail a été fait vite, bien, et sans compliquer les choses.
              Pas des coups, une relation.
            </p>
          </div>
          <div>
            <div className="ap-titre">Mes compétences</div>
            <p className="ap-texte">
              Photo et vidéo au plein format Sony, lumière de studio comme lumière de rue, retouche sur Lightroom,
              montage de formats courts pour les réseaux. Formé au digital avant la photo, je sais à quoi vont servir
              les images que je livre : un site, une annonce, une fiche Google, un fil Instagram.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
          <Link href="/portfolio" className="btn-pill">Mon travail</Link>
          <Link href="/contact" className="btn-pill btn-pill-outline">Me contacter</Link>
        </div>
      </div>

      <style>{`
        .ap-titre { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #d92323; margin-bottom: 8px; }
        .ap-texte { margin: 0; font-family: var(--sans); font-size: clamp(15px, 1.05vw, 16px); line-height: 1.7; color: rgba(244,239,231,0.78); }
        @media (max-width: 900px) {
          .apropos { grid-template-columns: 1fr !important; }
          .apropos-photo { justify-self: start !important; max-width: 320px !important; }
        }
      `}</style>
    </section>
  );
}
