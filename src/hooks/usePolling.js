import { useEffect, useRef, useCallback } from "react";

/**
 * usePolling: High-performance adaptive polling hook
 * - Automatically fetches on mount & when tab becomes visible in fraction of a second
 * - Default 4-second responsive interval
 */
export default function usePolling(callback, intervalMs = 4000, deps = []) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const execute = useCallback(() => {
    if (!document.hidden && savedCallback.current) {
      savedCallback.current();
    }
  }, []);

  useEffect(() => {
    execute();

    const id = setInterval(execute, intervalMs);

    // Instant trigger on tab focus / visibility change
    function handleVisibility() {
      if (!document.hidden) {
        execute();
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, execute, ...deps]);
}