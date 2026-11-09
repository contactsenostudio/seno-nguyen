import Link from "next/link";
import TopBar from "@/components/TopBar";
import BackToTop from "@/components/BackToTop";
import Cursor from "@/components/Cursor";
import ThemeGallery from "@/components/ThemeGallery";
import LiensLocaux from "@/components/LiensLocaux";
import type { Photo } from "@/lib/portfolio";

/* Gabarit des pages de référencement local (09/11/2026) : « photographe Bordeaux »,
   « shooting photo / studio Bordeaux », « photographe mariage Bordeaux ».
   Un vrai texte (Google classe sur le texte), des photos à lui, une FAQ (balisée pour Google) et un appel au contact. */
export interface Bloc { titre: string; texte: string[] }
export interface Question { q: string; r: string }

export default function PageLocale({
  surtitre, titre, intro, photos, altPhotos, blocs, faq, chemin, nomService,
}: {
  surtitre: string; titre: string; intro: string[]; photos: Photo[]; altPhotos: string;
  blocs: Bloc[]; faq: Question[]; chemin: string; nomService: string;
}) {
  const site = "https://www.senostudio.fr";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: nomService,
      serviceType: nomService,
      url: site + chemin,
      areaServed: [{ "@type": "City", name: "Bordeaux" }, { "@type": "AdministrativeArea", name: "Gironde" }],
      provider: { "@type": "ProfessionalService", name: "Seno Studio", url: site, telephone: "+33768868505" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.r } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: site },
        { "@type": "ListItem", position: 2, name: titre, item: site + chemin },
      ],
    },
  ];

  return (
    <div style={{ background: "#1c1c1c", minHeight: "100vh", color: "#f4efe7" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Cursor />
      <TopBar />

      <main>
        <header style={{ textAlign: "center", padding: "56px 24px 40px", maxWidth: 820, margin: "0 auto" }}>
          <div className="pl-sur">{surtitre}</div>
          <h1 style={{
            margin: "18px 0 0", fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(38px, 4.4vw, 62px)", lineHeight: 1.05, letterSpacing: "-0.02em",
          }}>{titre}<span style={{ color: "#d92323" }}>.</span></h1>
          {intro.map((p, i) => <p key={i} className="pl-texte" style={{ marginTop: i ? 14 : 26 }}>{p}</p>)}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 34 }}>
            <Link href="/contact" className="btn-pill">Demander un devis</Link>
            <Link href="/portfolio" className="btn-pill btn-pill-outline">Voir mon travail</Link>
          </div>
        </header>

        <div style={{ padding: "0 clamp(16px, 9vw, 160px)" }}>
          <ThemeGallery photos={photos} title={altPhotos} />
        </div>

        <section style={{ maxWidth: 760, margin: "0 auto", padding: "80px 24px 0" }}>
          {blocs.map(b => (
            <div key={b.titre} style={{ marginBottom: 44 }}>
              <h2 className="pl-h2">{b.titre}</h2>
              {b.texte.map((p, i) => <p key={i} className="pl-texte" style={{ textAlign: "left", marginTop: i ? 12 : 0 }}>{p}</p>)}
            </div>
          ))}
        </section>

        <section style={{ maxWidth: 760, margin: "0 auto", padding: "20px 24px 0" }}>
          <h2 className="pl-h2">Questions fréquentes</h2>
          {faq.map(f => (
            <details key={f.q} className="pl-faq">
              <summary>{f.q}</summary>
              <p className="pl-texte" style={{ textAlign: "left", margin: "10px 0 0" }}>{f.r}</p>
            </details>
          ))}
        </section>

        <section style={{ textAlign: "center", padding: "80px 24px 0" }}>
          <h2 className="pl-h2" style={{ textAlign: "center" }}>Parlons de votre projet</h2>
          <p className="pl-texte">Un message suffit : je vous réponds sous 24 h avec une proposition adaptée.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 26 }}>
            <Link href="/contact" className="btn-pill">Me contacter</Link>
            <a href="tel:+33768868505" className="btn-pill btn-pill-outline">07 68 86 85 05</a>
          </div>
        </section>
      </main>

      <footer style={{ padding: "72px 24px 72px", textAlign: "center", fontFamily: "var(--sans)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
        <LiensLocaux />
        <div style={{ marginTop: 18 }}>© 2026 Seno Studio · Photographe &amp; Vidéaste · Bordeaux</div>
      </footer>

      <BackToTop />

      <style>{`
        .pl-sur { font-family: var(--sans); font-size: 11px; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(244,239,231,0.45); }
        .pl-h2 { font-family: var(--serif); font-style: italic; font-weight: 400; font-size: clamp(26px, 2.4vw, 34px); margin: 0 0 16px; letter-spacing: -0.01em; }
        .pl-texte { font-family: var(--sans); font-size: clamp(15px, 1.05vw, 16px); line-height: 1.75; color: rgba(244,239,231,0.78); margin: 0; }
        .pl-faq { border-top: 1px solid rgba(255,255,255,0.1); padding: 18px 0; }
        .pl-faq:last-child { border-bottom: 1px solid rgba(255,255,255,0.1); }
        .pl-faq summary { cursor: pointer; font-family: var(--sans); font-size: 16px; font-weight: 500; color: #f4efe7; list-style: none; }
        .pl-faq summary::-webkit-details-marker { display: none; }
        .pl-faq summary::before { content: "+"; color: #d92323; display: inline-block; width: 22px; }
        .pl-faq[open] summary::before { content: "–"; }
      `}</style>
    </div>
  );
}
