import type { MetadataRoute } from "next";
import { firma } from "@/inhalt/startseite";

export const dynamic = "force-static";

// Entwurf: Suchmaschinen bleiben draußen, bis die Seite freigegeben ist.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${firma.web}/sitemap.xml`,
  };
}
