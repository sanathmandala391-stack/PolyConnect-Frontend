// import { useEffect, useState } from "react";
// import api, { apiErrorMessage } from "../../api/client";
// import GovLoader from "../../components/GovLoader";

// export default function HodAttendancePage() {
//   const [all, setAll] = useState(null);
//   const [risks, setRisks] = useState(null);
//   const [error, setError] = useState("");
//   const [showRisksOnly, setShowRisksOnly] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     Promise.all([api.get("/hod/attendance"), api.get("/hod/attendance/detention-risks")])
//       .then(([allRes, risksRes]) => {
//         if (!isMounted) return;
//         setAll(Array.isArray(allRes.data) ? allRes.data : []);
//         setRisks(Array.isArray(risksRes.data) ? risksRes.data : []);
//       })
//       .catch((err) => {
//         if (isMounted) setError(apiErrorMessage(err, "Could not load department attendance records."));
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   if (error) {
//     return (
//       <div className="space-y-4">
//         <h1 className="font-display text-2xl font-bold text-gov-navy">Department Attendance</h1>
//         <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-sm">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!all || !risks) {
//     return <GovLoader label="Loading department attendance records and exam detention risks…" />;
//   }

//   const rows = showRisksOnly ? risks : all;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-border pb-3">
//         <div>
//           <h1 className="font-display text-2xl md:text-3xl font-bold text-gov-navy">
//             Department Attendance Register
//           </h1>
//           <p className="text-xs md:text-sm text-gov-slate mt-0.5">
//             Biometric and class attendance records tracking exam eligibility threshold (75%).
//           </p>
//         </div>

//         <label className="flex items-center gap-2 text-xs font-bold text-gov-navy bg-white border border-gov-border px-3 py-2 rounded-sm cursor-pointer hover:bg-slate-50 select-none">
//           <input
//             type="checkbox"
//             className="w-4 h-4 rounded text-gov-blue focus:ring-gov-blue"
//             checked={showRisksOnly}
//             onChange={(e) => setShowRisksOnly(e.target.checked)}
//           />
//           <span>Show Detention Risks Only ({risks.length})</span>
//         </label>
//       </div>

//       {/* Summary Alert */}
//       {risks.length > 0 && (
//         <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3.5 rounded-sm text-xs flex items-center justify-between gap-4">
//           <div>
//             <strong>Action Required:</strong> {risks.length} student(s) in your department are currently below the 75% exam-eligibility attendance threshold.
//           </div>
//           <span className="font-bold text-amber-800 shrink-0">
//             {Math.round((risks.length / (all.length || 1)) * 100)}% of Dept
//           </span>
//         </div>
//       )}

//       {/* Table */}
//       <div className="gov-card overflow-x-auto">
//         <table className="gov-table">
//           <thead>
//             <tr>
//               <th className="w-12 text-center">#</th>
//               <th>Student PIN</th>
//               <th className="text-center">Current Standing %</th>
//               <th className="text-center">Exam Eligibility %</th>
//               <th className="text-center">Consecutive Absences</th>
//               <th className="text-center">Last Synced Date</th>
//               <th className="text-center">Detention Standing</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center py-8 text-xs text-gov-slate">
//                   {showRisksOnly
//                     ? "No students are currently at detention risk. All attendance records are above 75%."
//                     : "No attendance records recorded for this department."}
//                 </td>
//               </tr>
//             ) : (
//               rows.map((att, idx) => (
//                 <tr key={att.id || idx}>
//                   <td className="text-center text-xs text-gov-slate">{idx + 1}</td>
//                   <td className="font-mono font-bold text-xs text-gov-navy">{att.studentPin}</td>
//                   <td className="text-center font-mono text-xs font-semibold">
//                     {att.currentStandingPercentage != null ? `${att.currentStandingPercentage}%` : "—"}
//                   </td>
//                   <td className="text-center font-mono text-xs font-bold">
//                     <span className={att.detentionRisk ? "text-rose-700 font-black" : "text-gov-sage"}>
//                       {att.examEligibilityPercentage != null ? `${att.examEligibilityPercentage}%` : "—"}
//                     </span>
//                   </td>
//                   <td className="text-center font-mono text-xs">
//                     <span className={att.consecutiveAbsentDays > 3 ? "text-amber-700 font-bold" : "text-gov-slate"}>
//                       {att.consecutiveAbsentDays ?? 0} Days
//                     </span>
//                   </td>
//                   <td className="text-center text-xs text-gov-slate font-mono">
//                     {att.lastSyncedAt ? new Date(att.lastSyncedAt).toLocaleDateString() : "—"}
//                   </td>
//                   <td className="text-center">
//                     {att.detentionRisk ? (
//                       <span className="status-badge bg-rose-50 text-rose-800 border-rose-200">
//                         At Risk (&lt; 75%)
//                       </span>
//                     ) : (
//                       <span className="status-badge bg-emerald-50 text-emerald-800 border-emerald-200">
//                         Eligible
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api, { apiErrorMessage } from "../../api/client";
import GovLoader from "../../components/GovLoader";

// Official Government Arrow Back Button
function OfficialBackButton({ to, label = "Go Back" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={label}
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-white text-[#0f2a4a] hover:bg-[#35a5f1] hover:text-white border border-slate-200 shadow-sm transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] flex-shrink-0"
    >
      <svg
        className="w-5 h-5 transition-transform"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
    </button>
  );
}

export default function HodAttendancePage() {
  const [all, setAll] = useState(null);
  const [risks, setRisks] = useState(null);
  const [error, setError] = useState("");
  const [showRisksOnly, setShowRisksOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sort State: field ('pin' | 'attendance') and direction ('asc' | 'desc')
  const [sortConfig, setSortConfig] = useState({
    field: "pin",
    direction: "asc", // 'asc' = Up Arrow (▲), 'desc' = Down Arrow (▼)
  });

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    let isMounted = true;
    Promise.all([api.get("/hod/attendance"), api.get("/hod/attendance/detention-risks")])
      .then(([allRes, risksRes]) => {
        if (!isMounted) return;
        setAll(Array.isArray(allRes.data) ? allRes.data : []);
        setRisks(Array.isArray(risksRes.data) ? risksRes.data : []);
      })
      .catch((err) => {
        if (isMounted) setError(apiErrorMessage(err, "Could not load department attendance records."));
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Handler to toggle column sorting
  const handleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return {
          field,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { field, direction: "asc" };
    });
  };

  // Dynamically Filter & Sort records
  const processedRows = useMemo(() => {
    const source = showRisksOnly ? (risks || []) : (all || []);
    
    // 1. Search Query Filter
    const filtered = source.filter((item) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      const pin = (item.studentPin || "").toLowerCase();
      return pin.includes(query);
    });

    // 2. Sorting Logic (PIN or Attendance)
    return [...filtered].sort((a, b) => {
      if (sortConfig.field === "pin") {
        const pinA = a.studentPin || "";
        const pinB = b.studentPin || "";
        const comparison = pinA.localeCompare(pinB, undefined, { numeric: true, sensitivity: "base" });
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      if (sortConfig.field === "attendance") {
        const attA = parseFloat(a.examEligibilityPercentage ?? 0);
        const attB = parseFloat(b.examEligibilityPercentage ?? 0);
        return sortConfig.direction === "asc" ? attA - attB : attB - attA;
      }

      return 0;
    });
  }, [all, risks, showRisksOnly, searchQuery, sortConfig]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-4 p-4 font-sans">
        <div className="flex items-center gap-3">
          <OfficialBackButton />
          <h1 className="text-xl md:text-2xl font-bold text-[#0f2a4a]">Department Attendance Register</h1>
        </div>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r shadow-sm flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-900">System Error</p>
            <p className="text-xs text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!all || !risks) {
    return <GovLoader label="Loading department biometric attendance registers and eligibility lists…" />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-10 px-2 sm:px-4">
      {/* Official Government Top Tricolor Ribbon */}
      {/* <div className="h-1.5 w-full rounded-t-sm flex overflow-hidden">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div> */}

      {/* Main Official Header Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#092240] via-[#0d3461] to-[#35a5f1] p-4 sm:p-6 text-white shadow-md border-b-4 border-[#35a5f1]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-3.5">
            <OfficialBackButton label="Return to Dashboard" />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[11px] text-sky-200 font-medium">{currentDate}</span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Department Attendance Register
              </h1>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-2xl font-light leading-relaxed">
                Official biometric logs and examination eligibility records strictly enforcing the 75% attendance criterion.
              </p>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3 pt-1 md:pt-0">
            <label className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/30 px-3.5 py-2 rounded-md cursor-pointer transition-all backdrop-blur-sm select-none text-xs font-semibold text-white shadow-sm">
              <input
                type="checkbox"
                className="w-4 h-4 rounded text-[#35a5f1] focus:ring-[#35a5f1] accent-[#35a5f1] cursor-pointer"
                checked={showRisksOnly}
                onChange={(e) => setShowRisksOnly(e.target.checked)}
              />
              <span>Detention Risks Only ({risks.length})</span>
            </label>
          </div>
        </div>
      </div>

      {/* Summary Alert Notice */}
    

      {/* Table Card Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Controls Bar */}
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by Student PIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-white border border-slate-300 rounded-md pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:border-transparent font-mono"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>Showing <strong className="text-slate-800 font-bold">{processedRows.length}</strong> records</span>
            <span>•</span>
            <span className="text-[#092240] font-medium">Click column arrows to sort</span>
          </div>
        </div>

        {/* Attendance Register Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0f2a4a] text-white font-semibold border-b border-slate-800" style={{fontFamily: "'Mulish',sans-serif",fontSize:"14px"}}>
                <th className="w-12 py-3 px-3.5 text-center text-slate-300" style={{color: "white"}}>S.No</th>

                {/* Sortable Student PIN Column Header */}
                <th className="py-3 px-3.5">
                  <button
                    type="button"
                    onClick={() => handleSort("pin")}
                    className="group inline-flex items-center gap-2 text-white hover:text-[#35a5f1] font-semibold transition-colors focus:outline-none"
                    title="Click to sort by Student PIN (Ascending/Descending)"
                  >
                    <span>Student PIN</span>
                    {/* Interactive Up/Down Arrow Indicator */}
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded transition-all text-xs font-black ${
                        sortConfig.field === "pin"
                          ? "bg-[#35a5f1] text-white shadow-sm"
                          : "bg-slate-700/60 text-slate-300 group-hover:bg-[#35a5f1] group-hover:text-white"
                      }`}
                    >
                      {sortConfig.field === "pin" ? (
                        sortConfig.direction === "asc" ? "▲" : "▼"
                      ) : (
                        "▲"
                      )}
                    </span>
                  </button>
                </th>

                <th className="py-3 px-3.5 text-center">Current Standing %</th>

                {/* Sortable Exam Eligibility % Column Header */}
                <th className="py-3 px-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleSort("attendance")}
                    className="group inline-flex items-center justify-center gap-2 text-white hover:text-[#35a5f1] font-semibold transition-colors focus:outline-none"
                    title="Click to sort by Exam Eligibility % (Lowest/Highest)"
                  >
                    <span>Exam Eligibility %</span>
                    {/* Interactive Up/Down Arrow Indicator */}
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded transition-all text-xs font-black ${
                        sortConfig.field === "attendance"
                          ? "bg-[#35a5f1] text-white shadow-sm"
                          : "bg-slate-700/60 text-slate-300 group-hover:bg-[#35a5f1] group-hover:text-white"
                      }`}
                    >
                      {sortConfig.field === "attendance" ? (
                        sortConfig.direction === "asc" ? "▲" : "▼"
                      ) : (
                        "▲"
                      )}
                    </span>
                  </button>
                </th>

                <th className="py-3 px-3.5 text-center">Consecutive Absences</th>
                <th className="py-3 px-3.5 text-center">Last Synced Date</th>
                <th className="py-3 px-3.5 text-center">Detention Standing</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {processedRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-xs text-slate-500">
                    {showRisksOnly
                      ? "No students are currently at detention risk. All attendance records meet or exceed 75%."
                      : "No attendance records match your query."}
                  </td>
                </tr>
              ) : (
                processedRows.map((att, idx) => (
                  <tr key={att.id || idx} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-3 px-3.5 text-center font-mono text-slate-400 text-[11px]" style={{fontFamily: "'Muli',sans-serif",fontSize:"14px", color: "black"}}>
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3.5 font-mono font-bold text-[#0f2a4a] text-xs"style={{fontFamily: "'Mulish',sans-serif",fontSize:"13px",fontWeight: "500"}} >
                      {att.studentPin}
                    </td>
                    <td className="py-3 px-3.5 text-center font-mono text-xs font-semibold text-slate-700" style={{fontFamily: "'Mulish',sans-serif",fontSize:"14px",fontWeight: "700"}}>
                      {att.currentStandingPercentage != null ? `${att.currentStandingPercentage}%` : "—"}
                    </td>
                    <td className="py-3 px-3.5 text-center font-mono text-xs font-bold">
                      {att.detentionRisk ? (
                        <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded font-black" style={{fontFamily: "'Mulish',sans-serif",fontSize:"13px",fontWeight: "500"}}>
                          {att.examEligibilityPercentage != null ? `${att.examEligibilityPercentage}%` : "—"}
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-bold">
                          {att.examEligibilityPercentage != null ? `${att.examEligibilityPercentage}%` : "—"}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3.5 text-center font-mono text-xs">
                      <span className={att.consecutiveAbsentDays > 3 ? "text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200" : "text-slate-600"} style={{fontFamily: "'Mulish',sans-serif",fontSize:"12px",fontWeight: "700"}}>
                        {att.consecutiveAbsentDays ?? 0} Days
                      </span>
                    </td>
                    <td className="py-3 px-3.5 text-center text-slate-500 font-mono text-[11px]" style={{fontFamily: "Mulish,Arial,sans-serif",fontSize:"12px"}}>
                      {att.lastSyncedAt ? new Date(att.lastSyncedAt).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="py-3 px-3.5 text-center">
                      {att.detentionRisk ? (
                        <span className="inline-flex items-center gap-1 font-semibold text-[11px] bg-rose-50 text-rose-800 border border-rose-200 px-2.5 py-1 rounded-full shadow-2xs" style={{fontFamily: "'Mulish',sans-serif",fontSize:"11px",fontWeight: "700"}}>
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                          At Risk (&lt; 75%)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-semibold text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full shadow-2xs" style={{fontFamily: "'Mulish',sans-serif",fontSize:"11px",fontWeight: "700"}}>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                          Eligible
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>State Board of Technical Education and Training • Mandatory Biometric Log</span>
          <span>Attendance Criterion: 75% Minimum for Regular Examination</span>
        </div>
      </div>
    </div>
  );
}
