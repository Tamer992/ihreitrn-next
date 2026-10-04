// Kleiner Vorschau-Server für den statischen Export in out/.
// Verhält sich wie nginx auf ihreitrn.de: /seite → seite.html, unbekannt → 404.html.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const wurzel = path.resolve(import.meta.dirname, "../out");
const port = Number(process.argv[2] || 4351);
const typen = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".json": "application/json",
};

http
  .createServer((req, res) => {
    const pfad = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const kandidaten = [pfad, `${pfad}.html`, path.join(pfad, "index.html")];
    for (const k of kandidaten) {
      const datei = path.join(wurzel, k);
      if (datei.startsWith(wurzel) && fs.existsSync(datei) && fs.statSync(datei).isFile()) {
        const typ = typen[path.extname(datei)] || "application/octet-stream";
        // wie nginx (gzip on): Textdateien komprimiert ausliefern
        if (/text|javascript|svg|json|xml/.test(typ) && /gzip/.test(req.headers["accept-encoding"] || "")) {
          res.writeHead(200, { "Content-Type": typ, "Content-Encoding": "gzip", Vary: "Accept-Encoding" });
          return fs.createReadStream(datei).pipe(zlib.createGzip()).pipe(res);
        }
        res.writeHead(200, { "Content-Type": typ });
        return fs.createReadStream(datei).pipe(res);
      }
    }
    res.writeHead(404, { "Content-Type": typen[".html"] });
    fs.createReadStream(path.join(wurzel, "404.html")).pipe(res);
  })
  .listen(port, () => console.log(`Vorschau: http://localhost:${port}`));
