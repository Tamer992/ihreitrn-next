import Link from "next/link";
import { firma, fuss, navigation } from "@/inhalt/startseite";
import { Wortmarke } from "./Wortmarke";

export function Fuss() {
  return (
    <footer className="border-t border-linie bg-weiss pb-12 pt-16 text-klein">
      <div className="huelle grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Wortmarke />
          <p className="mt-6 max-w-[34ch] text-schiefer">{fuss.satz}</p>
          <p className="mt-3 max-w-[34ch] text-schiefer">{fuss.datenschutz}</p>
        </div>
        <nav aria-label="Seiten" className="md:col-span-3">
          <h2 className="font-semibold">Seiten</h2>
          <ul className="mt-3 grid">
            {navigation.map((n) => (
              <li key={n.href}>
                <Link prefetch={false} href={n.href} className="inline-flex min-h-11 items-center text-schiefer hover:text-graphit">
                  {n.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          <h2 className="font-semibold">Kontakt</h2>
          <address className="mt-4 grid gap-1 not-italic text-schiefer">
            <span>{firma.inhaber}</span>
            <span>{firma.strasse}, {firma.plz} {firma.ort}</span>
            <span className="nummer font-titel">{firma.telefon}</span>
            <a href={`mailto:${firma.email}`} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-graphit">
              {firma.email}
            </a>
          </address>
        </div>
      </div>
      <div className="huelle mt-14 flex flex-wrap justify-between gap-4 border-t border-linie pt-6 text-schiefer">
        <p>© 2026 {firma.name}, {firma.inhaber}</p>
        <ul className="flex gap-6">
          <li><Link prefetch={false} href="/impressum" className="inline-flex min-h-11 items-center hover:text-graphit">Impressum</Link></li>
          <li><Link prefetch={false} href="/datenschutz" className="inline-flex min-h-11 items-center hover:text-graphit">Datenschutz</Link></li>
        </ul>
      </div>
    </footer>
  );
}
