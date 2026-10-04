"use client";

import { useEffect } from "react";

// Steuert alle Scroll-Bewegungen der Seite an einer Stelle, ohne Bibliothek (leicht für Handys):
// - Inhalte (data-einblenden) gleiten in 900 ms herein, nur wenn sie beim Laden unterhalb des Bildschirms liegen.
// - Zier-Linien und Ringe (data-zier) ziehen sich in 1500 ms auf, sobald sie gut im Bild sind.
// - Zeichnungen der Leistungen (data-zier="zeichnung") zeichnen sich dabei einmal auf.
// Die Übergänge selbst stehen in globals.css. Ohne JavaScript oder bei „Bewegung reduzieren“ ist alles sofort sichtbar.
export function Bewegung() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const unten = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.96;
    const anzeigen = (el: Element) => el.setAttribute("data-zustand", "da");

    // Gleichzeitig hereinkommende Elemente leicht gestaffelt (70 ms)
    const inhaltBeobachter = new IntersectionObserver(
      (eintraege) => {
        eintraege
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.transitionDelay = `${i * 70}ms`;
            anzeigen(el);
            setTimeout(() => (el.style.transitionDelay = ""), 1200);
            inhaltBeobachter.unobserve(e.target);
          });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    const zierBeobachter = new IntersectionObserver(
      (eintraege) =>
        eintraege.forEach((e) => {
          if (!e.isIntersecting) return;
          anzeigen(e.target);
          zierBeobachter.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -28% 0px" },
    );

    document.querySelectorAll("[data-einblenden]").forEach((el) => {
      if (!unten(el)) return;
      el.setAttribute("data-zustand", "wartet");
      inhaltBeobachter.observe(el);
    });
    document.querySelectorAll("[data-zier]").forEach((el) => {
      if (!unten(el)) return;
      el.setAttribute("data-zustand", "wartet");
      zierBeobachter.observe(el);
    });

    return () => {
      inhaltBeobachter.disconnect();
      zierBeobachter.disconnect();
    };
  }, []);

  return null;
}
