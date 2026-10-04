import {
  BufferAttribute,
  BufferGeometry,
  Group,
  LineSegments,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { durcheinander, kugel, nachbarn, speichen, zufall, type V3 } from "./geometrie";

export type Netzwerk = {
  /** 0 = Hero oben, 1 = Hero ganz verlassen */
  setzeVerlauf: (wert: number) => void;
  /** 0 = Kugel, 1 = flaches Raster hinter den Leistungen */
  setzeFlach: (wert: number) => void;
  setzeMaus: (x: number, y: number) => void;
  pausiere: (pause: boolean) => void;
  beende: () => void;
};

type Optionen = { anzahl: number; mobil: boolean; geordnet?: boolean; beiBereit?: () => void };

const RADIUS = 1.6;

const gemeinsam = /* glsl */ `
  attribute vec3 aChaos;
  attribute vec3 aKugel;
  attribute vec3 aRaster;
  attribute float aSeed;
  uniform float uZeit;
  uniform float uOrdnung;
  uniform float uFlach;
  uniform float uDrehung;

  vec3 lage(out float tiefe) {
    float s = aSeed;
    vec3 drift = vec3(sin(uZeit * 0.31 + s * 17.0), cos(uZeit * 0.27 + s * 11.0), sin(uZeit * 0.23 + s * 23.0)) * 0.16;
    float o = smoothstep(0.0, 1.0, clamp(uOrdnung * 1.7 - s * 0.7, 0.0, 1.0));
    vec3 p = mix(aChaos + drift, aKugel, o);
    float c = cos(uDrehung), si = sin(uDrehung);
    p = vec3(c * p.x + si * p.z, p.y, -si * p.x + c * p.z);
    tiefe = mix(0.5 + 0.5 * smoothstep(-${RADIUS.toFixed(1)}, ${RADIUS.toFixed(1)}, p.z), 1.0, 1.0 - o);
    float f = smoothstep(0.0, 1.0, clamp(uFlach * 1.6 - s * 0.6, 0.0, 1.0));
    tiefe = mix(tiefe, 1.0, f);
    return mix(p, aRaster, f);
  }
`;

const punktVertex = /* glsl */ `
  ${gemeinsam}
  attribute float aAkzent;
  uniform float uGroesse;
  uniform float uPixel;
  varying float vTiefe;
  varying float vAkzent;
  void main() {
    float tiefe;
    vec3 p = lage(tiefe);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float groesse = uGroesse * mix(1.0, 2.5, aAkzent) * mix(1.0, 0.7, uFlach * (1.0 - aAkzent));
    gl_PointSize = groesse * uPixel * (10.0 / -mv.z);
    vTiefe = tiefe;
    vAkzent = aAkzent;
  }
`;

// Kleine Metallkugeln: Licht von links oben, Glanzpunkt, dunkler Rand.
const punktFragment = /* glsl */ `
  uniform float uDeckkraft;
  uniform float uFlach;
  varying float vTiefe;
  varying float vAkzent;
  void main() {
    vec2 c = gl_PointCoord * 2.0 - 1.0;
    float d = dot(c, c);
    if (d > 1.0) discard;
    vec3 n = vec3(c.x, -c.y, sqrt(1.0 - d));
    vec3 l = normalize(vec3(-0.45, 0.65, 0.62));
    float diff = max(dot(n, l), 0.0);
    float glanz = pow(max(dot(reflect(-l, n), vec3(0.0, 0.0, 1.0)), 0.0), 22.0);
    vec3 stahl = vec3(0.36, 0.41, 0.47);
    vec3 blau = vec3(0.157, 0.353, 0.573);
    vec3 grund = mix(stahl, blau, vAkzent);
    vec3 farbe = grund * (0.42 + 0.7 * diff) + vec3(glanz) * mix(0.75, 0.55, vAkzent);
    float rand = smoothstep(1.0, 0.78, d);
    gl_FragColor = vec4(farbe, rand * uDeckkraft * mix(vTiefe, 1.0 - uFlach, vAkzent));
  }
`;

const linieVertex = /* glsl */ `
  ${gemeinsam}
  attribute float aSpeiche;
  varying float vTiefe;
  varying float vSpeiche;
  void main() {
    float tiefe;
    vec3 p = lage(tiefe);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    vTiefe = tiefe;
    vSpeiche = aSpeiche;
  }
`;

const linieFragment = /* glsl */ `
  uniform float uDeckkraft;
  uniform float uFlach;
  uniform float uOrdnung;
  varying float vTiefe;
  varying float vSpeiche;
  void main() {
    vec3 schiefer = vec3(0.345, 0.329, 0.306);
    vec3 blau = vec3(0.157, 0.353, 0.573);
    float a = mix(0.1, 0.19, smoothstep(0.4, 1.0, uOrdnung));
    a = mix(a, 0.42, vSpeiche * uOrdnung);
    a *= vTiefe * uDeckkraft * (1.0 - uFlach);
    gl_FragColor = vec4(mix(schiefer, blau, vSpeiche), a);
  }
`;

export function starteNetzwerk(huelle: HTMLElement, { anzahl, mobil, geordnet = false, beiBereit }: Optionen): Netzwerk {
  const z = zufall(42);

  // Lagen je Punkt
  const kugelLage: V3[] = [[0, 0, 0], ...kugel(anzahl - 1, RADIUS)];
  const chaosLage: V3[] = durcheinander(anzahl, RADIUS, 11);
  const spalten = 24;
  const zeilen = Math.ceil(anzahl / spalten);
  const abstand = 0.62;
  const neigung = 0.52;
  const rasterLage: V3[] = Array.from({ length: anzahl }, (_, i) => {
    // Punkt 0 (blau) in die Mitte des Rasters
    const k = i === 0 ? Math.floor(zeilen / 2) * spalten + Math.floor(spalten / 2) : i <= Math.floor(zeilen / 2) * spalten + Math.floor(spalten / 2) ? i - 1 : i;
    const x = ((k % spalten) - (spalten - 1) / 2) * abstand;
    const t = (Math.floor(k / spalten) - (zeilen - 1) / 2) * abstand;
    return [x, -t * Math.sin(neigung) - 0.9, t * Math.cos(neigung)];
  });
  const saat = Array.from({ length: anzahl }, () => z());
  saat[0] = 0.5;

  const flach = (liste: V3[]) => new Float32Array(liste.flat());

  // Punkte
  const punktGeo = new BufferGeometry();
  punktGeo.setAttribute("position", new BufferAttribute(flach(kugelLage), 3));
  punktGeo.setAttribute("aKugel", new BufferAttribute(flach(kugelLage), 3));
  punktGeo.setAttribute("aChaos", new BufferAttribute(flach(chaosLage), 3));
  punktGeo.setAttribute("aRaster", new BufferAttribute(flach(rasterLage), 3));
  punktGeo.setAttribute("aSeed", new BufferAttribute(new Float32Array(saat), 1));
  punktGeo.setAttribute("aAkzent", new BufferAttribute(new Float32Array(anzahl).map((_, i) => (i === 0 ? 1 : 0)), 1));

  // Linien: Nachbarn auf der Kugel plus Speichen zum blauen Punkt
  const kanten = nachbarn(kugelLage, 3);
  const speichenKanten = speichen(anzahl, mobil ? 10 : 16).map((i) => [0, i] as [number, number]);
  const alle = [...kanten, ...speichenKanten];
  const ecke = (quelle: V3[]) => new Float32Array(alle.flatMap(([a, b]) => [...quelle[a], ...quelle[b]]));
  const linieGeo = new BufferGeometry();
  linieGeo.setAttribute("position", new BufferAttribute(ecke(kugelLage), 3));
  linieGeo.setAttribute("aKugel", new BufferAttribute(ecke(kugelLage), 3));
  linieGeo.setAttribute("aChaos", new BufferAttribute(ecke(chaosLage), 3));
  linieGeo.setAttribute("aRaster", new BufferAttribute(ecke(rasterLage), 3));
  linieGeo.setAttribute("aSeed", new BufferAttribute(new Float32Array(alle.flatMap(([a, b]) => [saat[a], saat[b]])), 1));
  linieGeo.setAttribute(
    "aSpeiche",
    new BufferAttribute(new Float32Array(alle.flatMap((_, i) => (i >= kanten.length ? [1, 1] : [0, 0]))), 1),
  );

  const pixel = Math.min(window.devicePixelRatio || 1, mobil ? 1.25 : 1.5);
  const uniforms = {
    uZeit: { value: 0 },
    uOrdnung: { value: 0 },
    uFlach: { value: 0 },
    uDrehung: { value: 0 },
    uDeckkraft: { value: 0 },
    uGroesse: { value: mobil ? 7.5 : 6.5 },
    uPixel: { value: pixel },
  };

  const punktMat = new ShaderMaterial({
    uniforms,
    vertexShader: punktVertex,
    fragmentShader: punktFragment,
    transparent: true,
    depthWrite: false,
  });
  const linieMat = new ShaderMaterial({
    uniforms,
    vertexShader: linieVertex,
    fragmentShader: linieFragment,
    transparent: true,
    depthWrite: false,
  });

  const gruppe = new Group();
  gruppe.add(new LineSegments(linieGeo, linieMat));
  gruppe.add(new Points(punktGeo, punktMat));
  // Handy: so groß wie das statische Bild, das die Szene ablöst
  if (mobil) gruppe.scale.setScalar(1.45);
  const szene = new Scene();
  szene.add(gruppe);

  const kamera = new PerspectiveCamera(32, 1, 0.1, 60);
  kamera.position.set(0, 0, 10);

  const renderer = new WebGLRenderer({ antialias: !mobil, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(pixel);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.setAttribute("aria-hidden", "true");
  huelle.appendChild(renderer.domElement);

  let seitenverhaeltnis = 1;
  const anpassen = () => {
    const b = huelle.clientWidth || 1;
    const h = huelle.clientHeight || 1;
    seitenverhaeltnis = b / h;
    renderer.setSize(b, h, false);
    kamera.aspect = seitenverhaeltnis;
    kamera.updateProjectionMatrix();
  };
  anpassen();
  const beobachter = new ResizeObserver(anpassen);
  beobachter.observe(huelle);

  // Zustand
  let verlauf = 0;
  let flachZiel = 0;
  let flachIst = 0;
  const maus = { x: 0, y: 0, ix: 0, iy: 0 };
  let pause = false;
  let bild = 0;
  let zuletzt = performance.now();
  let start = -1;
  let drehung = 0;
  let leer = false;
  const glatt = (a: number, b: number, x: number) => {
    const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
    return t * t * (3 - 2 * t);
  };

  const schleife = (jetzt: number) => {
    bild = requestAnimationFrame(schleife);
    if (pause) {
      zuletzt = jetzt;
      return;
    }
    const dt = Math.min((jetzt - zuletzt) / 1000, 0.05);
    zuletzt = jetzt;
    if (start < 0) start = jetzt;
    const seit = (jetzt - start) / 1000;

    // Auftritt: einblenden, dann ordnen sich die Punkte (ca. 3 s)
    // geordnet: ohne Durcheinander-Auftritt (Handy, löst das statische Bild ab)
    const o = geordnet ? 1 : Math.min(Math.max((seit - 0.5) / 3.2, 0), 1);
    uniforms.uOrdnung.value = o < 0.5 ? 4 * o * o * o : 1 - Math.pow(-2 * o + 2, 3) / 2;

    flachIst += (flachZiel - flachIst) * Math.min(dt * 4, 1);
    uniforms.uFlach.value = flachIst;

    // Sichtbarkeit: Die Kugel gehört zum Hero und blendet beim Verlassen aus. Danach ist nichts mehr zu sehen
    // (das Raster hinter den Leistungen ist seit 04.10.2026 abgeschaltet, setzeFlach wird nicht mehr aufgerufen).
    const kugelAnteil = mobil ? 1 : 1 - glatt(0.3, 0.8, verlauf);
    const deck = Math.min(seit / 0.9, 1) * kugelAnteil * (1 - flachIst);
    uniforms.uDeckkraft.value = deck;
    if (deck < 0.004) {
      if (!leer) renderer.clear();
      leer = true;
      return;
    }
    leer = false;
    uniforms.uZeit.value += dt;
    drehung += dt * 0.08;
    uniforms.uDrehung.value = drehung + verlauf * 1.1;

    maus.ix += (maus.x - maus.ix) * Math.min(dt * 2.5, 1);
    maus.iy += (maus.y - maus.iy) * Math.min(dt * 2.5, 1);
    gruppe.rotation.x = (0.12 + maus.iy * 0.14) * (1 - flachIst);
    gruppe.rotation.y = maus.ix * 0.2 * (1 - flachIst);

    // Am Computer steht die Kugel rechts neben dem Text, beim Raster in der Mitte
    const sichtBreite = 2 * 10 * Math.tan((32 * Math.PI) / 360) * seitenverhaeltnis;
    const rechts = mobil ? 0 : Math.min(sichtBreite * 0.24, 3.1);
    gruppe.position.x = rechts * (1 - flachIst);
    gruppe.position.y = (mobil ? 0 : 0.15 - verlauf * 0.5) * (1 - flachIst);

    renderer.render(szene, kamera);
    if (beiBereit) {
      beiBereit();
      beiBereit = undefined;
    }
  };
  bild = requestAnimationFrame(schleife);

  return {
    setzeVerlauf: (w) => (verlauf = w),
    setzeFlach: (w) => (flachZiel = w),
    setzeMaus: (x, y) => {
      maus.x = x;
      maus.y = y;
    },
    pausiere: (p) => (pause = p),
    beende: () => {
      cancelAnimationFrame(bild);
      beobachter.disconnect();
      punktGeo.dispose();
      linieGeo.dispose();
      punktMat.dispose();
      linieMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
