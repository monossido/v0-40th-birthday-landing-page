import Image from "next/image"
import { MapPin, ExternalLink } from "lucide-react"
import { GoldDivider } from "./gold-divider"

export function LocationSection() {
  return (
    <section id="luogo" className="relative bg-parchment-dark/40 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30">
            <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
            Il Luogo
          </h2>
          <GoldDivider />
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {"Un'ambientazione degna di un'avventura epica"}
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
              Villa Todeschini
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">
              Noventa Padovana, Padova
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {
                "Una splendida villa veneta immersa nel verde, dove la storia incontra l'eleganza. Tra i suoi giardini e i suoi saloni, troveremo lo scenario perfetto per il nostro raduno: un luogo dove il tempo sembra fermarsi, come nelle grandi sale di Rivendell."
              }
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {
                "Spazi ampi per le nostre avventure diurne e notturne, con la quiete della campagna padovana a fare da cornice a un weekend indimenticabile."
              }
            </p>

            <a
              href="https://www.google.com/maps/search/Villa+Todeschini+Noventa+Padovana"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-terracotta/30 bg-terracotta/10 px-5 py-2.5 text-sm font-medium text-terracotta-dark transition-colors hover:bg-terracotta/20"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.5} />
              Apri in Google Maps
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
