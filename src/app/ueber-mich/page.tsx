import type { Metadata } from "next";
import { Folgt } from "@/components/Folgt";

export const metadata: Metadata = { title: "Über mich | Ihre IT Rhein-Neckar" };

export default function Seite() {
  return <Folgt titel="Über mich" />;
}
