import type { Metadata } from "next";
import { Folgt } from "@/components/Folgt";

export const metadata: Metadata = { title: "Reparatur & Aufrüstung | Ihre IT Rhein-Neckar" };

export default function Seite() {
  return <Folgt titel="Reparatur & Aufrüstung" />;
}
