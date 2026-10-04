import { firma } from "@/inhalt/startseite";

// Nur auf Touch-Geräten: feste Leiste unten. Einziger Anruf-Knopf auf dem Handy.
export function Anrufleiste() {
  return (
    <>
      <div className="nur-touch h-[4.75rem]" aria-hidden="true" />
      <aside aria-label="Schnellkontakt" className="nur-touch fixed inset-x-0 bottom-0 z-30 border-t border-linie bg-weiss pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-[1.6fr_1fr]">
          <a
            href={firma.telefonLink}
            className="flex h-[4.75rem] flex-col justify-center bg-blau px-5 text-weiss active:bg-blau-tief"
          >
            <span className="text-[0.875rem] leading-none opacity-85">Anrufen</span>
            <span className="nummer titel mt-1.5 text-[1.375rem] font-semibold leading-none">{firma.telefon}</span>
          </a>
          <a href={firma.whatsapp} rel="noopener" className="flex h-[4.75rem] items-center justify-center font-semibold active:bg-alu">
            WhatsApp
          </a>
        </div>
      </aside>
    </>
  );
}
