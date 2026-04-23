"use client";

const pillars = [
  {
    img: "/images/wedding-new1.jpg",
    title: "Des photos qui\nvous font revivre.",
    benefit: "Dans 10 ans, vous ouvrez la galerie. Vous vous souvenez de chaque regard, chaque larme, chaque éclat de rire. C'est ça, un reportage photo.",
  },
  {
    img: "/images/wedding-new4.jpg",
    title: "Un film qui\nvous fait pleurer.",
    benefit: "Pas un montage de clips. Une vraie histoire, avec votre musique, vos voix, vos émotions. Un court-métrage de votre journée en 4K.",
  },
  {
    img: "/images/magazine-box1.jpg",
    title: "Vos invités\ndans la légende.",
    benefit: "La Magazine Box installe une cabine dans votre salle. Vos invités posent, s'amusent, repartent avec leur photo. Le souvenir devient collectif.",
  },
];

const packs = [
  {
    name: "Essentiel",
    tag: null,
    price: "à partir de 1 600€",
    promise: "La couverture complète de votre journée en photo. Des préparatifs jusqu'à l'ouverture du bal.",
    includes: ["Reportage photo journée complète", "300 à 500 photos retouchées", "Galerie privée + droits d'impression"],
    cta: "Demander un devis",
    highlight: false,
  },
  {
    name: "Expérience",
    tag: "Le plus choisi",
    price: "à partir de 3 200€",
    promise: "Photo + Film + Magazine Box. Trois souvenirs différents, un seul artiste, zéro coordination à gérer.",
    includes: ["Reportage photo complet", "Film cinématique 4K", "Magazine Box en soirée"],
    cta: "Réserver ce pack",
    highlight: true,
  },
  {
    name: "Premium",
    tag: null,
    price: "à partir de 5 000€",
    promise: "Soirée intégrale, drone, shooting engagement. Chaque moment de votre histoire, sans exception.",
    includes: ["Tout le pack Expérience", "Drone 4K + Shooting engagement", "2 artistes · Soirée sans limite"],
    cta: "Demander un devis",
    highlight: false,
  },
];

const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export default function MariageContent() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/hero-4k-6.jpg')", backgroundSize: "cover", backgroundPosition: "center 30%", filter: "saturate(1.2)" }} />
        <div className="hero-overlay hero-overlay-right" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to bottom, transparent, var(--noir))" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "140px 60px 80px 100px", maxWidth: 800 }}>
          <p className="label">Mariage · Bordeaux · Gironde</p>
          <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px 0" }} />
          <h1 className="h1" style={{ marginBottom: 28 }}>
            Le jour le plus<br /><em>important.</em>
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(250,248,244,0.65)", maxWidth: 440, marginBottom: 44 }}>
            Je capture l&apos;émotion brute de votre mariage — les larmes, les rires, les regards qui parlent. Des souvenirs que vous revivrez pour toujours.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#contact" className="btn btn-gold" onClick={e => { e.preventDefault(); scroll("#contact"); }}>
              Réserver un appel gratuit
            </a>
            <a href="#formules" className="btn btn-outline" onClick={e => { e.preventDefault(); scroll("#formules"); }}>
              Voir les formules
            </a>
          </div>
        </div>
      </section>

      {/* 3 piliers */}
      <section style={{ padding: "120px 60px", background: "var(--noir)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p className="label">Ce que vous gardez</p>
            <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {pillars.map((p, i) => (
              <div key={i} style={{ position: "relative", overflow: "hidden", minHeight: 480 }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.06)"; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}>
                <img src={p.img} alt={p.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.8s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.1) 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "36px 32px" }}>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 300, color: "var(--blanc)", lineHeight: 1.15, marginBottom: 16, whiteSpace: "pre-line" }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(250,248,244,0.62)" }}>
                    {p.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestations */}
      <section style={{ padding: "100px 60px", background: "var(--noir2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <p className="label">Ce que je propose</p>
            <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px 0 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(201,168,76,0.08)", overflow: "visible" }}>
            {[
              { num: "01", title: "Reportage Photo", desc: "De l'habillage aux dernières danses. Des images naturelles, sans mise en scène.", img: "/images/wedding-new1.jpg" },
              { num: "02", title: "Film Cinématique 4K", desc: "Un court-métrage de votre mariage avec vos voix, vos regards, votre musique.", img: "/images/wedding-new4.jpg" },
              { num: "03", title: "Shooting Engagement", desc: "Une séance avant le mariage pour qu'on se découvre — et que vous soyez naturels le jour J.", img: "/images/wedding-new5.jpg" },
              { num: "04", title: "Magazine Box", desc: "Une cabine photo installée en soirée. Vos invités posent, rient, repartent avec leur photo.", img: "/images/magazine-box1.jpg" },
              { num: "05", title: "Drone Cinématique", desc: "Le domaine et la cérémonie vus du ciel. Des plans 4K qui donnent une dimension épique.", img: "/images/wedding-new9.jpg" },
              { num: "06", title: "Animation Photo Invités", desc: "Je shoote vos invités en animation pendant la soirée. Ils scannent un QR code et ont leurs photos en temps réel.", img: "/images/Animation fond photo.jpeg" },
            ].map(s => (
              <div key={s.num}
                style={{ background: "var(--noir2)", padding: "36px 32px", position: "relative" }}
                onMouseEnter={e => {
                  const preview = e.currentTarget.querySelector(".img-preview") as HTMLElement;
                  if (preview) { preview.style.opacity = "1"; preview.style.transform = "translateY(0) scale(1)"; }
                }}
                onMouseLeave={e => {
                  const preview = e.currentTarget.querySelector(".img-preview") as HTMLElement;
                  if (preview) { preview.style.opacity = "0"; preview.style.transform = "translateY(12px) scale(0.97)"; }
                }}>
                {/* Preview flottant au-dessus */}
                <div className="img-preview" style={{
                  position: "absolute", inset: 0, zIndex: 10,
                  opacity: 0, transition: "opacity 0.4s ease",
                  pointerEvents: "none",
                }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 60%)" }} />
                  <div style={{ position: "absolute", bottom: 28, left: 32 }}>
                    <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 300, color: "var(--blanc)", marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(250,248,244,0.65)" }}>{s.desc}</p>
                  </div>
                </div>
                <span style={{ fontFamily: "var(--serif)", fontSize: 32, color: "rgba(201,168,76,0.2)", display: "block", marginBottom: 16 }}>{s.num}</span>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 300, color: "var(--blanc)", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--gris)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formules */}
      <section id="formules" style={{ padding: "120px 60px", background: "var(--noir2)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p className="label">Formules mariage</p>
            <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px auto 24px" }} />
            <h2 className="h2">Choisissez votre<br /><em>expérience.</em></h2>
            <p style={{ fontSize: 13, color: "var(--gris)", marginTop: 20, maxWidth: 480, margin: "20px auto 0" }}>
              Chaque formule est personnalisable. Devis gratuit, sans engagement.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {packs.map(p => (
              <div key={p.name} style={{
                background: "var(--noir)", padding: "44px 36px",
                border: p.highlight ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(255,255,255,0.05)",
                boxShadow: p.highlight ? "0 0 48px rgba(201,168,76,0.07)" : "none",
                display: "flex", flexDirection: "column", position: "relative",
                transition: "transform 0.3s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>

                {p.tag && (
                  <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "var(--or)", color: "var(--noir)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 20px", whiteSpace: "nowrap" }}>
                    {p.tag}
                  </div>
                )}

                <h3 style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 300, color: "var(--blanc)", marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontFamily: "var(--serif)", fontSize: 20, color: "var(--or)", marginBottom: 24 }}>{p.price}</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--gris)", marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.06)", flex: 1 }}>
                  {p.promise}
                </p>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                  {p.includes.map(item => (
                    <li key={item} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 13, color: "var(--blanc2)" }}>
                      <span style={{ color: "var(--or)", fontSize: 14, flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a href="#contact"
                  className={`btn ${p.highlight ? "btn-gold" : "btn-outline"}`}
                  style={{ justifyContent: "center" }}
                  onClick={e => { e.preventDefault(); scroll("#contact"); }}>
                  {p.cta}
                </a>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: "var(--gris2)", marginTop: 40 }}>
            Disponible en Gironde · Devis personnalisé gratuit · Acompte de 30% à la réservation
          </p>
        </div>
      </section>
    </>
  );
}
