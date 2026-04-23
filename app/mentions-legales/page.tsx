import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et politique de confidentialité de Seno Studio, photographe et vidéaste à Bordeaux.",
  robots: { index: false, follow: false },
};

export default function MentionsLegales() {
  return (
    <main style={{ background: "var(--noir)", color: "var(--blanc)", minHeight: "100vh", padding: "120px 60px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <p style={{ fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--or)", marginBottom: 16 }}>
          Seno Studio
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 4vw, 64px)", fontWeight: 300, lineHeight: 1, marginBottom: 48 }}>
          Mentions légales
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 40, fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.85, color: "var(--gris)" }}>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              1. Éditeur du site
            </h2>
            <p>
              Le site <strong style={{ color: "var(--blanc2)" }}>senostudio.fr</strong> est édité par :
            </p>
            <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong style={{ color: "var(--blanc2)" }}>Raison sociale :</strong> Seno Studio</li>
              <li><strong style={{ color: "var(--blanc2)" }}>Localisation :</strong> Bordeaux, Gironde (33), France</li>
              <li><strong style={{ color: "var(--blanc2)" }}>Email :</strong>{" "}
                <a href="mailto:contact.senostudio@gmail.com" style={{ color: "var(--or)", textDecoration: "none" }}>
                  contact.senostudio@gmail.com
                </a>
              </li>
              <li><strong style={{ color: "var(--blanc2)" }}>Téléphone :</strong>{" "}
                <a href="tel:+33768868505" style={{ color: "var(--or)", textDecoration: "none" }}>
                  +33 7 68 86 85 05
                </a>
              </li>
            </ul>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              2. Hébergement
            </h2>
            <p>
              Ce site est hébergé par <strong style={{ color: "var(--blanc2)" }}>Vercel Inc.</strong><br />
              340 Pine Street, Suite 701 — San Francisco, CA 94104 — États-Unis<br />
              Site : <span style={{ color: "var(--blanc2)" }}>vercel.com</span>
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              3. Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (photographies, vidéos, textes, logos, graphismes) est la propriété exclusive de Seno Studio, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est interdite.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              4. Données personnelles & cookies
            </h2>
            <p>
              La collecte et le traitement de vos données personnelles, ainsi que l&apos;utilisation des cookies, sont détaillés dans notre{" "}
              <a href="/politique-de-confidentialite" style={{ color: "var(--or)", textDecoration: "none" }}>
                Politique de confidentialité
              </a>.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              5. Liens hypertexte
            </h2>
            <p>
              Ce site peut contenir des liens vers des sites tiers (Instagram, Calendly). Seno Studio ne saurait être tenu responsable du contenu ou des pratiques de confidentialité de ces sites.
            </p>
          </section>

          <p style={{ fontSize: 12, color: "var(--gris2)", marginTop: 16 }}>
            Dernière mise à jour : avril 2026
          </p>

          <a href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--sans)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--or)", textDecoration: "none", marginTop: 8 }}>
            ← Retour à l&apos;accueil
          </a>
        </div>
      </div>
    </main>
  );
}
