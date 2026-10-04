import type { MetadataRoute } from "next";
import { firma } from "@/inhalt/startseite";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${firma.web}/`, changeFrequency: "monthly", priority: 1 }];
}
