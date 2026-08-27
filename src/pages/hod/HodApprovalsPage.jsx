// import { useEffect, useState } from "react";
// import api, { apiErrorMessage } from "../../api/client";
// import GovLoader from "../../components/GovLoader";

// export default function HodApprovalsPage() {
//   const [approvals, setApprovals] = useState(null);
//   const [error, setError] = useState("");
//   const [processingId, setProcessingId] = useState(null);
//   const [reasonDrafts, setReasonDrafts] = useState({});

//   function load() {
//     api
//       .get("/hod/approvals/pending")
//       .then((res) => setApprovals(Array.isArray(res.data) ? res.data : []))
//       .catch((err) => setError(apiErrorMessage(err, "Could not load pending student registration requests.")));
//   }

//   useEffect(() => {
//     load();
//   }, []);

//   async function decide(id, approve) {
//     setError("");
//     setProcessingId(id);
//     try {
//       const reason = reasonDrafts[id] || "";
//       await api.post(
//         `/hod/approvals/${id}/decision?approve=${approve}&reason=${encodeURIComponent(reason)}`
//       );
//       setApprovals((list) => list.filter((a) => a.id !== id));
//     } catch (err) {
//       setError(
//         apiErrorMessage(
//           err,
//           `Could not ${approve ? "approve" : "reject"} this student registration. Please try again.`
//         )
//       );
//     } finally {
//       setProcessingId(null);
//     }
//   }

//   if (error && !approvals) {
//     return (
//       <div className="space-y-4">
//         <h1 className="font-display text-2xl font-bold text-gov-navy">Student Approvals Queue</h1>
//         <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-sm">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!approvals) {
//     return <GovLoader label="Loading pending student registration queue…" />;
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="border-b border-gov-border pb-3">
//         <div className="flex items-center gap-2">
//           <h1 className="font-display text-2xl md:text-3xl font-bold text-gov-navy">
//             Student Registration Approvals
//           </h1>
//           <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
//             {approvals.length} Pending
//           </span>
//         </div>
//         <p className="text-xs md:text-sm text-gov-slate mt-0.5">
//           Verify student enrollment credentials, PIN format, and branch allocation before granting portal access.
//         </p>
//       </div>

//       {error && (
//         <div className="bg-red-50 border border-red-200 text-red-800 text-xs px-3.5 py-2.5 rounded-sm">
//           {error}
//         </div>
//       )}

//       {approvals.length === 0 ? (
//         <div className="gov-card p-12 text-center text-sm text-gov-slate">
//           <p className="font-semibold text-gov-navy mb-1">No Pending Approvals</p>
//           <p className="text-xs">All student registration requests for your department have been reviewed.</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {approvals.map((a) => (
//             <div key={a.id} className="gov-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
//               <div className="space-y-1">
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-display font-bold text-base text-gov-navy">
//                     {a.student?.fullName || "Student"}
//                   </h3>
//                   <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-0.5 rounded text-gov-slate">
//                     PIN: {a.student?.pin || "N/A"}
//                   </span>
//                 </div>
//                 <p className="text-xs text-gov-slate">
//                   Email: <span className="font-mono text-gov-ink">{a.student?.email}</span> &bull; Branch:{" "}
//                   <strong>{a.branch?.name || a.student?.branchCode || "Department"}</strong>
//                 </p>
//                 <p className="text-[11px] text-gov-muted">
//                   College: {a.college?.name || a.student?.collegeCode}
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
//                 <input
//                   className="gov-input text-xs sm:w-48"
//                   placeholder="Decision reason (optional)"
//                   value={reasonDrafts[a.id] || ""}
//                   onChange={(e) =>
//                     setReasonDrafts((d) => ({ ...d, [a.id]: e.target.value }))
//                   }
//                 />
//                 <div className="flex gap-2">
//                   <button
//                     className="gov-btn bg-gov-sage hover:bg-green-800 text-white text-xs font-bold px-4 py-2"
//                     disabled={processingId === a.id}
//                     onClick={() => decide(a.id, true)}
//                   >
//                     {processingId === a.id ? "…" : "Approve"}
//                   </button>
//                   <button
//                     className="gov-btn-danger text-xs font-bold px-3 py-2"
//                     disabled={processingId === a.id}
//                     onClick={() => decide(a.id, false)}
//                   >
//                     {processingId === a.id ? "…" : "Reject"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
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

export default function HodApprovalsPage() {
  const [approvals, setApprovals] = useState(null);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [reasonDrafts, setReasonDrafts] = useState({});
  const [search, setSearch] = useState("");

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function load() {
    api
      .get("/hod/approvals/pending")
      .then((res) => setApprovals(Array.isArray(res.data) ? res.data : []))
      .catch((err) =>
        setError(apiErrorMessage(err, "Could not load pending student registration requests."))
      );
  }

  useEffect(() => {
    load();
  }, []);

  async function decide(id, approve) {
    setError("");
    setProcessingId(id);
    try {
      const reason = reasonDrafts[id] || "";
      await api.post(
        `/hod/approvals/${id}/decision?approve=${approve}&reason=${encodeURIComponent(reason)}`
      );
      setApprovals((list) => list.filter((a) => a.id !== id));
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          `Could not ${approve ? "approve" : "reject"} this student registration. Please try again.`
        )
      );
    } finally {
      setProcessingId(null);
    }
  }

  // Naturally sorted in Ascending order by PIN / Name
  const sortedApprovals = useMemo(() => {
    if (!approvals) return [];
    const filtered = approvals.filter((a) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      const name = (a.student?.fullName || "").toLowerCase();
      const pin = (a.student?.pin || "").toLowerCase();
      const email = (a.student?.email || "").toLowerCase();
      return name.includes(q) || pin.includes(q) || email.includes(q);
    });

    return filtered.sort((a, b) => {
      const pinA = a.student?.pin || a.student?.fullName || "";
      const pinB = b.student?.pin || b.student?.fullName || "";
      return pinA.localeCompare(pinB, undefined, { numeric: true, sensitivity: "base" });
    });
  }, [approvals, search]);

  if (error && !approvals) {
    return (
      <div className="max-w-7xl mx-auto space-y-4 p-4 font-sans">
        <div className="flex items-center gap-3">
          <OfficialBackButton />
          <h1 className="text-xl md:text-2xl font-bold text-[#0f2a4a]">Student Approvals Queue</h1>
        </div>
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r shadow-sm flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-semibold text-red-900">System Notification</p>
            <p className="text-xs text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!approvals) {
    return <GovLoader label="Loading pending student registration queue…" />;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans text-slate-800 pb-10 px-2 sm:px-4">
      {/* Main Official Header Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#092240] via-[#0d3461] to-[#35a5f1] p-4 sm:p-6 text-white shadow-md border-b-4 border-[#35a5f1]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <OfficialBackButton label="Return to Dashboard" />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[11px] text-sky-200 font-medium">{currentDate}</span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white drop-shadow-sm">
                Student Registration Approvals
              </h1>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-2xl font-light leading-relaxed">
                Scrutinize student enrollment credentials, PIN integrity, and branch quotas before authorizing portal access.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#FF9933] text-[#092240]  font-bold text-xs px-3.5 py-1.5 rounded-md shadow-sm border border-amber-400/50">
              {approvals.length} Pending Approvals
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-600 text-red-800 text-xs p-3.5 rounded-r shadow-sm">
          {error}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by Name, PIN, or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-300 rounded-md pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:bg-white transition-all font-sans"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        <div className="text-[11px] text-slate-500 font-medium">
          Showing <strong className="text-[#0f2a4a]">{sortedApprovals.length}</strong> sorted in Ascending PIN order (A-Z)
        </div>
      </div>

      {/* Approvals List */}
      {sortedApprovals.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center shadow-sm">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800 text-sm">No Pending Approvals</h3>
          <p className="text-xs text-slate-500 mt-1">All student registration requests for your department have been reviewed.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {sortedApprovals.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-lg border border-slate-200 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm hover:shadow transition-shadow border-l-4 border-l-[#35a5f1]"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-[#0f2a4a]">
                    {a.student?.fullName || "Student Name"}
                  </h3>
                  <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200" style={{fontFamily: "'Mulish',sans-serif",fontSize:"12px",fontWeight: "700"}}>
                    PIN: {a.student?.pin || "N/A"}
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  Email: <span className="font-mono text-slate-900">{a.student?.email}</span> &bull; Branch:{" "}
                  <strong className="text-slate-800">{a.branch?.name || a.student?.branchCode || "Department"}</strong>
                </p>

                <p className="text-[11px] text-slate-500">
                   College: {a.college?.name || a.student?.collegeCode}
                </p>
              </div>

              {/* Action Decision Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <input
                  className="text-xs bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:bg-white sm:w-56"
                  placeholder="Decision remarks (optional)"
                  value={reasonDrafts[a.id] || ""}
                  onChange={(e) =>
                    setReasonDrafts((d) => ({ ...d, [a.id]: e.target.value }))
                  }
                />
                <div className="flex items-center gap-2">
                  <button
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-md shadow-sm transition-colors disabled:opacity-50"
                    disabled={processingId === a.id}
                    onClick={() => decide(a.id, true)}
                  >
                    {processingId === a.id ? (
                      <span className="animate-pulse">Processing…</span>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span>Approve</span>
                      </>
                    )}
                  </button>
                  <button
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-md shadow-sm transition-colors disabled:opacity-50"
                    disabled={processingId === a.id}
                    onClick={() => decide(a.id, false)}
                  >
                    {processingId === a.id ? (
                      <span className="animate-pulse">…</span>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Reject</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
