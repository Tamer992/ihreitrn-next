import type { Metadata } from "next";
import { Folgt } from "@/components/Folgt";

export const metadata: Metadata = { title: "Viren & Datensicherung | Ihre IT Rhein-Neckar" };

export default function Seite() {
  return <Folgt titel="Viren & Datensicherung" />;
}
