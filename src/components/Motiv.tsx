import type { CSSProperties } from "react";
import type { MotivName } from "@/inhalt/startseite";

// Strichzeichnungen je Leistung: klar erkennbar, Graphit mit genau einem blauen Detail.
// Beim Hereinscrollen zeichnen sich die Striche einmal auf und stehen dann still (data-zier="zeichnung",
// Zustand setzt Bewegung.tsx). Ohne JavaScript oder bei „Bewegung reduzieren“ stehen sie sofort fertig da.

type Art = "akzent" | "punkt" | "griff";

// n = Reihenfolge beim Aufzeichnen
function Strich({ n, d, art }: { n: number; d: string; art?: Art }) {
  const klasse = art === "punkt" ? "strich strich--akzent strich--punkt" : art ? `strich strich--${art}` : "strich";
  return <path className={klasse} d={d} pathLength={1} style={{ "--n": n } as CSSProperties} />;
}

function Geraete() {
  return (
    <>
      <Strich n={0} d="M37 20 H103 A3 3 0 0 1 106 23 V66 H34 V23 A3 3 0 0 1 37 20 Z" />
      <Strich n={1} d="M24 72 H116 L111 79 H29 Z" />
      <Strich n={2} d="M121 34 H139 A4 4 0 0 1 143 38 V76 A4 4 0 0 1 139 80 H121 A4 4 0 0 1 117 76 V38 A4 4 0 0 1 121 34 Z" />
      <Strich n={3} d="M127 73 H133" />
      <Strich n={4} art="akzent" d="M58 43 L67 52 L84 35" />
    </>
  );
}

function Wlan() {
  return (
    <>
      <Strich n={0} d="M56 70 H104 A4 4 0 0 1 108 74 V82 A4 4 0 0 1 104 86 H56 A4 4 0 0 1 52 82 V74 A4 4 0 0 1 56 70 Z" />
      <Strich n={1} d="M64 78 H66 M72 78 H74" />
      <Strich n={2} d="M72.9 50.9 A10 10 0 0 1 87.1 50.9" />
      <Strich n={3} d="M64.4 42.4 A22 22 0 0 1 95.6 42.4" />
      <Strich n={4} d="M56 34 A34 34 0 0 1 104 34" />
      <Strich n={5} art="punkt" d="M80 58 h0.01" />
    </>
  );
}

function Drucker() {
  return (
    <>
      <Strich n={0} d="M56 40 V18 H94 L102 26 V40" />
      <Strich n={1} d="M41 40 H119 A5 5 0 0 1 124 45 V69 A5 5 0 0 1 119 74 H41 A5 5 0 0 1 36 69 V45 A5 5 0 0 1 41 40 Z" />
      <Strich n={2} d="M52 64 V86 H108 V64" />
      <Strich n={3} d="M62 73 H98 M62 79 H86" />
      <Strich n={4} art="punkt" d="M111 50 h0.01" />
    </>
  );
}

function Reparatur() {
  return (
    <>
      <Strich n={0} d="M62 14 H98 A4 4 0 0 1 102 18 V82 A4 4 0 0 1 98 86 H62 A4 4 0 0 1 58 82 V18 A4 4 0 0 1 62 14 Z" />
      <Strich n={1} d="M66 26 H94 M66 34 H94" />
      <Strich n={2} d="M124 68 L142 50" />
      <Strich n={3} art="griff" d="M113 79 L124 68" />
      <Strich n={4} art="akzent" d="M80 66 A5 5 0 1 1 79.99 66" />
    </>
  );
}

function Sicherung() {
  return (
    <>
      <Strich n={0} d="M80 13 L107 23 V47 C107 65 95 78 80 87 C65 78 53 65 53 47 V23 Z" />
      <Strich n={1} art="akzent" d="M67 49 L77 59 L94 40" />
    </>
  );
}

function Fernsehen() {
  return (
    <>
      <Strich n={0} d="M34 16 H126 A4 4 0 0 1 130 20 V72 A4 4 0 0 1 126 76 H34 A4 4 0 0 1 30 72 V20 A4 4 0 0 1 34 16 Z" />
      <Strich n={1} d="M80 76 V85 M68 86 H92" />
      <Strich n={2} art="akzent" d="M73 35 L92 46 L73 57 Z" />
    </>
  );
}

const motive: Record<MotivName, () => React.JSX.Element> = {
  geraete: Geraete,
  wlan: Wlan,
  drucker: Drucker,
  reparatur: Reparatur,
  sicherung: Sicherung,
  fernsehen: Fernsehen,
};

export function Motiv({ name, className = "" }: { name: MotivName; className?: string }) {
  const Inhalt = motive[name];
  return (
    <svg data-zier="zeichnung" viewBox="0 0 160 100" className={`motiv ${className}`} aria-hidden="true" focusable="false">
      <Inhalt />
    </svg>
  );
}
