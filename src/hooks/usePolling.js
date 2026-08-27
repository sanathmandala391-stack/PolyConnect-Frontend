import { useEffect, useRef } from "react";

export default function usePolling(callback, intervalMs = 30000, deps = []) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (!document.hidden) {
        savedCallback.current();
      }
    }
    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, ...deps]);
}