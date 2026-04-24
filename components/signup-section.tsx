"use client";

import { useActionState, useRef, useEffect } from "react";
import { Send, Check, ScrollText, AlertCircle } from "lucide-react";
import { GoldDivider } from "./gold-divider";
import { subscribeAction, type FormState } from "@/app/actions";
import { useEasterEgg } from "@/contexts/easter-egg-context";

const initialState: FormState = {
  status: "idle",
  message: "",
};

export function SignupSection() {
  const [state, formAction, isPending] = useActionState(
    subscribeAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const { isActive } = useEasterEgg();

  // Reset form on success
  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

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
              "Il programma potrebbe cambiare, regole e tips&tricks potrebbero essere rivelati, inserisci la tua email per rimanere aggiornato!"
            }
          </p>
        </div>

        {state.status === "success" ? (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-sage/30 bg-sage/10 px-8 py-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
              <Check className="h-6 w-6 text-sage-dark" strokeWidth={2} />
            </div>
            <p className="font-serif text-lg font-semibold text-foreground">
              Grazie!
            </p>
            <p className="text-sm text-muted-foreground">{state.message}</p>
          </div>
        ) : (
          <form
            ref={formRef}
            action={formAction}
            className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3"
          >
            <input
              type="hidden"
              name="isActive"
              value={isActive ? "true" : "false"}
            />
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company-input">Company</label>
              <input
                id="company-input"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <label htmlFor="email-input" className="sr-only">
              Il tuo indirizzo email
            </label>
            <div className="relative w-full sm:flex-1">
              <input
                id="email-input"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="La tua email..."
                className="w-full rounded-lg border border-border bg-parchment px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-terracotta px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-terracotta-dark disabled:opacity-60 sm:w-auto"
            >
              {isPending ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              ) : (
                <Send className="h-4 w-4" strokeWidth={1.5} />
              )}
              Iscriviti
            </button>
            {state.status === "error" && (
              <div className="flex w-full items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2.5 sm:w-auto">
                <AlertCircle
                  className="h-4 w-4 flex-shrink-0 text-destructive"
                  strokeWidth={1.5}
                />
                <p className="text-xs text-destructive">{state.message}</p>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
