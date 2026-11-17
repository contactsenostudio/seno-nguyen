import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { choisis } from "@/lib/portfolio";
import { PHOTOS_PRESTA } from "@/lib/prestations-photos";

/* Page de référencement local (17/11/2026), générée avec le même gabarit que /photographe-bordeaux */
export const metadata: Metadata = {
  title: { absolute: "Shooting photo entre amis ou seul(e) à Bordeaux | Seno Studio" },
  description: "Shooting photo seul(e) ou entre amis à Bordeaux, en studio ou en ville : une expérience fun et guidée, des photos uniques retouchées en HD. Idéal en cadeau. Devis sous 24 h.",
  alternates: { canonical: "/shooting-photo-entre-amis-bordeaux" },
};

export default function Page() {
  return (
    <PageLocale
      chemin="/shooting-photo-entre-amis-bordeaux"
      nomService="Shooting photo entre amis à Bordeaux"
      surtitre="Seul(e) ou entre amis · Bordeaux"
      titre="Shooting photo entre amis à Bordeaux"
      altPhotos="Shooting photo entre amis Bordeaux"
      intro={[
        "Envie de vivre une vraie séance photo, seul(e) ou avec vos ami(e)s ? Un shooting à Bordeaux, en studio ou dans les rues de la ville, pour s'amuser devant l'objectif et repartir avec des photos qui ont du style.",
      ]}
      photos={[...PHOTOS_PRESTA.amis, ...choisis("studio", ["dsc02431-2", "dsc00787-edit-3"])]}
      blocs={[
        { titre: "Une expérience avant tout", texte: [
          "Un shooting entre amis, ce n'est pas une séance sérieuse et figée : on met de la musique, on essaie des poses, des tenues, des idées un peu folles. Je vous dirige pour que chaque photo soit réussie, mais l'ambiance reste celle d'un bon moment passé ensemble.",
          "Seul(e), c'est l'occasion de se voir autrement : nouvelle photo de profil, photos pour Instagram, ou simplement se faire plaisir.",
        ] },
        { titre: "En studio ou en ville", texte: [
          "En studio : fonds colorés ou blancs, lumière travaillée, rendu éditorial comme dans un magazine. En ville : les quais, le Miroir d'eau, Saint-Pierre, les Chartrons, Darwin, ou les néons de Bordeaux la nuit. On choisit ensemble le décor qui colle à votre style.",
        ] },
        { titre: "Pour quelles occasions ?", texte: [
          "Un anniversaire, un enterrement de vie de jeune fille ou de garçon, des retrouvailles, un cadeau original, un départ à l'étranger, ou juste l'envie de garder une trace de votre bande d'amis.",
        ] },
        { titre: "Après la séance", texte: [
          "Je retouche les meilleures images et je vous les livre en haute définition dans une galerie en ligne, à partager avec tout le groupe. Elles sont prêtes pour les réseaux sociaux comme pour l'impression.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte un shooting photo entre amis à Bordeaux ?", r: "Le prix dépend du nombre de personnes, de la durée et du lieu. Dites-moi combien vous êtes et ce que vous voulez : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "Combien de personnes peuvent participer ?", r: "De une à plusieurs personnes : on adapte le lieu et la durée à la taille du groupe." },
        { q: "Peut-on apporter plusieurs tenues ?", r: "Oui, c'est même conseillé : deux ou trois tenues donnent des images très différentes. On en parle avant la séance." },
        { q: "Peut-on offrir un shooting photo à un(e) ami(e) ?", r: "Oui, contactez-moi pour organiser une séance à offrir." },
      ]}
    />
  );
}
