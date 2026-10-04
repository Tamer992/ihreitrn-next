// Prüfung der Startseite (nach den gesicherten Prüfskripten aus dem Vault, zusammengefasst).
// Voraussetzung: `npm run build` und Vorschau-Server auf 4351 (node pruefung/server.mjs).
// Aufruf: node pruefung/pruefen.mjs [Zielordner]
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const BASIS = process.env.BASIS || "http://localhost:4351";
const ZIEL = path.resolve(process.argv[2] || "pruefung/ergebnis");
fs.mkdirSync(ZIEL, { recursive: true });
const axeQuelle = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");

const touchMedien = [
  { name: "hover", value: "none" },
  { name: "pointer", value: "coarse" },
  { name: "any-hover", value: "none" },
  { name: "any-pointer", value: "coarse" },
];
const breiten = [
  { w: 320, h: 700, touch: true },
  { w: 375, h: 812, touch: true },
  { w: 768, h: 1024, touch: true },
  { w: 1024, h: 768, touch: false },
  { w: 1280, h: 800, touch: false },
  { w: 1440, h: 900, touch: false },
  { w: 1920, h: 1080, touch: false },
];
const fotoBreiten = new Set([375, 768, 1280, 1920]);

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const bericht = { seite: "/", breiten: [], links: [], axe: [] };
const links = new Set();

for (const b of breiten) {
  const ctx = await browser.newContext({ viewport: { width: b.w, height: b.h }, deviceScaleFactor: 1, hasTouch: b.touch, isMobile: b.touch });
  const page = await ctx.newPage();
  if (b.touch) {
    const cdp = await ctx.newCDPSession(page);
    await cdp.send("Emulation.setEmulatedMedia", { features: touchMedien });
  }
  const konsole = [];
  page.on("console", (m) => m.type() === "error" && konsole.push(m.text()));
  page.on("pageerror", (e) => konsole.push(String(e)));
  await page.addInitScript(() => {
    window.__cls = 0;
    new PerformanceObserver((l) => l.getEntries().forEach((e) => !e.hadRecentInput && (window.__cls += e.value))).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto(BASIS + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // Langsam bis ganz nach unten scrollen, damit alle Einblendungen auslösen
  const hoehe = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= hoehe; y += Math.round(b.h * 0.6)) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await page.waitForTimeout(160);
  }
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(600);

  const messung = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const ueberlauf = [...document.querySelectorAll("body *")]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && (r.right > vw + 1 || r.left < -1) && !e.closest("[aria-hidden=true]") && getComputedStyle(e).position !== "fixed";
      })
      .slice(0, 8)
      .map((e) => `${e.tagName}.${String(e.className).slice(0, 40)} (${Math.round(e.getBoundingClientRect().right)})`);
    // Wörter, die mitten im Wort umbrechen
    const brueche = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const t = walker.currentNode;
      if (!t.parentElement || t.parentElement.closest("[aria-hidden=true],script,style,noscript")) continue;
      const re = /[\p{L}\p{N}][\p{L}\p{N}@.\-]*/gu;
      let m;
      while ((m = re.exec(t.data))) {
        if (m[0].length < 4) continue;
        const r = document.createRange();
        r.setStart(t, m.index);
        r.setEnd(t, m.index + m[0].length);
        const rects = [...r.getClientRects()].filter((x) => x.width > 0);
        if (rects.length > 1 && !/-/.test(m[0])) brueche.push(m[0]);
        if (rects.length > 1 && /-/.test(m[0])) brueche.push(m[0] + " (am Bindestrich)");
      }
    }
    // Tippflächen unter 44 px
    const klein = [...document.querySelectorAll("a, button")]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && (r.height < 44 || r.width < 24) && getComputedStyle(e).visibility !== "hidden";
      })
      .map((e) => `${(e.textContent || "").trim().slice(0, 30)} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);
    const ohneAlt = [...document.querySelectorAll("img:not([alt])")].map((i) => i.src);
    const hrefs = [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href"));
    return { ueberlauf, brueche: [...new Set(brueche)], klein, ohneAlt, hrefs, cls: window.__cls, canvas: document.querySelectorAll("canvas").length };
  });
  messung.hrefs.forEach((h) => links.add(h));
  delete messung.hrefs;
  bericht.breiten.push({ breite: b.w, touch: b.touch, konsole, ...messung });

  if (fotoBreiten.has(b.w)) {
    // Seite abschnittsweise aufnehmen (ein Fenster in Seitenhöhe würde den Hero mit 100svh aufblähen,
    // fullPage verliert die Touch-Emulation). Zusammensetzen danach mit pruefung/boegen.py.
    await page.waitForTimeout(3500);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    let n = 0;
    for (let y = 0; y < h; y += b.h) {
      await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
      await page.waitForTimeout(y === 0 ? 200 : 1300);
      await page.screenshot({ path: path.join(ZIEL, `start-${b.w}-${String(++n).padStart(2, "0")}.png`) });
    }
  }
  await ctx.close();
}

// Links prüfen
const ctx = await browser.newContext();
for (const h of links) {
  if (/^(tel:|mailto:|#)/.test(h)) {
    bericht.links.push({ h, status: "ok (kein Abruf)" });
    continue;
  }
  if (/^https?:/.test(h) && !h.startsWith(BASIS)) {
    bericht.links.push({ h, status: "extern, nicht abgerufen" });
    continue;
  }
  const r = await ctx.request.get(new URL(h, BASIS).toString());
  bericht.links.push({ h, status: r.status() });
}

// Barrierefreiheit mit axe, Handy und Computer, normal und mit reduzierter Bewegung
for (const [w, touch, reduziert] of [
  [375, true, false],
  [375, true, true],
  [1280, false, false],
  [1280, false, true],
]) {
  const c = await browser.newContext({ viewport: { width: w, height: 900 }, hasTouch: touch, isMobile: touch });
  const p = await c.newPage();
  if (reduziert) await p.emulateMedia({ reducedMotion: "reduce" });
  await p.goto(BASIS + "/", { waitUntil: "networkidle" });
  const hoehe = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= hoehe; y += 500) {
    await p.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await p.waitForTimeout(120);
  }
  await p.waitForTimeout(1500);
  await p.addScriptTag({ content: axeQuelle });
  const v = await p.evaluate(async () =>
    (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"] })).violations.map(
      (v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ") + " " + (n.any[0]?.message || "").slice(0, 100)).join(" || ")}`,
    ),
  );
  // Ersatzbild bei reduzierter Bewegung sichtbar?
  const ersatz = await p.evaluate(() => [...document.querySelectorAll(".szene-ersatz")].map((e) => e.dataset.zeigen || "nein"));
  bericht.axe.push({ breite: w, reduziert, verstoesse: v, ersatzbild: ersatz });
  await c.close();
}

await browser.close();
fs.writeFileSync(path.join(ZIEL, "bericht.json"), JSON.stringify(bericht, null, 2));

// Kurzfassung
for (const b of bericht.breiten) {
  const probleme = [
    b.ueberlauf.length && `Überlauf: ${b.ueberlauf.join(", ")}`,
    b.brueche.length && `Wortbrüche: ${b.brueche.join(", ")}`,
    b.klein.length && `Kleine Tippflächen: ${b.klein.join(" | ")}`,
    b.ohneAlt.length && `Bilder ohne alt: ${b.ohneAlt.length}`,
    b.konsole.length && `Konsole: ${b.konsole.join(" | ")}`,
    b.cls > 0.01 && `CLS ${b.cls.toFixed(3)}`,
  ].filter(Boolean);
  console.log(`${b.breite}px${b.touch ? " (Touch)" : ""}: ${probleme.length ? "\n  " + probleme.join("\n  ") : "ok"}  [CLS ${b.cls.toFixed(3)}, Canvas ${b.canvas}]`);
}
const kaputt = bericht.links.filter((l) => typeof l.status === "number" && l.status >= 400);
console.log(`Links: ${bericht.links.length} geprüft, ${kaputt.length} defekt${kaputt.length ? ": " + kaputt.map((k) => k.h).join(", ") : ""}`);
for (const a of bericht.axe) console.log(`axe ${a.breite}px${a.reduziert ? " reduziert" : ""}: ${a.verstoesse.length ? "\n  " + a.verstoesse.join("\n  ") : "ok"}  [Ersatzbild: ${a.ersatzbild.join("/")}]`);
