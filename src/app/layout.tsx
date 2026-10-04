import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { firma, einzugsgebiet } from "@/inhalt/startseite";
import "./globals.css";

const archivo = localFont({
  src: "./schriften/archivo.woff2",
  variable: "--font-archivo",
  weight: "400 700",
  display: "swap",
  preload: true,
});

const atkinson = localFont({
  src: "./schriften/atkinson-next.woff2",
  variable: "--font-atkinson",
  weight: "200 800",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(firma.web),
  title: "IT-Hilfe in Hemsbach, Weinheim und Rhein-Neckar | Ihre IT Rhein-Neckar",
  description:
    "IT-Hilfe vor Ort und per Fernwartung für Privatkunden, Senioren und Betriebe in Hemsbach, Weinheim, Heppenheim, Viernheim und Mannheim. 69 € pro Stunde inkl. MwSt., auch abends und am Wochenende ohne Zuschlag.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: firma.name,
    title: "Ihre IT. Einfach gelöst. | Ihre IT Rhein-Neckar",
    description: "IT-Hilfe vor Ort und per Fernwartung in Hemsbach, an der Bergstraße und im Rhein-Neckar-Kreis.",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#eef0f3",
  width: "device-width",
  initialScale: 1,
};

const strukturiert = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${firma.web}/#betrieb`,
  name: firma.name,
  description: "IT-Hilfe und IT-Service vor Ort und per Fernwartung für Privatkunden, Senioren und Unternehmen.",
  url: firma.web,
  telephone: "+49 152 07872002",
  email: firma.email,
  founder: { "@type": "Person", name: firma.inhaber, jobTitle: "IT-Systemelektroniker" },
  address: {
    "@type": "PostalAddress",
    streetAddress: firma.strasse,
    postalCode: firma.plz,
    addressLocality: firma.ort,
    addressRegion: "Baden-Württemberg",
    addressCountry: "DE",
  },
  areaServed: [einzugsgebiet.mitte.name, ...einzugsgebiet.orte.map((o) => o.name), "Rhein-Neckar-Kreis", "Kreis Bergstraße"].map(
    (name) => ({ "@type": "Place", name }),
  ),
  priceRange: "69 € pro Stunde inkl. MwSt.",
  paymentAccepted: "Bar, Überweisung",
  knowsLanguage: "de",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${archivo.variable} ${atkinson.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturiert) }}
        />
      </body>
    </html>
  );
}
