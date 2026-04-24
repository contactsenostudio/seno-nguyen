import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données personnelles de Seno Studio.",
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="page-px-md" style={{ background: "var(--noir)", color: "var(--blanc)", minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <p style={{ fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--or)", marginBottom: 16 }}>
          Seno Studio
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 4vw, 64px)", fontWeight: 300, lineHeight: 1, marginBottom: 48 }}>
          Politique de confidentialité
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 40, fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.85, color: "var(--gris)" }}>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              1. Responsable du traitement
            </h2>
            <p>
              Le responsable du traitement des données personnelles collectées sur ce site est :
            </p>
            <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong style={{ color: "var(--blanc2)" }}>Raison sociale :</strong> Seno Studio</li>
              <li><strong style={{ color: "var(--blanc2)" }}>Statut :</strong> Auto-entrepreneur</li>
              <li><strong style={{ color: "var(--blanc2)" }}>Email :</strong>{" "}
                <a href="mailto:contact.senostudio@gmail.com" style={{ color: "var(--or)", textDecoration: "none" }}>
                  contact.senostudio@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              2. Données collectées
            </h2>
            <p>
              Les seules données personnelles collectées sur ce site le sont via le <strong style={{ color: "var(--blanc2)" }}>formulaire de contact</strong> :
            </p>
            <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> Prénom et nom</li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> Adresse e-mail</li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> Numéro de téléphone (facultatif)</li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> Type de projet et message</li>
            </ul>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              3. Finalité du traitement
            </h2>
            <p>
              Ces données sont collectées dans l'unique but de <strong style={{ color: "var(--blanc2)" }}>répondre à votre demande de contact ou de devis</strong>. Elles ne sont jamais utilisées à des fins commerciales, publicitaires ou transmises à des tiers.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              4. Durée de conservation
            </h2>
            <p>
              Vos données sont conservées pendant <strong style={{ color: "var(--blanc2)" }}>3 ans</strong> à compter de votre dernier contact, puis supprimées définitivement.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              5. Vos droits (RGPD)
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données :
            </p>
            <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Droit d'accès</strong> : obtenir une copie de vos données</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Droit de rectification</strong> : corriger des données inexactes</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Droit à l'effacement</strong> : demander la suppression de vos données</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Droit d'opposition</strong> : vous opposer à un traitement</span></li>
            </ul>
            <p style={{ marginTop: 16 }}>
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:contact.senostudio@gmail.com" style={{ color: "var(--or)", textDecoration: "none" }}>
                contact.senostudio@gmail.com
              </a>. Nous répondons sous 30 jours maximum.
            </p>
            <p style={{ marginTop: 12 }}>
              Vous avez également le droit d'introduire une réclamation auprès de la{" "}
              <strong style={{ color: "var(--blanc2)" }}>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) : cnil.fr.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              6. Cookies
            </h2>
            <p>
              Ce site n'utilise pas de cookies de tracking ou publicitaires. Aucun outil d'analyse comportementale tiers n'est utilisé. Seuls des cookies techniques strictement nécessaires au bon fonctionnement peuvent être déposés.
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
