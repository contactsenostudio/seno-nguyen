import type { Metadata } from "next";
import PageLocale from "@/components/PageLocale";
import { choisis } from "@/lib/portfolio";
import { PHOTOS_PRESTA, ILLUSTRATION_PRODUIT } from "@/lib/prestations-photos";

/* Page de référencement local (17/11/2026), générée avec le même gabarit que /photographe-bordeaux */
export const metadata: Metadata = {
  title: { absolute: "Photographe produit Bordeaux · Packshot, e-commerce | Seno Studio" },
  description: "Photographe produit et packshot à Bordeaux : fond blanc, fond couleur ou mise en scène, pour votre site e-commerce, vos réseaux et vos catalogues. Retouche et formats adaptés.",
  alternates: { canonical: "/photographe-produit-packshot-bordeaux" },
};

export default function Page() {
  return (
    <PageLocale
      chemin="/photographe-produit-packshot-bordeaux"
      nomService="Photographie de produits et packshot à Bordeaux"
      surtitre="Produits · Packshot · Bordeaux"
      titre="Photographe produit à Bordeaux"
      altPhotos="Photographe produit packshot Bordeaux"
      intro={[
        "Des photos de produits qui donnent envie d'acheter. Packshot sur fond blanc pour votre boutique en ligne, fond de couleur à votre charte ou mise en scène pour vos réseaux : je photographie vos produits à Bordeaux, en studio ou dans vos locaux.",
      ]}
      photos={[...ILLUSTRATION_PRODUIT, ...PHOTOS_PRESTA.produit]}
      note="Les photos de produits sur fond blanc et en mise en scène sont des images d’illustration libres de droits ; les photos de pièce montée, de fleurs et de table sont de Seno Studio."
      blocs={[
        { titre: "Packshot sur fond blanc", texte: [
          "Le format attendu par la plupart des sites e-commerce et des places de marché : un produit net, détouré, bien éclairé, avec des couleurs fidèles. Je réalise plusieurs angles (face, profil, détail, dos) pour que vos clients voient ce qu'ils achètent.",
        ] },
        { titre: "Mise en scène et ambiance", texte: [
          "Pour les réseaux sociaux, une campagne ou une page d'accueil : vos produits dans un décor imaginé ensemble, avec des matières, des couleurs et une lumière qui racontent votre marque. Restaurants, artisans, créateurs, caves et domaines viticoles, cosmétiques, mode, objets.",
        ] },
        { titre: "Fonds de couleur et charte graphique", texte: [
          "Fond noir, blanc ou de couleur selon votre identité visuelle, et fond vert si vous voulez intégrer un décor ou un logo ensuite. Les images restent cohérentes d'un produit à l'autre, ce qui donne un catalogue propre et professionnel.",
        ] },
        { titre: "Retouche et livraison", texte: [
          "Chaque photo est retouchée : poussières, reflets, couleurs, détourage. Je vous livre les fichiers au bon format pour chaque support (site, réseaux, impression), pour que vous n'ayez rien à refaire.",
        ] },
      ]}
      faq={[
        { q: "Combien coûte une photo de produit à Bordeaux ?", r: "Le tarif se fait sur devis selon le nombre de produits, d'angles et le type de fond. Envoyez-moi votre liste : je vous réponds sous 24 h." },
        { q: "Pouvez-vous venir photographier dans nos locaux ?", r: "Oui, j'installe un studio mobile sur place si vos produits sont nombreux ou difficiles à déplacer." },
        { q: "Les photos sont-elles adaptées à Amazon, Etsy ou Shopify ?", r: "Oui, je livre les formats et les fonds demandés par chaque plateforme." },
        { q: "Faites-vous aussi la vidéo de produit ?", r: "Oui, je suis aussi vidéaste : on peut ajouter de courtes vidéos pour vos réseaux." },
      ]}
    />
  );
}
