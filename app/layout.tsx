import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.senostudio.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Seno Studio — Photographe & Vidéaste Mariage Bordeaux",
    template: "%s | Seno Studio",
  },
  description:
    "Seno Studio, photographe et vidéaste mariage à Bordeaux et Gironde. Films cinématiques 4K, reportages photo, Magazine Box et drone. Disponible partout en France. Réponse sous 24h.",
  keywords: [
    "photographe mariage Bordeaux",
    "vidéaste mariage Bordeaux",
    "photographe mariage Gironde",
    "photographe mariage France",
    "film cinématique mariage",
    "reportage photo mariage Bordeaux",
    "photographe mariage Mérignac",
    "photographe mariage Pessac",
    "photographe mariage Arcachon",
    "photographe mariage Biarritz",
    "photographe mariage Bayonne",
    "photographe mariage Pau",
    "photographe mariage Périgueux",
    "photographe mariage Bergerac",
    "photographe mariage Agen",
    "drone mariage Bordeaux",
    "Magazine Box mariage",
    "album QR code mariage",
    "Seno Studio photographe",
    "photographe mariage cinématique",
    "vidéaste mariage 4K",
    "shooting engagement Bordeaux",
    "photographe corporate Bordeaux",
  ],
  authors: [{ name: "Seno Studio" }],
  creator: "Seno Studio",
  publisher: "Seno Studio",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Seno Studio — Photographe & Vidéaste Mariage Bordeaux",
    description: "Films cinématiques 4K et reportages photo de mariage à Bordeaux. Magazine Box, drone, shooting engagement. Disponible partout en France.",
    type: "website",
    url: siteUrl,
    locale: "fr_FR",
    siteName: "Seno Studio",
    images: [{ url: "/images/hero-4k-6.jpg", width: 1200, height: 630, alt: "Seno Studio — Photographe Mariage Bordeaux" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seno Studio — Photographe & Vidéaste Mariage Bordeaux",
    description: "Films cinématiques 4K et reportages photo de mariage à Bordeaux. Disponible partout en France.",
    images: ["/images/hero-4k-6.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": siteUrl,
  name: "Seno Studio",
  description: "Photographe et vidéaste spécialisé mariage, basé à Bordeaux. Films cinématiques 4K, reportages photo, Magazine Box, drone. Disponible partout en France.",
  url: siteUrl,
  telephone: "+33768868505",
  email: "contact.senostudio@gmail.com",
  image: `${siteUrl}/images/hero-4k-6.jpg`,
  priceRange: "€€€",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bordeaux",
    addressRegion: "Gironde",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.8378,
    longitude: -0.5792,
  },
  areaServed: [
    { "@type": "City", name: "Bordeaux" },
    { "@type": "AdministrativeArea", name: "Gironde" },
    { "@type": "Country", name: "France" },
  ],
  sameAs: ["https://www.instagram.com/senonguyen"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "09:00",
    closes: "20:00",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations photo & vidéo mariage",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Reportage Photo Mariage", description: "Couverture complète de votre journée, 300+ photos retouchées." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Film Cinématique Mariage 4K", description: "Court-métrage de votre mariage en 4K, 3-5 minutes." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Magazine Box", description: "Photobooth premium avec impressions magazine personnalisées." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Drone Cinématique", description: "Plans aériens 4K pour votre mariage." } },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
