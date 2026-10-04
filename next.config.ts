import type { NextConfig } from "next";

// Statischer Export: `npm run build` legt die fertige Seite in `out/`, läuft auf jedem Webserver (nginx).
// Für die Vorschau auf GitHub Pages: NEXT_PUBLIC_BASIS=/repo-name npm run build
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASIS || undefined,
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
