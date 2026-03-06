"use client";

import { useEffect, useRef } from "react";
import { useEasterEgg } from "@/contexts/easter-egg-context";

const VISITOR_ID_KEY = "landing_analytics_visitor_id";
const SCROLL_DONE_PREFIX = "landing_scroll_100_done:";
const PAGEVIEW_SENT_KEYS = new Set<string>();

function createVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function getVisitorId() {
  try {
    const existing = localStorage.getItem(VISITOR_ID_KEY);
    if (existing) {
      return existing;
    }

    const generated = createVisitorId();
    localStorage.setItem(VISITOR_ID_KEY, generated);
    return generated;
  } catch {
    return createVisitorId();
  }
}

function sendEvent(
  eventType: "pageview" | "scroll_100" | "easter_egg_unlocked",
  pagePath: string,
  visitorId: string,
) {
  void fetch("/api/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
    body: JSON.stringify({
      eventType,
      path: pagePath,
      visitorId,
    }),
  });
}

export function AnalyticsTracker() {
  const { isActive } = useEasterEgg();
  const previousIsActive = useRef(isActive);

  useEffect(() => {
    const pagePath = window.location.pathname;
    const visitorId = getVisitorId();
    const pageviewKey = `${visitorId}:${pagePath}`;
    if (!PAGEVIEW_SENT_KEYS.has(pageviewKey)) {
      PAGEVIEW_SENT_KEYS.add(pageviewKey);
      sendEvent("pageview", pagePath, visitorId);
    }

    const scrollDoneKey = `${SCROLL_DONE_PREFIX}${pagePath}`;
    let scrollAlreadyTracked = false;

    try {
      scrollAlreadyTracked = sessionStorage.getItem(scrollDoneKey) === "1";
    } catch {
      scrollAlreadyTracked = false;
    }

    if (scrollAlreadyTracked) {
      return;
    }

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolledBottom = window.scrollY + window.innerHeight;
      const fullHeight = doc.scrollHeight;

      if (fullHeight <= 0) {
        return;
      }

      if (scrolledBottom >= fullHeight - 24) {
        sendEvent("scroll_100", pagePath, visitorId);
        try {
          sessionStorage.setItem(scrollDoneKey, "1");
        } catch {}
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const justActivated = !previousIsActive.current && isActive;
    previousIsActive.current = isActive;

    if (!justActivated) {
      return;
    }

    const pagePath = window.location.pathname;
    const visitorId = getVisitorId();
    sendEvent("easter_egg_unlocked", pagePath, visitorId);
  }, [isActive]);

  return null;
}
