import Link from "next/link";
import { wege } from "@/inhalt/startseite";

export function Wege() {
  return (
    <section aria-labelledby="wege-titel" className="relative z-10 pb-[var(--abschnitt)]">
      <div className="huelle">
        <h2 id="wege-titel" data-einblenden className="titel titel-2 max-w-[18ch]">
          Zu Hause oder im Betrieb. Derselbe Ansprechpartner.
        </h2>
        <div className="mt-12 grid border-t border-linie md:mx-[calc(var(--rand)*-1)] md:grid-cols-2 lg:mt-16">
          {wege.map((w, i) => (
            <div key={w.titel} data-einblenden className={i === 0 ? "border-b border-linie md:border-b-0 md:border-r" : ""}>
            <Link prefetch={false}
              href={w.link.href}
              className={`group relative flex h-full flex-col justify-between gap-10 py-10 transition-colors duration-[240ms] ease-ruhig hover:bg-weiss focus-visible:bg-weiss md:min-h-[22rem] md:p-[var(--rand)]`}
            >
              <div>
                <h3 className="titel text-[clamp(1.75rem,1.3rem+1.6vw,2.625rem)]">{w.titel}</h3>
                <p className="mt-5 max-w-[42ch] text-schiefer">{w.text}</p>
              </div>
              <span className="link link--blau self-start">
                {w.link.text} <span className="pfeil" aria-hidden="true">→</span>
              </span>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
