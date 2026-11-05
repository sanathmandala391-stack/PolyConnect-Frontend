import { createContext, useContext, useState, useCallback } from "react";
import usePolling from "../hooks/usePolling";
import api from "../api/client";

const UpdatesContext = createContext(null);

export function UpdatesProvider({ children }) {
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // Background sync check: automatically updates views directly without showing any popup
  usePolling(
    async () => {
      try {
        const res = await api.get("/sbtet/last-sync"); // { timestamp: "..." }
        const newTime = res.data?.timestamp;
        if (lastSyncTime && newTime && newTime !== lastSyncTime) {
          // Broadcast live update & force-refresh directly to active pages
          window.dispatchEvent(new CustomEvent("polyconnect:force-refresh"));
          window.dispatchEvent(
            new CustomEvent("polyconnect:live-update", { detail: res.data })
          );
        }
        setLastSyncTime(newTime);
      } catch {
        // silent fail, retries next tick
      }
    },
    4000,
    [lastSyncTime]
  );

  const clearUpdate = useCallback(() => {}, []);

  const triggerLiveSync = useCallback(() => {
    window.dispatchEvent(new CustomEvent("polyconnect:force-refresh"));
  }, []);

  return (
    <UpdatesContext.Provider
      value={{
        hasNewUpdate: false,
        clearUpdate,
        triggerLiveSync,
        lastSyncTime,
      }}
    >
      {children}
    </UpdatesContext.Provider>
  );
}

export const useUpdates = () => useContext(UpdatesContext);
