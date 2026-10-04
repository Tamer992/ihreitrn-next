import Link from "next/link";
import { leistungen } from "@/inhalt/startseite";
import { Motiv } from "../Motiv";

export function Leistungen() {
  return (
    <section id="leistungen" aria-labelledby="leistungen-titel" className="relative z-10 pb-[var(--abschnitt)]">
      <div className="huelle grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 id="leistungen-titel" data-einblenden className="titel titel-2 max-w-[12ch]">
              Dafür werde ich gerufen.
            </h2>
            <p data-einblenden className="mt-6 max-w-[30ch] text-schiefer">
              PC, Laptop, Smartphone, Drucker und WLAN, zu Hause genauso wie im Betrieb.
            </p>
            <p data-einblenden className="mt-6">
              <Link prefetch={false} href="/leistungen" className="link link--blau">
                Alle Leistungen im Detail <span className="pfeil" aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>

        <ul className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:col-span-8 lg:gap-y-20">
          {leistungen.map((l) => (
            <li key={l.titel} data-einblenden className="group relative">
              <div className="max-w-[15rem] transition-transform duration-[240ms] ease-ruhig group-focus-within:-translate-y-1 group-hover:-translate-y-1">
                <Motiv name={l.motiv} className="h-auto w-full" />
              </div>
              <h3 className="titel titel-3 mt-6">
                <Link prefetch={false} href={l.href} className="after:absolute after:inset-0 after:content-['']">
                  {l.titel}
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block text-blau opacity-0 transition duration-[240ms] ease-ruhig group-focus-within:opacity-100 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </h3>
              <p className="mt-3 max-w-[38ch] text-schiefer">{l.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
