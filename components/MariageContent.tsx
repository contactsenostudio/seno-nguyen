"use client";

const services = [
  { num: "01", title: "Photo + Vidéo", desc: "Rien ne vous échappe. Les photos figent chaque regard, chaque larme, chaque détail. Les vidéos gardent le mouvement, les voix, les rires. Ensemble, ils racontent votre journée comme vous l'avez vécue.", img: "/images/wedding-bride.jpg", features: ["Reportage photo journée complète", "300+ photos retouchées", "Extraits vidéo clés (vœux, danse...)", "Galerie privée en ligne", "Livraison sous 4 semaines"] },
  { num: "02", title: "Vidéo Seule", desc: "Pas un simple film de mariage — un court-métrage. La lumière, la musique, le montage : tout est pensé pour que vous revivrez ce jour à chaque visionnage. Pour ceux qui veulent ressentir plus que voir.", img: "/images/wedding-ceremony.jpg", features: ["Film 3-5 minutes en 4K", "Teaser 60s réseaux sociaux", "Captation vœux & discours", "Bande-son licenciée", "Livraison sous 6 semaines"] },
  { num: "03", title: "Shooting Avant-Mariage", desc: "Avant le Jour J, en robe et en costume, on prend le temps. Un café, un lieu qui vous parle, une heure sans agenda. Vous apprenez à être à l'aise devant l'objectif — et vous repartez avec des photos que peu de mariés ont.", img: "/images/wedding-couple.jpg", features: ["1h30 à 2h de shooting", "Lieu de votre choix", "En robe & costume", "50+ photos retouchées", "Livraison sous 3 semaines"] },
];

const packs = [
  { name: "Photo + Vidéo", eyebrow: "Le plus demandé", price: "à partir de 1 800€", features: ["Reportage photo journée complète", "300+ photos retouchées", "Extraits vidéo clés", "Galerie privée en ligne", "Livraison sous 4 semaines"], popular: true },
  { name: "Vidéo Seule", eyebrow: "Film cinématique", price: "à partir de 1 400€", features: ["Film 3-5 minutes en 4K", "Teaser 60s réseaux sociaux", "Captation vœux & discours", "Bande-son licenciée", "Livraison sous 6 semaines"], popular: false },
  { name: "Avant-Mariage", eyebrow: "Shooting en robe & costume", price: "à partir de 350€", features: ["1h30 à 2h de shooting", "Lieu de votre choix", "50+ photos retouchées", "Droit d'impression inclus", "Livraison sous 3 semaines"], popular: false },
];

const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export default function MariageContent() {
  return (
    <>
      {/* Hero — split layout */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 80 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 60px 80px 80px", background: "#fff" }}>
          <p style={{ fontFamily: "var(--condensed)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "#bbb", marginBottom: 0 }}>— 01 · Mariage · Bordeaux · France entière</p>
          <div style={{ height: 20 }} />
          <h1 className="h1" style={{ marginBottom: 28, color: "#0a0a0a" }}>
            LE JOUR<br />LE PLUS<br /><span style={{ fontFamily: "var(--serif)", fontWeight: 300, fontStyle: "italic", textTransform: "none", fontSize: "0.85em", color: "#e05a2b" }}>important.</span>
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#666", maxWidth: 420, marginBottom: 52 }}>
            Je capture l&apos;émotion brute de votre mariage — les larmes, les rires, les regards qui parlent. Un film cinématique et des photos qui racontent votre histoire pour toujours.
          </p>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "center" }}>
            <a href="#contact" className="btn-arrow btn-arrow-orange" onClick={e => { e.preventDefault(); scroll("#contact"); }}>
              → Réserver un appel gratuit
            </a>
            <a href="#formules" className="btn-arrow" onClick={e => { e.preventDefault(); scroll("#formules"); }}>
              → Voir les formules
            </a>
          </div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <img src="/images/hero-maries.jpg" alt="Mariage" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      </section>

      {/* Galerie aperçu */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {["/images/wedding-bride.jpg", "/images/wedding-ceremony.jpg", "/images/wedding-couple.jpg"].map((src, i) => (
          <div key={i} style={{ height: 260, overflow: "hidden" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .8s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
          </div>
        ))}
      </div>

      {/* Services */}
      <section id="prestations" style={{ padding: "120px 60px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p className="label">Mes prestations mariage</p>
          <div style={{ height: 20 }} />
          <h2 className="h2" style={{ marginBottom: 60, color: "#0a0a0a" }}>CE QUE<br />JE PROPOSE</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {services.map(s => (
              <div key={s.num} style={{ background: "#f5f5f5", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", transition: "border-color .3s, transform .3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.18)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}>
                <div style={{ height: 220, overflow: "hidden" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .6s" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                </div>
                <div style={{ padding: "28px 24px" }}>
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

      {/* Formules */}
      <section id="formules" style={{ padding: "120px 60px", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <p className="label">Formules mariage</p>
            <div style={{ height: 20 }} />
            <h2 className="h2" style={{ color: "#0a0a0a" }}>CHOISISSEZ VOTRE<br />EXPÉRIENCE</h2>
            <p style={{ fontSize: 13, color: "#888", marginTop: 16 }}>Tarifs sur devis · Disponible partout en France · Déplacement inclus selon zone</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {packs.map(p => (
              <div key={p.name} style={{ background: "#fff", padding: "44px 36px", position: "relative", border: p.popular ? "1px solid rgba(0,0,0,0.18)" : "1px solid rgba(0,0,0,0.08)", boxShadow: p.popular ? "0 4px 24px rgba(0,0,0,0.06)" : "none", transition: "transform .3s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                {p.popular && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "#0a0a0a", color: "#fff", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", padding: "5px 20px", whiteSpace: "nowrap" }}>Le plus populaire</div>}
                <p style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#999", marginBottom: 12 }}>{p.eyebrow}</p>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: 40, fontWeight: 300, color: "#0a0a0a", marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontFamily: "var(--serif)", fontSize: 18, color: "#0a0a0a", marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid rgba(0,0,0,0.08)" }}>{p.price}</p>
                <ul style={{ listStyle: "none", marginBottom: 36 }}>
                  {p.features.map(f => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: 13, color: "#555", padding: "8px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                      <span style={{ color: "#0a0a0a" }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`btn-arrow${p.popular ? " btn-arrow-orange" : ""}`}
                  onClick={e => { e.preventDefault(); scroll("#contact"); }}
                >
                  → {p.popular ? "Réserver ce pack" : "Demander un devis"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
