import type { Metadata } from "next";
import { Folgt } from "@/components/Folgt";

export const metadata: Metadata = { title: "WLAN & Internet | Ihre IT Rhein-Neckar" };

export default function Seite() {
  return <Folgt titel="WLAN & Internet" />;
}
