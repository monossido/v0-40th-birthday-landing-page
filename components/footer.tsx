"use client";

import { Compass } from "lucide-react";
import { useEasterEgg } from "@/contexts/easter-egg-context";

export function Footer() {
  const { isActive } = useEasterEgg();

  return (
    <footer className="flex flex-col items-center gap-3 border-t border-gold/10 px-6 py-10 text-center">
      <Compass className="h-5 w-5 text-gold/40" strokeWidth={1.5} />
      <p className="font-serif text-sm text-muted-foreground">
        {isActive
          ? "La Resistenza dei 40 \u2014 Mess with the best, die like the rest."
          : "Il Ritrovo dei 40 \u2014 Not all who wander are lost."}
      </p>
      <p className="text-xs text-muted-foreground/50">
        {isActive
          ? "In direzione ostinata e contraria"
          : "Noventa Padovana, 22-23 Maggio 2025"}
      </p>
    </footer>
  );
}
