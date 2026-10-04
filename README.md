# Ihre IT Rhein-Neckar: neue Website (Entwurf)

Neuaufbau von ihreitrn.de mit Next.js, TypeScript, Tailwind CSS und Three.js. Stand: nur die Startseite, Unterseiten sind Platzhalter. Die Live-Seite läuft weiter aus dem alten Projekt.

## Vorschau

Bei jedem Hochladen auf `main` baut GitHub die Seite neu: https://tamer992.github.io/ihreitrn-next/ (für Suchmaschinen gesperrt).

## Befehle

```bash
npm install
npm run dev      # Entwicklung auf http://localhost:3000
npm run build    # statischer Export nach out/
node pruefung/server.mjs 4351   # fertigen Export ansehen (wie nginx, mit gzip)
node pruefung/pruefen.mjs       # Prüfung: Breiten 320-1920, Überlauf, Wortbrüche, Links, CLS, axe
```

## Wo was steht

- `src/inhalt/startseite.ts`: alle Texte, Preise, Kontaktdaten, Orte
- `src/app/globals.css`: Design-Tokens (Farben, Schrift, Abstände, Bewegung)
- `src/components/`: Bausteine der Seite, `abschnitte/` je Abschnitt der Startseite
- `src/szene/`: 3D-Szene (Three.js) und das statische Ersatzbild
- `pruefung/`: Vorschau-Server und Prüfskript

Der Entwurf ist für Suchmaschinen gesperrt (`src/app/robots.ts`, `robots` in `src/app/layout.tsx`).
