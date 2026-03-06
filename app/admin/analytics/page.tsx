import { getAnalyticsSummary } from "@/lib/analytics-db";

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}

export default function AnalyticsPage() {
  const summary = getAnalyticsSummary();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <h1 className="font-serif text-3xl font-bold text-foreground">
        Analytics
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Metriche locali dal database SQLite della landing.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <MetricCard
          label="Views"
          value={summary.views.toLocaleString("it-IT")}
        />
        <MetricCard
          label="Utenti Unici"
          value={summary.uniqueVisitors.toLocaleString("it-IT")}
        />
        <MetricCard
          label="Scroll 100%"
          value={summary.scrollCompletions.toLocaleString("it-IT")}
        />
        <MetricCard
          label="Scroll Rate"
          value={formatPercent(summary.scrollCompletionRate)}
        />
        <MetricCard
          label="Easter Egg (Totale)"
          value={summary.easterEggUnlocks.toLocaleString("it-IT")}
        />
        <MetricCard
          label="Easter Egg (Unici)"
          value={summary.uniqueEasterEggVisitors.toLocaleString("it-IT")}
        />
      </div>

      <p className="mt-8 text-xs text-muted-foreground/80">
        Nota: utente unico = visitor id anonimo salvato in localStorage.
      </p>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <section className="rounded-lg border border-border bg-card px-5 py-4">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
    </section>
  );
}

export const dynamic = "force-dynamic";
