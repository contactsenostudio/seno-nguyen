import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.senostudio.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Seno Studio — Photographe & Vidéaste Mariage Bordeaux | Photo + Film + Magazine Box",
    template: "%s | Seno Studio",
  },
  description: "Photographe et vidéaste mariage à Bordeaux et Gironde. Photo + film cinématique 4K + Magazine Box — trois souvenirs, un seul artiste. Seul prestataire à proposer le trio complet. Disponible partout en France.",
  keywords: ["photographe mariage Bordeaux","vidéaste mariage Gironde","photographe vidéaste mariage Bordeaux","film cinématique mariage Bordeaux","Magazine Box mariage Bordeaux","photo film mariage Gironde","photographe vidéaste mariage Gironde","drone mariage Bordeaux","shooting engagement Bordeaux","photographe mariage France","photographe mariage Mérignac","photographe mariage Arcachon","photographe corporate Bordeaux"],
  authors: [{ name: "Seno Studio" }],
  creator: "Seno Studio",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Seno Studio — Photographe & Vidéaste Mariage Bordeaux | Photo + Film + Magazine Box",
    description: "Photo + film cinématique 4K + Magazine Box — trois souvenirs, un seul artiste. Mariage, entreprise, Bordeaux & France entière.",
    type: "website",
    url: siteUrl,
    locale: "fr_FR",
    siteName: "Seno Studio",
    images: [{ url: "/images/hero.jpg", width: 1200, height: 630, alt: "Seno Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seno Studio — Photographe & Vidéaste Mariage Bordeaux",
    description: "Films cinématiques 4K et reportages photo. Bordeaux & France.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Seno Studio",
  description: "Photographe et vidéaste spécialisé mariage, entreprise et événements. Bordeaux, Gironde, France.",
  url: siteUrl,
  telephone: "+33768868505",
  email: "contact.senostudio@gmail.com",
  image: `${siteUrl}/images/hero.jpg`,
  priceRange: "€€€",
  address: { "@type": "PostalAddress", addressLocality: "Bordeaux", addressRegion: "Gironde", addressCountry: "FR" },
  geo: { "@type": "GeoCoordinates", latitude: 44.8378, longitude: -0.5792 },
  areaServed: [{ "@type": "City", name: "Bordeaux" }, { "@type": "AdministrativeArea", name: "Gironde" }, { "@type": "Country", name: "France" }],
  sameAs: ["https://www.instagram.com/seno_std/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
