import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { choisis } from "@/lib/portfolio";

/* Page de référencement local (17/11/2026), générée avec le même gabarit que /photographe-bordeaux */
export const metadata: Metadata = {
  title: { absolute: "Photographe entreprise Bordeaux · Corporate, reportage, équipes | Seno Studio" },
  description: "Photographe d'entreprise à Bordeaux : reportage dans vos locaux, portraits d'équipe et de dirigeants, photos de vos métiers pour votre site, LinkedIn et vos supports. Photo et vidéo.",
  alternates: { canonical: "/photographe-entreprise-bordeaux" },
  openGraph: { title: "Photographe entreprise Bordeaux · Corporate, reportage, équipes | Seno Studio", description: "Photographe d'entreprise à Bordeaux : reportage dans vos locaux, portraits d'équipe et de dirigeants, photos de vos métiers pour votre site, LinkedIn et vos supports. Photo et vidéo.", url: "/photographe-entreprise-bordeaux", type: "website", locale: "fr_FR", siteName: "Seno Studio" },
};

export default function Page() {
  return (
    <PageLocale
      chemin="/photographe-entreprise-bordeaux"
      nomService="Photographe d'entreprise à Bordeaux"
      surtitre="Entreprise & corporate · Bordeaux"
      titre="Photographe d'entreprise à Bordeaux"
      altPhotos="Photographe entreprise corporate Bordeaux"
      intro={[
        "Des images qui montrent qui vous êtes vraiment : vos équipes, vos locaux, votre savoir-faire. Je réalise vos photos d'entreprise à Bordeaux et en Gironde, sur place, pour votre site internet, LinkedIn, vos recrutements et votre communication.",
      ]}
      photos={[...choisis("entreprise", ["dsc06828","dsc06841","dsc06845","dsc06800","dsc06762","dsc06777","dsc06809","dsc06822","dsc06859","dsc06865","dsc06872"])]}
      blocs={[
        { titre: "Reportage dans vos locaux", texte: [
          "Je photographie votre activité telle qu'elle est : les gestes du métier, l'atelier, le bureau, l'accueil client, les réunions. Des photos authentiques valent mieux que des images de banque que l'on voit partout, et elles rassurent vos clients comme vos futurs collaborateurs.",
          "Ci-dessus, un exemple de reportage dans une entreprise d'électronique : portraits de l'équipe dans son environnement et photos de travail.",
        ] },
        { titre: "Portraits d'équipe et de dirigeants", texte: [
          "Des portraits homogènes pour toute l'équipe (même lumière, même cadrage) pour votre page « qui sommes-nous », et des portraits de dirigeants pour la presse et LinkedIn. J'installe un petit studio mobile directement chez vous pour ne pas perturber la journée.",
        ] },
        { titre: "Pour votre communication", texte: [
          "Site internet, réseaux sociaux, plaquettes, offres d'emploi, rapports annuels, dossiers de presse : je livre les images aux bons formats, avec les droits d'utilisation définis clairement dans le devis. Je peux aussi réaliser une vidéo de présentation de l'entreprise.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte un photographe d'entreprise à Bordeaux ?", r: "Le prix dépend de la durée sur place, du nombre de personnes et de photos. Décrivez-moi votre besoin : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "Pouvez-vous venir dans nos locaux ?", r: "Oui, c'est même le principe : je me déplace avec mon matériel partout à Bordeaux et en Gironde." },
        { q: "Les photos peuvent-elles servir pour la publicité ?", r: "Oui, les usages (site, réseaux, impression, publicité) sont précisés dans le devis." },
        { q: "Faites-vous aussi la vidéo d'entreprise ?", r: "Oui, je suis photographe et vidéaste : interview, présentation de l'équipe, film de marque." },
      ]}
    />
  );
}
