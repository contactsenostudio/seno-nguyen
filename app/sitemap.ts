import { MetadataRoute } from "next";
import { THEMES } from "@/lib/portfolio";
import { PAGES_LOCALES } from "@/components/LiensLocaux";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.senostudio.fr";
  return [
    { url: base,               lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    ...PAGES_LOCALES.map(p => ({ url: `${base}${p.href}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.95 })),
    { url: `${base}/prestations`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    ...THEMES.map(t => ({ url: `${base}/portfolio/${t.id}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${base}/a-propos`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
