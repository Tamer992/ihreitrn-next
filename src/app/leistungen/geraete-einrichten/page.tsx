import type { Metadata } from "next";
import { Folgt } from "@/components/Folgt";

export const metadata: Metadata = { title: "Geräte einrichten | Ihre IT Rhein-Neckar" };

export default function Seite() {
  return <Folgt titel="Geräte einrichten" />;
}
