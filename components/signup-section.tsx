"use client"

import { useState } from "react"
import { Send, Check, ScrollText } from "lucide-react"
import { GoldDivider } from "./gold-divider"

export function SignupSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1000)
  }

  return (
    <section
      id="aggiornamenti"
      className="relative bg-parchment-dark/40 px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-lg text-center">
        {/* Section header */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold/30">
            <ScrollText className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl">
            Resta Aggiornato
          </h2>
          <GoldDivider />
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {
              "Le date definitive (Ven/Sab o Sab/Dom) verranno comunicate presto. Lascia la tua email per ricevere tutti i dettagli."
            }
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-sage/30 bg-sage/10 px-8 py-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
              <Check className="h-6 w-6 text-sage-dark" strokeWidth={2} />
            </div>
            <p className="font-serif text-lg font-semibold text-foreground">
              Iscrizione completata!
            </p>
            <p className="text-sm text-muted-foreground">
              {"Ti contatteremo presto con tutti i dettagli dell'avventura."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3"
          >
            <label htmlFor="email-input" className="sr-only">
              Il tuo indirizzo email
            </label>
            <input
              id="email-input"
              type="email"
              required
              placeholder="La tua email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border bg-parchment px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20 sm:flex-1"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-terracotta-dark disabled:opacity-60 sm:w-auto"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              ) : (
                <Send className="h-4 w-4" strokeWidth={1.5} />
              )}
              Iscriviti
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
