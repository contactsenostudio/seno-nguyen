import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // (17/11/2026) « Mon travail » (portfolio) remplacé par les pages de prestation : les anciennes adresses y renvoient
  async redirects() {
    return [
      { source: "/portfolio", destination: "/prestations", permanent: true },
      { source: "/portfolio/mariage", destination: "/photographe-mariage-bordeaux", permanent: true },
      { source: "/portfolio/studio", destination: "/shooting-photo-bordeaux", permanent: true },
      { source: "/portfolio/portrait", destination: "/photographe-portrait-bordeaux", permanent: true },
      { source: "/portfolio/entreprise", destination: "/photographe-entreprise-bordeaux", permanent: true },
      { source: "/portfolio/immobilier", destination: "/photographe-immobilier-bordeaux", permanent: true },
      { source: "/portfolio/:autre", destination: "/prestations", permanent: true },
    ];
  },
};

export default nextConfig;
