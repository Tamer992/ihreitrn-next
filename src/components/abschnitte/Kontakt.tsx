import { firma, kontakt } from "@/inhalt/startseite";
import { NummerGross, WeitereWege } from "../Kontaktwege";

export function Kontakt() {
  return (
    <section id="kontakt" aria-labelledby="kontakt-titel" className="py-[var(--abschnitt)]">
      <div className="huelle">
        <h2 id="kontakt-titel" data-einblenden className="titel titel-1 max-w-[14ch] !text-[clamp(2.5rem,1.5rem+4.2vw,5.25rem)]">
          {kontakt.titel}
        </h2>
        <p data-einblenden className="mt-7 max-w-[40ch] text-gross text-schiefer">{kontakt.text}</p>

        <div className="mt-14 border-t border-linie pt-12 lg:mt-20">
          <div data-einblenden>
            <NummerGross gross />
            <p className="mt-5 max-w-[46ch] text-schiefer">{kontakt.rueckruf}</p>
          </div>
          <div data-einblenden className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <WeitereWege mitText whatsappText={kontakt.whatsappText} emailText={kontakt.emailText} />
            </div>
            <p className="text-schiefer lg:col-span-4">
              {firma.erreichbarkeit}, auch abends und am Wochenende, ohne Zuschlag.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
