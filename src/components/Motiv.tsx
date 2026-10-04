import type { CSSProperties } from "react";
import type { MotivName } from "@/inhalt/startseite";

// Kleine Bewegungsbilder je Leistung, aus derselben Formensprache wie die 3D-Szene:
// Punkte, Haarlinien und genau ein blauer Punkt. Nur transform und opacity werden animiert.
// Die Animation läuft nur, solange das Bild sichtbar ist (data-aktiv, gesetzt in Bewegung.tsx).

const linie = { stroke: "var(--color-linie)", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
const punkt = "var(--color-schiefer)";
const blau = "var(--color-blau)";

type Anim = { name: string; dauer: number; verz?: number; extra?: CSSProperties };
const a = ({ name, dauer, verz = 0, extra }: Anim): CSSProperties => ({
  animation: `${name} ${dauer}s var(--ease-ruhig) ${verz}s infinite both`,
  ...extra,
});

function Geraete() {
  const raster = (x0: number) =>
    [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => [x0 + i * 13, 37 + j * 13] as const));
  return (
    <>
      <line x1={58} y1={50} x2={102} y2={50} {...linie} />
      {raster(20).map(([x, y]) => <circle key={`a${x}${y}`} cx={x} cy={y} r={2.6} fill={punkt} />)}
      {raster(114).map(([x, y]) => <circle key={`b${x}${y}`} cx={x} cy={y} r={2.6} fill={punkt} opacity={0.45} />)}
      <circle cx={127} cy={50} r={3.6} fill={blau} />
      {[0, 0.7, 1.4].map((v) => (
        <circle key={v} data-a cx={60} cy={50} r={2.2} fill={punkt}
          style={a({ name: "m-reise", dauer: 2.4, verz: v, extra: { "--wx": "40px" } as CSSProperties })} />
      ))}
    </>
  );
}

function Wlan() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <circle key={i} data-a cx={46} cy={50} r={44} fill="none" stroke={punkt} strokeWidth={2.4}
          strokeLinecap="round" strokeDasharray="0 7.2" style={a({ name: "m-welle", dauer: 3.6, verz: i * 1.2 })} />
      ))}
      <circle cx={46} cy={50} r={3.6} fill={blau} />
      {[[124, 28], [136, 56], [118, 76]].map(([x, y], i) => (
        <circle key={i} data-a cx={x} cy={y} r={2.6} fill={punkt}
          style={a({ name: "m-zeile", dauer: 3.6, verz: 0.9 + i * 0.25 })} />
      ))}
    </>
  );
}

function Drucker() {
  const quellen = [[26, 22], [26, 50], [26, 78]] as const;
  const ziel = [124, 50] as const;
  return (
    <>
      {quellen.map(([x, y]) => <line key={y} x1={x} y1={y} x2={ziel[0]} y2={ziel[1]} {...linie} />)}
      {quellen.map(([x, y]) => <circle key={`q${y}`} cx={x} cy={y} r={2.6} fill={punkt} />)}
      <rect x={ziel[0] - 6} y={ziel[1] - 6} width={12} height={12} fill="none" stroke={punkt} strokeWidth={1} />
      <circle cx={ziel[0]} cy={ziel[1]} r={3.6} fill={blau} />
      {quellen.map(([x, y], i) => (
        <circle key={`p${y}`} data-a cx={x} cy={y} r={2.2} fill={punkt}
          style={a({ name: "m-reise", dauer: 3, verz: i * 1, extra: { "--wx": `${(ziel[0] - x) * 0.86}px`, "--wy": `${(ziel[1] - y) * 0.86}px` } as CSSProperties })} />
      ))}
    </>
  );
}

function Reparatur() {
  const xs = [32, 56, 80, 104, 128];
  const ys = [26, 50, 74];
  return (
    <>
      {ys.map((y) => <line key={`h${y}`} x1={xs[0]} y1={y} x2={xs[4]} y2={y} {...linie} />)}
      {xs.map((x) => <line key={`v${x}`} x1={x} y1={ys[0]} x2={x} y2={ys[2]} {...linie} />)}
      {xs.flatMap((x) => ys.map((y) => (x === 80 && y === 50 ? null : <circle key={`${x}${y}`} cx={x} cy={y} r={2.6} fill={punkt} />)))}
      <circle cx={80} cy={50} r={6} fill="var(--color-alu)" stroke={punkt} strokeWidth={1} strokeDasharray="2 2" />
      <circle data-a cx={80} cy={50} r={3.8} fill={blau} style={a({ name: "m-fuellen", dauer: 4 })} />
    </>
  );
}

function Sicherung() {
  const ring = Array.from({ length: 12 }, (_, i) => {
    const w = (i / 12) * Math.PI * 2;
    return [52 + Math.cos(w) * 26, 50 + Math.sin(w) * 26] as const;
  });
  return (
    <>
      <line x1={86} y1={50} x2={122} y2={50} {...linie} strokeDasharray="3 3" />
      <g data-a style={a({ name: "m-dreh", dauer: 28, extra: { animationTimingFunction: "linear", transformOrigin: "52px 50px", transformBox: "view-box" } })}>
        {ring.map(([x, y], i) => <circle key={i} cx={Math.round(x * 10) / 10} cy={Math.round(y * 10) / 10} r={2.4} fill={punkt} />)}
      </g>
      <circle cx={52} cy={50} r={3.6} fill={blau} />
      {[[128, 44], [136, 44], [128, 56], [136, 56]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={2.4} fill={punkt} />)}
      <circle data-a cx={86} cy={50} r={2.2} fill={punkt} style={a({ name: "m-reise", dauer: 3.2, verz: 0.4, extra: { "--wx": "34px" } as CSSProperties })} />
    </>
  );
}

function Fernsehen() {
  const spalten = 8;
  const zeilen = 5;
  return (
    <>
      <rect x={20} y={14} width={120} height={72} fill="none" {...linie} />
      {Array.from({ length: zeilen }, (_, z) => (
        <g key={z} data-a style={a({ name: "m-zeile", dauer: 4, verz: z * 0.4 })}>
          {Array.from({ length: spalten }, (_, s) =>
            z === 0 && s === 0 ? null : <circle key={s} cx={33 + s * 13.4} cy={25 + z * 12.5} r={2.4} fill={punkt} />,
          )}
        </g>
      ))}
      <circle cx={33} cy={25} r={3.6} fill={blau} />
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
    <svg data-motiv viewBox="0 0 160 100" className={`motiv ${className}`} aria-hidden="true" focusable="false">
      <Inhalt />
    </svg>
  );
}
