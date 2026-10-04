import Link from "next/link";
import { Kopf } from "./Kopf";
import { Fuss } from "./Fuss";
import { Anrufleiste } from "./Anrufleiste";

// Platzhalter für Unterseiten, die nach Freigabe der Startseite gebaut werden.
export function Folgt({ titel }: { titel: string }) {
  return (
    <>
      <Kopf />
      <main id="inhalt" className="huelle py-[var(--abschnitt)]">
        <h1 className="titel titel-2">{titel}</h1>
        <p className="mt-6 fehlt">[FEHLT: Seite folgt nach Freigabe der Startseite]</p>
        <p className="mt-8">
          <Link prefetch={false} href="/" className="link link--blau">
            Zur Startseite <span className="pfeil" aria-hidden="true">→</span>
          </Link>
        </p>
      </main>
      <Fuss />
      <Anrufleiste />
    </>
  );
}
