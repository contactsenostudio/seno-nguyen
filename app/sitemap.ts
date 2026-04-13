import { MetadataRoute } from "next";

const siteUrl = "https://www.senostudio.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/offres`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/prestations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
