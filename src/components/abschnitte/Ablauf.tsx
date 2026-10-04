import { ablauf } from "@/inhalt/startseite";

// Reihenfolge über eine Linie mit drei Punkten statt großer Ziffern. Der letzte Punkt ist blau: gelöst.
export function Ablauf() {
  return (
    <section aria-labelledby="ablauf-titel" className="py-[var(--abschnitt)]">
      <div className="huelle">
        <h2 id="ablauf-titel" data-einblenden className="titel titel-2 max-w-[16ch]">
          {ablauf.titel}
        </h2>

        <div className="relative mt-14 md:mt-20">
          {/* Linie: am Handy senkrecht links, ab Tablet waagerecht oben */}
          <span
            aria-hidden="true"
            data-zier="linie"
            data-richtung="senkrecht"
            className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-linie md:hidden"
          />
          <span
            aria-hidden="true"
            data-zier="linie"
            className="absolute left-0 right-[8%] top-[5px] hidden h-px origin-left bg-linie md:block"
          />
          <ol className="grid gap-12 pl-10 md:grid-cols-3 md:gap-8 md:pl-0 md:pt-12">
          {ablauf.schritte.map((s, i) => {
            const letzter = i === ablauf.schritte.length - 1;
            return (
              <li key={s.titel} data-einblenden className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute -left-10 top-[0.55em] block rounded-full md:-top-12 md:left-0 ${
                    letzter ? "h-3.5 w-3.5 -translate-x-[1.5px] -translate-y-[1.5px] bg-blau" : "h-[11px] w-[11px] bg-schiefer"
                  }`}
                />
                <h3 className="titel titel-3">{s.titel}</h3>
                <p className="mt-3 max-w-[34ch] text-schiefer">{s.text}</p>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
