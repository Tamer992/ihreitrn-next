// Alle Inhalte der Startseite. Quelle: Ordner Desktop/Webseite (index.html, preise.html,
// leistungen.html, ueber-mich.html, kontakt.html, llms.txt), Stand 04.10.2026.
// Nichts hinzuerfunden; Lücken stehen als [FEHLT: …] im Text.

export const firma = {
  name: "Ihre IT Rhein-Neckar",
  inhaber: "Tamer Kumaru",
  strasse: "Tilsiterstraße 30",
  plz: "69502",
  ort: "Hemsbach",
  telefon: "0152 07872002",
  telefonLink: "tel:+4915207872002",
  whatsapp: "https://wa.me/4915207872002",
  email: "kontakt@ihreitrn.de",
  web: "https://ihreitrn.de",
  erreichbarkeit: "Telefonisch jederzeit erreichbar, Termine nach Vereinbarung",
} as const;

export const navigation = [
  { href: "/leistungen", text: "Leistungen" },
  { href: "/geschaeftskunden", text: "Geschäftskunden" },
  { href: "/preise", text: "Preise" },
  { href: "/ueber-mich", text: "Über mich" },
  { href: "/kontakt", text: "Kontakt" },
] as const;

export const hero = {
  titel: ["Ihre IT.", "Einfach gelöst."],
  text: "IT-Hilfe vor Ort und per Fernwartung in Hemsbach, an der Bergstraße und im Rhein-Neckar-Kreis.",
  hinweis: "Die erste Einschätzung am Telefon ist kostenlos.",
};

export const person = {
  titel: "Wer ans Telefon geht, steht auch bei Ihnen.",
  zusagen: [
    {
      titel: "Eine Person",
      text: "Keine Warteschleife, kein wechselnder Ansprechpartner. Beim zweiten Mal weiß ich schon Bescheid.",
    },
    {
      titel: "Über 10 Jahre in der IT",
      text: "Gelernter IT-Systemelektroniker, vom einzelnen Arbeitsplatz bis zur Unternehmensumgebung.",
    },
    {
      titel: "Rückfragen inklusive",
      text: "Die Einweisung gehört zu jedem Auftrag. Rufen Sie zwei Tage später an, erkläre ich es gern noch einmal.",
    },
  ],
  bildAlt: "Tamer Kumaru, Inhaber von Ihre IT Rhein-Neckar, im blau karierten Hemd",
};

export const wege = [
  {
    titel: "Privat & Senioren",
    text: "Computer, Handy, Tablet, Drucker, WLAN und Fernsehen. Bei Ihnen zu Hause, in Ruhe erklärt, ohne Fachchinesisch.",
    link: { href: "/leistungen", text: "Leistungen für Privatkunden" },
  },
  {
    titel: "Unternehmen & Selbstständige",
    text: "Arbeitsplätze, Netzwerk, Microsoft 365, Wartung und Datensicherung für Büro, Praxis, Kanzlei und Handwerk. Netto abgerechnet, Termine auch außerhalb der Öffnungszeiten.",
    link: { href: "/geschaeftskunden", text: "Leistungen für Geschäftskunden" },
  },
] as const;

export type MotivName = "geraete" | "wlan" | "drucker" | "reparatur" | "sicherung" | "fernsehen";

export const leistungen: { motiv: MotivName; titel: string; text: string; href: string }[] = [
  {
    motiv: "geraete",
    titel: "Geräte einrichten",
    text: "PC, Laptop, Tablet und Handy startklar machen. Daten und Fotos kommen vom alten Gerät mit.",
    href: "/leistungen/geraete-einrichten",
  },
  {
    motiv: "wlan",
    titel: "WLAN & Internet",
    text: "Ständige Abbrüche, Funklöcher in der Wohnung, ein Router, der nie richtig eingerichtet wurde.",
    href: "/leistungen/wlan-internet",
  },
  {
    motiv: "drucker",
    titel: "Drucker & E-Mail",
    text: "Drucken und Scannen von Computer, Handy und Tablet. Postfächer, die überall funktionieren.",
    href: "/leistungen/drucker-email",
  },
  {
    motiv: "reparatur",
    titel: "Reparatur & Aufrüstung",
    text: "Bevor Sie neu kaufen: Oft macht eine SSD aus einem zähen Rechner wieder ein flottes Gerät.",
    href: "/leistungen/reparatur-aufruestung",
  },
  {
    motiv: "sicherung",
    titel: "Viren & Datensicherung",
    text: "Schadsoftware entfernen und eine Sicherung einrichten, die danach von allein läuft.",
    href: "/leistungen/viren-datensicherung",
  },
  {
    motiv: "fernsehen",
    titel: "Fernsehen & Streaming",
    text: "MagentaTV, Vodafone TV und Fernsehboxen anschließen, Sender sortieren, Mediathek erklären.",
    href: "/leistungen/fernsehen-streaming",
  },
];

export const vorOrt = {
  titel: "Vor Ort, und auf Wunsch per Fernwartung.",
  vorOrt:
    "Der Schwerpunkt liegt vor Ort. WLAN, Drucker, Fernsehbox und neue Geräte lassen sich am besten dort einrichten, wo sie stehen.",
  fern:
    "Eine Einstellung, ein Update, eine kurze Frage: Das geht auf Ihren Wunsch auch per Fernwartung. Die Verbindung startet nur mit Ihrer Freigabe, Sie sehen alles auf Ihrem Bildschirm mit und beenden sie jederzeit.",
  warnungTitel: "Wichtig",
  warnung:
    "Ich rufe Sie nie unaufgefordert an, um Fernwartung anzubieten. Erreicht Sie so ein Anruf, legen Sie bitte auf.",
};

export const ablauf = {
  titel: "Drei Schritte, mehr braucht es nicht.",
  schritte: [
    {
      titel: "Anrufen oder schreiben",
      text: "Sie schildern kurz, was nicht funktioniert. Die Einschätzung am Telefon ist kostenlos.",
    },
    {
      titel: "Termin vereinbaren",
      text: "Auch abends und am Wochenende, ohne Zuschlag. Sie erfahren vorher, womit Sie rechnen können.",
    },
    {
      titel: "Erledigt",
      text: "Ich behebe das Problem und erkläre, was ich gemacht habe. Bezahlt wird danach.",
    },
  ],
};

export const preise = {
  titel: "Ein Stundensatz. Keine Überraschungen.",
  betrag: "69 €",
  einheit: "pro Stunde",
  mwst: "Endpreis inkl. 19 % MwSt.",
  takt: "Erste angefangene Stunde, danach im 15-Minuten-Takt, also 17,25 € je angefangene Viertelstunde. Derselbe Satz gilt vor Ort und bei Fernwartung.",
  punkte: [
    "Erstberatung am Telefon kostenlos, auch ohne Auftrag.",
    "Kein Zuschlag am Abend oder am Wochenende.",
    "Lohnt sich eine Reparatur nicht, sage ich Ihnen das.",
    "Bezahlung bar oder per Überweisung, immer mit Rechnung.",
  ],
  anfahrtTitel: "Anfahrt, einmal pro Termin",
  anfahrt: [
    { wo: "Hemsbach", preis: "0 €" },
    { wo: "bis 10 km", preis: "10 €" },
    { wo: "bis 25 km", preis: "15 €" },
    { wo: "weiter entfernt", preis: "nach Absprache" },
    { wo: "Fernwartung", preis: "ohne Anfahrt" },
  ],
  gewerbe: "Für Betriebe gilt ein eigener Satz von 79 € netto pro Stunde, Rechnung mit ausgewiesener Umsatzsteuer.",
  link: { href: "/preise", text: "Preise und Beispiele" },
};

// Lage der Orte (Breite, Länge), gerundet. Nur zur Platzierung im Schaubild.
// Zone = Anfahrtsstaffel laut preise.html und llms.txt.
export const einzugsgebiet = {
  titel: "Vor Ort in Hemsbach, Weinheim und im Rhein-Neckar-Kreis.",
  text: "In Hemsbach fällt keine Anfahrt an. In der Umgebung gilt eine Pauschale nach Entfernung, einmal pro Termin. Ihr Ort fehlt? Fragen Sie einfach nach.",
  mitte: { name: "Hemsbach", lat: 49.5906, lon: 8.6556 },
  orte: [
    { name: "Laudenbach", lat: 49.6131, lon: 8.6539, zone: 10, lage: "rechts" },
    { name: "Heppenheim", lat: 49.6433, lon: 8.6383, zone: 10, lage: "rechts" },
    { name: "Sulzbach", lat: 49.5653, lon: 8.6625, zone: 10, lage: "rechts" },
    { name: "Weinheim", lat: 49.5486, lon: 8.6667, zone: 10, lage: "rechts" },
    { name: "Hirschberg", lat: 49.5083, lon: 8.6589, zone: 10, lage: "rechts" },
    { name: "Bensheim", lat: 49.6811, lon: 8.6175, zone: 25, lage: "rechts" },
    { name: "Viernheim", lat: 49.5383, lon: 8.5786, zone: 25, lage: "links" },
    { name: "Heddesheim", lat: 49.5056, lon: 8.6031, zone: 25, lage: "links" },
    { name: "Schriesheim", lat: 49.4736, lon: 8.6597, zone: 25, lage: "rechts" },
    { name: "Ladenburg", lat: 49.4736, lon: 8.6097, zone: 25, lage: "oben" },
    { name: "Ilvesheim", lat: 49.4719, lon: 8.5672, zone: 25, lage: "links" },
    { name: "Edingen-Neckarhausen", lat: 49.4553, lon: 8.6075, zone: 25, lage: "unten" },
    { name: "Mannheim", lat: 49.4875, lon: 8.466, zone: 25, lage: "links" },
  ],
  zonen: [
    { zone: 0, titel: "Hemsbach", preis: "0 €" },
    { zone: 10, titel: "bis 10 km", preis: "10 €" },
    { zone: 25, titel: "bis 25 km", preis: "15 €" },
  ],
  weiter: "Übriger Rhein-Neckar-Kreis und Kreis Bergstraße: Anfahrt nach Absprache.",
};

export const kontakt = {
  titel: "Erzählen Sie mir, was nicht funktioniert.",
  text: "Ein kurzer Anruf genügt. Die erste Einschätzung bekommen Sie sofort und kostenlos.",
  rueckruf: "Bin ich gerade bei einem Kunden, rufe ich in der Regel innerhalb einer Stunde zurück.",
  whatsappText: "Praktisch, wenn Sie ein Foto der Fehlermeldung schicken möchten.",
  emailText: "Für ausführlichere Anliegen. Antwort in der Regel innerhalb eines Tages.",
};

export const fuss = {
  satz: "IT-Hilfe für Privatkunden, Senioren und Unternehmen im Rhein-Neckar-Raum.",
  datenschutz: "Diese Website setzt keine Cookies und verwendet keine Analyse-Werkzeuge.",
};
