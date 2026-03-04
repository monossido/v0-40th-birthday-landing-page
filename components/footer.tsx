import { Compass } from "lucide-react"

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 border-t border-gold/10 px-6 py-10 text-center">
      <Compass className="h-5 w-5 text-gold/40" strokeWidth={1.5} />
      <p className="font-serif text-sm text-muted-foreground">
        {"Il Ritrovo dei 40 \u2014 Non tutti quelli che vagano sono perduti."}
      </p>
      <p className="text-xs text-muted-foreground/50">
        {"Noventa Padovana, Maggio 2025"}
      </p>
    </footer>
  )
}
