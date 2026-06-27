import type { MetadataRoute } from "next";

/**
 * Robots.txt configuration.
 * Admin panel and API routes are disallowed for all bots.
 * Sitemap URL is declared for crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://anujdigitallabs.com/sitemap.xml",
    host: "https://anujdigitallabs.com",
  };
}
