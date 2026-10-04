import Link from "next/link";
import { firma, navigation } from "@/inhalt/startseite";
import { Wortmarke } from "./Wortmarke";
import { Menue } from "./Menue";

export function Kopf() {
  return (
    <header className="relative z-20">
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-weiss focus:px-4 focus:py-3"
      >
        Zum Inhalt springen
      </a>
      <div className="huelle flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link prefetch={false} href="/" className="-m-2 p-2">
          <Wortmarke />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[1.0625rem]">
            {navigation.map((n) => (
              <li key={n.href}>
                <Link prefetch={false} href={n.href} className="link font-medium">
                  {n.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <a href={firma.telefonLink} className="nummer nur-maus link font-titel text-[1.0625rem]">
            {firma.telefon}
          </a>
        </div>

        <Menue />
      </div>
    </header>
  );
}
