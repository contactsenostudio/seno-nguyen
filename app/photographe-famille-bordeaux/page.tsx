import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { choisis } from "@/lib/portfolio";
import { PHOTOS_PRESTA } from "@/lib/prestations-photos";

/* Page de référencement local (17/11/2026), générée avec le même gabarit que /photographe-bordeaux */
export const metadata: Metadata = {
  title: { absolute: "Photographe famille Bordeaux · Séance photo en famille | Seno Studio" },
  description: "Séance photo famille à Bordeaux, en studio, dans un parc ou chez vous : parents, enfants, grands-parents. Une séance détendue et guidée, photos retouchées en HD. Devis sous 24 h.",
  alternates: { canonical: "/photographe-famille-bordeaux" },
};

export default function Page() {
  return (
    <PageLocale
      chemin="/photographe-famille-bordeaux"
      nomService="Séance photo famille à Bordeaux"
      surtitre="Séance photo en famille · Bordeaux"
      titre="Photographe famille à Bordeaux"
      altPhotos="Photographe famille Bordeaux"
      intro={[
        "Une séance photo en famille, c'est un moment passé ensemble dont il reste de belles images. Parents, enfants, grands-parents, frères et sœurs, et même le chien : je vous photographie à Bordeaux, en studio, dans un parc ou chez vous, dans une ambiance simple et détendue.",
      ]}
      photos={[...choisis("mariage", ["dsc04880"]), ...PHOTOS_PRESTA.famille]}
      blocs={[
        { titre: "Des photos de famille qui vous ressemblent", texte: [
          "Je ne cherche pas la photo figée où tout le monde regarde l'objectif en souriant. Je cherche les vrais moments : un fou rire, un regard entre deux frères, un enfant sur les épaules de son père. Je propose quelques photos posées pour le souvenir de groupe, puis je laisse la place au naturel.",
          "Les enfants n'ont pas besoin de « savoir poser » : je transforme la séance en jeu, je vais à leur rythme et je fais des pauses quand il faut.",
        ] },
        { titre: "Où faire votre séance photo famille à Bordeaux", texte: [
          "En extérieur : le Jardin public, le parc Bordelais, le parc de Majolan à Blanquefort, les quais au coucher du soleil, ou un lieu qui compte pour vous. Je vous conseille le bon endroit et la bonne heure selon la saison pour avoir une belle lumière.",
          "En studio : un fond neutre et une lumière maîtrisée pour des portraits de famille élégants, quelle que soit la météo. Chez vous : pour garder la trace de votre maison et de votre quotidien, idéal avec un nouveau-né.",
        ] },
        { titre: "Pour quelles occasions ?", texte: [
          "Une naissance, une grossesse, un anniversaire, une réunion de famille avec les grands-parents, un départ, ou simplement l'envie d'avoir enfin des photos où toute la famille est réunie (y compris celui qui prend d'habitude les photos). La séance peut aussi s'offrir en cadeau.",
        ] },
        { titre: "Comment se passe la séance", texte: [
          "Avant : on échange sur vos envies, le lieu, le nombre de personnes et les tenues (je vous conseille des couleurs qui vont bien ensemble). Pendant : je vous guide du début à la fin, sans stress. Après : je trie et retouche les meilleures photos, puis je vous les livre en haute définition dans une galerie en ligne privée, facile à partager avec toute la famille.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte une séance photo famille à Bordeaux ?", r: "Le prix dépend de la durée, du lieu et du nombre de photos retouchées. Écrivez-moi avec le nombre de personnes et vos envies : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "Mes enfants ne tiennent pas en place, est-ce un problème ?", r: "Non, c'est normal. Je m'adapte à leur rythme, je joue avec eux et je photographie ces moments-là : ce sont souvent les plus belles photos." },
        { q: "Comment s'habiller pour une séance photo en famille ?", r: "Choisissez deux ou trois couleurs qui s'accordent, sans gros logos ni motifs trop chargés. Je vous envoie des conseils avant la séance." },
        { q: "Peut-on offrir une séance photo famille ?", r: "Oui, contactez-moi pour organiser une séance à offrir à vos parents, à un couple qui vient d'avoir un bébé ou à toute la famille." },
      ]}
    />
  );
}
