"use client";

const services = [
  { num: "01", title: "Restauration & Gastronomie", desc: "Un client qui voit vos photos décide avant même d'entrer. Plats, ambiance, terrasse, équipe — je capture ce qui donne envie de réserver une table. Pour les restaurants, bars et pubs qui veulent être vus autrement.", img: "/images/theme-gastronomie.jpg", features: ["Plats & carte du menu", "Ambiance salle & terrasse", "Portraits chef & équipe", "Devanture & extérieur", "Format réseaux sociaux & site web", "Droits commerciaux inclus"] },
  { num: "02", title: "Photo Immobilière", desc: "Un bien mal photographié reste sur le marché. Un bien bien photographié se vend. Je travaille la lumière, les angles et la mise en scène pour que chaque pièce fasse tomber amoureux — avant même la visite.", img: "/images/theme-immobilier.jpg", features: ["Intérieur & extérieur", "Mise en valeur de l'espace", "Retouche lumière & couleurs", "Format agence & annonce", "Livraison sous 1 semaine", "Droits commerciaux inclus"] },
];

const benefits = [
  { icon: "▲", title: "Plus de clients", desc: "Des photos professionnelles de vos plats ou de votre bien attirent plus de clients que n'importe quelle pub." },
  { icon: "◈", title: "Image soignée", desc: "Des visuels haut de gamme qui inspirent confiance et donnent envie avant même que le client pousse la porte." },
  { icon: "◎", title: "Livraison rapide", desc: "Photos retouchées livrées sous 1 semaine, prêtes à publier sur vos réseaux et votre site." },
];

const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export default function EntrepriseContent() {
  return (
    <>
      {/* Hero — split layout */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 60px 80px 80px", background: "#fff" }}>
          <p style={{ fontFamily: "var(--condensed)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#bbb", marginBottom: 0 }}>— 02 · Entreprise · Corporate · Bordeaux</p>
          <div style={{ height: 20 }} />
          <h1 className="h1" style={{ marginBottom: 28, color: "#0a0a0a" }}>
            VOTRE IMAGE,<br /><span style={{ fontFamily: "var(--serif)", fontWeight: 300, fontStyle: "italic", textTransform: "none", fontSize: "0.85em", color: "#e05a2b" }}>votre impact.</span>
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#666", maxWidth: 420, marginBottom: 52 }}>
            Restaurant, bar, agence immobilière ou commerce — des photos professionnelles qui mettent en valeur votre espace et donnent envie à vos clients.
          </p>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }}>
            <a href="#contact" className="btn-arrow btn-arrow-orange" onClick={e => { e.preventDefault(); scroll("#contact"); }}>
              → Demander un devis
            </a>
            <a href="#services" className="btn-arrow" onClick={e => { e.preventDefault(); scroll("#services"); }}>
              → Voir les prestations
            </a>
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <img src="/images/theme-gastronomie.jpg" alt="Entreprise" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </section>

      {/* Galerie aperçu commercial */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {["/images/theme-gastronomie.jpg", "/images/theme-immobilier.jpg", "/images/theme-mode.jpg"].map((src, i) => (
          <div key={i} style={{ height: 280, overflow: "hidden" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .8s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
          </div>
        ))}
      </div>

      {/* Benefits */}
      <section style={{ padding: "80px 60px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {benefits.map(b => (
            <div key={b.title} style={{ textAlign: "center", padding: "40px 24px" }}>
              <div style={{ fontFamily: "var(--serif)", fontSize: 32, color: "#0a0a0a", marginBottom: 20 }}>{b.icon}</div>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#0a0a0a", marginBottom: 12 }}>{b.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#666" }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: "120px 60px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p className="label">Mes prestations entreprise</p>
          <div style={{ height: 20 }} />
          <h2 className="h2" style={{ marginBottom: 60, color: "#0a0a0a" }}>CE QUE<br />JE PROPOSE</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
            {services.map(s => (
              <div key={s.num} style={{ background: "#f5f5f5", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", transition: "border-color .3s, transform .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.18)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
                <div style={{ height: 260, overflow: "hidden" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                </div>
                <div style={{ padding: "32px 28px" }}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 36, color: "rgba(0,0,0,0.1)", lineHeight: 1, marginBottom: 12 }}>{s.num}</div>
                  <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, color: "#0a0a0a", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: "#666", marginBottom: 16 }}>{s.desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    {s.features.map(f => (
                      <li key={f} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12, color: "#444" }}>
                        <span style={{ width: 16, height: 1, background: "rgba(0,0,0,0.2)", flexShrink: 0, display: "inline-block" }} />{f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#0a0a0a", textDecoration: "none" }}
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
