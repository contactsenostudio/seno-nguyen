import type { Metadata } from "next";
import { Geist, Instrument_Serif, Nunito } from "next/font/google";
import "./globals.css";

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
    default: "Seno Studio — Photographe Mariage Gironde & Bordeaux | Vidéaste 4K",
    template: "%s | Seno Studio — Photographe Mariage Gironde",
  },
  description: "Seno Studio, photographe et vidéaste mariage en Gironde et Bordeaux. Reportage photo, film cinématique 4K, disponible partout en France. Devis gratuit sous 24h.",
  keywords: [
    "photographe mariage Gironde",
    "photographe mariage Bordeaux",
    "meilleur photographe mariage Gironde",
    "photographe mariage Bordeaux pas cher",
    "vidéaste mariage Gironde",
    "film mariage cinématique Bordeaux",
    "photographe mariage Mérignac",
    "photographe mariage Arcachon",
    "photographe mariage Bassin d'Arcachon",
    "photographe mariage Biarritz",
    "photographe mariage Périgueux",
    "photographe mariage Dordogne",
    "photographe professionnel Gironde",
    "shooting photo Bordeaux",
    "reportage photo mariage France",
  ],
  authors: [{ name: "Seno Studio" }],
  creator: "Seno Studio",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Seno Studio — Photographe Mariage Gironde & Bordeaux",
    description: "Photographe et vidéaste mariage en Gironde. Films 4K cinématiques, reportage photo. Disponible partout en France. Devis gratuit.",
    type: "website",
    url: siteUrl,
    locale: "fr_FR",
    siteName: "Seno Studio",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Seno Studio — Photographe Mariage Gironde" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seno Studio — Photographe Mariage Gironde & Bordeaux",
    description: "Photographe et vidéaste mariage en Gironde. Films 4K cinématiques. Devis gratuit sous 24h.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Seno Studio",
  description: "Photographe et vidéaste mariage en Gironde et Bordeaux. Reportage photo, film cinématique 4K, disponible partout en France.",
  url: siteUrl,
  telephone: "+33768868505",
  email: "contact.senostudio@gmail.com",
  image: `${siteUrl}/images/hero.jpg`,
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
    name: "Prestations photo & vidéo mariage",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reportage photo mariage Gironde" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Film cinématique mariage 4K" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shooting portrait & lifestyle" } },
    ],
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
    <html lang="fr" className={`${geist.variable} ${instrumentSerif.variable} ${nunito.variable}`}>
      <head>
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
