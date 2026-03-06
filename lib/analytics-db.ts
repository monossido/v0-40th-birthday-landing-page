import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

export type AnalyticsEventType =
  | "pageview"
  | "scroll_100"
  | "easter_egg_unlocked";

interface TrackAnalyticsEventInput {
  eventType: AnalyticsEventType;
  path: string;
  visitorId: string;
}

interface AnalyticsSummary {
  views: number;
  uniqueVisitors: number;
  scrollCompletions: number;
  uniqueScrollVisitors: number;
  easterEggUnlocks: number;
  uniqueEasterEggVisitors: number;
  scrollCompletionRate: number;
}

const DB_FILE_PATH =
  process.env.ANALYTICS_DB_PATH ??
  path.join(process.cwd(), "data", "analytics.sqlite");

let dbInstance: Database.Database | null = null;

function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true });
  const db = new Database(DB_FILE_PATH);

  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      path TEXT NOT NULL,
      visitor_id TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type
      ON analytics_events (event_type);
    CREATE INDEX IF NOT EXISTS idx_analytics_events_visitor_id
      ON analytics_events (visitor_id);
    CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at
      ON analytics_events (created_at);
  `);

  dbInstance = db;
  return dbInstance;
}

export function trackAnalyticsEvent({
  eventType,
  path,
  visitorId,
}: TrackAnalyticsEventInput) {
  const db = getDb();
  const insertEvent = db.prepare(
    `INSERT INTO analytics_events (event_type, path, visitor_id, created_at)
     VALUES (?, ?, ?, ?)`,
  );

  insertEvent.run(eventType, path, visitorId, Date.now());
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const db = getDb();

  const row = db
    .prepare(
      `
      SELECT
        SUM(CASE WHEN event_type = 'pageview' THEN 1 ELSE 0 END) AS views,
        SUM(CASE WHEN event_type = 'scroll_100' THEN 1 ELSE 0 END) AS scrollCompletions,
        SUM(CASE WHEN event_type = 'easter_egg_unlocked' THEN 1 ELSE 0 END) AS easterEggUnlocks,
        (SELECT COUNT(DISTINCT visitor_id) FROM analytics_events WHERE event_type = 'pageview') AS uniqueVisitors,
        (SELECT COUNT(DISTINCT visitor_id) FROM analytics_events WHERE event_type = 'scroll_100') AS uniqueScrollVisitors,
        (SELECT COUNT(DISTINCT visitor_id) FROM analytics_events WHERE event_type = 'easter_egg_unlocked') AS uniqueEasterEggVisitors
      FROM analytics_events
      `,
    )
    .get() as
    | {
        views: number | null;
        scrollCompletions: number | null;
        easterEggUnlocks: number | null;
        uniqueVisitors: number | null;
        uniqueScrollVisitors: number | null;
        uniqueEasterEggVisitors: number | null;
      }
    | undefined;

  const views = row?.views ?? 0;
  const scrollCompletions = row?.scrollCompletions ?? 0;
  const easterEggUnlocks = row?.easterEggUnlocks ?? 0;
  const uniqueVisitors = row?.uniqueVisitors ?? 0;
  const uniqueScrollVisitors = row?.uniqueScrollVisitors ?? 0;
  const uniqueEasterEggVisitors = row?.uniqueEasterEggVisitors ?? 0;

  return {
    views,
    uniqueVisitors,
    scrollCompletions,
    uniqueScrollVisitors,
    easterEggUnlocks,
    uniqueEasterEggVisitors,
    scrollCompletionRate: views > 0 ? scrollCompletions / views : 0,
  };
}
