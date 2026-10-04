import { pfad } from "@/inhalt/pfad";
import { person } from "@/inhalt/startseite";

export function Person() {
  return (
    <section aria-labelledby="person-titel" className="relative z-10 pt-[calc(var(--abschnitt)*0.6)] pb-[var(--abschnitt)]">
      <div className="huelle grid gap-12 md:grid-cols-12 md:gap-8">
        <figure data-einblenden className="md:col-span-5 lg:col-span-4">
          <picture>
            <source type="image/avif" srcSet={`${pfad("/bilder/tamer-kumaru-480.avif")} 480w, ${pfad("/bilder/tamer-kumaru-840.avif")} 840w`} sizes="(min-width: 768px) 33vw, 100vw" />
            <source type="image/webp" srcSet={`${pfad("/bilder/tamer-kumaru-480.webp")} 480w, ${pfad("/bilder/tamer-kumaru-840.webp")} 840w`} sizes="(min-width: 768px) 33vw, 100vw" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pfad("/bilder/tamer-kumaru-840.jpg")}
              alt={person.bildAlt}
              width={840}
              height={1050}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full bg-weiss object-cover"
            />
          </picture>
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-klein">
            <span><span className="font-semibold">Tamer Kumaru</span>, Inhaber</span>
            <span className="fehlt">[FEHLT: Bildrechte Porträt]</span>
          </figcaption>
        </figure>

        <div className="md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6 md:self-end">
          <h2 id="person-titel" data-einblenden className="titel titel-2 max-w-[16ch]">
            {person.titel}
          </h2>
          <dl className="mt-12 grid gap-9 lg:mt-16">
            {person.zusagen.map((z) => (
              <div key={z.titel} data-einblenden className="grid gap-2 xl:grid-cols-[minmax(14.5rem,0.5fr)_1fr] xl:gap-8">
                <dt className="titel titel-3">{z.titel}</dt>
                <dd className="text-schiefer text-fliess">{z.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
