"use client";

import { useEffect, useRef } from "react";

type Art = "computer" | "handy";

// Entscheidet, ob die 3D-Szene läuft oder das statische Bild bleibt.
function darf3D(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) <= 2) return false;
  if ((nav.deviceMemory ?? 8) <= 2) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

const breitAb = "(min-width: 1024px)";

/**
 * Platz für die 3D-Szene. Es gibt zwei Plätze (Computer: klebt hinter Hero bis Leistungen,
 * Handy: Block im Hero). Aktiv ist nur der Platz, der zur Bildschirmbreite passt.
 * Das Ersatzbild (children) liegt darunter und wird gezeigt, wenn 3D nicht läuft.
 */
export function Szene({ art, children }: { art: Art; children: React.ReactNode }) {
  const huelle = useRef<HTMLDivElement>(null);
  const bild = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = huelle.current;
    const ersatz = bild.current;
    if (!el || !ersatz) return;
    const passt = window.matchMedia(breitAb).matches === (art === "computer");
    if (!passt) return;

    if (!darf3D()) {
      ersatz.dataset.zeigen = "ja";
      return;
    }

    let aufgeraeumt = false;
    const aufraeumen: (() => void)[] = [];

    const laden = async () => {
      const { starteNetzwerk } = await import("@/szene/netzwerk");
      if (aufgeraeumt) return;

      const netz = starteNetzwerk(el, {
        anzahl: art === "computer" ? 340 : 150,
        mobil: art === "handy",
        geordnet: art === "handy",
        beiBereit: () => {
          el.dataset.bereit = "ja";
          if (art === "handy") delete ersatz.dataset.zeigen;
        },
      });
      aufraeumen.push(() => netz.beende());

      // Scroll-Bezug nur am Computer (GSAP ScrollTrigger). Das Handy bekommt die leichtere Fassung ohne GSAP.
      if (art === "computer") {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (aufgeraeumt) return;
        gsap.registerPlugin(ScrollTrigger);
        const hero = document.getElementById("start");
        const leistungen = document.getElementById("leistungen");
        const bereich = document.getElementById("szenenbereich");
        const ausloeser = [
          hero &&
            ScrollTrigger.create({
              trigger: hero,
              start: "top top",
              end: "bottom top",
              onUpdate: (s) => netz.setzeVerlauf(s.progress),
            }),
          leistungen &&
            ScrollTrigger.create({
              trigger: leistungen,
              start: "top 85%",
              end: "top 15%",
              scrub: true,
              onUpdate: (s) => netz.setzeFlach(s.progress),
            }),
          bereich &&
            ScrollTrigger.create({
              trigger: bereich,
              start: "top bottom",
              end: "bottom top",
              onToggle: (s) => netz.pausiere(!s.isActive),
            }),
        ].filter(Boolean) as ScrollTrigger[];
        aufraeumen.push(() => ausloeser.forEach((t) => t.kill()));
      }

      if (art === "computer") {
        const bewegen = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          netz.setzeMaus((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
        };
        window.addEventListener("pointermove", bewegen, { passive: true });
        aufraeumen.push(() => window.removeEventListener("pointermove", bewegen));
      }

      if (art === "handy") {
        // Läuft nur, solange der Block im Bild ist. Der Auftritt beginnt beim ersten sichtbaren Bild.
        const io = new IntersectionObserver(([e]) => netz.pausiere(!e.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        aufraeumen.push(() => io.disconnect());
      }

      const sichtbarkeit = () => netz.pausiere(document.hidden);
      document.addEventListener("visibilitychange", sichtbarkeit);
      aufraeumen.push(() => document.removeEventListener("visibilitychange", sichtbarkeit));
    };

    // Erst laden, wenn die Seite steht und der Browser Luft hat.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const starten = () => {
      if (w.requestIdleCallback) w.requestIdleCallback(() => void laden(), { timeout: 1200 });
      else setTimeout(() => void laden(), 300);
    };
    // Handy: Sofort das statische Bild. Die 3D-Szene erst nach der ersten Berührung oder dem ersten
    // Scrollen nachladen (spart beim Seitenaufruf rund 150 KB Skript), dann sobald sie im Bild ist.
    let vorlauf: IntersectionObserver | undefined;
    const ereignisse = ["scroll", "touchstart", "pointerdown", "keydown"] as const;
    const beiErsterRegung = () => {
      ereignisse.forEach((n) => window.removeEventListener(n, beiErsterRegung));
      vorlauf = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          vorlauf?.disconnect();
          starten();
        },
        { threshold: 0.2 },
      );
      vorlauf.observe(el);
    };
    const wennGeladen = () => {
      if (art === "computer") return starten();
      ereignisse.forEach((n) => window.addEventListener(n, beiErsterRegung, { passive: true, once: true }));
    };
    if (art === "handy") ersatz.dataset.zeigen = "ja";
    if (document.readyState === "complete") wennGeladen();
    else window.addEventListener("load", wennGeladen, { once: true });

    return () => {
      aufgeraeumt = true;
      vorlauf?.disconnect();
      ereignisse.forEach((n) => window.removeEventListener(n, beiErsterRegung));
      window.removeEventListener("load", wennGeladen);
      aufraeumen.forEach((f) => f());
    };
  }, [art]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={bild}
        className="szene-ersatz absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-ruhig data-[zeigen=ja]:opacity-100"
      >
        {children}
      </div>
      <div
        ref={huelle}
        className="absolute inset-0 opacity-0 transition-opacity duration-[900ms] ease-ruhig data-[bereit=ja]:opacity-100"
      />
    </div>
  );
}
