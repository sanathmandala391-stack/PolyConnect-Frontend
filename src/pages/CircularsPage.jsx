import { useEffect, useMemo, useState } from "react";
import api, { apiErrorMessage } from "../api/client";
import GovLoader from "../components/GovLoader";

const PAGE_SIZE = 20;

const TYPE_STYLES = {
  Academic: "bg-blue-50 text-gov-blueDark border-blue-200",
  "Pre-Examination": "bg-amber-50 text-amber-800 border-amber-200",
  "Post-Examination": "bg-emerald-50 text-emerald-800 border-emerald-200",
};

export default function CircularsPage() {
  const [circulars, setCirculars] = useState(null);
  const [error, setError] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/sbtet/circulars")
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res.data)) {
          const sorted = [...res.data].sort(
            (a, b) => new Date(b.timeStamp || b.NotificationDate || 0) - new Date(a.timeStamp || a.NotificationDate || 0)
          );
          setCirculars(sorted);
        } else {
          setCirculars([]);
        }
      })
      .catch((err) => {
        if (isMounted) setError(apiErrorMessage(err, "SBTET circulars service is temporarily unavailable."));
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const types = useMemo(() => {
    if (!circulars) return [];
    return [...new Set(circulars.map((c) => c.CircularType).filter(Boolean))];
  }, [circulars]);

  const filtered = useMemo(() => {
    if (!circulars) return [];
    return circulars.filter((c) => {
      const matchesType = typeFilter === "ALL" || c.CircularType === typeFilter;
      const matchesSearch = !search.trim() || (c.Title && c.Title.toLowerCase().includes(search.trim().toLowerCase()));
      return matchesType && matchesSearch;
    });
  }, [circulars, typeFilter, search]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [typeFilter, search]);

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-2xl font-bold text-gov-navy">Circulars & Notifications</h1>
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-sm">
          {error}
        </div>
      </div>
    );
  }

  if (!circulars) {
    return <GovLoader label="Fetching live circulars from SBTET…" />;
  }

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gov-border pb-3">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gov-navy" style={{color: "#2196f3",fontFamily: "Mulish, sans-serif",fontWeight: "700",fontSize: "25px" }}>
            Circulars & Official Notifications
          </h1>
          <span className="bg-blue-100 text-gov-blueDark text-xs font-bold px-2.5 py-0.5 rounded-full">
            {circulars.length} Total
          </span>
        </div>
        <p className="text-xs md:text-sm text-gov-slate mt-1">
          Directly synchronized with the State Board of Technical Education and Training (SBTET) Telangana circulars repository.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-gov-border rounded-sm" >
        <div className="flex flex-wrap items-center gap-1.5" >
          <button 
            onClick={() => setTypeFilter("ALL")}
            className={`px-3 py-1.5 text-xs font-bold rounded-sm border transition-colors ${
              typeFilter === "ALL"
                ? "bg-[#2196f3] text-white border-[#2196f3]"
                : "border-gov-border text-gov-slate hover:bg-gov-lightblue"
            }`} 
          >
            All ({circulars.length})
          </button>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 text-xs font-bold rounded-sm border transition-colors ${
                typeFilter === t
                  ? "bg-[#2196f3] text-white border-[#2196f3]"
                  : "border-gov-border text-gov-slate hover:bg-gov-lightblue"
              }`} 
            >
              {t} ({circulars.filter((c) => c.CircularType === t).length})
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            className="gov-input text-xs"
            placeholder="Search circulars by keyword…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Circulars List */}
      {filtered.length === 0 ? (
        <div className="gov-card p-8 text-center text-sm text-gov-slate" style={{color: "#2196f3"}}>
          No notifications match your current filter and search query.
        </div>
      ) : (
        <div className="gov-card divide-y divide-gov-border">
          {visible.map((c, i) => (
            <a
              key={c.ID || i}
              href={c.Url || "#"}
              target={c.Url ? "_blank" : "_self"}
              rel="noreferrer"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-blue-50/50 transition-colors group"
            >
              <div className="flex items-start gap-3 min-w-0"   style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",color:"#2196f3" }}
>
                <span className="shrink-0 text-gov-blue font-mono font-bold text-xs bg-blue-50 border border-blue-100 px-2 py-1 rounded" style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",color:"#2196f3" }} >
                  {c.NotificationDate
                    ? new Date(c.NotificationDate).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : "SBTET"}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gov-ink group-hover:text-gov-blue transition-colors" style={{ fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",color:"#2196f3" }}>
                    {c.Title}
                  </p>
                  <p className="text-xs text-gov-slate mt-0.5">
                    {c.NotificationDate ? `Published: ${new Date(c.NotificationDate).toLocaleDateString()}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <span
                  className={`status-badge text-[10px] ${
                    TYPE_STYLES[c.CircularType] || "bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {c.CircularType || "General"}
                </span>
                {c.Url && (
                  <span className="text-xs font-bold text-gov-blue group-hover:translate-x-0.5 transition-transform">
                    Download &rarr;
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Pagination / Load More */}
      {visibleCount < filtered.length && (
        <div className="text-center pt-2">
          <button
            className="gov-btn-secondary px-6"
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
          >
            Load More Notifications ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}





