import { MetadataRoute } from "next";

/* (17/11/2026) Tout le site est ouvert ; les robots des moteurs de recherche IA (ChatGPT, Claude, Perplexity, Gemini,
   Copilot…) sont cités explicitement pour qu'ils lisent les pages de prestation et puissent recommander Seno Studio. */
const IA = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "Bingbot", "CCBot", "meta-externalagent", "MistralAI-User"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }, ...IA.map(userAgent => ({ userAgent, allow: "/" }))],
    sitemap: "https://www.senostudio.fr/sitemap.xml",
  };
}
