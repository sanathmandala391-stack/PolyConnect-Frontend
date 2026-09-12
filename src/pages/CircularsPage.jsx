import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api, { apiErrorMessage } from "../api/client";
import GovLoader from "../components/GovLoader";

function formatNotificationDate(dateStr) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return dateStr;
  }
}

export default function CircularsPage() {
  const [circulars, setCirculars] = useState(() => {
    try {
      const cached = localStorage.getItem("pc_cache_circulars");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [error, setError] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("date"); // 'date' | 'type' | 'title'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' | 'desc'
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/sbtet/circulars")
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res.data)) {
          const sorted = [...res.data].sort(
            (a, b) =>
              new Date(b.timeStamp || b.NotificationDate || 0) -
              new Date(a.timeStamp || a.NotificationDate || 0)
          );
          try {
            localStorage.setItem("pc_cache_circulars", JSON.stringify(sorted));
          } catch {
            // Storage quota
          }
          setCirculars(sorted);
        } else {
          setCirculars((prev) => prev || []);
        }
      })
      .catch((err) => {
        if (isMounted && !circulars) {
          setError(
            apiErrorMessage(
              err,
              "SBTET circulars service is temporarily unavailable."
            )
          );
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Extract unique category types from circulars list
  const types = useMemo(() => {
    if (!circulars) return [];
    const order = [
      "Pre-Examination",
      "Academic",
      "Post-Examination",
      "Others",
      "Administration",
    ];
    const presentTypes = [
      ...new Set(circulars.map((c) => c.CircularType).filter(Boolean)),
    ];
    return presentTypes.sort((a, b) => {
      const idxA = order.indexOf(a);
      const idxB = order.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [circulars]);

  // Handle header sorting click
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder(field === "date" ? "desc" : "asc");
    }
  };

  // Filter and sort items
  const filteredAndSorted = useMemo(() => {
    if (!circulars) return [];
    const query = search.trim().toLowerCase();

    const filtered = circulars.filter((c) => {
      const matchesType =
        typeFilter === "ALL" ||
        (c.CircularType &&
          c.CircularType.toLowerCase() === typeFilter.toLowerCase());

      const matchesSearch =
        !query ||
        (c.Title && c.Title.toLowerCase().includes(query)) ||
        (c.CircularType && c.CircularType.toLowerCase().includes(query)) ||
        (c.NotificationDate &&
          formatNotificationDate(c.NotificationDate).includes(query));

      return matchesType && matchesSearch;
    });

    return filtered.sort((a, b) => {
      if (sortField === "type") {
        const valA = (a.CircularType || "").toLowerCase();
        const valB = (b.CircularType || "").toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      if (sortField === "title") {
        const valA = (a.Title || "").toLowerCase();
        const valB = (b.Title || "").toLowerCase();
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      // Default: date sorting
      const dateA = new Date(a.timeStamp || a.NotificationDate || 0).getTime();
      const dateB = new Date(b.timeStamp || b.NotificationDate || 0).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [circulars, typeFilter, search, sortField, sortOrder]);

  if (error) {
    return (
      <div
        style={{ fontFamily: "'Mulish', sans-serif" }}
        className="space-y-4 max-w-7xl mx-auto font-['Mulish',sans-serif]"
      >
        <div
          className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#d8dadc] border-b border-[#cbd5e1] h-[34px] flex items-center mb-4 -mt-4 sm:-mt-6"
          style={{ boxSizing: "border-box" }}
        >
          <div className="max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 flex items-center gap-2 text-[13px] text-[#003366] font-semibold">
            <Link to="/" className="hover:underline text-[#003366]">
              Home
            </Link>
            <span className="text-gray-500 font-normal">/</span>
            <Link to="/circulars" className="hover:underline text-[#003366]">
              More
            </Link>
            <span className="text-gray-500 font-normal">/</span>
            <span className="text-[#003366] font-bold">Notifications</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 my-3">
          <div className="w-1.5 h-6 bg-[#2e7d32] rounded-xs" />
          <h1 className="text-2xl font-bold text-[#1a365d]">Notifications</h1>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-xs">
          {error}
        </div>
      </div>
    );
  }

  if (!circulars) {
    return <GovLoader label="Fetching official notifications from SBTET…" />;
  }

  const totalItems = filteredAndSorted.length;
  const displayedCirculars =
    rowsPerPage === "ALL"
      ? filteredAndSorted
      : filteredAndSorted.slice(0, Number(rowsPerPage));

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <span className="inline-block ml-1.5 text-[11px] text-[#0288d1]">⇅</span>;
    }
    return (
      <span className="inline-block ml-1.5 text-[11px] font-bold text-[#0288d1]">
        {sortOrder === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <div
      style={{ fontFamily: "'Mulish', sans-serif" }}
      className="space-y-4 pb-12 font-['Mulish',sans-serif] text-gray-800"
    >
      {/* 1. Header Breadcrumb Banner (Full Width 100vw & Exact Height) */}
      <div
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#d8dadc] border-b border-[#cbd5e1] h-[34px] flex items-center mb-4 -mt-4 sm:-mt-6"
        style={{ boxSizing: "border-box" }}
      >
        <div className="max-w-7xl w-full mx-auto px-3 sm:px-4 md:px-6 flex items-center gap-2 text-[13px] text-[#003366] font-semibold">
          <Link to="/" className="hover:text-[#003366]" style={{color: "black",fontSize: "14px"}}>
            Home
          </Link>
          <span className="text-gray-500 font-normal">/</span>
          <Link to="/circulars" className="hover:text-[#003366]" style={{color: "black",fontSize: "14px"}}>
            More
          </Link>
          <span className="text-gray-500 font-normal">/</span>
          <span className="text-[#003366] font-bold" style={{color: "black",fontSize: "14px"}}>Notifications</span>
        </div>
      </div>

      {/* 2. Section Header with Green Accent Bar */}
      <div className="flex items-center gap-2.5 pt-1">
        <div className="w-1.5 h-6 bg-[#2e7d32] rounded-xs shrink-0" />
        <h1 className="text-xl sm:text-2xl font-bold text-[#1a365d] tracking-tight">
          Notifications
        </h1>
      </div>

      {/* 3. Top Category Filter Pills Bar & Search (Image 3) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-gray-300 rounded-[2px] shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setTypeFilter("ALL")}
            className={`px-3 py-1.5 text-xs rounded-[3px] border transition-colors cursor-pointer ${
              typeFilter === "ALL"
                ? "bg-[#2196f3] text-white border-[#2196f3] font-bold shadow-xs"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
            }`}
          >
            All ({circulars.length})
          </button>
          {types.map((t) => {
            const count = circulars.filter(
              (c) => c.CircularType && c.CircularType.toLowerCase() === t.toLowerCase()
            ).length;
            const isActive = typeFilter.toLowerCase() === t.toLowerCase();
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 text-xs rounded-[3px] border transition-colors cursor-pointer ${
                  isActive
                    ? "bg-[#2196f3] text-white border-[#2196f3] font-bold shadow-xs"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                }`}
              >
                {t} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input on Right of Filter Bar */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-xs text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2196f3] focus:border-[#2196f3] transition-all"
            placeholder="Search circulars by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 4. Table Search Box (Image 2) */}
      <div className="pt-2">
        <label
          htmlFor="table-search-input"
          className="block text-[13px] text-gray-700 font-medium mb-1"
        >
          Search
        </label>
        <div className="w-full sm:w-64">
          <input
            id="table-search-input"
            type="text"
            className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0288d1] focus:border-[#0288d1]"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 5. Official SBTET Notifications Table with Scrollable Body Container (As in Image) */}
      <div className="bg-white border border-gray-400 rounded-none shadow-xs overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
          <table
            style={{ fontFamily: "'Mulish', sans-serif" }}
            className="w-full min-w-[850px] border-collapse border border-gray-400 text-left text-[13px]"
          >
            <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <tr className="bg-white text-[#0288d1]">
                <th
                  className="bg-white border border-gray-400 py-2.5 px-3 w-[60px] min-w-[60px] font-semibold select-none text-left"
                  style={{ color: "#0288d1" }}
                >
                  S.No
                </th>
                <th
                  onClick={() => handleSort("type")}
                  className="bg-white border border-gray-400 py-2.5 px-3 w-[160px] min-w-[150px] font-semibold select-none cursor-pointer hover:bg-blue-50/40 transition-colors text-left"
                  style={{ color: "#0288d1" }}
                >
                  <div className="flex items-center justify-between">
                    <span>Circular Type</span>
                    {getSortIcon("type")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("title")}
                  className="bg-white border border-gray-400 py-2.5 px-3 min-w-[380px] font-semibold select-none cursor-pointer hover:bg-blue-50/40 transition-colors text-left"
                  style={{ color: "#0288d1" }}
                >
                  <div className="flex items-center justify-between">
                    <span>Description</span>
                    {getSortIcon("title")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("date")}
                  className="bg-white border border-gray-400 py-2.5 px-3 w-[150px] min-w-[140px] font-semibold select-none cursor-pointer hover:bg-blue-50/40 transition-colors text-left"
                  style={{ color: "#0288d1" }}
                >
                  <div className="flex items-center justify-between">
                    <span>Notification Date</span>
                    {getSortIcon("date")}
                  </div>
                </th>
                <th
                  className="bg-white border border-gray-400 py-2.5 px-3 w-[140px] min-w-[130px] font-semibold select-none text-left"
                  style={{ color: "#0288d1" }}
                >
                  <div className="flex items-center justify-between">
                    <span>Download</span>
                    <span className="inline-block ml-1.5 text-[11px] text-[#0288d1]">⇅</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedCirculars.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="border border-gray-400 p-8 text-center text-[13px] text-gray-500 bg-white"
                  >
                    No notifications match your current filter and search query.
                  </td>
                </tr>
              ) : (
                displayedCirculars.map((c, idx) => {
                  const sNo = idx + 1;
                  const dateFormatted = formatNotificationDate(c.NotificationDate);
                  const isPdfOrUrl = Boolean(c.Url);
                  const isSelected = selectedRow === (c.ID || sNo);

                  return (
                    <tr
                      key={c.ID || `${sNo}-${c.Title}`}
                      onClick={() => setSelectedRow(c.ID || sNo)}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-[#cce5ff] hover:bg-[#bde4ff]"
                          : "hover:bg-blue-50/30 bg-white"
                      }`}
                    >
                      {/* S.No */}
                      <td className="border border-gray-400 py-2 px-3 text-gray-800 font-medium text-left align-middle w-[60px] min-w-[60px]">
                        {sNo}
                      </td>

                      {/* Circular Type */}
                      <td className="border border-gray-400 py-2 px-3 text-gray-800 font-normal text-left align-middle w-[160px] min-w-[150px]">
                        {c.CircularType || "General"}
                      </td>

                      {/* Description */}
                      <td className="border border-gray-400 py-2 px-3 text-gray-800 font-normal leading-relaxed text-left align-middle min-w-[380px]">
                        {c.Title}
                      </td>

                      {/* Notification Date */}
                      <td
                        style={{ fontFamily: "'Mulish', sans-serif" }}
                        className="border border-gray-400 py-2 px-3 text-gray-800 whitespace-nowrap text-left align-middle w-[150px] min-w-[140px]"
                      >
                        {dateFormatted}
                      </td>

                      {/* Download Button */}
                      <td className="border border-gray-400 py-2 px-3 text-left align-middle whitespace-nowrap w-[140px] min-w-[130px]">
                        {isPdfOrUrl ? (
                          <a
                            href={c.Url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 bg-[#107c41] hover:bg-[#0c6233] text-white text-[12px] font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
                          >
                            <span>Download</span>
                            <svg
                              className="w-4 h-4 fill-none stroke-current"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                              <path d="M12 12v7" />
                              <path d="m9 16 3 3 3-3" />
                            </svg>
                          </a>
                        ) : (
                          <span className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 bg-gray-300 text-gray-600 text-[12px] font-medium rounded-full cursor-not-allowed">
                            Download
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Select Number Of Rows Dropdown (Directly below table as in Image) */}
      <div className="pt-2">
        <label
          htmlFor="rows-select-dropdown"
          className="block text-[13px] text-gray-700 font-medium mb-1"
        >
          Select Number Of Rows
        </label>
        <div className="w-48 sm:w-56">
          <select
            id="rows-select-dropdown"
            value={rowsPerPage}
            onChange={(e) => {
              const val =
                e.target.value === "ALL" ? "ALL" : Number(e.target.value);
              setRowsPerPage(val);
            }}
            className="w-full border border-gray-300 rounded-[3px] px-3 py-1.5 text-[13px] text-gray-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#0288d1] focus:border-[#0288d1]"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="ALL">All ({totalItems})</option>
          </select>
        </div>
      </div>

      {/* 7. Floating Scroll to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-100 text-gray-700 hover:text-black transition-all cursor-pointer select-none"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <svg
            className="w-4 h-4 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
