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
        <p style={{ marginTop: 26, fontFamily: "var(--sans)", fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.75, color: "rgba(244,239,231,0.8)" }}>
          Photographe et vidéaste indépendant à Mérignac, aux portes de Bordeaux. Je photographie les mariages,
          les portraits en studio, les équipes et les locaux d&rsquo;entreprises, ainsi que les biens immobiliers,
          et je réalise des vidéos courtes pour les réseaux sociaux.
        </p>
        <p style={{ marginTop: 14, fontFamily: "var(--sans)", fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.75, color: "rgba(244,239,231,0.6)" }}>
          Je travaille en plein format Sony, je livre rapidement et je me déplace dans toute la Gironde.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
          <Link href="/portfolio" className="btn-pill">Mon travail</Link>
          <Link href="/contact" className="btn-pill btn-pill-outline">Me contacter</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .apropos { grid-template-columns: 1fr !important; }
          .apropos-photo { justify-self: start !important; max-width: 320px !important; }
        }
      `}</style>
    </section>
  );
}
