"use client"

import { useEffect, useState } from "react"
import { Compass, Sparkles } from "lucide-react"
import { GoldDivider } from "./gold-divider"

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    function calculate() {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    calculate()
    const interval = setInterval(calculate, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}

export function HeroSection() {
  const birthday = new Date("2026-03-07T00:00:00")
  const { days, hours, minutes, seconds } = useCountdown(birthday)

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* Parchment texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Decorative top ring icon */}
      <div className="mb-6 flex items-center justify-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-parchment-dark/50">
          <Compass className="h-7 w-7 text-gold" strokeWidth={1.5} />
          <div className="absolute -inset-1 rounded-full border border-gold/10" />
        </div>
      </div>

      {/* Subtitle */}
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Un raduno leggendario
      </p>

      {/* Title */}
      <h1 className="text-balance text-center font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
        Il Ritrovo dei 40
      </h1>

      <GoldDivider />

      {/* Event date */}
      <p className="mt-2 text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
        {"Un weekend di festa \u2014 23 e 24 Maggio 2025"}
      </p>
      <p className="mt-1 text-center text-sm text-muted-foreground/70">
        Villa Todeschini, Noventa Padovana
      </p>

      {/* Countdown to birthday (March 7) */}
      <div className="mt-10 flex flex-col items-center">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold/70" strokeWidth={1.5} />
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            Conto alla rovescia al compleanno
          </p>
          <Sparkles className="h-4 w-4 text-gold/70" strokeWidth={1.5} />
        </div>
        <div className="flex gap-3 md:gap-4">
          <CountdownUnit value={days} label="Giorni" />
          <span className="self-center font-serif text-xl text-gold/40">:</span>
          <CountdownUnit value={hours} label="Ore" />
          <span className="self-center font-serif text-xl text-gold/40">:</span>
          <CountdownUnit value={minutes} label="Min" />
          <span className="self-center font-serif text-xl text-gold/40">:</span>
          <CountdownUnit value={seconds} label="Sec" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground/60">7 Marzo 2026</p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground/40 animate-bounce">
        <div className="h-6 w-px bg-gold/20" />
        <div className="h-2 w-2 rounded-full border border-gold/30" />
      </div>
    </section>
  )
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gold/20 bg-parchment-dark/60 md:h-20 md:w-20">
        <span className="font-serif text-2xl font-semibold text-foreground tabular-nums md:text-3xl">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-1.5 text-[10px] uppercase tracking-widest text-muted-foreground/70">
        {label}
      </span>
    </div>
  )
}
