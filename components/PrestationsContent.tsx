"use client";

const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

const prestations = [
  {
    id: "portrait-lifestyle",
    num: "01",
    label: "Portrait & Lifestyle",
    title: "Vos photos. Votre histoire. Votre lieu.",
    desc: "Studio, plage, rues de Bordeaux, vignobles, forêt — on choisit ensemble le décor qui vous ressemble. Pas de pose forcée, pas de sourire figé. Juste vous, dans votre élément, capturés au bon moment.",
    img: "/images/theme-portrait.jpg",
    features: ["Studio ou extérieur", "Plage & nature", "Rues de Bordeaux & alentours", "Retouche soignée incluse", "Galerie en ligne sous 7 jours"],
    tag: null,
  },
  {
    id: "magazine-box",
    num: "02",
    label: "Magazine Box",
    title: "Le souvenir que vos invités emportent chez eux.",
    desc: "Pas un photobooth classique. Un format magazine personnalisé, imprimé sur place, que vos invités glissent dans leur poche en partant. Le lendemain, tout le monde en parle encore.",
    img: "/images/hero-4k-6.jpg",
    features: ["Impressions illimitées", "Animateur inclus", "Galerie numérique 48h", "Mariage & événement pro", "Personnalisation complète"],
    tag: "Signature",
  },
  {
    id: "shooting",
    num: "03",
    label: "Shooting Professionnel",
    title: "Le Jour J, vous repartez avec tout.",
    desc: "Pendant que l'événement se vit, les photos se retouchent. Le soir même, chaque invité scanne un QR code et retrouve ses images. Zéro attente, zéro stress — tout est là avant minuit.",
    img: "/images/theme-famille.jpg",
    features: ["Photos récupérées sur place le jour J", "Retouche en direct", "QR code ou clé USB", "Mariage & événement pro", "Haute résolution"],
    tag: null,
  },
];

export default function PrestationsContent() {
  return (
    <>
      {/* Hero — split layout */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 60px 80px 80px", background: "#fff" }}>
          <p style={{ fontFamily: "var(--condensed)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#bbb", marginBottom: 0 }}>— 03 · Shooting · Portraits · Magazine Box</p>
          <div style={{ height: 20 }} />
          <h1 className="h1" style={{ color: "#0a0a0a" }}>Chaque projet,<br /><span style={{ fontFamily: "var(--serif)", fontWeight: 300, fontStyle: "italic", textTransform: "none", fontSize: "0.88em", color: "#e05a2b" }}>une expérience.</span></h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#666", maxWidth: 400, marginTop: 24, marginBottom: 52 }}>
            Portrait, mariage, magazine box, shooting pro — chaque prestation est pensée pour vous laisser des images qui durent.
          </p>
          <a href="#portrait-lifestyle" className="btn-arrow btn-arrow-orange" onClick={e => { e.preventDefault(); scroll("#portrait-lifestyle"); }}>
            → Voir les prestations
          </a>
        </div>
        <div style={{ overflow: "hidden" }}>
          <img src="/images/theme-portrait.jpg" alt="Prestations" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </section>

      {/* Cards */}
      <section style={{ background: "#fff", padding: "80px 80px 120px", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 2 }}>
          {prestations.map((p, idx) => (
            <div key={p.id} id={p.id} style={{ display: "grid", gridTemplateColumns: idx % 2 === 0 ? "1fr 1fr" : "1fr 1fr", background: "#f5f5f5", border: "1px solid rgba(0,0,0,0.06)" }}>
              {/* Image — alternates left/right */}
              {idx % 2 === 0 ? (
                <>
                  <div style={{ overflow: "hidden", height: 440 }}>
                    <img src={p.img} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .8s" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                  <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    {p.tag && (
                      <div style={{ display: "inline-block", background: "#0a0a0a", color: "#fff", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px", marginBottom: 20, alignSelf: "flex-start" }}>
                        {p.tag}
                      </div>
                    )}
                    <p className="label" style={{ marginBottom: 14 }}>{p.label}</p>
                    <div style={{ height: 16 }} />
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 2.5vw, 38px)", fontWeight: 300, fontStyle: "italic", color: "#0a0a0a", marginBottom: 20, lineHeight: 1.2 }}>{p.title}</h2>
                    <p style={{ fontSize: 13, lineHeight: 1.85, color: "#666", marginBottom: 28 }}>{p.desc}</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
                      {p.features.map(f => (
                        <li key={f} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12, color: "#444" }}>
                          <span style={{ width: 16, height: 1, background: "rgba(0,0,0,0.2)", flexShrink: 0, display: "inline-block" }} />{f}
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="btn-arrow btn-arrow-orange" style={{ alignSelf: "flex-start" }}
                      onClick={e => { e.preventDefault(); scroll("#contact"); }}>
                      → Demander un devis
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fff" }}>
                    {p.tag && (
                      <div style={{ display: "inline-block", background: "#0a0a0a", color: "#fff", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", padding: "4px 12px", marginBottom: 20, alignSelf: "flex-start" }}>
                        {p.tag}
                      </div>
                    )}
                    <p className="label" style={{ marginBottom: 14 }}>{p.label}</p>
                    <div style={{ height: 16 }} />
                    <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(24px, 2.5vw, 38px)", fontWeight: 300, fontStyle: "italic", color: "#0a0a0a", marginBottom: 20, lineHeight: 1.2 }}>{p.title}</h2>
                    <p style={{ fontSize: 13, lineHeight: 1.85, color: "#666", marginBottom: 28 }}>{p.desc}</p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
                      {p.features.map(f => (
                        <li key={f} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12, color: "#444" }}>
                          <span style={{ width: 16, height: 1, background: "rgba(0,0,0,0.2)", flexShrink: 0, display: "inline-block" }} />{f}
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="btn-arrow btn-arrow-orange" style={{ alignSelf: "flex-start" }}
                      onClick={e => { e.preventDefault(); scroll("#contact"); }}>
                      → Demander un devis
                    </a>
                  </div>
                  <div style={{ overflow: "hidden", height: 440 }}>
                    <img src={p.img} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .8s" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bientôt */}
      <section style={{ padding: "60px 80px 80px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <p className="label" style={{ marginBottom: 14 }}>Bientôt disponible</p>
        <div style={{ height: 24 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { title: "Vidéo Musicale", desc: "Clips musicaux et performances artistiques." },
            { title: "Photo Immobilière", desc: "Valorisation de biens immobiliers premium." },
            { title: "Pack Destination", desc: "Mariages et événements en Europe." },
          ].map(c => (
            <div key={c.title} style={{ background: "#fff", padding: "28px 24px", position: "relative", border: "1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ position: "absolute", top: 16, right: 16, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", border: "1px solid rgba(0,0,0,0.1)", padding: "3px 10px" }}>Bientôt</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, color: "rgba(10,10,10,0.3)", marginBottom: 8 }}>{c.title}</h3>
              <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
