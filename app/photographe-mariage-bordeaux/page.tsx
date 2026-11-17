import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { getTheme } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: { absolute: "Photographe mariage Bordeaux & Gironde · Photo et vidéo | Seno Studio" },
  description: "Photographe et vidéaste de mariage à Bordeaux et en Gironde : reportage photo naturel, film de mariage, des préparatifs à la soirée. Devis gratuit sous 24 h.",
  alternates: { canonical: "/photographe-mariage-bordeaux" },
  openGraph: { title: "Photographe mariage Bordeaux & Gironde · Photo et vidéo | Seno Studio", description: "Photographe et vidéaste de mariage à Bordeaux et en Gironde : reportage photo naturel, film de mariage, des préparatifs à la soirée. Devis gratuit sous 24 h.", url: "/photographe-mariage-bordeaux", type: "website", locale: "fr_FR", siteName: "Seno Studio" },
};


export default function Page() {
  return (
    <PageLocale
      chemin="/photographe-mariage-bordeaux"
      nomService="Photographe de mariage à Bordeaux"
      surtitre="Photographe & Vidéaste mariage · Gironde"
      titre="Photographe mariage à Bordeaux"
      altPhotos="Photographe mariage Bordeaux"
      intro={[
        "Photographe et vidéaste de mariage à Bordeaux et en Gironde, je raconte votre journée telle qu'elle a été : des émotions vraies, une lumière naturelle, et des images que vous aurez envie de regarder dans vingt ans.",
      ]}
      photos={getTheme("mariage")?.photos ?? []}
      blocs={[
        { titre: "Un reportage de mariage naturel", texte: [
          "Je préfère un moment qui existe à une mise en scène qui fait catalogue. Pendant la journée, je me fais discret pour capter les regards, les rires et les larmes ; pour les photos de couple et de groupe, je vous guide simplement pour que tout reste fluide.",
        ] },
        { titre: "Photo et vidéo de mariage", texte: [
          "Je suis à la fois photographe et vidéaste : je peux réaliser votre reportage photo, votre film de mariage, ou les deux. Un seul interlocuteur, un même regard sur toute la journée.",
        ] },
        { titre: "Votre mariage, étape par étape", texte: [
          "Les préparatifs, la cérémonie civile, laïque ou religieuse, le vin d'honneur, la séance photo de couple, les photos de groupe, l'entrée en salle, les discours, la première danse et la soirée : on définit ensemble ce que je couvre selon votre programme.",
          "Avant le mariage, on fait le point sur le déroulé, les lieux et les personnes importantes. Après, je retouche chaque photo et je vous livre une galerie en ligne privée, facile à partager avec vos invités.",
        ] },
        { titre: "Mariages en Gironde et ailleurs", texte: [
          "Bordeaux, les châteaux du Médoc et de Saint-Émilion, l'Entre-deux-Mers, le Bassin d'Arcachon, le Cap Ferret, Mérignac, Pessac, Libourne… Je me déplace dans toute la Gironde, en Nouvelle-Aquitaine et partout en France.",
        ] },
      ]}
      faq={[
        { q: "Quel est le prix d'un photographe de mariage à Bordeaux ?", r: "Le prix dépend de la durée de présence, de la formule (photo, vidéo ou les deux) et du lieu. Envoyez-moi la date et le lieu de votre mariage : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "Combien de temps à l'avance faut-il réserver ?", r: "Les dates de mai à septembre partent vite : contactez-moi dès que vous avez votre date et votre lieu pour vérifier ma disponibilité." },
        { q: "Proposez-vous photo et vidéo ensemble ?", r: "Oui, je suis photographe et vidéaste de mariage : vous pouvez réserver le reportage photo, le film, ou les deux." },
        { q: "Comment les photos sont-elles livrées ?", r: "Dans une galerie en ligne privée, en haute définition, retouchées une par une, prêtes à être téléchargées, partagées et imprimées." },
        { q: "Vous déplacez-vous dans les châteaux du Bordelais ?", r: "Oui, dans toute la Gironde (Médoc, Saint-Émilion, Entre-deux-Mers, Bassin d'Arcachon) et partout en France." },
      ]}
    />
  );
}
