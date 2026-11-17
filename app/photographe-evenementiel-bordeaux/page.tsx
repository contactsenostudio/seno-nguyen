import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { choisis } from "@/lib/portfolio";
import { PHOTOS_PRESTA } from "@/lib/prestations-photos";

/* Page de référencement local (17/11/2026), générée avec le même gabarit que /photographe-bordeaux */
export const metadata: Metadata = {
  title: { absolute: "Photographe événementiel Bordeaux · Soirée, séminaire, anniversaire | Seno Studio" },
  description: "Photographe événementiel à Bordeaux : soirées d'entreprise, séminaires, conférences, lancements, anniversaires et fêtes privées. Reportage discret, photo et vidéo, livraison rapide.",
  alternates: { canonical: "/photographe-evenementiel-bordeaux" },
};

export default function Page() {
  return (
    <PageLocale
      chemin="/photographe-evenementiel-bordeaux"
      nomService="Photographe événementiel à Bordeaux"
      surtitre="Événements pros & privés · Bordeaux"
      titre="Photographe événementiel à Bordeaux"
      altPhotos="Photographe événementiel Bordeaux"
      intro={[
        "Soirée d'entreprise, séminaire, conférence, inauguration, anniversaire ou fête de famille : je photographie votre événement à Bordeaux et en Gironde pour que vous puissiez en profiter sans vous soucier des photos.",
      ]}
      photos={[...PHOTOS_PRESTA.evenement, ...choisis("mariage", ["dsc06511"])]}
      blocs={[
        { titre: "Événements professionnels", texte: [
          "Séminaires, conférences, salons, lancements de produit, soirées clients ou d'équipe : je couvre les temps forts (prises de parole, échanges, ambiance), les portraits des intervenants et les photos de groupe. Des images utiles pour votre communication interne, vos réseaux, la presse et votre prochain événement.",
        ] },
        { titre: "Événements privés", texte: [
          "Anniversaires, baptêmes, communions, bar et bat-mitsva, fêtes de famille, soirées : je capte l'ambiance, les émotions et les détails, sans déranger. Vous gardez des souvenirs de tout le monde, pas seulement de ceux qui ont pensé à sortir leur téléphone.",
        ] },
        { titre: "Discret et organisé", texte: [
          "On prépare ensemble le déroulé : les horaires, les moments à ne pas manquer, les personnes importantes, les photos de groupe souhaitées. Le jour J, je reste discret et je m'adapte au rythme de l'événement, en salle comme en extérieur, de jour comme de nuit.",
        ] },
        { titre: "Photo, vidéo et livraison rapide", texte: [
          "Je peux couvrir le même événement en photo et en vidéo. Je trie et retouche les meilleures images, puis je vous les livre dans une galerie en ligne à partager avec vos invités ou vos équipes. Si vous voulez communiquer à chaud, je peux envoyer une première sélection très rapidement.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte un photographe pour un événement à Bordeaux ?", r: "Le prix dépend de la durée de présence, du nombre de photos et de la vidéo éventuelle. Envoyez-moi la date et le programme : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "Pouvez-vous livrer des photos le soir même ?", r: "Oui, sur demande, une première sélection peut être livrée rapidement pour vos réseaux ; le reste suit dans la galerie complète." },
        { q: "Vous déplacez-vous en dehors de Bordeaux ?", r: "Oui, dans toute la Gironde (Mérignac, Pessac, Arcachon, Saint-Émilion, châteaux du Médoc…) et ailleurs sur demande." },
        { q: "Faites-vous aussi les mariages ?", r: "Oui, voir ma page photographe de mariage à Bordeaux." },
      ]}
    />
  );
}
