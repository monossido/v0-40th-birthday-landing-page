"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Compass, Sparkles } from "lucide-react";
import { GoldDivider } from "./gold-divider";
import { useEasterEgg } from "@/contexts/easter-egg-context";

function computeRemaining(targetTimestamp: number) {
  const diff = Math.max(0, targetTimestamp - Date.now());
  return Math.floor(diff / 1000);
}

function useCountdown(targetTimestamp: number) {
  const [totalSeconds, setTotalSeconds] = useState(() =>
    computeRemaining(targetTimestamp),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTotalSeconds(computeRemaining(targetTimestamp));
    }, 1000);
    return () => clearInterval(id);
  }, [targetTimestamp]);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

const BIRTHDAY_TIMESTAMP = new Date("2026-05-22T18:00:00").getTime();

export function HeroSection() {
  const { days, hours, minutes, seconds } = useCountdown(BIRTHDAY_TIMESTAMP);
  const { isActive, toggle } = useEasterEgg();
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextClick = useRef(false);
  const shineTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isShining, setIsShining] = useState(false);

  const handleCompassClick = useCallback(() => {
    if (skipNextClick.current) {
      skipNextClick.current = false;
      return;
    }

    tapCount.current += 1;
    if (tapTimer.current) clearTimeout(tapTimer.current);
    if (tapCount.current >= 3) {
      tapCount.current = 0;
      toggle();
    } else {
      tapTimer.current = setTimeout(() => {
        tapCount.current = 0;
      }, 1200);
    }
  }, [toggle]);

  const triggerShine = useCallback(() => {
    setIsShining(true);
    if (shineTimer.current) clearTimeout(shineTimer.current);
    shineTimer.current = setTimeout(() => {
      setIsShining(false);
    }, 450);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (e.pointerType === "mouse") return;
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      longPressTimer.current = setTimeout(() => {
        skipNextClick.current = true;
        tapCount.current = 0;
        toggle();
      }, 700);
    },
    [toggle],
  );

  const handlePointerUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      triggerShine();
    }, 4000);

    return () => clearInterval(id);
  }, [triggerShine]);

  useEffect(() => {
    setTimeout(() => {
      triggerShine();
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (tapTimer.current) clearTimeout(tapTimer.current);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
      if (shineTimer.current) clearTimeout(shineTimer.current);
    };
  }, []);

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

      {/* Decorative top ring icon — 3 click = easter egg */}
      <div className="mb-6 flex items-center justify-center">
        <button
          onClick={handleCompassClick}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="group relative flex h-16 w-16 cursor-crosshair items-center justify-center rounded-full border border-gold/30 bg-parchment-dark/50 transition-transform active:scale-95"
          aria-label="Decorazione"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            <span
              className={`absolute -top-3 -left-8 h-24 w-7 rotate-12 bg-gradient-to-r from-transparent via-gold/65 to-transparent blur-[1px] transition-all duration-500 ${
                isShining
                  ? "translate-x-24 opacity-100"
                  : "translate-x-0 opacity-0"
              }`}
            />
          </div>
          <Compass className="h-7 w-7 text-gold" strokeWidth={1.5} />
          <div className="absolute -inset-1 rounded-full border border-gold/10" />
        </button>
      </div>

      {/* Subtitle */}
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        {isActive
          ? "Bravo, sei entrato nel dark side"
          : 'Dite "Amici" ed entrate'}
      </p>

      {/* Title */}
      <h1 className="text-balance text-center font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
        {isActive ? "La Resistenza dei 40" : "Il Ritrovo dei 40"}
      </h1>

      <GoldDivider />

      {/* Event date */}
      <p className="mt-2 text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
        {isActive
          ? "Da sempre \u2014 contro il pensiero unico"
          : "Un weekend a lungo atteso \u2014 22 e 23 Maggio 2025"}
      </p>
      <p className="mt-1 text-center text-sm text-muted-foreground/70">
        {isActive
          ? "Dovunque arda ancora una scintilla"
          : "Villa Todeschini, Noventa Padovana"}
      </p>

      {/* Countdown to the event */}
      <div className="mt-10 flex flex-col items-center">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-gold/70" strokeWidth={1.5} />
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {isActive
              ? "Tempo che resta a Israele prima di soccombere"
              : "Conto alla rovescia al ritrovo"}
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
        <p className="mt-3 text-xs text-muted-foreground/60">
          {new Date(BIRTHDAY_TIMESTAMP).toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground/40 animate-bounce">
        <div className="h-6 w-px bg-gold/20" />
        <div className="h-2 w-2 rounded-full border border-gold/30" />
      </div>
    </section>
  );
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
  );
}
