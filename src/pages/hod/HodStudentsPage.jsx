// import { useEffect, useState, useMemo } from "react";
// import api, { apiErrorMessage } from "../../api/client";
// import GovLoader from "../../components/GovLoader";
// import StatusBadge from "../../components/StatusBadge";

// export default function HodStudentsPage() {
//   const [students, setStudents] = useState(null);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [semesterFilter, setSemesterFilter] = useState("ALL");

//   useEffect(() => {
//     let isMounted = true;
//     api
//       .get("/hod/students")
//       .then((res) => {
//         if (isMounted) setStudents(Array.isArray(res.data) ? res.data : []);
//       })
//       .catch((err) => {
//         if (isMounted) setError(apiErrorMessage(err, "Could not load department student records."));
//       });
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const semesters = useMemo(() => {
//     if (!students) return [];
//     return [...new Set(students.map((s) => s.currentSemester).filter(Boolean))].sort();
//   }, [students]);

//   const filtered = useMemo(() => {
//     if (!students) return [];
//     return students.filter((s) => {
//       const matchSem = semesterFilter === "ALL" || s.currentSemester === semesterFilter;
//       const q = search.trim().toLowerCase();
//       const matchQuery =
//         !q ||
//         (s.fullName && s.fullName.toLowerCase().includes(q)) ||
//         (s.pin && s.pin.toLowerCase().includes(q));
//       return matchSem && matchQuery;
//     });
//   }, [students, semesterFilter, search]);

//   if (error) {
//     return (
//       <div className="space-y-4">
//         <h1 className="font-display text-2xl font-bold text-gov-navy">Department Students</h1>
//         <div className="bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-sm">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!students) {
//     return <GovLoader label="Loading department student directory…" />;
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="border-b border-gov-border pb-3">
//         <div className="flex items-center gap-2">
//           <h1 className="font-display text-2xl md:text-3xl font-bold text-gov-navy">
//             Department Student Roster
//           </h1>
//           <span className="bg-blue-100 text-gov-blueDark text-xs font-bold px-2.5 py-0.5 rounded-full">
//             {students.length} Registered
//           </span>
//         </div>
//         <p className="text-xs md:text-sm text-gov-slate mt-0.5">
//           Directory of approved students, active semesters, CGPA standings, and backlogs in your department.
//         </p>
//       </div>

//       {/* Filter & Search Bar */}
//       <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 border border-gov-border rounded-sm">
//         <div className="flex flex-wrap items-center gap-1.5">
//           <button
//             onClick={() => setSemesterFilter("ALL")}
//             className={`px-3 py-1.5 text-xs font-bold rounded-sm border transition-colors ${
//               semesterFilter === "ALL"
//                 ? "bg-gov-navy text-white border-gov-navy"
//                 : "border-gov-border text-gov-slate hover:bg-gov-lightblue"
//             }`}
//           >
//             All Semesters ({students.length})
//           </button>
//           {semesters.map((sem) => (
//             <button
//               key={sem}
//               onClick={() => setSemesterFilter(sem)}
//               className={`px-3 py-1.5 text-xs font-bold rounded-sm border transition-colors ${
//                 semesterFilter === sem
//                   ? "bg-gov-navy text-white border-gov-navy"
//                   : "border-gov-border text-gov-slate hover:bg-gov-lightblue"
//               }`}
//             >
//               Sem {sem} ({students.filter((s) => s.currentSemester === sem).length})
//             </button>
//           ))}
//         </div>

//         <div className="w-full sm:w-72">
//           <input
//             className="gov-input text-xs"
//             placeholder="Search by student name or PIN…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="gov-card overflow-x-auto">
//         <table className="gov-table">
//           <thead>
//             <tr>
//               <th className="w-12 text-center">#</th>
//               <th>Student PIN</th>
//               <th>Student Full Name</th>
//               <th className="text-center">Semester</th>
//               <th className="text-center">Scheme</th>
//               <th className="text-center">CGPA</th>
//               <th className="text-center">Backlogs</th>
//               <th className="text-center">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="text-center py-8 text-xs text-gov-slate">
//                   No department students match your search/filter criteria.
//                 </td>
//               </tr>
//             ) : (
//               filtered.map((s, idx) => (
//                 <tr key={s.id || idx}>
//                   <td className="text-center text-xs text-gov-slate">{idx + 1}</td>
//                   <td className="font-mono font-bold text-xs text-gov-navy">{s.pin}</td>
//                   <td className="font-medium text-xs text-gov-ink">{s.fullName}</td>
//                   <td className="text-center text-xs">{s.currentSemester || "—"}</td>
//                   <td className="text-center font-mono text-xs">{s.schemeCode || "—"}</td>
//                   <td className="text-center font-mono text-xs font-bold text-gov-blue">
//                     {s.cgpa != null ? s.cgpa : "—"}
//                   </td>
//                   <td className="text-center">
//                     <span
//                       className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
//                         s.totalBacklogs > 0 ? "bg-rose-50 text-rose-700" : "text-gov-slate"
//                       }`}
//                     >
//                       {s.totalBacklogs ?? 0}
//                     </span>
//                   </td>
//                   <td className="text-center">
//                     <StatusBadge status={s.status || "ACTIVE"} />
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
import StatusBadge from "../../components/StatusBadge";

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

export default function HodStudentsPage() {
  const [students, setStudents] = useState(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("ALL");
  const [isSyncingResults, setIsSyncingResults] = useState(false);

  // Sort State: field ('pin' | 'name' | 'cgpa' | 'backlogs') and direction ('asc' | 'desc')
  const [sortConfig, setSortConfig] = useState({
    field: "pin",
    direction: "asc",
  });

  const currentDate = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // Fetch live SBTET consolidated results for each student PIN
  const fetchLiveResultsForStudents = async (studentList) => {
    if (!studentList || studentList.length === 0) return;
    setIsSyncingResults(true);

    const promises = studentList.map(async (student) => {
      if (!student.pin) return student;
      try {
        const res = await api.get(`/sbtet/consolidated-results`, {
          params: { pin: student.pin },
        });
        const cgpaInfo = res.data?.cgpaInfo;
        const reportList = res.data?.reportList || [];
        const backlogs = reportList.filter(
          (subj) => String(subj.result || "").toUpperCase() !== "P"
        ).length;

        return {
          ...student,
          cgpa: cgpaInfo?.cgpa ?? null,
          totalBacklogs: backlogs,
          resultsSynced: true,
        };
      } catch {
        return {
          ...student,
          resultsSynced: false,
        };
      }
    });

    const enriched = await Promise.all(promises);
    setStudents(enriched);
    setIsSyncingResults(false);
  };

  useEffect(() => {
    let isMounted = true;
    api
      .get("/hod/students")
      .then((res) => {
        if (!isMounted) return;
        const rawStudents = Array.isArray(res.data) ? res.data : [];
        setStudents(rawStudents);
        // Automatically fetch live SBTET CGPA & Backlogs for all students
        fetchLiveResultsForStudents(rawStudents);
      })
      .catch((err) => {
        if (isMounted) setError(apiErrorMessage(err, "Could not load department student records."));
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const semesters = useMemo(() => {
    if (!students) return [];
    return [...new Set(students.map((s) => s.currentSemester).filter(Boolean))].sort();
  }, [students]);

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

  const processedStudents = useMemo(() => {
    if (!students) return [];

    const filtered = students.filter((s) => {
      const matchSem = semesterFilter === "ALL" || s.currentSemester === semesterFilter;
      const q = search.trim().toLowerCase();
      const matchQuery =
        !q ||
        (s.fullName && s.fullName.toLowerCase().includes(q)) ||
        (s.pin && s.pin.toLowerCase().includes(q));
      return matchSem && matchQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sortConfig.field === "pin") {
        const pinA = a.pin || "";
        const pinB = b.pin || "";
        const cmp = pinA.localeCompare(pinB, undefined, { numeric: true, sensitivity: "base" });
        return sortConfig.direction === "asc" ? cmp : -cmp;
      }

      if (sortConfig.field === "name") {
        const nameA = a.fullName || "";
        const nameB = b.fullName || "";
        const cmp = nameA.localeCompare(nameB);
        return sortConfig.direction === "asc" ? cmp : -cmp;
      }

      if (sortConfig.field === "cgpa") {
        const cgpaA = parseFloat(a.cgpa ?? 0);
        const cgpaB = parseFloat(b.cgpa ?? 0);
        return sortConfig.direction === "asc" ? cgpaA - cgpaB : cgpaB - cgpaA;
      }

      if (sortConfig.field === "backlogs") {
        const blA = a.totalBacklogs ?? 0;
        const blB = b.totalBacklogs ?? 0;
        return sortConfig.direction === "asc" ? blA - blB : blB - blA;
      }

      return 0;
    });
  }, [students, semesterFilter, search, sortConfig]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-4 p-4 font-sans">
        <div className="flex items-center gap-3">
          <OfficialBackButton />
          <h1 className="text-xl md:text-2xl font-bold text-[#0f2a4a]">Department Students</h1>
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

  if (!students) {
    return <GovLoader label="Loading department student directory…" />;
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
                Enrolled  Student Data
              </h1>
              <p className="text-xs sm:text-sm text-sky-100/90 mt-1 max-w-2xl font-light leading-relaxed">
                Directory of enrolled candidates with live synchronized CGPA and active backlog standings.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {isSyncingResults && (
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-200 text-xs px-3 py-1.5 rounded border border-amber-400/30 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Syncing Live Results…
              </span>
            )}
            <span className="bg-[#35a5f1]/30 text-white font-mono font-bold text-xs px-3.5 py-1.5 rounded-md border border-white/20 backdrop-blur-sm" style={{fontFamily: "'Mulish',Arial san-serif",fontSize: "14px", fontWeight: "500"}}>
              {students.length} Registered
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Semester Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSemesterFilter("ALL")}
            className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
              semesterFilter === "ALL"
                ? "bg-[#35a5f1] text-white shadow-sm"
                : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            All Semesters ({students.length})
          </button>
          {semesters.map((sem) => (
            <button
              key={sem}
              type="button"
              onClick={() => setSemesterFilter(sem)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                semesterFilter === sem
                  ? "bg-[#35a5f1] text-white shadow-sm"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
               {sem} ({students.filter((s) => s.currentSemester === sem).length})
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search by student name or PIN…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-300 rounded-md pl-8 pr-3 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#35a5f1] focus:bg-white transition-all font-sans"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>

      {/* Main Student Directory Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0f2a4a] text-white font-semibold border-b border-slate-800" style={{fontFamily: "'Mulish',sans-serif",fontSize:"14px"}}>
                <th className="w-12 py-3 px-3.5 text-center text-slate-300" style={{color:"white"}}>S.No</th>

                {/* Sortable PIN Column */}
                <th className="py-3 px-3.5">
                  <button
                    type="button"
                    onClick={() => handleSort("pin")}
                    className="group inline-flex items-center gap-2 text-white hover:text-[#35a5f1] font-semibold transition-colors focus:outline-none"
                    title="Click to sort by Student PIN (Ascending/Descending)"
                  >
                    <span>Student PIN</span>
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded transition-all text-xs font-black ${
                        sortConfig.field === "pin"
                          ? "bg-[#35a5f1] text-white shadow-sm"
                          : "bg-slate-700/60 text-slate-300 group-hover:bg-[#35a5f1] group-hover:text-white"
                      }`}
                    >
                      {sortConfig.field === "pin" ? (sortConfig.direction === "asc" ? "▲" : "▼") : "▲"}
                    </span>
                  </button>
                </th>

                {/* Sortable Full Name Column */}
                <th className="py-3 px-3.5">
                  <button
                    type="button"
                    onClick={() => handleSort("name")}
                    className="group inline-flex items-center gap-2 text-white hover:text-[#35a5f1] font-semibold transition-colors focus:outline-none"
                    title="Click to sort by Name (A-Z)"
                  >
                    <span>Student Full Name</span>
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded transition-all text-xs font-black ${
                        sortConfig.field === "name"
                          ? "bg-[#35a5f1] text-white shadow-sm"
                          : "bg-slate-700/60 text-slate-300 group-hover:bg-[#35a5f1] group-hover:text-white"
                      }`}
                    >
                      {sortConfig.field === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : "▲"}
                    </span>
                  </button>
                </th>

                <th className="py-3 px-3.5 text-center">Semester</th>
                <th className="py-3 px-3.5 text-center">Scheme</th>

                {/* Sortable CGPA Column */}
                <th className="py-3 px-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleSort("cgpa")}
                    className="group inline-flex items-center justify-center gap-2 text-white hover:text-[#35a5f1] font-semibold transition-colors focus:outline-none"
                    title="Click to sort by CGPA"
                  >
                    <span>CGPA</span>
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded transition-all text-xs font-black ${
                        sortConfig.field === "cgpa"
                          ? "bg-[#35a5f1] text-white shadow-sm"
                          : "bg-slate-700/60 text-slate-300 group-hover:bg-[#35a5f1] group-hover:text-white"
                      }`}
                    >
                      {sortConfig.field === "cgpa" ? (sortConfig.direction === "asc" ? "▲" : "▼") : "▲"}
                    </span>
                  </button>
                </th>

                {/* Sortable Backlogs Column */}
                <th className="py-3 px-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleSort("backlogs")}
                    className="group inline-flex items-center justify-center gap-2 text-white hover:text-[#35a5f1] font-semibold transition-colors focus:outline-none"
                    title="Click to sort by Backlogs"
                  >
                    <span>Backlogs</span>
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded transition-all text-xs font-black ${
                        sortConfig.field === "backlogs"
                          ? "bg-[#35a5f1] text-white shadow-sm"
                          : "bg-slate-700/60 text-slate-300 group-hover:bg-[#35a5f1] group-hover:text-white"
                      }`}
                    >
                      {sortConfig.field === "backlogs" ? (sortConfig.direction === "asc" ? "▲" : "▼") : "▲"}
                    </span>
                  </button>
                </th>

                <th className="py-3 px-3.5 text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {processedStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-xs text-slate-500">
                    No department students match your search/filter criteria.
                  </td>
                </tr>
              ) : (
                processedStudents.map((s, idx) => (
                  <tr key={s.id || idx} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-3 px-3.5 text-center text-slate-400 font-mono text-[11px]" style={{fontFamily: "'Muli',sans-serif",fontSize:"14px", color: "black"}}>
                      {idx + 1}
                    </td>
                    <td className="py-3 px-3.5 font-mono font-bold text-xs text-[#0f2a4a]" style={{fontFamily: "'Mulish',sans-serif",fontSize:"13px",fontWeight: "500"}}>
                      {s.pin}
                    </td>
                    <td className="py-3 px-3.5 font-semibold text-xs text-slate-800" style={{fontFamily: "'Mulish',sans-serif",fontSize:"14px",fontWeight: "700"}}>
                      {s.fullName}
                    </td>
                    <td className="py-3 px-3.5 text-center text-xs font-medium text-slate-600" style={{fontFamily: "'Mulish',sans-serif",fontSize:"13px",fontWeight: "500"}}>
                      {s.currentSemester ? `${s.currentSemester}` : "—"}
                    </td>
                    <td className="py-3 px-3.5 text-center font-mono text-xs text-slate-500" style={{fontFamily: "'Mulish',sans-serif",fontSize:"14px",fontWeight: "700"}}>
                      {s.schemeCode || "—"}
                    </td>
                    <td className="py-3 px-3.5 text-center font-mono text-xs font-bold text-[#35a5f1]" style={{fontFamily: "Mulish,Arial,sans-serif",fontSize:"13px"}}>
                      {s.cgpa !== undefined && s.cgpa !== null ? (
                        s.cgpa
                      ) : isSyncingResults ? (
                        <span className="text-slate-400 animate-pulse">…</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3 px-3.5 text-center">
                      {s.totalBacklogs !== undefined && s.totalBacklogs !== null ? (
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                            s.totalBacklogs > 0
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`} style={{fontFamily: "'Mulish',sans-serif",fontSize:"12px",fontWeight: "700"}}
                        >
                          {s.totalBacklogs}
                        </span>
                      ) : isSyncingResults ? (
                        <span className="text-slate-400 animate-pulse">…</span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3.5 text-center" style={{fontFamily: "'Mulish',sans-serif",fontSize:"14px",fontWeight: "700"}}>
                      <StatusBadge status={s.status || "ACTIVE"} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>Showing <strong>{processedStudents.length}</strong> enrolled students</span>
          <span>SBTET Live Consolidated Results Synchronization</span>
        </div>
      </div>
    </div>
  );
}
