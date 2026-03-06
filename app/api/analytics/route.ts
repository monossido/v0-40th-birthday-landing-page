import { NextResponse } from "next/server";
import {
  type AnalyticsEventType,
  trackAnalyticsEvent,
} from "@/lib/analytics-db";

const EVENT_TYPES: AnalyticsEventType[] = [
  "pageview",
  "scroll_100",
  "easter_egg_unlocked",
];
const EVENT_TYPE_SET = new Set<string>(EVENT_TYPES);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const eventType = body?.eventType;
    const pagePath = body?.path;
    const visitorId = body?.visitorId;

    if (
      typeof eventType !== "string" ||
      !EVENT_TYPE_SET.has(eventType) ||
      typeof pagePath !== "string" ||
      pagePath.length === 0 ||
      pagePath.length > 300 ||
      typeof visitorId !== "string" ||
      visitorId.length < 10 ||
      visitorId.length > 120
    ) {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    trackAnalyticsEvent({
      eventType: eventType as AnalyticsEventType,
      path: pagePath,
      visitorId,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[analytics] Failed to store event", error);
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 });
  }
}
