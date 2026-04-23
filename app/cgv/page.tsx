import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions générales de vente de Seno Studio, photographe et vidéaste mariage à Bordeaux.",
  robots: { index: false, follow: false },
};

export default function CGV() {
  return (
    <main style={{ background: "var(--noir)", color: "var(--blanc)", minHeight: "100vh", padding: "120px 60px 80px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <p style={{ fontFamily: "var(--sans)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "var(--or)", marginBottom: 16 }}>
          Seno Studio
        </p>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 4vw, 64px)", fontWeight: 300, lineHeight: 1, marginBottom: 48 }}>
          Conditions générales de vente
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 40, fontFamily: "var(--sans)", fontSize: 14, lineHeight: 1.85, color: "var(--gris)" }}>

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              1. Prestataire
            </h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong style={{ color: "var(--blanc2)" }}>Raison sociale :</strong> Seno Studio</li>
              <li><strong style={{ color: "var(--blanc2)" }}>Statut :</strong> Auto-entrepreneur</li>
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
              2. Champ d'application
            </h2>
            <p>
              Les présentes Conditions Générales de Vente s'appliquent à toutes les prestations de photographie, vidéographie et création de Magazine Box proposées par Seno Studio, que ce soit pour des mariages, des événements ou des projets d'entreprise.
            </p>
            <p style={{ marginTop: 12 }}>
              Toute commande implique l'acceptation pleine et entière des présentes CGV.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              3. Devis et réservation
            </h2>
            <p>
              Toute prestation fait l'objet d'un <strong style={{ color: "var(--blanc2)" }}>devis personnalisé gratuit</strong>, valable 30 jours à compter de sa date d'émission.
            </p>
            <p style={{ marginTop: 12 }}>
              La réservation est confirmée à la réception des deux éléments suivants :
            </p>
            <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> Le devis signé avec la mention « Bon pour accord »</li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> Le versement d'un acompte de <strong style={{ color: "var(--blanc2)" }}>30 % du montant total TTC</strong></li>
            </ul>
            <p style={{ marginTop: 12 }}>
              La date est réservée exclusivement à réception de ces deux éléments. Aucune date n'est bloquée sans acompte.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              4. Tarifs et paiement
            </h2>
            <p>
              Les tarifs sont indiqués en euros TTC. Seno Studio est auto-entrepreneur et bénéficie de la franchise de TVA (article 293 B du CGI) — aucune TVA n'est applicable.
            </p>
            <p style={{ marginTop: 12 }}>
              Le solde restant est exigible selon les modalités suivantes :
            </p>
            <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Mariage :</strong> solde à régler au plus tard 15 jours avant la date</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Entreprise / événement :</strong> solde à régler à la livraison des fichiers</span></li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Modes de paiement acceptés : virement bancaire, chèque, espèces.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              5. Annulation et report
            </h2>
            <p>
              En cas d'annulation par le client :
            </p>
            <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span>Plus de <strong style={{ color: "var(--blanc2)" }}>90 jours</strong> avant la prestation : l'acompte reste acquis à Seno Studio</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span>Moins de <strong style={{ color: "var(--blanc2)" }}>90 jours</strong> : 100 % du montant total est dû</span></li>
            </ul>
            <p style={{ marginTop: 12 }}>
              En cas de <strong style={{ color: "var(--blanc2)" }}>report</strong> de la date, Seno Studio fera son possible pour se rendre disponible. Si la nouvelle date est indisponible, les conditions d'annulation s'appliquent.
            </p>
            <p style={{ marginTop: 12 }}>
              En cas d'annulation par Seno Studio (force majeure, maladie, accident), l'acompte est intégralement remboursé.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              6. Livraison des fichiers
            </h2>
            <p>
              Les délais de livraison indicatifs sont les suivants :
            </p>
            <ul style={{ listStyle: "none", marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Photos mariage :</strong> 6 à 10 semaines</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Film cinématique :</strong> 8 à 12 semaines</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Magazine Box :</strong> 10 à 14 semaines</span></li>
              <li style={{ display: "flex", gap: 10 }}><span style={{ color: "var(--or)" }}>—</span> <span><strong style={{ color: "var(--blanc2)" }}>Prestations entreprise :</strong> 5 à 10 jours ouvrés</span></li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Les fichiers sont transmis via une galerie en ligne sécurisée et privée. Les fichiers haute résolution sont disponibles en téléchargement pendant 6 mois.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              7. Propriété intellectuelle et droits d'auteur
            </h2>
            <p>
              Seno Studio conserve l'intégralité des <strong style={{ color: "var(--blanc2)" }}>droits d'auteur</strong> sur l'ensemble des photographies et vidéos produites. Le client reçoit une <strong style={{ color: "var(--blanc2)" }}>licence d'utilisation personnelle</strong> lui permettant d'imprimer, partager et publier les fichiers à titre privé.
            </p>
            <p style={{ marginTop: 12 }}>
              Toute utilisation commerciale des fichiers (publicité, revente, usage professionnel) nécessite une autorisation écrite préalable et peut faire l'objet d'une facturation supplémentaire.
            </p>
            <p style={{ marginTop: 12 }}>
              Seno Studio se réserve le droit d'utiliser les photos et vidéos à des fins de communication (portfolio, réseaux sociaux, site web), sauf opposition écrite du client.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              8. Responsabilité
            </h2>
            <p>
              Seno Studio met tout en œuvre pour assurer une prestation de qualité. En cas d'incident technique indépendant de sa volonté (défaillance matérielle, force majeure), sa responsabilité sera limitée au remboursement des sommes perçues.
            </p>
            <p style={{ marginTop: 12 }}>
              Il est fortement conseillé au client de conserver une sauvegarde personnelle des fichiers livrés.
            </p>
          </section>

          <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.2)" }} />

          <section>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, color: "var(--blanc)", marginBottom: 16 }}>
              9. Droit applicable et litiges
            </h2>
            <p>
              Les présentes CGV sont soumises au <strong style={{ color: "var(--blanc2)" }}>droit français</strong>. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, le tribunal compétent sera celui de <strong style={{ color: "var(--blanc2)" }}>Bordeaux</strong>.
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
