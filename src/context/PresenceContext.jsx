import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import api from "../api/client";
import { useAuth } from "./AuthContext";

const WS_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api").replace(/\/api\/?$/, "");

const PresenceContext = createContext({
  onlineUserIds: new Set(),
  isUserOnline: () => false,
  refreshPresence: () => {},
});

export function PresenceProvider({ children }) {
  const { user } = useAuth();
  const [onlineUserIds, setOnlineUserIds] = useState(new Set());
  const clientRef = useRef(null);
  const heartbeatTimerRef = useRef(null);

  // Fetch current online users from backend
  const fetchOnlineUsers = useCallback(async () => {
    try {
      const res = await api.get("/presence/online-users");
      const list = res.data?.onlineUserIds || [];
      const idSet = new Set(list.map((id) => Number(id)));
      setOnlineUserIds(idSet);
    } catch {
      // Non-fatal if backend presence endpoint is warming up
    }
  }, []);

  // Send heartbeat to backend
  const sendHeartbeat = useCallback(async () => {
    if (!user?.id) return;
    try {
      // Send REST heartbeat
      await api.post("/presence/heartbeat");

      // Also publish to STOMP if connected
      if (clientRef.current && clientRef.current.connected) {
        try {
          clientRef.current.publish({
            destination: "/app/presence/heartbeat",
            body: JSON.stringify({ userId: user.id }),
          });
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    }
  }, [user?.id]);

  // Connect to STOMP WebSocket for real-time presence broadcast
  useEffect(() => {
    if (!user?.id) {
      setOnlineUserIds(new Set());
      return;
    }

    // Initial fetch and heartbeat
    fetchOnlineUsers();
    sendHeartbeat();

    const token = localStorage.getItem("pc_token");
    const client = new Client({
      webSocketFactory: () => new SockJS(`${WS_BASE_URL}/ws`),
      connectHeaders: { Authorization: token ? `Bearer ${token}` : "" },
      reconnectDelay: 5000,
      onConnect: () => {
        // Subscribe to global presence topic
        client.subscribe("/topic/presence", (frame) => {
          try {
            const data = JSON.parse(frame.body);
            if (data && data.userId) {
              const uId = Number(data.userId);
              setOnlineUserIds((prev) => {
                const next = new Set(prev);
                if (data.isOnline) {
                  next.add(uId);
                } else {
                  next.delete(uId);
                }
                return next;
              });
            }
          } catch {
            // ignore malformed frame
          }
        });

        // Announce current user is online
        try {
          client.publish({
            destination: "/app/presence/heartbeat",
            body: JSON.stringify({ userId: user.id }),
          });
        } catch {
          // ignore
        }
      },
    });

    client.activate();
    clientRef.current = client;

    // Periodic heartbeat every 15s
    heartbeatTimerRef.current = setInterval(() => {
      if (document.visibilityState === "visible") {
        sendHeartbeat();
      }
    }, 15000);

    // Periodic sync poll every 30s
    const pollInterval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchOnlineUsers();
      }
    }, 30000);

    // Visibility change handler: immediately heartbeat on tab focus
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        sendHeartbeat();
        fetchOnlineUsers();
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Unload handler to mark offline
    function handleBeforeUnload() {
      try {
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify({})], { type: "application/json" });
          const tokenStr = localStorage.getItem("pc_token");
          // If possible send beacon or trigger offline
          api.post("/presence/offline").catch(() => {});
        }
      } catch {
        // ignore
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      clearInterval(pollInterval);
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [user?.id, fetchOnlineUsers, sendHeartbeat]);

  // Check if a specific user is currently online
  const isUserOnline = useCallback(
    (targetUserId) => {
      if (!targetUserId) return false;
      const numId = Number(targetUserId);
      // Current user is always online if logged in
      if (user?.id && Number(user.id) === numId) return true;
      return onlineUserIds.has(numId);
    },
    [onlineUserIds, user?.id]
  );

  return (
    <PresenceContext.Provider
      value={{
        onlineUserIds,
        isUserOnline,
        refreshPresence: fetchOnlineUsers,
      }}
    >
      {children}
    </PresenceContext.Provider>
  );
}

export function usePresence() {
  return useContext(PresenceContext);
}

export default PresenceContext;
