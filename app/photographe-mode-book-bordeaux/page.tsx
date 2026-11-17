import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { choisis } from "@/lib/portfolio";

/* Page de référencement local (17/11/2026), générée avec le même gabarit que /photographe-bordeaux */
export const metadata: Metadata = {
  title: { absolute: "Photographe mode Bordeaux · Book mannequin, polas, comédien | Seno Studio" },
  description: "Photographe mode à Bordeaux : book mannequin, polas pour agences, book comédien ou artiste, shooting éditorial en studio ou en extérieur. Retouches adaptées à votre usage.",
  alternates: { canonical: "/photographe-mode-book-bordeaux" },
};

export default function Page() {
  return (
    <PageLocale
      chemin="/photographe-mode-book-bordeaux"
      nomService="Shooting mode et book photo à Bordeaux"
      surtitre="Mode · Book · Polas · Bordeaux"
      titre="Photographe mode et book à Bordeaux"
      altPhotos="Photographe mode book Bordeaux"
      intro={[
        "Mannequin, comédien(ne), chanteur(se), danseur(se), créateur ou créatrice de mode : je réalise votre book photo à Bordeaux, en studio ou en extérieur, avec des images pensées pour les agences, les castings et vos réseaux.",
      ]}
      photos={[...choisis("studio", ["dsc02538","dsc02555-edit","dsc01275","dsc01297","dsc02133","dsc02201","dsc02391-edit","dsc02784","dsc02878","dsc01750-edit","dsc02285","dsc02522"])]}
      blocs={[
        { titre: "Book mannequin et polas", texte: [
          "Pour démarrer dans le mannequinat, les agences demandent d'abord des polas : des photos simples, sans maquillage chargé ni retouche lourde, sur fond neutre, de face, de profil et en pied. Je vous explique exactement quoi porter et comment les réaliser.",
          "Pour compléter un book existant, on construit ensemble des images plus créatives, en accord avec votre profil (commercial, éditorial, beauté) et les attentes des agences.",
        ] },
        { titre: "Book comédien, chanteur, artiste", texte: [
          "Un portrait de comédien doit vous ressembler et montrer plusieurs facettes de votre jeu. Pour un artiste ou un musicien, on travaille une image forte pour vos pochettes, affiches et réseaux. On définit ensemble l'ambiance : lumière douce ou contrastée, couleur ou noir et blanc, studio ou décor urbain.",
        ] },
        { titre: "Shooting mode et éditorial", texte: [
          "Pour une marque de vêtements, un créateur ou un projet éditorial : direction de la lumière, des fonds colorés et des poses pour mettre en valeur la collection. Vous pouvez voir le style de mes séances studio dans le portfolio.",
        ] },
        { titre: "Préparation et retouches", texte: [
          "Avant la séance, je vous dis combien de tenues prévoir, lesquelles, et quelles attitudes travailler. Les retouches sont adaptées à l'usage : naturelles pour des polas, plus travaillées pour un éditorial, au bon format pour le web, une agence ou l'impression.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte un book photo à Bordeaux ?", r: "Le prix dépend de la durée, du nombre de tenues et de photos retouchées. Envoyez-moi votre projet : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "Je débute dans le mannequinat, par quoi commencer ?", r: "Par des polas simples et naturels : c'est ce que les agences demandent en premier. Je vous guide pour les réaliser correctement." },
        { q: "Combien de tenues prévoir pour un book ?", r: "En général trois à cinq tenues selon la durée de la séance. On les choisit ensemble avant le shooting." },
        { q: "Les photos peuvent-elles servir pour une marque ?", r: "Oui, on définit l'usage dans le devis (réseaux, site, catalogue, impression) pour que les droits soient clairs." },
      ]}
    />
  );
}
