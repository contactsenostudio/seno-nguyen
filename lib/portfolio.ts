/* Catalogue du portfolio : catégories, vignettes et photos (avec dimensions réelles) */

export interface Photo { src: string; w: number; h: number; }
export interface Theme {
  id: string;
  title: string;
  short: string;
  cover: string;
  coverPos?: string;
  photos: Photo[];
}

export const THEMES: Theme[] = [
  {
    id: "mariage", title: "Mariage", short: "Mariage",
    cover: "/images/wedding-couple.jpg", coverPos: "center 30%",
    photos: [
      { src: "/images/hero-maries.jpg",      w: 1920, h: 1281 },
      { src: "/images/wedding-couple.jpg",   w: 1200, h: 1800 },
      { src: "/images/wedding-dance.jpg",    w: 1200, h: 801  },
      { src: "/images/wedding-ceremony.jpg", w: 1200, h: 801  },
      { src: "/images/wedding-bride.jpg",    w: 1200, h: 1800 },
      { src: "/images/hero-maries2.jpg",     w: 1920, h: 1280 },
      { src: "/images/wedding-rings.jpg",    w: 900,  h: 600  },
      { src: "/images/wedding-flowers.jpg",  w: 900,  h: 1350 },
      { src: "/images/hero-maries4.jpg",     w: 1920, h: 2880 },
      { src: "/images/wedding-laugh.jpg",    w: 900,  h: 600  },
      { src: "/images/wedding-portrait.jpg", w: 1200, h: 800  },
      { src: "/images/hero-4k-2.jpg",        w: 3840, h: 2563 },
      { src: "/images/wedding-venue.jpg",    w: 900,  h: 600  },
      { src: "/images/wedding-hero.jpg",     w: 1920, h: 1280 },
    ],
  },
  {
    id: "portrait", title: "Portrait & Lifestyle", short: "Portrait",
    cover: "/images/theme-portrait.jpg", coverPos: "center 25%",
    photos: [
      { src: "/images/theme-portrait.jpg", w: 1600, h: 2000 },
      { src: "/images/A7409729.jpg",       w: 4672, h: 2739 },
      { src: "/images/hero-4k-7.jpg",      w: 3840, h: 5760 },
      { src: "/images/photographer.jpg",   w: 800,  h: 533  },
    ],
  },
  {
    id: "mode", title: "Mode & Marque", short: "Mode",
    cover: "/images/theme-mode.jpg",
    photos: [
      { src: "/images/theme-mode.jpg", w: 900,  h: 600  },
      { src: "/images/LOANE%202.jpg",  w: 5010, h: 6262 },
      { src: "/images/hero-4k-4.jpg",  w: 3840, h: 2560 },
    ],
  },
  {
    id: "gastronomie", title: "Gastronomie & Restauration", short: "Gastronomie",
    cover: "/images/theme-gastronomie.jpg",
    photos: [
      { src: "/images/theme-gastronomie.jpg", w: 900,  h: 600  },
      { src: "/images/hero-4k-14.jpg",        w: 3840, h: 5759 },
    ],
  },
  {
    id: "immobilier", title: "Immobilier & Architecture", short: "Immobilier",
    cover: "/images/theme-immobilier.jpg",
    photos: [
      { src: "/images/theme-immobilier.jpg", w: 900,  h: 600  },
      { src: "/images/entreprise.jpg",       w: 3840, h: 2563 },
      { src: "/images/hero-new.jpg",         w: 1920, h: 2880 },
    ],
  },
  {
    id: "evenement", title: "Événementiel & Entreprise", short: "Événementiel",
    cover: "/images/theme-evenement.jpg",
    photos: [
      { src: "/images/theme-evenement.jpg", w: 900,  h: 600  },
      { src: "/images/DSC00306.jpg",        w: 4672, h: 7008 },
      { src: "/images/magazine.jpg",        w: 900,  h: 600  },
      { src: "/images/A7409829.jpg",        w: 4020, h: 2064 },
    ],
  },
  {
    id: "sport", title: "Sport & Outdoor", short: "Sport",
    cover: "/images/theme-sport.jpg",
    photos: [
      { src: "/images/theme-sport.jpg", w: 1600, h: 1067 },
      { src: "/images/hero-4k-3.jpg",   w: 3840, h: 2560 },
      { src: "/images/hero-4k-10.jpg",  w: 3840, h: 2560 },
    ],
  },
  {
    id: "famille", title: "Famille & Naissance", short: "Famille",
    cover: "/images/theme-famille.jpg",
    photos: [
      { src: "/images/theme-famille.jpg", w: 900, h: 600 },
    ],
  },
  {
    id: "vin", title: "Vin & Terroir", short: "Vin",
    cover: "/images/theme-vin.jpg",
    photos: [
      { src: "/images/theme-vin.jpg",  w: 900,  h: 600  },
      { src: "/images/hero-4k-6.jpg",  w: 3840, h: 2560 },
    ],
  },
];

export const getTheme = (id: string) => THEMES.find(t => t.id === id);
