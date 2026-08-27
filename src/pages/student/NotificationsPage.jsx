import { useEffect, useState } from "react";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";

export default function NotificationsPage() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");
  const [marking, setMarking] = useState(false);

  async function load() {
    try {
      const res = await api.get("/notifications");
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not load student notifications."));
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id) {
    try {
      await api.patch(`/notifications/${id}/read`);
      setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch {
      // non-fatal
    }
  }

  async function markAllRead() {
    setMarking(true);
    try {
      await api.post("/notifications/mark-all-read");
      setItems((list) => list.map((n) => ({ ...n, read: true })));
    } catch (err) {
      setError(apiErrorMessage(err, "Could not mark all notifications as read."));
    } finally {
      setMarking(false);
    }
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold text-gov-navy">Student Notifications</h1>
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!items) {
    return <GovLoader label="Loading official student alerts and notifications…" />;
  }

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-gov-navy">
              Student Notifications & Alerts
            </h1>
            {unreadCount > 0 && (
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs text-gov-slate mt-0.5">
            Personalized academic notices, detention alerts, and department announcements.
          </p>
        </div>

        {items.length > 0 && (
          <button
            className="gov-btn-secondary text-xs"
            onClick={markAllRead}
            disabled={marking || unreadCount === 0}
          >
            {marking ? "Marking…" : "Mark All as Read"}
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="gov-card p-12 text-center text-sm text-gov-slate">
          <div className="text-3xl mb-2">🔔</div>
          <p className="font-semibold text-gov-navy mb-1">No notifications right now</p>
          <p className="text-xs">You are up to date on all your academic notifications and alerts.</p>
        </div>
      ) : (
        <div className="gov-card divide-y divide-gov-border">
          {items.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition-colors ${
                !n.read ? "bg-blue-50/60" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? "bg-gov-blue" : "bg-gray-300"}`} />
                <div>
                  <p className="text-sm font-semibold text-gov-ink">{n.title}</p>
                  <p className="text-xs text-gov-slate mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-gov-muted mt-1 font-mono">
                    {n.createdAt ? new Date(n.createdAt).toLocaleString() : ""}
                  </p>
                </div>
              </div>

              {!n.read && (
                <button
                  className="text-xs font-bold text-gov-blue hover:text-gov-blueDark hover:underline shrink-0 self-end sm:self-center"
                  onClick={() => markRead(n.id)}
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
