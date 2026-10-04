import { Kopf } from "@/components/Kopf";
import { Fuss } from "@/components/Fuss";
import { Anrufleiste } from "@/components/Anrufleiste";
import { Bewegung } from "@/components/Bewegung";
import { Hero, SzeneComputer } from "@/components/abschnitte/Hero";
import { Person } from "@/components/abschnitte/Person";
import { Wege } from "@/components/abschnitte/Wege";
import { Leistungen } from "@/components/abschnitte/Leistungen";
import { VorOrt } from "@/components/abschnitte/VorOrt";
import { Ablauf } from "@/components/abschnitte/Ablauf";
import { Preise } from "@/components/abschnitte/Preise";
import { Einzugsgebiet } from "@/components/abschnitte/Einzugsgebiet";
import { Kontakt } from "@/components/abschnitte/Kontakt";

export default function Startseite() {
  return (
    <>
      <noscript>
        <style>{".szene-ersatz{opacity:1!important}"}</style>
      </noscript>
      <Kopf />
      <main id="inhalt">
        {/* Bereich, in dem die 3D-Szene am Computer mitläuft: vom Hero bis zum Ende der Leistungen */}
        <div id="szenenbereich" className="relative">
          <SzeneComputer />
          <Hero />
          <Person />
          <Wege />
          <Leistungen />
        </div>
        <VorOrt />
        <Ablauf />
        <Preise />
        <Einzugsgebiet />
        <Kontakt />
      </main>
      <Fuss />
      <Anrufleiste />
      <Bewegung />
    </>
  );
}
