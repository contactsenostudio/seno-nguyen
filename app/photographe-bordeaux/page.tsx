import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { getTheme } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: { absolute: "Photographe Bordeaux · Portrait, mariage, entreprise | Seno Studio" },
  description: "Seno Nguyen, photographe à Bordeaux : portrait, shooting en studio, mariage, photos d'entreprise et d'immobilier. Photo et vidéo, devis gratuit sous 24 h.",
  alternates: { canonical: "/photographe-bordeaux" },
};

const pris = (id: string, n: number, pas = 1) => (getTheme(id)?.photos ?? []).filter((_, i) => i % pas === 0).slice(0, n);

export default function Page() {
  return (
    <PageLocale
      chemin="/photographe-bordeaux"
      nomService="Photographe à Bordeaux"
      surtitre="Photographe & Vidéaste · Bordeaux"
      titre="Photographe à Bordeaux"
      altPhotos="Photographe Bordeaux"
      intro={[
        "Je m'appelle Seno Nguyen, je suis photographe et vidéaste à Bordeaux. Portrait, shooting en studio, mariage, photos d'entreprise ou d'immobilier : je travaille avec des particuliers comme avec des professionnels, partout dans Bordeaux, la métropole et la Gironde.",
      ]}
      photos={[...pris("studio", 4, 9), ...pris("mariage", 4, 13), ...pris("entreprise", 2, 4), ...pris("immobilier", 2, 5)]}
      blocs={[
        { titre: "Un photographe à Bordeaux pour particuliers et professionnels", texte: [
          "Pour les particuliers : portraits, séances photo en studio ou en extérieur, couples, mariages. Pour les professionnels : portraits d'équipe, photos de vos locaux et de votre activité, photos immobilières pour mettre en valeur un bien.",
          "Je peux aussi filmer : une même journée peut donner des photos et une vidéo, avec un seul interlocuteur.",
        ] },
        { titre: "Une façon de travailler simple", texte: [
          "On commence par échanger sur ce dont vous avez besoin et sur l'usage des images (réseaux sociaux, site internet, impression, souvenir). Je vous propose ensuite un devis clair. Le jour J, je prends le temps de vous mettre à l'aise, même si vous n'aimez pas être pris en photo.",
          "Les photos sont retouchées une par une puis livrées dans une galerie en ligne, en haute définition, prêtes à être partagées ou imprimées.",
        ] },
        { titre: "Où je me déplace", texte: [
          "Bordeaux centre, Mérignac, Pessac, Talence, Bègles, Le Bouscat, Bruges, Lormont, Cenon et toute la métropole bordelaise, mais aussi le Bassin d'Arcachon, le Médoc, Saint-Émilion et le reste de la Gironde. Je me déplace également partout en France.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte un photographe à Bordeaux ?", r: "Le prix dépend du type de séance, de sa durée et du nombre de photos livrées. Envoyez-moi votre projet : je vous réponds sous 24 h avec un devis gratuit et détaillé." },
        { q: "Dans quels délais les photos sont-elles livrées ?", r: "Les délais dépendent de la prestation et vous sont donnés dans le devis. Je livre le plus vite possible, parce qu'une photo qui arrive trop tard ne sert plus à rien." },
        { q: "Faites-vous aussi de la vidéo ?", r: "Oui, je suis photographe et vidéaste. Je peux couvrir un même événement en photo et en vidéo." },
        { q: "Vous déplacez-vous en dehors de Bordeaux ?", r: "Oui : dans toute la Gironde (Mérignac, Pessac, Arcachon, Saint-Émilion…) et partout en France sur demande." },
      ]}
    />
  );
}
