import { pfad } from "@/inhalt/pfad";
import { hero } from "@/inhalt/startseite";
import { NummerGross, WeitereWege } from "../Kontaktwege";
import { Szene } from "../Szene";

// Eigennamen mit Bindestrich nicht am Bindestrich umbrechen
function ohneUmbruch(text: string, wort: string) {
  const [vor, nach] = text.split(wort);
  if (nach === undefined) return text;
  return (
    <>
      {vor}
      <span className="nummer">{wort}</span>
      {nach}
    </>
  );
}

export function Hero() {
  return (
    <section id="start" aria-labelledby="start-titel" className="relative">
      <div className="huelle grid min-h-[calc(100svh-4.5rem)] content-center pb-14 pt-8 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-12 lg:pb-24 lg:pt-4">
        <div className="relative z-10 lg:col-span-7">
          <h1 id="start-titel" className="titel titel-1">
            <span className="auftritt block" style={{ "--i": 0 } as React.CSSProperties}>{hero.titel[0]}</span>
            <span className="auftritt block" style={{ "--i": 1 } as React.CSSProperties}>{hero.titel[1]}</span>
          </h1>
          <p
            className="auftritt mt-7 max-w-[33ch] text-gross leading-snug text-schiefer lg:mt-9"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {ohneUmbruch(hero.text, "Rhein-Neckar-Kreis")}
          </p>
          <div className="auftritt mt-10 lg:mt-14" style={{ "--i": 3 } as React.CSSProperties}>
            <NummerGross />
            <p className="mt-3 text-schiefer">{hero.hinweis}</p>
            <div className="mt-5">
              <WeitereWege />
            </div>
          </div>
        </div>

        {/* Handy und Tablet: Szene als Block unter dem Text */}
        <div className="relative -mx-[var(--rand)] mt-6 aspect-square max-h-[34rem] sm:mx-auto sm:w-[34rem] lg:hidden">
          <Szene art="handy">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pfad("/kugel.svg")} alt="" className="h-full w-full" />
          </Szene>
        </div>
      </div>
    </section>
  );
}

/** Computer: Szene klebt hinter Hero, Person, Wegen und Leistungen. */
export function SzeneComputer() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="sticky top-0 h-[100svh]">
        <Szene art="computer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pfad("/kugel.svg")} alt="" className="absolute top-1/2 h-[72svh] w-[72svh] -translate-y-1/2" style={{ left: "calc(74% - 36svh)" }} />
        </Szene>
      </div>
    </div>
  );
}
