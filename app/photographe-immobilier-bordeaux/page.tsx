import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { choisis } from "@/lib/portfolio";

/* Page de référencement local (17/11/2026), générée avec le même gabarit que /photographe-bordeaux */
export const metadata: Metadata = {
  title: { absolute: "Photographe immobilier Bordeaux · Photos HDR pour agences et Airbnb | Seno Studio" },
  description: "Photographe immobilier à Bordeaux et en Gironde : photos HDR lumineuses pour agences, notaires, promoteurs, Airbnb et hôtels. Livraison rapide, prêtes pour les annonces.",
  alternates: { canonical: "/photographe-immobilier-bordeaux" },
  openGraph: { title: "Photographe immobilier Bordeaux · Photos HDR pour agences et Airbnb | Seno Studio", description: "Photographe immobilier à Bordeaux et en Gironde : photos HDR lumineuses pour agences, notaires, promoteurs, Airbnb et hôtels. Livraison rapide, prêtes pour les annonces.", url: "/photographe-immobilier-bordeaux", type: "website", locale: "fr_FR", siteName: "Seno Studio" },
};

export default function Page() {
  return (
    <PageLocale
      chemin="/photographe-immobilier-bordeaux"
      nomService="Photographe immobilier à Bordeaux"
      surtitre="Immobilier & architecture · Bordeaux"
      titre="Photographe immobilier à Bordeaux"
      altPhotos="Photographe immobilier Bordeaux"
      intro={[
        "Des photos immobilières lumineuses et fidèles, qui donnent envie de visiter. Je photographie appartements, maisons, locaux et biens d'exception à Bordeaux et dans toute la Gironde, pour les agences, les particuliers, les locations saisonnières et les hôtels.",
      ]}
      photos={[...choisis("immobilier", ["dsc06929-hdr","dsc06942","dsc06947-hdr","dsc06954","dsc06962-hdr","dsc06968-hdr","dsc06974-hdr","dsc06980-hdr","dsc07016-hdr","dsc07034-hdr","dsc07058-hdr","dsc07076-hdr"])]}
      blocs={[
        { titre: "Des photos qui font vendre et louer", texte: [
          "Une annonce avec de belles photos est vue plus souvent et génère plus de visites. Je travaille au grand angle, sans déformer les pièces, avec des lignes bien droites et une lumière naturelle. Chaque pièce est photographiée sous le meilleur angle pour montrer son volume et sa circulation.",
        ] },
        { titre: "La technique HDR", texte: [
          "Pour garder à la fois l'intérieur bien éclairé et la vue par la fenêtre, je fusionne plusieurs expositions (HDR). Le rendu reste naturel : pas de couleurs criardes, pas de ciel artificiel, des blancs propres.",
        ] },
        { titre: "Pour qui ?", texte: [
          "Agences immobilières, mandataires, notaires, promoteurs, architectes et décorateurs d'intérieur, propriétaires Airbnb et gîtes, hôtels, restaurants et commerces qui veulent mettre en valeur leurs lieux.",
        ] },
        { titre: "Organisation et livraison", texte: [
          "On fixe un créneau, idéalement quand la lumière est la plus belle. Je vous envoie une petite liste pour préparer le bien (ranger, allumer les lumières, ouvrir les volets). Les photos retouchées sont livrées rapidement, au bon format pour les portails d'annonces et votre site.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte un photographe immobilier à Bordeaux ?", r: "Le tarif dépend de la surface, du nombre de photos et du délai. Envoyez-moi l'adresse et le type de bien : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "En combien de temps les photos sont-elles livrées ?", r: "Rapidement, pour que l'annonce puisse être publiée sans attendre. Le délai précis est indiqué dans le devis." },
        { q: "Faites-vous des vidéos de visite ?", r: "Oui, je suis aussi vidéaste : une courte vidéo de visite peut compléter les photos pour les réseaux sociaux." },
        { q: "Intervenez-vous hors de Bordeaux ?", r: "Oui, dans toute la Gironde : Mérignac, Pessac, le Bassin d'Arcachon, le Médoc, Saint-Émilion…" },
      ]}
    />
  );
}
