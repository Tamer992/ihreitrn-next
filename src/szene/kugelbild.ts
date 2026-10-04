import { kugel, nachbarn, speichen, type V3 } from "./geometrie";

// Statisches Ersatzbild der geordneten Kugel als SVG-Text (gleiche Geometrie wie die 3D-Szene).
export function kugelSvg(anzahl = 200): string {
  const R = 1.9;
  const punkte: V3[] = [[0, 0, 0], ...kugel(anzahl - 1, R)];
  const a = 0.6;
  const b = 0.12;
  const proj = punkte.map(([x, y, z]) => {
    const x1 = Math.cos(a) * x + Math.sin(a) * z;
    const z1 = -Math.sin(a) * x + Math.cos(a) * z;
    const y2 = Math.cos(b) * y - Math.sin(b) * z1;
    const z2 = Math.sin(b) * y + Math.cos(b) * z1;
    const f = 10 / (10 - z2);
    return { x: 50 + x1 * f * 22, y: 50 - y2 * f * 22, t: 0.4 + 0.6 * ((z2 + R) / (2 * R)) };
  });
  const r = (n: number) => Math.round(n * 100) / 100;
  const kanten = [...nachbarn(punkte, 3), ...speichen(anzahl, 12).map((i) => [0, i] as [number, number])];

  const linien = kanten
    .map(([i, j]) => {
      const blau = i === 0;
      const deck = r((blau ? 0.42 : 0.26) * Math.min(proj[i].t, proj[j].t));
      return `<line x1="${r(proj[i].x)}" y1="${r(proj[i].y)}" x2="${r(proj[j].x)}" y2="${r(proj[j].y)}" stroke="${blau ? "#285a92" : "#58544e"}" stroke-opacity="${deck}"/>`;
    })
    .join("");
  const kreise = proj
    .slice(1)
    .sort((p, q) => p.t - q.t)
    .map((p) => `<circle cx="${r(p.x)}" cy="${r(p.y)}" r="0.62" fill="#6b665f" fill-opacity="${r(p.t)}"/>`)
    .join("");
  const mitte = `<circle cx="${r(proj[0].x)}" cy="${r(proj[0].y)}" r="1.5" fill="#285a92"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g stroke-width="0.14" stroke-linecap="round">${linien}</g>${kreise}${mitte}</svg>`;
}
