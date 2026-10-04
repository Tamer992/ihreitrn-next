"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { firma, navigation } from "@/inhalt/startseite";

export function Menue() {
  const [offen, setOffen] = useState(false);
  const id = useId();
  const knopf = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!offen) return;
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOffen(false);
        knopf.current?.focus();
      }
    };
    document.addEventListener("keydown", taste);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", taste);
      document.documentElement.style.overflow = "";
    };
  }, [offen]);

  return (
    <div className="lg:hidden">
      <button
        ref={knopf}
        type="button"
        aria-expanded={offen}
        aria-controls={id}
        onClick={() => setOffen((o) => !o)}
        className="relative z-40 -mr-2 flex h-12 items-center gap-3 px-2 font-semibold"
      >
        <span>{offen ? "Schließen" : "Menü"}</span>
        <span aria-hidden="true" className="relative block h-3 w-6">
          <span
            className={`absolute left-0 top-0 h-px w-6 bg-graphit transition-transform duration-[240ms] ease-ruhig ${offen ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`absolute bottom-0 left-0 h-px w-6 bg-graphit transition-transform duration-[240ms] ease-ruhig ${offen ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </span>
      </button>

      <div
        id={id}
        hidden={!offen}
        className="fixed inset-0 z-30 overflow-y-auto bg-alu px-[var(--rand)] pb-32 pt-24"
      >
        <nav aria-label="Hauptnavigation">
          <ul className="border-t border-linie">
            {navigation.map((n) => (
              <li key={n.href} className="border-b border-linie">
                <Link prefetch={false}
                  href={n.href}
                  onClick={() => setOffen(false)}
                  className="titel flex min-h-16 items-center text-[1.75rem]"
                >
                  {n.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-10 text-schiefer">
          Telefon <span className="nummer font-semibold text-graphit">{firma.telefon}</span>
          <br />
          E-Mail <a className="font-semibold text-graphit underline underline-offset-4" href={`mailto:${firma.email}`}>{firma.email}</a>
        </p>
      </div>
    </div>
  );
}
