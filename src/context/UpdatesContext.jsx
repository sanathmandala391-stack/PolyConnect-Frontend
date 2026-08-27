import { createContext, useContext, useState } from "react";
import usePolling from "../hooks/usePolling";
import api from "../api/client";

const UpdatesContext = createContext(null);

export function UpdatesProvider({ children }) {
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [hasNewUpdate, setHasNewUpdate] = useState(false);

  usePolling(
    async () => {
      try {
        const res = await api.get("/sbtet/last-sync"); // { timestamp: "..." }
        const newTime = res.data?.timestamp;
        if (lastSyncTime && newTime && newTime !== lastSyncTime) {
          setHasNewUpdate(true);
        }
        setLastSyncTime(newTime);
      } catch {
        // silent fail, retries next tick
      }
    },
    30000,
    [lastSyncTime]
  );

  return (
    <UpdatesContext.Provider value={{ hasNewUpdate, clearUpdate: () => setHasNewUpdate(false) }}>
      {children}
      {hasNewUpdate && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#092240] text-white text-xs sm:text-sm px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span>New data is available.</span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[#35a5f1] hover:bg-[#2888c9] px-3 py-1.5 rounded font-bold cursor-pointer"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setHasNewUpdate(false)}
            className="text-slate-300 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </UpdatesContext.Provider>
  );
}

export const useUpdates = () => useContext(UpdatesContext);