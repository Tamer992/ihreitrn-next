import { vorOrt } from "@/inhalt/startseite";

export function VorOrt() {
  return (
    <section aria-labelledby="vorort-titel" className="bg-weiss py-[var(--abschnitt)]">
      <div className="huelle grid gap-12 lg:grid-cols-12 lg:gap-8">
        <h2 id="vorort-titel" data-einblenden className="titel titel-2 max-w-[17ch] lg:col-span-7">
          {vorOrt.titel}
        </h2>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:col-span-12 lg:grid-cols-12 lg:gap-8">
          <div data-einblenden className="lg:col-span-4">
            <h3 className="titel titel-3">Bei Ihnen</h3>
            <p className="mt-3 text-schiefer">{vorOrt.vorOrt}</p>
          </div>
          <div data-einblenden className="lg:col-span-4">
            <h3 className="titel titel-3">Per Fernwartung</h3>
            <p className="mt-3 text-schiefer">{vorOrt.fern}</p>
          </div>
          <aside
            data-einblenden
            aria-label="Hinweis zu Anrufen"
            className="border-l-2 border-blau pl-6 md:col-span-2 lg:col-span-3 lg:col-start-10"
          >
            <p className="font-semibold text-blau">{vorOrt.warnungTitel}</p>
            <p className="mt-2">{vorOrt.warnung}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
