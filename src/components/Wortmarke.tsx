// Zeichen: fünf Punkte in Silber, in der Mitte der eine blaue Punkt, mit dem alle verbunden sind.
// Dieselbe Formensprache wie die 3D-Szene.
const punkte: [number, number][] = [
  [4, 7],
  [17, 3],
  [27, 13],
  [21, 26],
  [6, 22],
];

export function Zeichen({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 31 30" className={className} aria-hidden="true" focusable="false">
      <g stroke="var(--color-linie)" strokeWidth="1">
        {punkte.map(([x, y], i) => (
          <line key={i} x1={15.5} y1={15} x2={x} y2={y} />
        ))}
        <polyline points={punkte.map((p) => p.join(",")).join(" ") + ` ${punkte[0].join(",")}`} fill="none" opacity="0.6" />
      </g>
      {punkte.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.3} fill="var(--color-schiefer)" />
      ))}
      <circle cx={15.5} cy={15} r={3.6} fill="var(--color-blau)" />
    </svg>
  );
}

export function Wortmarke() {
  return (
    <span className="flex items-center gap-3">
      <Zeichen className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-titel text-[1.3rem] font-semibold tracking-[-0.02em]">Ihre IT</span>{" "}
        <span className="mt-1 text-[0.8125rem] font-semibold tracking-[0.02em] text-schiefer">Rhein-Neckar</span>
      </span>
    </span>
  );
}
