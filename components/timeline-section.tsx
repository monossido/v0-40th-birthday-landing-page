import {
  Flame,
  Monitor,
  Moon,
  Pizza,
  Dices,
  Music,
  Beef,
  Tent,
  Swords,
  Wine,
} from "lucide-react"
import { GoldDivider } from "./gold-divider"
import type { LucideIcon } from "lucide-react"

interface TimelineEvent {
  time: string
  title: string
  description: string
  icon: LucideIcon
  day: 1 | 2
}

const events: TimelineEvent[] = [
  {
    time: "18:00",
    title: "Aglio, Olio e Peperoncino",
    description:
      "Si parte con un classico della tradizione: pasta fatta come si deve, per scaldarci prima della battaglia.",
    icon: Flame,
    day: 1,
  },
  {
    time: "21:00",
    title: "LAN Party",
    description:
      "COD2 e Quake 3 Arena. Preparate i riflessi \u2014 nessuna piet\u00e0 sul campo di battaglia digitale.",
    icon: Monitor,
    day: 1,
  },
  {
    time: "Notte",
    title: "Sotto le Stelle",
    description:
      "Camping in tenda nel giardino della villa. Storie, risate e il cielo stellato sopra di noi.",
    icon: Tent,
    day: 1,
  },
  {
    time: "12:30",
    title: "Gara di Pizze",
    description:
      "Pizza in teglia vs Pizza tonda: due scuole di pensiero si affrontano. Voi da che parte state?",
    icon: Pizza,
    day: 2,
  },
  {
    time: "15:00",
    title: "Lupus in Tabula \u2014 Big Edition",
    description:
      "Il villaggio \u00e8 in pericolo. Chi sono i lupi? Accusate, difendete, bluffate. Nessuno \u00e8 al sicuro.",
    icon: Swords,
    day: 2,
  },
  {
    time: "18:00",
    title: "Aperitivo \u2014 Music & Vibes",
    description:
      "Musica, spritz e il sole del tardo pomeriggio. Il momento perfetto per ricaricare le energie.",
    icon: Music,
    day: 2,
  },
  {
    time: "20:00",
    title: "Grigliata e Sapori dal Mondo",
    description:
      "Il gran finale: una grigliata epica con sapori da ogni angolo della Terra di Mezzo... e oltre.",
    icon: Beef,
    day: 2,
  },
]

export function TimelineSection() {
  const day1Events = events.filter((e) => e.day === 1)
  const day2Events = events.filter((e) => e.day === 2)

  return (
    <section id="programma" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30">
            <Dices className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
            Il Programma
          </h2>
          <GoldDivider />
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {"Ogni grande avventura ha le sue tappe"}
          </p>
        </div>

        {/* Day 1 */}
        <DayHeader day={1} title="Sabato 23 Maggio" subtitle="L'Arrivo" />
        <div className="relative ml-4 border-l border-gold/20 pl-8 md:ml-8">
          {day1Events.map((event, index) => (
            <TimelineItem
              key={event.title}
              event={event}
              isLast={index === day1Events.length - 1}
            />
          ))}
        </div>

        <div className="my-12" />

        {/* Day 2 */}
        <DayHeader day={2} title="Domenica 24 Maggio" subtitle="La Grande Giornata" />
        <div className="relative ml-4 border-l border-gold/20 pl-8 md:ml-8">
          {day2Events.map((event, index) => (
            <TimelineItem
              key={event.title}
              event={event}
              isLast={index === day2Events.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function DayHeader({
  day,
  title,
  subtitle,
}: {
  day: number
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gold/30 bg-parchment-dark/60">
        <span className="font-serif text-lg font-bold text-gold">{day}</span>
      </div>
      <div>
        <h3 className="font-serif text-xl font-semibold text-foreground md:text-2xl">
          {title}
        </h3>
        <p className="text-xs uppercase tracking-[0.2em] text-gold/70">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

function TimelineItem({
  event,
  isLast,
}: {
  event: TimelineEvent
  isLast: boolean
}) {
  const Icon = event.icon

  return (
    <div className={`relative ${isLast ? "pb-0" : "pb-10"}`}>
      {/* Dot on the timeline */}
      <div className="absolute -left-8 top-0 flex h-full -translate-x-1/2 flex-col items-center md:-left-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/25 bg-parchment">
          <Icon className="h-4 w-4 text-terracotta" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content card */}
      <div className="rounded-lg border border-border/60 bg-card/80 p-5 transition-colors hover:border-gold/20 hover:bg-card">
        <div className="mb-1 flex items-center gap-3">
          <span className="rounded-md bg-terracotta/10 px-2 py-0.5 font-serif text-xs font-semibold text-terracotta">
            {event.time}
          </span>
        </div>
        <h4 className="font-serif text-lg font-semibold text-foreground">
          {event.title}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
      </div>
    </div>
  )
}
