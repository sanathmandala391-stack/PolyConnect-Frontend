import { createContext, useContext, useState, useEffect, useCallback } from "react";
import usePolling from "../hooks/usePolling";
import api from "../api/client";

const UpdatesContext = createContext(null);

export function UpdatesProvider({ children }) {
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [hasNewUpdate, setHasNewUpdate] = useState(false);
  const [updateDetails, setUpdateDetails] = useState(null);

  // Fast background sync check every 4 seconds
  usePolling(
    async () => {
      try {
        const res = await api.get("/sbtet/last-sync"); // { timestamp: "..." }
        const newTime = res.data?.timestamp;
        if (lastSyncTime && newTime && newTime !== lastSyncTime) {
          setHasNewUpdate(true);
          setUpdateDetails(res.data);
          // Broadcast live update event to active pages in fraction of a second
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

  const clearUpdate = useCallback(() => setHasNewUpdate(false), []);

  const triggerLiveSync = useCallback(() => {
    window.dispatchEvent(new CustomEvent("polyconnect:force-refresh"));
  }, []);

  return (
    <UpdatesContext.Provider
      value={{
        hasNewUpdate,
        clearUpdate,
        triggerLiveSync,
        lastSyncTime,
      }}
    >
      {children}
      {hasNewUpdate && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#092240] text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xl border border-[#35a5f1]/40 flex items-center gap-3.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#35a5f1] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#35a5f1]"></span>
          </div>
          <div>
            <span className="font-semibold block text-slate-100">Portal Updated</span>
            <span className="text-[11px] text-slate-300">Fresh data synchronized live</span>
          </div>
          <button
            type="button"
            onClick={() => {
              triggerLiveSync();
              setHasNewUpdate(false);
            }}
            className="bg-[#35a5f1] hover:bg-[#2888c9] text-white px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer active:scale-95 transition-all shadow-xs"
          >
            Sync View
          </button>
          <button
            type="button"
            onClick={() => setHasNewUpdate(false)}
            className="text-slate-400 hover:text-white cursor-pointer px-1 text-sm transition-colors"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </UpdatesContext.Provider>
  );
}

export const useUpdates = () => useContext(UpdatesContext);