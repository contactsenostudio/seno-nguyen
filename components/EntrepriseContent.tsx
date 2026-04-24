"use client";

const services = [
  { num: "01", title: "Film Institutionnel", desc: "Un film qui capture l'âme de votre entreprise, ses valeurs et ses équipes. L'outil de communication le plus puissant.", img: "/images/business3.jpg", pos: "center center", features: ["Film 2-5 minutes", "Script & storyboard", "Tournage professionnel", "Motion design", "Livraison sous 4 semaines"] },
  { num: "02", title: "Photo Corporate", desc: "Portraits de dirigeants, photos d'équipe et reportage de vos locaux. Une identité visuelle professionnelle et cohérente.", img: "/images/corporate-portrait.jpg", pos: "center 20%", features: ["Portraits dirigeants", "Photos d'équipe", "Reportage locaux", "Livraison sous 2 semaines", "Droits commerciaux inclus"] },
  { num: "03", title: "Soirée & Événement", desc: "Reportage photo et vidéo de vos événements corporate. Des souvenirs professionnels que vous partagerez avec fierté.", img: "/images/business1.jpg", pos: "center center", features: ["Couverture complète", "Photos & vidéo", "Livraison rapide", "Format réseaux sociaux", "Galerie privée en ligne"] },
  { num: "04", title: "Contenu Social Media", desc: "Création de contenu photo & vidéo optimisé pour vos réseaux. Posts, stories, reels — un flux cohérent et premium.", img: "/images/business6.jpg", pos: "center center", features: ["30+ visuels par session", "Formats optimisés", "Instagram, LinkedIn, TikTok", "Livraison sous 1 semaine", "Droits d'utilisation inclus"] },
  { num: "05", title: "Témoignages Vidéo", desc: "Films témoignages de vos clients ou collaborateurs. La forme de preuve sociale la plus convaincante.", img: "/images/business5.jpg", pos: "center center", features: ["Tournage interview", "Montage professionnel", "Format 16/9 et vertical", "Sous-titres inclus", "Livraison sous 2 semaines"] },
  { num: "06", title: "Photo Produit", desc: "Photographie de produits haut de gamme. Des images qui vendent, qui séduisent, qui racontent l'histoire de votre marque.", img: "/images/business7.jpg", pos: "center center", features: ["Studio ou en situation", "Retouche avancée", "Fond blanc ou lifestyle", "Livraison sous 1 semaine", "Droits commerciaux inclus"] },
];

const benefits = [
  { icon: "▲", title: "3x plus d'engagement", desc: "Une vidéo de qualité cinématique multiplie par 3 l'engagement sur vos réseaux sociaux." },
  { icon: "◈", title: "Image premium", desc: "Des visuels haut de gamme qui positionnent votre marque au niveau des grandes entreprises." },
  { icon: "◎", title: "ROI mesurable", desc: "Un film institutionnel bien réalisé, c'est votre meilleur commercial — disponible 24h/24." },
];

const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export default function EntrepriseContent() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/business2.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="hero-overlay hero-overlay-right hero-overlay-strong" style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to bottom, transparent, var(--noir2))" }} />
        <div className="page-px-md" style={{ position: "relative", zIndex: 2, paddingTop: 140, paddingBottom: 80, maxWidth: 800 }}>
          <p className="label">Entreprise · Corporate · Bordeaux</p>
          <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px 0" }} />
          <h1 className="h1" style={{ marginBottom: 28 }}>
            Votre image,<br /><em>votre impact.</em>
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(250,248,244,0.65)", maxWidth: 440, marginBottom: 44 }}>
            Une vidéo de qualité cinématique, c&apos;est votre meilleur outil de communication. Je travaille avec des PME, startups et grands groupes qui veulent une image premium.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#contact" className="btn btn-gold" onClick={e => { e.preventDefault(); scroll("#contact"); }}>
              Demander un devis
            </a>
            <a href="#services" className="btn btn-outline" onClick={e => { e.preventDefault(); scroll("#services"); }}>
              Voir les prestations
            </a>
          </div>
        </div>
      </section>

{/* Benefits */}
      <section className="page-px-md" style={{ paddingTop: 80, paddingBottom: 80, background: "var(--noir2)" }}>
        <div className="grid-cols-3" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: 40 }}>
          {benefits.map(b => (
            <div key={b.title} style={{ textAlign: "center", padding: "40px 24px" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 32, color: "var(--or)", marginBottom: 20 }}>{b.icon}</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--blanc)", marginBottom: 12 }}>{b.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--gris)" }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="page-px-md" style={{ paddingTop: 120, paddingBottom: 120, background: "var(--noir)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p className="label">Mes prestations entreprise</p>
          <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px 0 48px" }} />
          <h2 className="h2" style={{ marginBottom: 60 }}>Ce que je<br /><em>propose.</em></h2>
          <div className="grid-cols-3" style={{ display: "grid", gap: 20 }}>
            {services.map(s => (
              <div key={s.num} style={{ background: "var(--noir2)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)", transition: "border-color .3s, transform .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.15)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.04)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
                <div style={{ height: 200, overflow: "hidden" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: s.pos, display: "block", transition: "transform .6s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                </div>
                <div style={{ padding: "28px 24px" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 36, color: "rgba(201,168,76,0.15)", lineHeight: 1, marginBottom: 12 }}>{s.num}</div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "var(--blanc)", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--gris)", marginBottom: 16 }}>{s.desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    {s.features.map(f => (
                      <li key={f} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12, color: "var(--blanc2)" }}>
                        <span style={{ width: 16, height: 1, background: "var(--or)", flexShrink: 0, display: "inline-block" }} />{f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--or)", textDecoration: "none" }}
                    onClick={e => { e.preventDefault(); scroll("#contact"); }}>
                    Demander un devis →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
