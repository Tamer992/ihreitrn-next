import QRCode from "qrcode";
import { firma } from "@/inhalt/startseite";

// QR-Code wird beim Bauen erzeugt, kein Dienst von außen.
async function qrSvg(inhalt: string) {
  return QRCode.toString(inhalt, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "M",
    color: { dark: "#0f1b2bff", light: "#00000000" },
  });
}

/** Nummer groß als Text. Am Computer zusätzlich QR-Code zum Anrufen, auf Touch ruft man über die Leiste unten an. */
export async function NummerGross({ gross = false }: { gross?: boolean }) {
  const svg = await qrSvg(firma.telefonLink);
  const nummerKlasse = gross
    ? "text-[clamp(2.25rem,1.4rem+3.6vw,4.25rem)]"
    : "text-[clamp(1.875rem,1.4rem+2vw,2.75rem)]";
  return (
    <div className="flex items-end gap-6">
      <div>
        <p className="text-klein text-schiefer">Telefon</p>
        <p className={`nummer titel font-medium ${nummerKlasse}`}>{firma.telefon}</p>
      </div>
      <figure className="nur-maus shrink-0">
        <div
          className="h-[5.25rem] w-[5.25rem] bg-weiss p-2 outline outline-1 -outline-offset-1 outline-linie"
          role="img"
          aria-label={`QR-Code: mit dem Handy scannen, um ${firma.telefon} anzurufen`}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <figcaption className="mt-1.5 text-[0.8125rem] leading-tight text-schiefer">Mit dem Handy<br />scannen</figcaption>
      </figure>
    </div>
  );
}

export function WeitereWege({ mitText = false, whatsappText, emailText }: { mitText?: boolean; whatsappText?: string; emailText?: string }) {
  return (
    <ul className={mitText ? "grid gap-8 sm:grid-cols-2" : "flex flex-wrap gap-x-8 gap-y-1"}>
      <li>
        <a href={firma.whatsapp} className="link" rel="noopener">
          WhatsApp-Nachricht <span className="pfeil" aria-hidden="true">→</span>
        </a>
        {mitText && whatsappText && <p className="mt-1 text-schiefer">{whatsappText}</p>}
      </li>
      <li>
        <a href={`mailto:${firma.email}`} className="link">
          {firma.email} <span className="pfeil" aria-hidden="true">→</span>
        </a>
        {mitText && emailText && <p className="mt-1 text-schiefer">{emailText}</p>}
      </li>
    </ul>
  );
}
