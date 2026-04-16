"use client";

const services = [
  { num: "01", title: "Reportage Photo", desc: "Couverture complète de votre journée, des préparatifs aux dernières danses. 300+ photos retouchées livrées en galerie privée.", img: "/images/wedding-bride.jpg", features: ["Préparatifs → soirée", "300+ photos retouchées", "Galerie privée en ligne", "Droit d'impression inclus", "Livraison sous 4 semaines"] },
  { num: "02", title: "Film Cinématique 4K", desc: "Un court-métrage de votre mariage. Chaque plan pensé, chaque coupe rythmée. 3-5 minutes que vous reverrez toute une vie.", img: "/images/wedding-ceremony.jpg", features: ["Film 3-5 minutes en 4K", "Teaser 60s réseaux sociaux", "Captation vœux & discours", "Bande-son licenciée", "Livraison sous 6 semaines"] },
  { num: "03", title: "Shooting Engagement", desc: "Une séance photo en amoureux avant le mariage. On apprend à se connaître — vous serez à l'aise le Jour J.", img: "/images/wedding-couple.jpg", features: ["1h30 à 2h en extérieur", "Lieu de votre choix", "50+ photos retouchées", "Livraison sous 3 semaines", "Idéal pour faire-parts"] },
  { num: "04", title: "Magazine Box", desc: "Un photobooth premium avec impressions magazine personnalisées. L'animation qui marque les esprits.", img: "/images/wedding-laugh.jpg", features: ["Cabine premium sur place", "Impressions format magazine", "Personnalisation mariage", "Animateur inclus", "Galerie numérique"] },
  { num: "05", title: "Drone Cinématique", desc: "Des plans aériens 4K qui donnent une dimension épique à votre film. Le domaine et vos invités vus du ciel.", img: "/images/wedding-venue.jpg", features: ["Pilote certifié DGAC", "4K aérien", "Plans lieu & cérémonie", "Intégration au film", "Autorisation gérée"] },
  { num: "06", title: "Album QR Code", desc: "Vos invités scannent un QR code et accèdent à leur galerie privée. Accessible à vie, aucune app requise.", img: "/images/wedding-dance.jpg", features: ["QR code personnalisé", "Galerie en ligne à vie", "Haute résolution", "Partage illimité", "Mise en ligne sous 48h"] },
];

const packs = [
  { name: "Essentiel", eyebrow: "La photo complète", price: "à partir de 1 600€", features: ["Reportage photo journée complète", "300+ photos retouchées", "Galerie privée en ligne", "Droit d'impression inclus", "Livraison sous 4 semaines"], popular: false },
  { name: "Expérience", eyebrow: "Photo + Vidéo + Animation", price: "à partir de 3 200€", features: ["Tout le pack Essentiel", "Film cinématique 4K (3-5 min)", "Magazine Box + impressions", "Album QR Code invités", "Teaser 60s réseaux sociaux"], popular: true },
  { name: "Premium", eyebrow: "L'expérience complète", price: "à partir de 5 000€", features: ["Tout le pack Expérience", "Shooting engagement inclus", "Drone cinématique 4K", "2 vidéastes sur place", "Accompagnement complet"], popular: false },
];

const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export default function MariageContent() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/hero-maries.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 60%, rgba(8,8,8,0.2) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(to bottom, transparent, #080808)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "140px 60px 80px 100px", maxWidth: 800 }}>
          <p className="label">Mariage · Bordeaux · France entière</p>
          <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px 0" }} />
          <h1 className="h1" style={{ marginBottom: 28 }}>
            Le jour le plus<br /><em>important.</em>
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(250,248,244,0.65)", maxWidth: 440, marginBottom: 44 }}>
            Je capture l&apos;émotion brute de votre mariage — les larmes, les rires, les regards qui parlent. Un film cinématique et des photos qui racontent votre histoire pour toujours.
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

      {/* Services */}
      <section id="prestations" style={{ padding: "120px 60px", background: "var(--noir)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p className="label">Mes prestations mariage</p>
          <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px 0 48px" }} />
          <h2 className="h2" style={{ marginBottom: 60 }}>Ce que je<br /><em>propose.</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {services.map(s => (
              <div key={s.num} style={{ background: "var(--noir2)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)", transition: "border-color .3s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)")}>
                <div style={{ height: 220, overflow: "hidden" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s" }}
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

      {/* Formules */}
      <section id="formules" style={{ padding: "120px 60px", background: "var(--noir2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p className="label">Formules mariage</p>
            <div style={{ width: 48, height: 1, background: "var(--or)", margin: "20px auto" }} />
            <h2 className="h2">Choisissez votre<br /><em>expérience.</em></h2>
            <p style={{ fontSize: 13, color: "var(--gris)", marginTop: 16 }}>Tarifs sur devis · Disponible partout en France · Déplacement inclus selon zone</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {packs.map(p => (
              <div key={p.name} style={{ background: "var(--noir)", padding: "44px 36px", position: "relative", border: p.popular ? "1px solid rgba(201,168,76,0.35)" : "1px solid rgba(255,255,255,0.04)", boxShadow: p.popular ? "0 0 40px rgba(201,168,76,0.08)" : "none", transition: "transform .3s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                {p.popular && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "var(--or)", color: "var(--noir)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 20px", whiteSpace: "nowrap" }}>Le plus populaire</div>}
                <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gris2)", marginBottom: 12 }}>{p.eyebrow}</p>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 40, fontWeight: 300, color: "var(--blanc)", marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontFamily: "var(--serif)", fontSize: 18, color: "var(--or)", marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{p.price}</p>
                <ul style={{ listStyle: "none", marginBottom: 36 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--gris)", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ color: "var(--or)" }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`btn ${p.popular ? "btn-gold" : "btn-outline"}`} style={{ width: "100%", justifyContent: "center" }}
                  onClick={e => { e.preventDefault(); scroll("#contact"); }}>
                  {p.popular ? "Réserver ce pack" : "Demander un devis"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
