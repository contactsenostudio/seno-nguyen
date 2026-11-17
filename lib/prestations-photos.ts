/* Photos des pages de prestation (17/11/2026) : tirées de ses dossiers D: (Neva Nation, mariage alexis, i need more bullet,
   FASH LIGHT 3 ; aperçus pleine taille des .ARW), dans public/images/portfolio/prestations/<cat>/ */
import type { Photo } from "@/lib/portfolio";

export const PHOTOS_PRESTA: Record<string, Photo[]> = {
  famille: [
    { src: "/images/portfolio/prestations/famille/05474.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/famille/05499.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/famille/05523.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/famille/05572.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/famille/05934.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/famille/05487.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/famille/05450.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/famille/04042.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/famille/03886.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/famille/05366.jpg", w: 1800, h: 1200 },
  ],
  couple: [
    { src: "/images/portfolio/prestations/couple/05090.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/couple/05042.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/couple/04430.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/couple/05150.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/couple/05018.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/couple/04187.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/couple/05704.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/couple/f01884.jpg", w: 1200, h: 1800 },
  ],
  amis: [
    { src: "/images/portfolio/prestations/amis/b00635.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/amis/b00611.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/amis/m06114.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/amis/n00255.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/amis/n00337.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/amis/m05874.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/amis/n00269.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/amis/n00224.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/amis/b00671.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/amis/n00365.jpg", w: 1200, h: 1800 },
  ],
  evenement: [
    { src: "/images/portfolio/prestations/evenement/n00169.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/evenement/n00388.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/evenement/m06090.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/evenement/n00148.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/evenement/n00395.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/evenement/m06351.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/evenement/n00213.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/evenement/n00400.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/evenement/m06627.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/evenement/n00343.jpg", w: 1200, h: 1800 },
    { src: "/images/portfolio/prestations/evenement/n00359.jpg", w: 1200, h: 1800 },
  ],
  produit: [
    { src: "/images/portfolio/prestations/produit/m06459.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/produit/m05802.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/produit/m05994.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/produit/m05632.jpg", w: 1800, h: 1200 },
    { src: "/images/portfolio/prestations/produit/m05680.jpg", w: 1800, h: 1200 },
  ],
};

/* Photos d'illustration libres de droits (licence CC0, rawpixel via Openverse) pour la page produits, en attendant ses propres packshots ;
   la page l'indique sous la galerie. Sources : */
//   a9292161 : https://www.rawpixel.com/image/11524368/back-side-beard-oil-bottle
//   6f771373 : rawpixel.com (CC0)
//   09394b3d : https://www.rawpixel.com/image/5927231/photo-image-heart-public-domain-art
//   78d885e6 : https://www.rawpixel.com/image/3284572/free-photo-image-fashion-watch-cc0
//   10936c7c : https://www.rawpixel.com/image/3305481/free-photo-image-briefcase-leather-bag
//   d2f8c48d : https://www.rawpixel.com/image/5909126/photo-image-public-domain-brush-beauty
//   ace4c6bd : https://www.rawpixel.com/image/6020133/photo-image-public-domain-white-flower-free
//   37431be2 : https://www.rawpixel.com/image/11515764/photo-image-medicine-public-domain-table
export const ILLUSTRATION_PRODUIT: Photo[] = [
  { src: "/images/portfolio/prestations/illustration/a9292161.jpg", w: 1024, h: 683 },
  { src: "/images/portfolio/prestations/illustration/6f771373.jpg", w: 756, h: 1024 },
  { src: "/images/portfolio/prestations/illustration/09394b3d.jpg", w: 1024, h: 683 },
  { src: "/images/portfolio/prestations/illustration/78d885e6.jpg", w: 1024, h: 683 },
  { src: "/images/portfolio/prestations/illustration/10936c7c.jpg", w: 1024, h: 610 },
  { src: "/images/portfolio/prestations/illustration/d2f8c48d.jpg", w: 823, h: 1024 },
  { src: "/images/portfolio/prestations/illustration/ace4c6bd.jpg", w: 683, h: 1024 },
  { src: "/images/portfolio/prestations/illustration/37431be2.jpg", w: 1024, h: 683 },
];
