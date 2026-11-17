import type { Metadata } from "next";
import { Geist, Instrument_Serif, Nunito } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import { PAGES_LOCALES } from "@/components/LiensLocaux";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  style: ["normal", "italic"],
  weight: "400",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-nunito",
});

const siteUrl = "https://www.senostudio.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Photographe Bordeaux · Mariage, shooting studio, portrait | Seno Studio",
    template: "%s | Seno Studio",
  },
  description: "Seno Studio, photographe et vidéaste à Bordeaux : photographe mariage, shooting photo en studio ou en extérieur, portrait, entreprise et immobilier en Gironde. Devis gratuit sous 24h.",
  // (09/11/2026) plus de canonical ici : posé dans le layout, il désignait l'accueil pour TOUTES les pages (Google ignorait le reste du site) ; chaque page a le sien
  authors: [{ name: "Seno Nguyen" }],
  creator: "Seno Studio",
  openGraph: {
    title: "Photographe Bordeaux · Mariage, shooting studio | Seno Studio",
    description: "Photographe et vidéaste à Bordeaux : mariage, shooting studio, portrait, entreprise. Devis gratuit sous 24h.",
    type: "website",
    url: siteUrl,
    locale: "fr_FR",
    siteName: "Seno Studio",
    images: [{ url: "/images/portfolio/mariage/dsc05045-edit.jpg", width: 1200, height: 630, alt: "Seno Studio — Photographe Mariage Gironde" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seno Studio — Photographe Mariage Gironde & Bordeaux",
    description: "Photographe et vidéaste à Bordeaux : mariage, shooting studio, portrait, entreprise. Devis gratuit sous 24h.",
    images: ["/images/portfolio/mariage/dsc05045-edit.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#seno-studio`,
  name: "Seno Studio",
  description: "Seno Studio (Seno Nguyen), photographe et vidéaste à Bordeaux : mariage, famille, couple et love session, shooting entre amis, mode et book, portrait professionnel, entreprise, immobilier, produits et packshot, événementiel. Bordeaux, Gironde et partout en France.",
  knowsAbout: ["Photographie de mariage", "Photographie de famille", "Shooting couple", "Book mannequin", "Portrait professionnel", "Photographie d'entreprise", "Photographie immobilière", "Packshot", "Photographie événementielle", "Vidéo"],
  founder: { "@type": "Person", name: "Seno Nguyen", jobTitle: "Photographe et vidéaste" },
  url: siteUrl,
  telephone: "+33768868505",
  email: "contact.senostudio@gmail.com",
  image: `${siteUrl}/images/portfolio/mariage/dsc05045-edit.jpg`,
  priceRange: "€€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Virement, Chèque, Espèces",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bordeaux",
    addressRegion: "Gironde",
    postalCode: "33000",
    addressCountry: "FR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 44.8378, longitude: -0.5792 },
  areaServed: [
    { "@type": "City", name: "Bordeaux" },
    { "@type": "AdministrativeArea", name: "Gironde" },
    { "@type": "City", name: "Mérignac" },
    { "@type": "City", name: "Arcachon" },
    { "@type": "City", name: "Biarritz" },
    { "@type": "City", name: "Périgueux" },
    { "@type": "Country", name: "France" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations photo et vidéo à Bordeaux",
    itemListElement: PAGES_LOCALES.map(p => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p.label, url: `${siteUrl}${p.href}`, areaServed: "Bordeaux" } })),
  },
  sameAs: [
    "https://www.instagram.com/seno_std/",
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "09:00",
    closes: "20:00",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${geist.variable} ${instrumentSerif.variable} ${nunito.variable}`}>
      <head>
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
