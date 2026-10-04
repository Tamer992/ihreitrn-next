// Unterpfad für die Vorschau auf GitHub Pages (z. B. "/ihreitrn-vorschau"). Auf ihreitrn.de leer.
export const BASIS = process.env.NEXT_PUBLIC_BASIS ?? "";

/** Pfad zu einer Datei aus public/ oder einer eigenen Route, mit Unterpfad der Vorschau. */
export const pfad = (p: string) => `${BASIS}${p}`;
