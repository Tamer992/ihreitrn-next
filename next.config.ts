import type { NextConfig } from "next";

// Statischer Export: `npm run build` legt die fertige Seite in `out/`, läuft auf jedem Webserver (nginx).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
