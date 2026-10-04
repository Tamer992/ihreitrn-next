import { Fragment } from "react";
import { einzugsgebiet as eg } from "@/inhalt/startseite";

// Schaubild: Hemsbach als Mittelpunkt, Ringe für 10 und 25 km, Orte in ihrer echten Himmelsrichtung
// (Luftlinie, maßstabsgetreu). Der 25-km-Ring läuft bewusst über den Bildrand hinaus.
// Keine Kartenkacheln, keine externen Dienste.
const KM_LAT = 111.2;
const KM_LON = 111.2 * Math.cos((eg.mitte.lat * Math.PI) / 180);
const MASS = 12; // Einheiten je km
const MX = 340;
const MY = 170;
const BREITE = 620;
const HOEHE = 410;

function lage(lat: number, lon: number) {
  return {
    x: MX + (lon - eg.mitte.lon) * KM_LON * MASS,
    y: MY - (lat - eg.mitte.lat) * KM_LAT * MASS,
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function beschriftung(x: number, y: number, wo: string) {
  switch (wo) {
    case "links":
      return { x: x - 9, y: y + 5, anker: "end" as const };
    case "oben":
      return { x, y: y - 11, anker: "middle" as const };
    case "unten":
      return { x, y: y + 21, anker: "middle" as const };
    default:
      return { x: x + 9, y: y + 5, anker: "start" as const };
  }
}

export function Einzugsgebiet() {
  const orte = eg.orte.map((o) => ({ ...o, ...lage(o.lat, o.lon) }));
  const ring25 = 25 * MASS;
  return (
    <section id="einzugsgebiet" aria-labelledby="gebiet-titel" className="bg-weiss py-[var(--abschnitt)]">
      <div className="huelle grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="gebiet-titel" data-einblenden className="titel titel-2 max-w-[16ch]">
            {eg.titel.replace(" Rhein-Neckar-Kreis.", "")} <span className="min-[360px]:whitespace-nowrap">Rhein-Neckar-Kreis.</span>
          </h2>
          <p data-einblenden className="mt-6 max-w-[44ch] text-schiefer">{eg.text}</p>

          <dl data-einblenden className="mt-10 grid gap-6">
            {eg.zonen.map((z) => (
              <div key={z.zone}>
                <dt className="flex items-baseline gap-3 font-titel font-semibold">
                  <span>{z.titel}</span>
                  <span aria-hidden="true" className="mb-[0.3em] flex-1 border-b border-dotted border-schiefer/50" />
                  <span className="nummer font-titel">{z.preis} Anfahrt</span>
                </dt>
                <dd className="mt-1 text-schiefer">
                  {z.zone === 0
                    ? "Mein Standort"
                    : orte
                        .filter((o) => o.zone === z.zone)
                        .map((o, i, alle) => (
                          <Fragment key={o.name}>
                            <span className="whitespace-nowrap">{o.name}</span>
                            {i < alle.length - 1 ? ", " : ""}
                          </Fragment>
                        ))}
                </dd>
              </div>
            ))}
          </dl>
          <p data-einblenden className="mt-6 text-schiefer">{eg.weiter}</p>
        </div>

        <figure data-einblenden className="lg:col-span-7">
          <svg
            viewBox={`0 0 ${BREITE} ${HOEHE}`}
            className="h-auto w-full overflow-hidden"
            role="img"
            aria-label="Schaubild: Hemsbach in der Mitte. Im Ring bis 10 Kilometer liegen Laudenbach, Heppenheim, Sulzbach, Weinheim und Hirschberg. Bis 25 Kilometer liegen Bensheim, Viernheim, Heddesheim, Schriesheim, Ladenburg, Ilvesheim, Edingen-Neckarhausen und Mannheim."
          >
            <g fill="none" stroke="var(--color-linie)" strokeWidth="1">
              <circle data-zier="ring" cx={MX} cy={MY} r={10 * MASS} />
              <circle data-zier="ring" cx={MX} cy={MY} r={ring25} strokeDasharray="4 5" />
            </g>
            <g fontFamily="var(--font-text)" fontSize="14" fill="var(--color-schiefer)">
              <text x={MX + 10 * MASS * 0.71 + 6} y={MY - 10 * MASS * 0.71 - 6}>10 km</text>
              <text x={MX + ring25 * 0.7 - 10} y={MY + ring25 * 0.71 + 4} textAnchor="end">25 km</text>
            </g>
            {orte.map((o) => {
              const b = beschriftung(o.x, o.y, o.lage);
              return (
                <g key={o.name}>
                  <circle cx={r1(o.x)} cy={r1(o.y)} r={3.6} fill="var(--color-schiefer)" />
                  <text
                    className="max-md:hidden"
                    x={r1(b.x)}
                    y={r1(b.y)}
                    textAnchor={b.anker}
                    fontFamily="var(--font-text)"
                    fontSize="15"
                    fill="var(--color-graphit)"
                  >
                    {o.name}
                  </text>
                </g>
              );
            })}
            <circle cx={MX} cy={MY} r={7} fill="var(--color-blau)" />
            <text x={MX - 14} y={MY + 6} textAnchor="end" fontFamily="var(--font-titel)" fontSize="18" fontWeight="600" fill="var(--color-blau)">
              Hemsbach
            </text>
          </svg>
          <figcaption className="mt-3 text-klein text-schiefer">
            Lage nach Luftlinie. Die Anfahrt richtet sich nach der Staffel <span className="lg:hidden">oben</span><span className="max-lg:hidden">links</span>.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
