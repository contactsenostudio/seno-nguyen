import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { getTheme } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: { absolute: "Shooting photo Bordeaux · Shooting studio, portrait, couple | Seno Studio" },
  description: "Shooting photo à Bordeaux en studio ou en extérieur : portrait, mode, couple, book, photo professionnelle. Séance guidée, photos retouchées, devis gratuit sous 24 h.",
  alternates: { canonical: "/shooting-photo-bordeaux" },
};

const pris = (id: string, n: number, pas = 1) => (getTheme(id)?.photos ?? []).filter((_, i) => i % pas === 0).slice(0, n);

export default function Page() {
  return (
    <PageLocale
      chemin="/shooting-photo-bordeaux"
      nomService="Shooting photo à Bordeaux"
      surtitre="Shooting studio & extérieur · Bordeaux"
      titre="Shooting photo à Bordeaux"
      altPhotos="Shooting photo studio Bordeaux"
      intro={[
        "Un shooting photo à Bordeaux, en studio ou en extérieur, pour vous, votre couple, votre book ou votre image professionnelle. Je vous guide du début à la fin : pas besoin de savoir poser.",
      ]}
      photos={[...pris("studio", 10, 6), ...pris("portrait", 2, 3)]}
      blocs={[
        { titre: "Le shooting en studio", texte: [
          "Le studio permet une lumière maîtrisée, un fond neutre et un rendu net et élégant : idéal pour un portrait, un book mannequin, une photo de profil professionnelle, une séance mode ou des photos pour vos réseaux sociaux.",
          "On choisit ensemble l'ambiance (fond, lumière douce ou contrastée, noir et blanc ou couleur) et les tenues avant la séance.",
        ] },
        { titre: "Le shooting en extérieur dans Bordeaux", texte: [
          "Les quais, le Miroir d'eau, les ruelles de Saint-Pierre, le Jardin public, les Chartrons ou Darwin : Bordeaux offre des décors naturels magnifiques. La lumière du jour donne des images vivantes, parfaites pour un portrait, un couple ou une séance lifestyle.",
        ] },
        { titre: "Pour qui ?", texte: [
          "Portrait individuel, couple, grossesse, famille, book mannequin ou comédien, photo de profil LinkedIn, entrepreneurs et indépendants qui veulent des images à leur image, créateurs de contenu. Un shooting peut aussi être offert en cadeau.",
        ] },
        { titre: "Comment se passe une séance", texte: [
          "Avant : on échange sur vos envies, le lieu et les tenues. Pendant : je vous dirige pas à pas, dans une ambiance détendue. Après : je sélectionne et retouche les meilleures images, puis je vous les livre en haute définition dans une galerie en ligne.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte un shooting photo à Bordeaux ?", r: "Le tarif dépend de la durée, du lieu (studio ou extérieur) et du nombre de photos retouchées. Envoyez-moi votre projet : je vous réponds sous 24 h avec un devis gratuit." },
        { q: "Je ne suis pas à l'aise devant l'objectif, est-ce un problème ?", r: "Pas du tout, c'est le cas de la plupart des gens. Je vous guide sur chaque pose et je prends le temps qu'il faut pour que vous soyez détendu." },
        { q: "Combien de tenues puis-je prévoir ?", r: "On en parle avant la séance selon sa durée ; en général deux ou trois tenues permettent d'avoir des images variées." },
        { q: "Peut-on offrir un shooting photo ?", r: "Oui, contactez-moi pour organiser une séance à offrir (anniversaire, couple, future maman…)." },
      ]}
    />
  );
}
