"use client";

import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";
import { GoldDivider } from "./gold-divider";
import { useEasterEgg } from "@/contexts/easter-egg-context";

export function LocationSection() {
  const { isActive } = useEasterEgg();

  return (
    <section
      id="luogo"
      className="relative bg-parchment-dark/40 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30">
            <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
            {isActive ? "Il Bunker" : "Il Luogo"}
          </h2>
          <GoldDivider />
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {isActive
              ? "Dove si parla chiaro, fuori dai riflettori"
              : "Un'ambientazione degna di un'avventura epica"}
          </p>
        </div>

        {/* Content grid */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          {/* Image */}
          <div className="relative flex-1 overflow-hidden rounded-xl border border-gold/15 shadow-lg">
            <Image
              src="/images/villa-todeschini.jpg"
              alt="Villa Todeschini a Noventa Padovana, elegante villa veneta"
              width={720}
              height={480}
              className="h-auto w-full object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gold/10" />
          </div>

          {/* Text */}
          <div className="flex-1 space-y-5">
            <h3 className="font-serif text-2xl font-semibold text-foreground md:text-3xl">
              {isActive ? "Quartier Generale" : "Villa Todeschini"}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              {isActive ? "Zona Franca, Fuori dal Sistema" : "Noventa Padovana, Padova"}
            </p>
            {isActive ? (
              <>
                <p className="leading-relaxed text-muted-foreground">
                  I travel influencer ti vendono l&apos;avventura da un hotel a 5 stelle,
                  con il tramonto perfetto e il cappuccino fotogenico. Noi ci ritroviamo
                  davvero — senza filtri, senza brand deal, senza stories.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Un posto fisico, persone reali, conversazioni vere. Quello che Apple
                  non può venderti e Washington non può controllare.
                </p>
              </>
            ) : (
              <>
                <p className="leading-relaxed text-muted-foreground">
                  24 ore, o più, per ritrovarsi fra amici, visitatori, benefattori o
                  lontani parenti! <br />
                  <br />
                  Vieni solo per la prima serata nerd, per la gara di pizze a pranzo
                  o per il cuore del raduno la sera. Oppure resta per tutto il
                  weekend, l'importante è che vieni.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  {"...grandi falò, birra di malto, carne stagionata con l'osso!"}
                </p>
              </>
            )}

            <a
              href="https://www.google.com/maps/search/Villa+Todeschini+Noventa+Padovana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-terracotta/30 bg-terracotta/10 px-5 py-2.5 text-sm font-medium text-terracotta-dark transition-colors hover:bg-terracotta/20"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.5} />
              {isActive ? "Trova il Bunker" : "Apri in Google Maps"}
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
