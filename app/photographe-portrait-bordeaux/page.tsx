import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { choisis } from "@/lib/portfolio";

/* Page de référencement local (17/11/2026), générée avec le même gabarit que /photographe-bordeaux */
export const metadata: Metadata = {
  title: { absolute: "Photographe portrait Bordeaux · Photo CV, LinkedIn, portrait pro | Seno Studio" },
  description: "Photographe portrait à Bordeaux : photo CV, LinkedIn, portrait professionnel d'entrepreneur ou d'équipe, en studio, en extérieur ou sur votre lieu de travail. Devis sous 24 h.",
  alternates: { canonical: "/photographe-portrait-bordeaux" },
  openGraph: { title: "Photographe portrait Bordeaux · Photo CV, LinkedIn, portrait pro | Seno Studio", description: "Photographe portrait à Bordeaux : photo CV, LinkedIn, portrait professionnel d'entrepreneur ou d'équipe, en studio, en extérieur ou sur votre lieu de travail. Devis sous 24 h.", url: "/photographe-portrait-bordeaux", type: "website", locale: "fr_FR", siteName: "Seno Studio" },
};

export default function Page() {
  return (
    <PageLocale
      chemin="/photographe-portrait-bordeaux"
      nomService="Portrait professionnel à Bordeaux"
      surtitre="Portrait professionnel · Bordeaux"
      titre="Photographe portrait à Bordeaux"
      altPhotos="Photographe portrait professionnel Bordeaux"
      intro={[
        "Une bonne photo de profil change la première impression : sur un CV, sur LinkedIn, sur votre site ou dans la presse. Je réalise votre portrait professionnel à Bordeaux, en studio, en extérieur ou directement sur votre lieu de travail.",
      ]}
      photos={[...choisis("entreprise", ["dsc06800","dsc06762","dsc06859","dsc06809","dsc06872"]), ...choisis("studio", ["dsc09039-edit","dsc09625","dsc04806-edit-edit","dsc01465"]), ...choisis("portrait", ["loane-2","dsc02022"])]}
      blocs={[
        { titre: "Photo CV et LinkedIn", texte: [
          "Un portrait net, bien éclairé, cadré comme il faut, où vous avez l'air vous-même et accessible. Je vous guide sur la posture, l'angle du visage et l'expression, parce que c'est ce qui fait la différence entre une photo « d'identité » et un vrai portrait qui inspire confiance.",
        ] },
        { titre: "Entrepreneurs, indépendants, équipes", texte: [
          "Pour votre site, vos réseaux ou votre communication : des portraits qui racontent votre métier. Je me déplace dans vos locaux pour photographier l'équipe dans son environnement, comme pour cette entreprise d'électronique que vous pouvez voir ci-dessus. On peut aussi faire une série de portraits homogènes pour toute l'équipe, sur le même fond et avec la même lumière.",
        ] },
        { titre: "Studio, extérieur ou lieu de travail", texte: [
          "En studio : fond uni, lumière maîtrisée, rendu sobre et professionnel. En extérieur : un décor urbain de Bordeaux pour un portrait plus vivant. Sur votre lieu de travail : l'image la plus authentique de votre activité.",
        ] },
        { titre: "Une séance courte et efficace", texte: [
          "Une photo pro ne demande pas une demi-journée. On échange avant pour définir l'usage et le style, la séance est rapide et guidée, puis je vous livre les portraits retouchés au bon format pour chaque usage (LinkedIn, CV, site, impression).",
        ] },
      ]}
      faq={[
        { q: "Combien coûte une photo CV ou LinkedIn à Bordeaux ?", r: "Le prix dépend du nombre de photos retouchées et du lieu. Écrivez-moi : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "Comment s'habiller pour un portrait professionnel ?", r: "Une tenue que vous portez vraiment au travail, unie de préférence, sans motifs trop fins. Je vous envoie des conseils avant la séance." },
        { q: "Pouvez-vous photographier toute mon équipe ?", r: "Oui, je me déplace dans vos locaux et j'installe un petit studio sur place pour des portraits homogènes." },
        { q: "Combien de temps dure une séance portrait ?", r: "Une séance pro est courte : on en parle dans le devis selon le nombre de personnes et de photos." },
      ]}
    />
  );
}
