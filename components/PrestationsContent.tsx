"use client";

const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const prestations = [
  {
    id: "magazine-box",
    num: "01",
    label: "Magazine Box",
    title: "L'animation qui fait le buzz.",
    desc: "Photobooth premium avec impressions format magazine personnalisées. Vos invités repartent avec un souvenir unique — disponible mariage & événement pro.",
    img: "/images/magbox-ref3.png",
    features: ["Impressions illimitées", "Animateur inclus", "Galerie numérique 48h", "Mariage & événement pro", "Personnalisation complète"],
    tag: "Signature",
  },
  {
    id: "shooting",
    num: "02",
    label: "Shooting Professionnel",
    title: "Vos photos, immédiatement.",
    desc: "Shooting photo premium en mariage ou événement professionnel. Récupération des photos directement sur place — vos invités repartent avec leurs images le jour même.",
    img: "/images/Animation fond photo.jpeg",
    features: ["Photos récupérées sur place le jour J", "Retouche en direct", "QR code ou clé USB", "Mariage & événement pro", "Haute résolution"],
    tag: null,
  },
];

export default function PrestationsContent() {
  return (
    <>
      {/* Hero simple */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/prestations-hero2.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="hero-overlay" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to bottom, transparent, var(--noir))" }} />
        <div className="page-px" style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 80 }}>
          <p className="label" style={{ marginBottom: 16 }}>Toutes les prestations</p>
          <div style={{ width: 48, height: 1, background: "var(--or)", marginBottom: 28 }} />
          <h1 className="h1">Chaque projet,<br /><em>une expérience.</em></h1>
        </div>
      </section>

{/* Cards */}
      <section className="page-px" style={{ background: "var(--noir)", paddingTop: 80, paddingBottom: 120 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
          {prestations.map(p => (
            <div key={p.id} id={p.id} className="presta-card-grid" style={{ background: "var(--noir2)", border: "1px solid rgba(255,255,255,0.05)" }}>
              {/* Image */}
              <div className="presta-card-img">
                <img src={p.img} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .8s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              </div>

              {/* Contenu */}
              <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                {p.tag && (
                  <div style={{ display: "inline-block", background: "var(--or)", color: "var(--noir)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px", marginBottom: 20, alignSelf: "flex-start" }}>
                    {p.tag}
                  </div>
                )}
                <p className="label" style={{ marginBottom: 14 }}>{p.label}</p>
                <div style={{ width: 40, height: 1, background: "var(--or)", marginBottom: 24 }} />
                <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 2.5vw, 38px)", fontWeight: 300, fontStyle: "italic", color: "var(--blanc)", marginBottom: 20, lineHeight: 1.2 }}>{p.title}</h2>
                <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--gris)", marginBottom: 28 }}>{p.desc}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12, color: "var(--blanc2)" }}>
                      <span style={{ width: 16, height: 1, background: "var(--or)", flexShrink: 0, display: "inline-block" }} />{f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn btn-gold" style={{ alignSelf: "flex-start" }}
                  onClick={e => { e.preventDefault(); scroll("#contact"); }}>
                  Demander un devis
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bientôt */}
      <section className="page-px" style={{ paddingTop: 60, paddingBottom: 80, background: "var(--noir2)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <p className="label" style={{ marginBottom: 14 }}>Bientôt disponible</p>
        <div style={{ width: 40, height: 1, background: "var(--or)", marginBottom: 40 }} />
        <div className="grid-cols-3" style={{ display: "grid", gap: 12 }}>
          {[
            { title: "Vidéo Musicale", desc: "Clips musicaux et performances artistiques." },
            { title: "Photo Immobilière", desc: "Valorisation de biens immobiliers premium." },
            { title: "Pack Destination", desc: "Mariages et événements en Europe." },
          ].map(c => (
            <div key={c.title} style={{ background: "var(--noir3)", padding: "28px 24px", position: "relative" }}>
              <div style={{ position: "absolute", top: 16, right: 16, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gris2)", border: "1px solid rgba(255,255,255,0.08)", padding: "3px 10px" }}>Bientôt</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "rgba(250,248,244,0.3)", marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 12, color: "var(--gris2)", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
