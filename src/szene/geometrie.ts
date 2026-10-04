// Gemeinsame Geometrie für 3D-Szene und statisches Ersatzbild.
// Idee: Punkte liegen zuerst durcheinander und ordnen sich zu einer gleichmäßigen Kugel.
// Punkt 0 ist der eine blaue Punkt in der Mitte, mit dem einige Punkte der Hülle verbunden sind.

export type V3 = [number, number, number];

export function zufall(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Gleichmäßig verteilte Punkte auf einer Kugel (Fibonacci-Gitter). */
export function kugel(anzahl: number, radius: number): V3[] {
  const punkte: V3[] = [];
  const winkel = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < anzahl; i++) {
    const y = 1 - (i / (anzahl - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = winkel * i;
    punkte.push([Math.cos(t) * r * radius, y * radius, Math.sin(t) * r * radius]);
  }
  return punkte;
}

/** Locker verteilte Wolke aus einigen Knäueln, deutlich größer als die Kugel. */
export function durcheinander(anzahl: number, radius: number, seed = 7): V3[] {
  const z = zufall(seed);
  const knaeuel: V3[] = Array.from({ length: 6 }, () => [
    (z() - 0.5) * radius * 2.6,
    (z() - 0.5) * radius * 1.9,
    (z() - 0.5) * radius * 1.6,
  ]);
  return Array.from({ length: anzahl }, () => {
    const k = knaeuel[Math.floor(z() * knaeuel.length)];
    const s = radius * (0.35 + z() * 0.75);
    return [k[0] + (z() - 0.5) * s, k[1] + (z() - 0.5) * s, k[2] + (z() - 0.5) * s] as V3;
  });
}

/** Je Punkt die k nächsten Nachbarn auf der Kugel, ohne doppelte Kanten. */
export function nachbarn(punkte: V3[], k: number, abIndex = 1): [number, number][] {
  const kanten = new Set<string>();
  const liste: [number, number][] = [];
  for (let i = abIndex; i < punkte.length; i++) {
    const a = punkte[i];
    const abst: [number, number][] = [];
    for (let j = abIndex; j < punkte.length; j++) {
      if (i === j) continue;
      const b = punkte[j];
      abst.push([(a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2, j]);
    }
    abst.sort((x, y) => x[0] - y[0]);
    for (let n = 0; n < k; n++) {
      const j = abst[n][1];
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!kanten.has(key)) {
        kanten.add(key);
        liste.push([i, j]);
      }
    }
  }
  return liste;
}

/** Indizes der Hüllpunkte, die mit dem blauen Mittelpunkt verbunden sind. */
export function speichen(anzahl: number, wieviele: number): number[] {
  const schritt = (anzahl - 1) / wieviele;
  return Array.from({ length: wieviele }, (_, i) => 1 + Math.floor(i * schritt + schritt / 2));
}
