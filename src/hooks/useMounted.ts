"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns true on client after hydration, false on server (SSR).
 * Uses React's useSyncExternalStore to avoid cascading renders / setState in effect.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Tracks if screen width is mobile (< 768px).
 * Uses useSyncExternalStore to subscribe to resize events smoothly.
 */
export function useIsMobile(): boolean {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("resize", callback);
      return () => window.removeEventListener("resize", callback);
    },
    () => window.innerWidth < 768,
    () => false
  );
}
