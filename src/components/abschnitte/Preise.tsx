import Link from "next/link";
import { preise } from "@/inhalt/startseite";

export function Preise() {
  return (
    <section id="preise" aria-labelledby="preise-titel" className="border-t border-linie py-[var(--abschnitt)]">
      <div className="huelle grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <h2 id="preise-titel" data-einblenden className="titel titel-2 max-w-[14ch]">
            {preise.titel}
          </h2>
          <div data-einblenden className="mt-12 lg:mt-16">
            <p className="flex flex-wrap items-baseline gap-x-5">
              <span className="titel nummer text-[clamp(5rem,3rem+9vw,10rem)] font-medium leading-[0.85] tracking-[-0.05em]">
                {preise.betrag}
              </span>
              <span className="titel titel-3">{preise.einheit}</span>
            </p>
            <p className="mt-5 font-semibold">{preise.mwst}</p>
            <p className="mt-3 max-w-[44ch] text-schiefer">{preise.takt}</p>
          </div>
          <ul data-einblenden className="mt-10 grid max-w-[44ch] gap-3">
            {preise.punkte.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
          <h3 data-einblenden className="titel titel-3">{preise.anfahrtTitel}</h3>
          <dl data-einblenden className="mt-6 grid gap-4">
            {preise.anfahrt.map((a) => (
              <div key={a.wo} className="flex items-baseline gap-3 font-titel">
                <dt className="shrink-0">{a.wo}</dt>
                <span aria-hidden="true" className="mb-[0.3em] min-w-4 flex-1 border-b border-dotted border-schiefer/50" />
                <dd className="text-right font-semibold [font-variant-numeric:tabular-nums]">{a.preis}</dd>
              </div>
            ))}
          </dl>
          <p data-einblenden className="mt-10 border-l-2 border-linie pl-6 text-schiefer">
            {preise.gewerbe}
          </p>
          <p data-einblenden className="mt-8">
            <Link prefetch={false} href={preise.link.href} className="link link--blau">
              {preise.link.text} <span className="pfeil" aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
