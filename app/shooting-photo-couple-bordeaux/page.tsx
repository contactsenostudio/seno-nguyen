import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { choisis } from "@/lib/portfolio";
import { PHOTOS_PRESTA } from "@/lib/prestations-photos";

/* Page de référencement local (17/11/2026), générée avec le même gabarit que /photographe-bordeaux */
export const metadata: Metadata = {
  title: { absolute: "Shooting photo couple Bordeaux · Love session | Seno Studio" },
  description: "Shooting photo couple et love session à Bordeaux, en studio ou en extérieur : fiançailles, anniversaire, save the date. Séance guidée et intime, photos retouchées en HD.",
  alternates: { canonical: "/shooting-photo-couple-bordeaux" },
};

export default function Page() {
  return (
    <PageLocale
      chemin="/shooting-photo-couple-bordeaux"
      nomService="Shooting photo couple à Bordeaux"
      surtitre="Love session · Bordeaux"
      titre="Shooting photo couple à Bordeaux"
      altPhotos="Shooting couple Bordeaux"
      intro={[
        "Une love session, c'est un moment rien qu'à vous deux, pour garder des images de votre histoire. Fiançailles, anniversaire de rencontre, save the date avant le mariage ou simplement l'envie de belles photos ensemble : je vous photographie à Bordeaux, en studio ou en extérieur.",
      ]}
      photos={[...choisis("mariage", ["dsc05045-edit"]), ...PHOTOS_PRESTA.couple, ...choisis("studio", ["dsc01092"])]}
      blocs={[
        { titre: "Des photos naturelles, pas des poses figées", texte: [
          "La plupart des couples me disent « on n'est pas à l'aise devant l'objectif ». C'est normal, et c'est mon travail de vous mettre à l'aise. Je vous propose des situations simples (marcher, se parler, rire d'un souvenir) plutôt que des poses compliquées. Le résultat : des images où l'on voit votre complicité, pas un couple qui attend la photo.",
        ] },
        { titre: "Les plus beaux lieux de Bordeaux pour une séance couple", texte: [
          "Le Miroir d'eau et les quais au coucher du soleil, les ruelles de Saint-Pierre, le pont de pierre, le Jardin public, les Chartrons, ou plus loin les vignes de Saint-Émilion et les plages du Bassin d'Arcachon. On peut aussi choisir un lieu qui a du sens pour vous : l'endroit de votre premier rendez-vous, votre quartier, votre maison.",
          "En studio, la lumière est maîtrisée et le rendu plus élégant, façon magazine, idéal en hiver ou pour des portraits plus intimes.",
        ] },
        { titre: "Pour quelles occasions ?", texte: [
          "Demande en mariage (je peux me cacher pour photographier le moment), fiançailles, save the date, anniversaire de couple, grossesse, cadeau de Saint-Valentin ou de Noël. Si vous préparez votre mariage, la séance couple est aussi une très bonne façon de se rencontrer avant le grand jour.",
        ] },
        { titre: "Après la séance", texte: [
          "Je sélectionne et retouche les meilleures photos une par une, puis je vous les livre en haute définition dans une galerie en ligne privée. Elles sont prêtes à être imprimées, encadrées ou utilisées pour vos faire-part.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte un shooting photo couple à Bordeaux ?", r: "Le tarif dépend de la durée, du lieu et du nombre de photos retouchées. Envoyez-moi vos envies : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "On n'est pas photogéniques, est-ce que ça va marcher ?", r: "Oui. Je vous guide en permanence avec des situations simples : vous n'avez pas à savoir poser. La plupart des couples oublient l'appareil au bout de dix minutes." },
        { q: "Pouvez-vous photographier une demande en mariage surprise ?", r: "Oui, on organise ensemble le lieu et le moment ; je reste discret jusqu'à la grande question." },
        { q: "Peut-on offrir une love session ?", r: "Oui, c'est un cadeau très apprécié pour un anniversaire, la Saint-Valentin ou Noël. Contactez-moi pour l'organiser." },
      ]}
    />
  );
}
